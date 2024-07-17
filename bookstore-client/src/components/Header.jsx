import { Button, Link, Menu, MenuItem, Typography } from '@mui/material';
import { logout } from '../api/users';
import { useNavigate } from 'react-router-dom';
import { alertError, alertSuccess } from '../utils/sweetalert';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useState } from 'react';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <nav className="hidden md:block">
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
      <div className="hidden md:block">
        <Button onClick={handleLogout} variant="contained" color="error">
          Logout
        </Button>
      </div>
      <div className="block md:hidden border rounded-md">
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <MenuIcon sx={{ color: '#000' }} />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{ 'aria-labelledby': 'basic-button' }}
        >
          <MenuItem>
            <Link
              href="/books"
              color="inherit"
              underline="none"
              className="hover:text-blue-500"
            >
              Books
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href="/transactions"
              color="inherit"
              underline="none"
              className="hover:text-blue-500"
            >
              Transactions
            </Link>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <p className="text-red-500">Logout</p>
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
