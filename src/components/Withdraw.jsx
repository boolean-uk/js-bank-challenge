import { useContext, useState } from "react"
import { BankingContext } from "../App"
import { useNavigate } from "react-router-dom"

export default function Withdraw() {
    const { bankingSystem, getDate } = useContext(BankingContext)
    const [date, setDate] = useState('')
    const [amount, setAmount] = useState(0)
    const navigate = useNavigate()

    const handleWithdraw = (e) => {
        e.preventDefault()
        try {
            bankingSystem.withdraw(date, parseFloat(amount))
            navigate('/')   
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <form onSubmit={handleWithdraw} className="account-actions">
            <div id="transaction-date">
                <label htmlFor="transaction-date">Transaction date</label>

                <input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)} 
                    min={getDate()} 
                    required
                />
            </div>

            <div id="amount">
                <label htmlFor="amount">Amount</label>

                <input 
                    type="number" 
                    id="withdraw" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>

            <button>Withdraw</button>
        </form>
    )
}
