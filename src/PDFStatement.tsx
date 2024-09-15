// PDFStatement.tsx

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

interface TransactionProps {
  date: Date;
  amount: number;
  type: 'deposit' | 'withdrawal';
}

interface StatementProps {
  transactions: TransactionProps[];
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    marginBottom: 20,
    fontSize: 24,
    textAlign: 'center',
  },
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  cell: {
    padding: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center', // Center the text in each cell
    flex: 1,
  },
});

const PDFStatement: React.FC<StatementProps> = ({ transactions }) => {
  let balance = 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Bank Statement</Text>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.cell}>Date</Text>
            <Text style={styles.cell}>Credit</Text>
            <Text style={styles.cell}>Debit</Text>
            <Text style={styles.cell}>Balance</Text>
          </View>
          {transactions.map((transaction, index) => {
            if (transaction.type === 'deposit') {
              balance += transaction.amount;
            } else if (transaction.type === 'withdrawal') {
              balance -= transaction.amount;
            }

            return (
              <View key={index} style={styles.row}>
                <Text style={styles.cell}>{transaction.date.toLocaleDateString()}</Text>
                <Text style={styles.cell}>{transaction.type === 'deposit' ? transaction.amount.toFixed(2) : ''}</Text>
                <Text style={styles.cell}>{transaction.type === 'withdrawal' ? transaction.amount.toFixed(2) : ''}</Text>
                <Text style={styles.cell}>{balance.toFixed(2)}</Text>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};

export default PDFStatement;
