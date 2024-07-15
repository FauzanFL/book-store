/* eslint-disable react/prop-types */
import { Box, Button, Card, CardMedia, Typography } from '@mui/material';
import Header from '../components/Header';
import { Paid, RemoveCircle } from '@mui/icons-material';

const Item = ({ data }) => {
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
        >
          <div className="flex items-center">
            <CardMedia
              sx={{ height: 120, width: 70, mr: 2 }}
              image={data.image}
            />
            <div className="">
              <Typography variant="h6">
                <b>{data.title}</b>
              </Typography>
              <Typography variant="subtitle2">
                <p>{data.author}</p>
              </Typography>
            </div>
          </div>
          <div className="flex">
            <Typography variant="subtitle2">
              <b>Rp. {data.price}</b>
            </Typography>
          </div>
        </Card>
        <RemoveCircle className="hover:cursor-pointer" color="#EA3323" />
      </div>
    </>
  );
};

const Carts = () => {
  const falseData = [
    {
      title: 'Apaan tuh?',
      author: 'J.R.R Tolkien',
      image:
        'https://www.pluggedin.com/wp-content/uploads/2020/01/hobbit-cover.jpg',
      price: 300000,
    },
  ];
  return (
    <>
      <Header />
      <main>
        <Box
          sx={{
            width: 500,
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
            {falseData.map((item, i) => (
              <Item key={i} data={item} />
            ))}
          </div>
          <div className="flex justify-between border-t border-black py-2">
            <b>Total</b>
            <b>Rp. 5000000</b>
          </div>
          <Button variant="contained" color="warning">
            <Paid sx={{ mr: 1 }} />
            Pay
          </Button>
        </Box>
      </main>
    </>
  );
};

export default Carts;
