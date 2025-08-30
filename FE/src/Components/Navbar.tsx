import React from 'react'

const Navbar = () => {
  return (
    <div style={{ width: "100%", backgroundColor: "#1e1e1e", padding: "15px 0" }}>
      <nav
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <a
          href="/"
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "18px",
            fontWeight: "600",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.color = "#00bfff")}
          onMouseOut={(e) => (e.target.style.color = "white")}
        >
          Add Todo
        </a>

        <a
          href="/all-todos"
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "18px",
            fontWeight: "600",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.color = "#00bfff")}
          onMouseOut={(e) => (e.target.style.color = "white")}
        >
          All Todos
        </a>

        <a
          href="/profile"
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "18px",
            fontWeight: "600",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.color = "#00bfff")}
          onMouseOut={(e) => (e.target.style.color = "white")}
        >
          Profile
        </a>
      </nav>
    </div>
  )
}

export default Navbar
