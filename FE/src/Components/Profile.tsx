import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("User-Token")

  const { data,isError} = useQuery({
    queryKey: ["Todo_Profile"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/api/user/user-details", {
        headers: { "User-Token": token }
      })
      return res.data
    },
  })

  const handleLogout = () => {
    localStorage.removeItem("User-Token")
    navigate("/login")
  }

  if (isError || !data?.msg) {
    return (
      <div style={{
        display: "flex", justifyContent: "center", alignItems: "center",
        height: "100vh", background: "linear-gradient(to right, #141e30, #243b55)",
        color: "#fff", fontSize: "1.5rem", fontWeight: "bold"
      }}>
        Failed to load profile. Please login again.
      </div>
    )
  }

  const user = data.msg

  return (
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center",
      height: "100vh", background: "linear-gradient(to right, #141e30, #243b55)",
      fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{
        background: "#fff", color: "#333",
        padding: "2rem 3rem", borderRadius: "16px",
        boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.2)",
        textAlign: "center", minWidth: "320px",
        animation: "fadeIn 0.8s ease-in-out"
      }}>
        <h2 style={{ marginBottom: "1.5rem", color: "#243b55", fontSize: "1.8rem", fontWeight: "bold" }}>
          👤 Profile
        </h2>
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <button
          onClick={handleLogout}
          style={{
            marginTop: "1.5rem", padding: "10px 18px",
            border: "none", borderRadius: "8px",
            background: "#243b55", color: "#fff",
            fontSize: "1rem", fontWeight: "600",
            cursor: "pointer", transition: "0.3s"
          }}
          onMouseOver={e => (e.currentTarget.style.background = "#1a2537")}
          onMouseOut={e => (e.currentTarget.style.background = "#243b55")}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

// Animations
const styleSheet = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}
`
const styleEl = document.createElement("style")
styleEl.innerHTML = styleSheet
document.head.appendChild(styleEl)

export default Profile
