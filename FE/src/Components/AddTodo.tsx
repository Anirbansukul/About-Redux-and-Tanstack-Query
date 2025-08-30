import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AddTodo = () => {
  const [name,setName]=useState('')
  const mutation=useMutation({
  mutationFn:async ({name,token})=>{return await axios.post(
  "http://localhost:3000/api/todo/add-todo",
  { name },
  { headers: { "User-Token": token } }
)}
})
  const handleTodo=async ()=>{
    try {
      const token=localStorage.getItem("User-Token")
   const {data} =await mutation.mutateAsync({name,token})
    alert(data.msg)
    setName("")
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
          onChange={(e)=>setName(e.target.value)}
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
            width: window.innerWidth < 600 ? "100%" : "120px", // full width on mobile
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            fontWeight: "600",
            backgroundColor: "#007BFF",
            color: "white",
            cursor: "pointer",
          }}
          onClick={handleTodo}
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default AddTodo