import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addTodo, removeTodo } from '../slice/Redu'
const AllTodo = () => {
  const [data1,setData1]=useState([])
  const [ID,setID]=useState([])
  const [name1,setName1]=useState([])
  const [userId,setUserId]=useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const values = useSelector(state => state.todo.todos)

 useEffect(() => {
  if (values.length > 0) {
    setID(values.map(item => item._id))
    setName1(values.map(item => item.name))
    setUserId(values.map(item => item.user))
  }
}, [values])

  console.log(ID,name1,userId);
  

  const token = localStorage.getItem("User-Token")
  const { data } = useQuery({
    queryKey: ["Todos_Key"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/api/todo/get-todo", {
        headers: { "User-Token": token }
      })
      return res.data
    }
  })
  // let data1: any[] = []
  useEffect(() => {
  if (data && data.status === 1) {
    setData1(data.msg)
    data.msg.forEach(todo => dispatch(addTodo(todo)))
  } else if (data) {
    alert(data.msg)
  }
}, [data, dispatch]) 
  const queryClient = new QueryClient()
  const mutation = useMutation({
    mutationFn: async ({ id, token }) => {
      return await axios.delete(`http://localhost:3000/api/todo/remove-todo/${id}`, {
        headers: { "User-Token": token }
      })
    },
    onSuccess: () => queryClient.invalidateQueries(["Todos_Key"])
  })
  const removeTodo1 = async (id) => {
    try {
      const token = localStorage.getItem("User-Token")
      const { data } = await mutation.mutateAsync({ id, token })
      alert(data.msg)
      dispatch(removeTodo({ _id: id }))
    } catch (error) {
      console.error(error)
      alert("Something went wrong!")
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        maxWidth: "500px",
        margin: "30px auto",
        padding: "10px",
      }}
    >
      {/* <p>{values}</p> */}
      {data1.length === 0 ? (
        <p style={{ textAlign: "center", color: "#555" }}>No todos found.</p>
      ) : (
        data1.map((item) => (
          <div
            key={item._id} // or item.id if backend returns id
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "12px 15px",
              backgroundColor: "#f9f9f9",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <span style={{ fontSize: "16px", fontWeight: "500" }}>{item.name}</span>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
                title="Delete"
                onClick={() => removeTodo1(item._id)}
              >
                ❌
              </button>
              <button
                onClick={() => navigate("/update", { state: { id: item._id } })}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#007BFF",
                  border: "none",
                  borderRadius: "5px",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                Modify
              </button>

            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default AllTodo
