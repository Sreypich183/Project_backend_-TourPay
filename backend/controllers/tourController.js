const path = require("path");
const fs = require("fs");
const QRCode = require("qrcode");

const Tour = require("../models/Tour");
const User = require("../models/User");
const { pool } = require("../config/database");

// -------------------- Create --------------------
const createTour = async (req, res) => {
  try {
    const { title, currency, participants } = req.body;

    const tour = await Tour.create({
      title,
      currency,
      created_by: req.userId,
    });

    const currentUser = await User.findById(req.userId);
    await Tour.addParticipant(tour.id, req.userId, `${currentUser.name} (Me)`, true);

    if (participants && participants.length > 0) {
      for (const participant of participants) {
        if (participant.name && participant.name.trim()) {
          await Tour.addParticipant(tour.id, participant.userId || null, participant.name, false);
        }
      }
    }

    const tourWithDetails = await tour.toJSONWithDetails();
    res.status(201).json({ message: "Tour group created successfully", tour: tourWithDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// -------------------- Get User Tours --------------------
const getUserTours = async (req, res) => {
  try {
    const tours = await Tour.findByUserId(req.userId);
    const toursWithDetails = await Promise.all(
      tours.map(async (tour) => {
        const participants = await tour.getParticipants();
        return { ...tour.toJSON(), participants };
      })
    );
    res.json(toursWithDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// -------------------- Get By ID --------------------
const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour group not found" });

    const participants = await tour.getParticipants();
    const isParticipant = participants.some((p) => p.user && p.user.id == req.userId);
    if (!isParticipant) return res.status(403).json({ message: "Access denied" });

    const tourWithDetails = await tour.toJSONWithDetails();
    res.json(tourWithDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// -------------------- Join --------------------
const joinTour = async (req, res) => {
  try {
    const { inviteCode } = req.body;
    const tour = await Tour.findByInviteCode(inviteCode);
    if (!tour) return res.status(404).json({ message: "Invalid invite code" });

    const participants = await tour.getParticipants();
    const isAlreadyParticipant = participants.some((p) => p.user && p.user.id == req.userId);
    if (isAlreadyParticipant) return res.status(400).json({ message: "Already a participant" });

    const currentUser = await User.findById(req.userId);
    await Tour.addParticipant(tour.id, req.userId, currentUser.name, false);

    const tourWithDetails = await tour.toJSONWithDetails();
    res.json({ message: "Successfully joined tour group", tour: tourWithDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// -------------------- Update --------------------
const updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, currency, description, icon } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Tour title is required" });
    }

    const tour = await Tour.findById(id);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    if (tour.created_by !== req.userId) {
      return res.status(403).json({ message: "Unauthorized to update this tour" });
    }

    const updateData = {
      title: title.trim(),
      currency: currency || tour.currency,
      description: description || tour.description,
      icon: icon || tour.icon,
    };

    const updatedTour = await Tour.update(id, updateData);

    if (!updatedTour) {
      return res.status(500).json({ message: "Failed to update tour" });
    }

    const tourWithDetails = await updatedTour.toJSONWithDetails();
    res.json({
      message: "Tour updated successfully",
      tour: tourWithDetails,
    });
  } catch (error) {
    console.error("Error updating tour:", error);
    res.status(500).json({
      message: "Server error updating tour",
      error: error.message,
    });
  }
};

// -------------------- Delete --------------------
const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    if (tour.created_by != req.userId) return res.status(403).json({ message: "Unauthorized" });

    await Tour.delete(req.params.id);
    res.json({ message: "Tour deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// -------------------- Archive --------------------
const archiveTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    if (tour.created_by != req.userId) return res.status(403).json({ message: "Unauthorized" });

    await Tour.archive(req.params.id);
    res.json({ message: "Tour archived successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// -------------------- Insights --------------------
const getTourInsights = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    const insights = await tour.getInsights();
    res.json(insights);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// -------------------- QR --------------------
const generateInviteQR = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    const participants = await tour.getParticipants();
    const isParticipant = participants.some((p) => p.user && p.user.id == req.userId);
    if (!isParticipant) return res.status(403).json({ message: "Access denied" });

    const inviteUrl = `${process.env.FRONTEND_URL}/join?code=${tour.invite_code}`;
    const qrCode = await QRCode.toDataURL(inviteUrl);

    res.json({
      message: "QR code generated successfully",
      qrCode,
      inviteCode: tour.invite_code,
      inviteUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = {
  createTour,
  getUserTours,
  getTourById,
  joinTour,
  updateTour,
  deleteTour,
  archiveTour,
  getTourInsights,
  generateInviteQR,
};
