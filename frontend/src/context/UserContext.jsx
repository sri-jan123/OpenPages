import { createContext, useState, useEffect } from "react"

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  // Load user from localStorage on app start
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err)
      localStorage.removeItem("user")
    }
  }, [])

  // Helper: login
  const login = (userData) => {
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  // Helper: logout
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  )
}