"use client";
import React from "react";
import Book, { BookItem } from "./Book";
import BookCategory, { CategoryLevel } from "./BookCategory";
import { useBooks } from "@/hooks/useBooks";

const Books = () => {
  const { books, isError, isLoading } = useBooks();

  if (isLoading) return <>Processing...</>;
  if (isError) return <>Error ...</>;

  const toReadBooks = books.filter(
    (book: BookItem) => book.category === CategoryLevel.ToRead,
  );
  const inProgressBooks = books.filter(
    (book: BookItem) => book.category === CategoryLevel.InProgress,
  );
  const completedBooks = books.filter(
    (book: BookItem) => book.category === CategoryLevel.Completed,
  );

  return (
    <>
      <BookCategory level={CategoryLevel.ToRead}>
        {toReadBooks.map((book: BookItem) => (
          <Book book={book} key={book.id} />
        ))}
      </BookCategory>

      <BookCategory level={CategoryLevel.InProgress}>
        {inProgressBooks.map((book: BookItem) => (
          <Book book={book} key={book.id} />
        ))}
      </BookCategory>

      <BookCategory level={CategoryLevel.Completed}>
        {completedBooks.map((book: BookItem) => (
          <Book book={book} key={book.id} />
        ))}
      </BookCategory>
    </>
  );
};

export default Books;
