import * as fs from 'fs';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export class Transaction {
  date: string;
  amount: number;
  type: 'credit' | 'debit';

  constructor(date: string, amount: number, type: 'credit' | 'debit') {
    this.date = date;
    this.amount = amount;
    this.type = type;
  }
}

export class StatementFormatter {
  static format(transactions: Transaction[]): string {
    let balance = 0;
    let statement = 'date       || credit  || debit  || balance\n';

    for (const transaction of transactions) {
      let credit = '         ';
      let debit = '       ';

      if (transaction.type === 'credit') {
        balance += transaction.amount;
        credit = transaction.amount.toFixed(2);
      } else {
        balance -= transaction.amount;
        debit = transaction.amount.toFixed(2);
      }

      statement += `${transaction.date} || ${credit} || ${debit} || ${balance.toFixed(2)}\n`;
    }

    return statement.trim();
  }
}

export class BankAccount {
  transactions: Transaction[];
  overdraft: number; 
  constructor() {
    this.transactions = [];
    this.overdraft = 500; 
  }

  deposit(date: string, amount: number) {
    this.transactions.push(new Transaction(date, amount, 'credit'));
  }

  withdraw(date: string, amount: number) {
    const availableFunds = this.getAvailableFunds();

    if (amount > availableFunds + this.overdraft) {
      throw new Error('Insufficient funds for withdrawal.');
    }

    this.transactions.push(new Transaction(date, amount, 'debit'));
  }

  printStatement(): string {
    const sortedTransactions = this.transactions.slice().sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

    let balance = 0;
    let statement = 'date       || credit  || debit  || balance\n';

    for (const transaction of sortedTransactions) {
      let credit = '         ';
      let debit = '       ';

      if (transaction.type === 'credit') {
        balance += transaction.amount;
        credit = transaction.amount.toFixed(2);
      } else {
        balance -= transaction.amount;
        debit = transaction.amount.toFixed(2);
      }

      statement += `${transaction.date} || ${credit} || ${debit} || ${balance.toFixed(2)}\n`;
    }

    return statement.trim();
  }

  async generatePDFStatement(outputPath: string): Promise<void> {
    const doc = await PDFDocument.create();
    const page = doc.addPage([500, 500]);
    const { width, height } = page.getSize();

    const content = this.printStatement().replace(/\n/g, ''); 
    const font = await doc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;
    const textWidth = font.widthOfTextAtSize(content, fontSize);

    page.drawText(content, {
      x: (width - textWidth) / 2,
      y: height - 50,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await doc.save();

    await fs.promises.writeFile(outputPath, pdfBytes);

    console.log(`PDF saved to ${outputPath}`);
  }
  
   

  private getAvailableFunds(): number {
    let balance = 0;

    for (const transaction of this.transactions) {
      if (transaction.type === 'credit') {
        balance += transaction.amount;
      } else {
        balance -= transaction.amount;
      }
    }

    const availableFunds = balance - this.overdraft;
    return availableFunds;
  }
  
}

