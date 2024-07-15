import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Books from '../pages/Books';
import Transactions from '../pages/Transactions';
import Carts from '../pages/Carts';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/books',
    element: <Books />,
  },
  {
    path: '/transactions',
    element: <Transactions />,
  },
  {
    path: '/carts',
    element: <Carts />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
