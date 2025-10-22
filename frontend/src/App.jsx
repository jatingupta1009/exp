import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Income from './pages/Income'
import Expense from './pages/Expense'
import { Route, Routes } from 'react-router-dom'
import UserProvider from './context/userContext'

const App = () => {
  const isAuthenticated = localStorage.getItem("token")? true: false;

  return (
    <UserProvider>
      <Routes>
        <Route path='/' element={isAuthenticated? <Home/>: <Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/dashboard' element={<Home/>}/>
        <Route path='/income' element={<Income/>}/>
        <Route path='/expense' element={<Expense/>}/>
        </Routes>
    </UserProvider>
  )
}

export default App
