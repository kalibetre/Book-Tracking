"use client";
import OptionIcon from "@/icons/OptionIcon";
import React, { useState } from "react";
import MenuItem from "./MenuItem";
import { CategoryLevel } from "./BookCategory";
import { useBooks } from "@/hooks/useBooks";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type BookItem = {
  id: string;
  title: string;
  category: CategoryLevel;
};

type BookProps = {
  children?: React.ReactNode;
  book: BookItem;
};

const Book = (props: BookProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { book } = props;
  const { deleteBook, updateBookCategory } = useBooks();

  const handleUpdate = (book: BookItem, category: CategoryLevel) => {
    updateBookCategory({ ...book, category }, showErrorMessage);
    toast.success("The book was updated successfuly!");
  };

  const handleDelete = (book: BookItem) => {
    deleteBook(book, showErrorMessage);
    toast.success("The book was deleted successfuly!");
  };

  const showErrorMessage = (msg: string) => {
    toast.error(msg);
  };

  const inProgressMenuAction = {
    label: "Move To In Progress",
    onClick: (book: BookItem) => handleUpdate(book, CategoryLevel.InProgress),
  };
  const deleteMenuAction = { label: "Delete", onClick: handleDelete };
  const markAsCompleteMenuAction = {
    label: "Mark as Complete",
    onClick: (book: BookItem) => handleUpdate(book, CategoryLevel.Completed),
  };
  const moveToWantToReadMenuAction = {
    label: "Move To Want To Read",
    onClick: (book: BookItem) => handleUpdate(book, CategoryLevel.ToRead),
  };

  const cateogry_menues = {
    [CategoryLevel.ToRead]: [
      inProgressMenuAction,
      markAsCompleteMenuAction,
      deleteMenuAction,
    ],
    [CategoryLevel.InProgress]: [
      markAsCompleteMenuAction,
      moveToWantToReadMenuAction,
      deleteMenuAction,
    ],
    [CategoryLevel.Completed]: [
      inProgressMenuAction,
      moveToWantToReadMenuAction,
      deleteMenuAction,
    ],
  };

  const menuItems = cateogry_menues[book.category].map((item) => (
    <li key={item.label}>
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
