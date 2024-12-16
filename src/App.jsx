import { Route, Routes } from 'react-router-dom'
import './assets/styles/App.css'
import Nav from './components/Nav'
import Account from './components/Account'
import Deposit from './components/Deposit'
import Withdraw from './components/Withdraw'
import { createContext, useState } from 'react'
import BankingSystem from './BankingSystem'

export const BankingContext = createContext()

function App() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [bankStatement, setBankStatement] = useState('')
  const bankingSystem = useState(() => new BankingSystem())[0]

  const formatWithZero = (num) => {
    return num < 10 ? `0${num}` : num
  }

  const getDate = (increase = 0) => {
      const today = new Date()
      const year = today.getFullYear()
      const month = formatWithZero(today.getMonth() + 1)
      const day = formatWithZero(today.getDate()) + increase
      return `${year}-${month}-${day}`
  }

  return (
    <BankingContext.Provider value={{ startDate, setStartDate, endDate, setEndDate, bankStatement, setBankStatement, bankingSystem, getDate }}>
      <Nav />

      <Routes>
        <Route 
          path='/'
          element={<Account />}
        />

        <Route 
          path='/deposit'
          element={<Deposit />}
        />

        <Route 
          path='/withdraw'
          element={<Withdraw />}
        />
      </Routes>
    </BankingContext.Provider>
  )
}

export default App
