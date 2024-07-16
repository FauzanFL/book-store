import { AddShoppingCart, Paid } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

/* eslint-disable react/prop-types */
const BookCard = ({ book, openModalAddCart, openModalOrder }) => {
  return (
    <>
      <Card sx={{ p: 1 }}>
        <CardMedia
          sx={{ height: 300, width: 150, margin: 'auto' }}
          image={book.image}
          title={book.title}
        />
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography gutterBottom variant="h5" component="div">
            {book.title}
          </Typography>
          <Typography variant="subtitle1">
            <b>Author:</b> {book.author}
          </Typography>
          <Typography variant="subtitle1">
            <b>Stock:</b> {book.stock}
          </Typography>
          <Typography variant="body2">
            <b>Rp. {book.price}</b>
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => openModalAddCart(book)}
            size="small"
            fullWidth
            variant="contained"
          >
            <AddShoppingCart sx={{ m: '2px 5px 2px 2px' }} />
            Add to Cart
          </Button>
          <Button
            onClick={() => openModalOrder(book)}
            size="small"
            color="warning"
            fullWidth
            variant="contained"
          >
            <Paid sx={{ m: '2px 5px 2px 2px' }} />
            Order
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default BookCard;
