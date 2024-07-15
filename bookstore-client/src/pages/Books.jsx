import { Typography } from '@mui/material';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { getAllBooks } from '../api/books';
import BookCard from '../components/BookCard';
import CartButton from '../components/CartButton';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
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

    fetchBooks();
  }, []);

  return (
    <>
      <Header />
      <main className="p-5">
        <Typography variant="h3" sx={{ mb: 2 }}>
          Book List
        </Typography>
        <div className="grid grid-cols-4 gap-3">
          {books.map((book, i) => (
            <BookCard key={i} book={book} />
          ))}
        </div>
        <CartButton />
      </main>
    </>
  );
};

export default Books;
