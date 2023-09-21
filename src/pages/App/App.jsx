import './App.css'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import NewOrderPage from '../NewOrderPage/NewOrderPage.jsx'
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage'
import AuthPage from '../AuthPage/AuthPage'
import Navbar from '../../components/Navbar/Navbar'
import { getUser } from '../../utilities/users-service'


function App() {
  const [user, setUser] = useState(getUser)

  return (
      <main className='App'>
        { 
        user ?
        <>
        {/* The placement of the navbar matters */}
        <Navbar user = {user} setUser = {setUser}/>
      <Routes>
        <Route path='/orders/new' element = {<NewOrderPage/>} />
        <Route path='/orders' element = {<OrderHistoryPage/>} />
      </Routes>
      </>
      :
      <AuthPage setUser={setUser} />
    } 
      </main>
  )
}

export default App
