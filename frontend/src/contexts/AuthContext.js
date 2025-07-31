"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import axios from "axios"

axios.defaults.baseURL = "http://localhost:5000"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem("token"))

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
    delete axios.defaults.headers.common["Authorization"]
  }

  const fetchUser = useCallback(async () => {
    try {
      if (!token) {
        setLoading(false)
        return
      }
      
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      const response = await axios.get("/api/auth/profile")
      setUser(response.data)
    } catch (error) {
      console.error("Error fetching user:", error)
      logout()
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    fetchUser()
  }, [token, fetchUser])

  const authRequest = async (url, data) => {
    try {
      setLoading(true)
      const response = await axios.post(url, data)
      const { token, user } = response.data

      localStorage.setItem("token", token)
      setToken(token)
      setUser(user)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

      return { success: true }
    } catch (error) {
      console.error("Auth error:", error.response?.data || error.message)
      return {
        success: false,
        message: error.response?.data?.message || "Authentication failed",
      }
    } finally {
      setLoading(false)
    }
  }

  const login = (email, password) => {
    return authRequest("/api/auth/login", { email, password })
  }

  const register = (name, email, password) => {
    return authRequest("/api/auth/register", { name, email, password })
  }

  const socialLogin = async (provider, accessToken, userData = null) => {
    try {
      setLoading(true)
      const response = await axios.post("/api/auth/social", {
        provider,
        accessToken,
        userData
      })

      const { token, user } = response.data
      localStorage.setItem("token", token)
      setToken(token)
      setUser(user)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

      return { success: true }
    } catch (error) {
      console.error("Social login error:", error.response?.data || error.message)
      return {
        success: false,
        message: error.response?.data?.message || "Social login failed",
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        socialLogin,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}