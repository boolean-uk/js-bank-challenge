// src/Statement.tsx

import React from 'react';
import PDFStatement from './PDFStatement';
import { PDFViewer } from '@react-pdf/renderer';

interface TransactionProps {
  date: Date;
  amount: number;
  type: 'deposit' | 'withdrawal';
}

interface StatementProps {
  transactions: TransactionProps[];
}

const Statement: React.FC<StatementProps> = ({ transactions }) => {


  return (
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Bank Statement</h5>
          </div>
        <div className="modal-body">
            <PDFViewer width="100%" height="500px">
                <PDFStatement transactions={transactions} />
            </PDFViewer>
          </div>
        </div>
      </div>
  );
};

export default Statement;
