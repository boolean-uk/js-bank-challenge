import { useContext, useEffect, useState } from 'react'
import { BankingContext } from '../App'
import jsPDF from 'jspdf'

export default function Account() {
    const { 
        startDate, 
        setStartDate, 
        endDate, 
        setEndDate, 
        bankStatement, 
        setBankStatement, 
        bankingSystem, 
        getDate 
    } = useContext(BankingContext)

    const [shouldDownloadPDF, setShouldDownloadPDF] = useState(false)

    const handlePrintStatement = (e) => {
        e.preventDefault()

        try {
            if (startDate.length === 0 && endDate.length === 0) {
                setBankStatement(bankingSystem.printBankStatement())
            } else {
                setBankStatement(bankingSystem.printBankStatementBetweenDates(startDate, endDate))
            }
            setShouldDownloadPDF(true)
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        if (shouldDownloadPDF && bankStatement) {
            const doc = new jsPDF()
            doc.setFontSize(18)
            doc.text('Bank Statement', 105, 20, null, null, 'center')
            doc.setFontSize(12)

            const lines = bankStatement.split('\n')
            let y = 40

            const lineHeight = 10
            const dateX = 10
            const creditX = 70
            const debitX = 130
            const balanceX = 190

            const header = lines[0].split('||').map(item => item.trim())
            doc.text(header[0], dateX, y)
            doc.text(header[1], creditX, y)
            doc.text(header[2], debitX, y)
            doc.text(header[3], balanceX, y)

            y += lineHeight

            doc.line(10, y, 200, y)
            y += lineHeight

            lines.slice(1).forEach(line => {
                if (line.trim() !== '') {
                    const [date, credit, debit, balance] = line.split('||').map(item => item.trim())
                    doc.text(date, dateX, y)
                    doc.text(credit, creditX, y)
                    doc.text(debit, debitX, y)
                    doc.text(balance, balanceX, y)
                    y += lineHeight
                }
            })

            doc.save('bank_statement.pdf')
            setShouldDownloadPDF(false)
        }
    }, [shouldDownloadPDF, bankStatement])

    return (
        <form onSubmit={handlePrintStatement} id='account'>
            <h2>Balance: {bankingSystem.balance}&pound;</h2>
            
            <ul>
                <li>
                    <label htmlFor='start'>From</label>
                    <input 
                        type='date' 
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)} 
                        min={getDate()} 
                    />
                </li>

                <li>
                    <label htmlFor='end'>To</label>
                    <input 
                        type='date' 
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={getDate(1)} 
                    />
                </li>
            </ul>

            <button type='submit'>Print bank statement</button>
        </form>
    )
}
