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

const Transactions = () => {
  function createData(total, status, date) {
    return { total, status, date };
  }

  const rows = [createData(500000, 'success', '2021-10-10')];

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
