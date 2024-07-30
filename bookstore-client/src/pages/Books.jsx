import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  Modal,
  OutlinedInput,
  Typography,
} from '@mui/material';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { getAllBooks } from '../api/books';
import BookCard from '../components/BookCard';
import CartButton from '../components/CartButton';
import { isLogin } from '../api/users';
import { useNavigate } from 'react-router-dom';
import { addItemToCart } from '../api/carts';
import { alertError, alertSuccess, alertWarning } from '../utils/sweetalert';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Books = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [openAddCart, setOpenAddCart] = useState(false);
  // const [openOrder, setOpenOrder] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [messages, setMessages] = useState([]);
  const handleOpenAddCart = (book) => {
    setSelectedBook(book);
    setOpenAddCart(true);
  };
  const handleCloseAddCart = () => {
    setOpenAddCart(false);
    setShowAlert(false);
    setQuantity(0);
  };
  // const handleOpenOrder = (book) => {
  //   setSelectedBook(book);
  //   setOpenOrder(true);
  // };
  // const handleCloseOrder = () => {
  //   setOpenOrder(false);
  //   setShowAlert(false);
  //   setQuantity(0);
  // };

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

    const fetchBooks = async () => {
      try {
        const res = await getAllBooks();
        if (res.data) {
          setBooks(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    isLoggedIn();
    fetchBooks();
  }, [navigate]);

  const render = async () => {
    try {
      const res = await getAllBooks();
      if (res.data) {
        setBooks(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const isValid = () => {
    let valid = true;
    const msg = [];
    if (quantity <= 0) {
      msg.push('quantity must be more than 0');
      valid = false;
    }

    setMessages(msg);
    return valid;
  };

  const handleAddToCart = async () => {
    const data = {
      book_id: selectedBook.id,
      quantity,
    };
    if (isValid()) {
      try {
        const res = await addItemToCart(data);
        if (res.status === 200 || res.status === 201) {
          alertSuccess('Success add book to cart');
          render();
          setShowAlert(false);
          handleCloseAddCart();
        }
      } catch (e) {
        alertError(e.resoonse.data.message);
      }
    } else {
      setShowAlert(true);
    }
  };

  // const handleOrder = async () => {
  //   const data = {
  //     book_id: selectedBook.id,
  //     total: selectedBook.price * quantity,
  //     quantity,
  //   };
  //   if (isValid()) {
  //     try {
  //       const res = await orderBook(data);
  //       if (res.status === 200) {
  //         alertSuccess('Order Successful');
  //         render();
  //         handleCloseOrder();
  //       }
  //     } catch (e) {
  //       alertError(e.resoonse.data.message);
  //     }
  //   } else {
  //     setShowAlert(true);
  //   }
  // };

  return (
    <>
      <Header />
      <main className="p-5">
        <Typography variant="h3" sx={{ mb: 2 }}>
          Book List
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {books.map((book, i) => (
            <BookCard
              key={i}
              book={book}
              openModalAddCart={handleOpenAddCart}
              // openModalOrder={handleOpenOrder}
            />
          ))}
        </div>
        <CartButton />
      </main>
      <Modal
        open={openAddCart}
        onClose={handleCloseAddCart}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            sx={{ mb: 2 }}
            variant="h5"
            component="h2"
          >
            Add to Cart
          </Typography>
          {showAlert && (
            <Alert severity="error" sx={{ mb: 2 }}>
              <ul className="list-disc ml-4">
                {messages.map((msg, i) => {
                  return <li key={i}>{msg}</li>;
                })}
              </ul>
            </Alert>
          )}
          <Container id="modal-modal-description">
            <FormControl fullWidth sx={{ mb: 1 }} variant="outlined">
              <InputLabel htmlFor="book">Book</InputLabel>
              <OutlinedInput
                id="book"
                type="text"
                value={selectedBook.title}
                label="book"
                disabled
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 1 }} variant="outlined">
              <InputLabel htmlFor="quantity">Quantity</InputLabel>
              <OutlinedInput
                id="quantity"
                type="number"
                label="quantity"
                onChange={({ target }) => setQuantity(target.value)}
              />
            </FormControl>
            <Button onClick={handleAddToCart} fullWidth variant="contained">
              Add
            </Button>
          </Container>
        </Box>
      </Modal>
      {/* <Modal
        open={openOrder}
        onClose={handleCloseOrder}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            sx={{ mb: 1 }}
            component="h2"
          >
            Order Book
          </Typography>
          {showAlert && (
            <Alert severity="error" sx={{ mb: 2 }}>
              <ul className="list-disc ml-4">
                {messages.map((msg, i) => {
                  return <li key={i}>{msg}</li>;
                })}
              </ul>
            </Alert>
          )}
          <Container id="modal-modal-description">
            <FormControl fullWidth sx={{ mb: 1 }} variant="outlined">
              <InputLabel htmlFor="book">Book</InputLabel>
              <OutlinedInput
                id="book"
                type="text"
                value={selectedBook.title}
                label="book"
                disabled
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 1 }} variant="outlined">
              <InputLabel htmlFor="quantity">Quantity</InputLabel>
              <OutlinedInput
                id="quantity"
                type="number"
                label="quantity"
                onChange={({ target }) => setQuantity(target.value)}
              />
            </FormControl>
            <Button onClick={handleOrder} fullWidth variant="contained">
              Go
            </Button>
          </Container>
        </Box>
      </Modal> */}
    </>
  );
};

export default Books;
