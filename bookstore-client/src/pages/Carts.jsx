/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Typography,
} from '@mui/material';
import Header from '../components/Header';
import { Paid, RemoveCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isLogin } from '../api/users';
import { cartPaid, getCart, removeItemFromCart } from '../api/carts';
import { alertError, alertSuccess, alertWarning } from '../utils/sweetalert';
import { processTransaction } from '../api/transactions';

const Item = ({ data, render }) => {
  const handleRemove = async () => {
    try {
      const res = await removeItemFromCart(data.id);
      if (res.status === 200) {
        alertSuccess('Success remove book from cart');
        render();
      }
    } catch (e) {
      alertError(e.response.data.message);
    }
  };
  return (
    <>
      <div className="flex items-center gap-1">
        <Card
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 1,
          }}
          className="flex-col md:flex-row"
        >
          <div className="flex items-center">
            <CardMedia
              sx={{ height: 120, width: 80, mr: 2 }}
              image={data.book.image}
            />
            <div className="">
              <Typography variant="h6">
                <b>{data.book.title}</b>
              </Typography>
              <Typography variant="subtitle2">
                <p>{data.book.author}</p>
              </Typography>
            </div>
          </div>
          <div className="min-w-24 ml-2 mt-2 md:mt-0">
            <div className="border-b border-black p-1">
              <Typography variant="subtitle2">
                <p>Rp. {data.book.price}</p>
              </Typography>
              <Typography variant="subtitle2">
                <p className="text-right font-bold">x {data.quantity}</p>
              </Typography>
            </div>
            <Typography variant="subtitle1">
              <b>Rp. {data.book.price * data.quantity}</b>
            </Typography>
          </div>
        </Card>
        <RemoveCircle
          className="hover:cursor-pointer"
          onClick={handleRemove}
          sx={{ color: '#EA3323' }}
        />
      </div>
    </>
  );
};

const Carts = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState({});

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

    const fetchCart = async () => {
      try {
        const res = await getCart();
        if (res.data) {
          setCart(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchCart();
    isLoggedIn();
  }, [navigate]);

  const render = async () => {
    try {
      const res = await getCart();
      if (res.data) {
        setCart(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  let total = 0;
  if (cart.items) {
    total = cart.items.reduce((num, item) => {
      return num + item.quantity * item.book.price;
    }, 0);
  }

  const handlePaid = async () => {
    try {
      const res = await processTransaction();
      if (res.status === 200) {
        render();
        window.snap.pay(res.data.token, {
          onSuccess: async (result) => {
            await cartPaid({ transaction_id: res.data.id });
            console.log(result);
          },
          onPending: (result) => {
            console.log(result);
          },
          onError: (err) => {
            console.log(err);
          },
          onClose: () => {
            console.log('Anda belum menyelesaikan pembayaran');
          },
        });
      }
    } catch (e) {
      alertError(e.response.data.message);
    }
  };

  return (
    <>
      <Header />
      <main>
        <Container>
          <Box
            sx={{
              maxWidth: 500,
              mx: 'auto',
              my: 4,
              py: 2,
              px: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              borderRadius: 1,
              boxShadow: 2,
            }}
            variant="outlined"
          >
            <Typography variant="h4" gutterbottom>
              <b>Cart</b>
            </Typography>
            <div className="">
              {cart.items &&
                cart.items.map((item, i) => (
                  <Item key={i} data={item} render={render} />
                ))}
            </div>
            <div className="flex justify-between border-t border-black py-2">
              <b>Total</b>
              <b>Rp. {total}</b>
            </div>
            <Button onClick={handlePaid} variant="contained" color="warning">
              <Paid sx={{ mr: 1 }} />
              Pay
            </Button>
          </Box>
        </Container>
      </main>
    </>
  );
};

export default Carts;
