"use client";
import OptionIcon from "@/icons/OptionIcon";
import React, { useState } from "react";
import { CategoryLevel } from "./BookCategory";
import MenuItem from "./MenuItem";

export type BookItem = {
  id: string;
  title: string;
  category: CategoryLevel;
};

type BookProps = {
  children?: React.ReactNode;
  book: BookItem;
};

const moveBookToInProgress = (book: BookItem) => {
  console.log(book);
};

const markBookAsCompleted = (book: BookItem) => {
  console.log(book);
};

const deleteBook = (book: BookItem) => {
  console.log(book);
};

const moveBookToWantToRead = (book: BookItem) => {
  console.log(book);
};

const CATEGORY_MENUES = {
  [CategoryLevel.ToRead]: [
    { label: "Move To In Progress", onClick: moveBookToInProgress },
    { label: "Delete", onClick: deleteBook },
  ],
  [CategoryLevel.InProgress]: [
    { label: "Mark as Complete", onClick: markBookAsCompleted },
    { label: "Move To Want To Read", onClick: moveBookToWantToRead },
    { label: "Delete", onClick: deleteBook },
  ],
  [CategoryLevel.Completed]: [
    { label: "Move To In Progress", onClick: moveBookToInProgress },
    { label: "Delete", onClick: deleteBook },
  ],
};

const Book = (props: BookProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { book } = props;

  const menuItems = CATEGORY_MENUES[book.category].map((item) => (
    <li>
      <MenuItem {...item} book={book} key={item.label} />
    </li>
  ));

  return (
    <div className="relative w-full">
      <div className="relative z-0 flex w-full select-none flex-row rounded-sm bg-white p-3 ring-1 ring-slate-200 drop-shadow-sm">
        <p className="flex-1 pt-1">{book.title}</p>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="h-4 w-4">
            <OptionIcon />
          </span>
        </button>
      </div>
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-30 h-full w-full"
            onClick={() => setMenuOpen(false)}
          />
          <ul className="absolute right-1 top-1 z-50 flex flex-col gap-2 rounded-md bg-white p-2 shadow-xl ring-1 ring-slate-200">
            {menuItems}
          </ul>
        </>
      )}
    </div>
  );
};

export default Book;
