import * as fs from 'fs';
const PDFDocument = require('pdfkit');

interface FormattedTransaction {
    date: string;
    credit: string;
    debit: string;
    balance: string;
}

export function saveToPDF(formattedTransactions: FormattedTransaction[]) {
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(__dirname + '/accountTransactions.pdf'));

    doc.font('Helvetica-Bold').fontSize(14).text('Account Transactions', { align: 'center' });

    doc.moveDown();

    const tableTop = 140;
    const rowHeight = 30;
    const columnWidth = 140;
    const margin = 50;
    const headerTop = tableTop;

    doc
        .fontSize(12)
        .text('Date', margin, headerTop)
        .text('Credit', margin + columnWidth, headerTop)
        .text('Debit', margin + 2 * columnWidth, headerTop)
        .text('Balance', margin + 3 * columnWidth, headerTop);

    let currentTop = tableTop + rowHeight;
    formattedTransactions.forEach((transaction) => {
        doc
            .fontSize(12)
            .text(transaction.date, margin, currentTop)
            .text(transaction.credit, margin + columnWidth, currentTop)
            .text(transaction.debit, margin + 2 * columnWidth, currentTop)
            .text(transaction.balance, margin + 3 * columnWidth, currentTop);

        currentTop += rowHeight;
    });

    doc.end();
}
