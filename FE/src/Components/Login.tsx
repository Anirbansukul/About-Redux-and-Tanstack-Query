import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const mutation=useMutation({
    mutationFn:async ({email,password})=>{ return await axios.post('http://localhost:3000/api/user/login', { email, password })}
  })

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const {data} =await mutation.mutateAsync({email,password})
      if (data.status === 1) {
        localStorage.setItem("User-Token",data.token)
        alert(data.msg)
        navigate("/")
      }
       else {
        alert(data.msg)
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong!")
    }
  }

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial, sans-serif',
  }

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  }

  const inputStyle = {
    marginBottom: '15px',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  }

  const buttonStyle = {
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#177AD5',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
  }

  const buttonHoverStyle = {
    backgroundColor: '#005bb5',
  }
const paragraphStyle = {
    marginTop: '20px',
    fontSize: '14px',
    color: '#555',
    textAlign: 'center',
  }

  const linkStyle = {
    color: '#177AD5',
    textDecoration: 'none',
    marginLeft: '5px',
    fontWeight: 'bold',
  }

  const linkHoverStyle = {
    textDecoration: 'underline',
    cursor: 'pointer',
  }
  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: '20px', color: '#333' }}>Login</h1>
      <form onSubmit={submitHandler} style={formStyle}>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          required
          style={inputStyle}
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          required
          style={inputStyle}
        />
        <button
          type='submit'
          style={buttonStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#005bb5'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#177AD5'}
        >
          Login
        </button>
         <p style={paragraphStyle}>
      Don't have an account?
      <Link
        to={"/register"}
        style={linkStyle}
        onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
        onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
      >
        Register
      </Link>
    </p>
      </form>
    </div>
  )
}

export default Login
