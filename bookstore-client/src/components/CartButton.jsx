import { ShoppingCart } from '@mui/icons-material';
import { Fab } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CartButton = () => {
  const navigate = useNavigate();
  return (
    <>
      <Fab
        onClick={() => navigate('/carts')}
        color="primary"
        aria-label="cart"
        sx={{ position: 'fixed', bottom: 20, right: 20 }}
      >
        <ShoppingCart />
      </Fab>
    </>
  );
};

export default CartButton;
