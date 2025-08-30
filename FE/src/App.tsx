import React from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import AddTodo from './Components/AddTodo'
import AllTodo from './Components/AllTodo'
import Profile from './Components/Profile'
import Login from './Components/Login'
import Register from './Components/Register'
import TodoUpdate from './Components/TodoUpdate'
const App = () => {
  return (
    <div>
        <Navbar/>
        <Routes>
           <Route path='/register' element={<Register/>}></Route>
          <Route path='/' element={<AddTodo/>}></Route>
           <Route path='/all-todos' element={<AllTodo/>}></Route>
            <Route path='/profile' element={<Profile/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
             <Route path='/update' element={<TodoUpdate/>}></Route>
        </Routes>
    </div>
  )
}

export default App