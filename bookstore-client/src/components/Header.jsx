import { Button, Link, Typography } from '@mui/material';
import { logout } from '../api/users';
import { useNavigate } from 'react-router-dom';
import { alertError, alertSuccess } from '../utils/sweetalert';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await logout();
      if (res.status === 200) {
        alertSuccess('Log out successfull');
        navigate('/');
      }
    } catch (e) {
      alertError(e.response.data.message);
    }
  };
  return (
    <header className="sticky top-0 flex justify-between items-center shadow-md px-3 z-10 bg-white">
      <div className="flex items-center gap-4 mx-4">
        <img src="/bookstore.png" alt="" width={120} />
        <nav>
          <ul className="flex gap-3">
            <li>
              <Link
                href="/books"
                color="inherit"
                underline="none"
                className="hover:text-blue-500"
              >
                <Typography variant="h6">Books</Typography>
              </Link>
            </li>
            <li>
              <Link
                href="/transactions"
                color="inherit"
                underline="none"
                className="hover:text-blue-500"
              >
                <Typography variant="h6">Transactions</Typography>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <Button onClick={handleLogout} variant="contained" color="error">
        Logout
      </Button>
    </header>
  );
};

export default Header;
