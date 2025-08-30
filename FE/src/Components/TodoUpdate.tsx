import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const TodoUpdate = () => {
  const [name, setName] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const { id } = location.state
  const mutation=useMutation({
    mutationFn:async ({id,name,token})=>{return await axios.put(`http://localhost:3000/api/todo/update-todo/${id}`, { name }, {
        headers: { "User-Token": token }
      }
      )}
  })
  const updateTodo = async () => {
    try {
      const token = localStorage.getItem("User-Token")
      const {data} =await mutation.mutateAsync({id,name,token})
      if (data.status === 1) {
        navigate("/all-todos")
      }
      alert(data.msg)
    } catch (error) {
      console.error(error)
      alert("Something went wrong!")
    }
  }
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "2%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: window.innerWidth < 600 ? "column" : "row", // stack on small screens
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid black",
          padding: "20px",
          width: "100%",
          maxWidth: "600px", // keep box centered and not too wide
          gap: "10px",
          backgroundColor: "#f8f8f8",
          borderRadius: "8px",
        }}
      >
        <input
          type="text"
          placeholder="Write Something.."
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            flex: 1,
            minWidth: "150px",
            height: "40px",
            fontWeight: "600",
            textAlign: "center",
            border: "1px solid black",
            borderRadius: "5px",
            padding: "0 10px",
          }}
        />
        <button
          style={{
            height: "40px",
            width: window.innerWidth < 600 ? "100%" : "120px",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            fontWeight: "600",
            backgroundColor: "#007BFF",
            color: "white",
            cursor: "pointer",
          }}
          onClick={updateTodo}
        >
          Update
        </button>
      </div>
    </div>
  )
}

export default TodoUpdate