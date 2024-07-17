import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Header from '../components/Header';
import CartButton from '../components/CartButton';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isLogin } from '../api/users';
import { getTransactions } from '../api/transactions';
import { alertWarning } from '../utils/sweetalert';

const Transactions = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        await isLogin();
      } catch (e) {
        if (e.request.status === 401) {
          alertWarning('Unauthorized: Please log in!');
          navigate('/');
        } else {
          console.error(e);
        }
      }
    };

    const fetchTransactions = async () => {
      try {
        const res = await getTransactions();
        if (res.data) {
          setTransactions(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchTransactions();
    isLoggedIn();
  }, [navigate]);

  function createData(total, books, status, date) {
    return { total, books, status, date };
  }

  const formatBooks = (books) => {
    return (
      <ul>
        {books.map((book, i) => (
          <li key={i}>{`${book.title} x ${book.quantity}`}</li>
        ))}
      </ul>
    );
  };

  let rows = [];
  if (transactions && transactions.length !== 0) {
    rows = transactions.map((transaction) => {
      return createData(
        transaction.total,
        formatBooks(JSON.parse(transaction.books)),
        transaction.status,
        new Date(transaction.createdAt).toLocaleString()
      );
    });
  }

  return (
    <>
      <Header />
      <main>
        <Container>
          <Typography variant="h3" sx={{ my: 2 }}>
            <b>Transactions</b>
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Total</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Books</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Status</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Date</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <b>Rp. {row.total}</b>
                    </TableCell>
                    <TableCell align="right">{row.books}</TableCell>
                    <TableCell align="right">{row.status}</TableCell>
                    <TableCell align="right">{row.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
        <CartButton />
      </main>
    </>
  );
};

export default Transactions;
