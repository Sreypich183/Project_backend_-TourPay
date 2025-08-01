const express = require("express")
const {createTour, getUserTours, getTourById, joinTour, updateTour, deleteTour, archiveTour, getTourInsights } = require("../controllers/tourController")
const { validateTour } = require("../middleware/validation")
const auth = require("../middleware/auth")

const router = express.Router()

router.post("/", auth, validateTour, createTour)
router.get("/", auth, getUserTours)
router.get("/:id", auth, getTourById)
router.post("/join", auth, joinTour)
router.patch("/:id", auth, updateTour)
router.put("/:id", auth, updateTour)       
router.delete("/:id", auth, deleteTour)
router.post("/:id/archive", auth, archiveTour)
router.get("/:id/insights", auth, getTourInsights)

module.exports = router;
