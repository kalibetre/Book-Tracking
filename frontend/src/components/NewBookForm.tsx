"use client";
import { useBooks } from "@/hooks/useBooks";
import AddIcon from "@/icons/AddIcon";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewBookForm = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { addNewBook } = useBooks();

  const handleBookTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setBookTitle(event.target.value);
    if (!event.target.value) {
      setError("Please enter a book title");
      return;
    }
    setError(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!bookTitle) {
      setError("Please enter a book title");
      return;
    }
    setError(null);
    addNewBook(bookTitle, showErrorMessage);
    setBookTitle("");
    toast.success("Successfully saved your book!");
  };

  const showErrorMessage = (msg: string) => {
    toast.error(msg);
  };

  return (
    <form
      className="flex w-full flex-col items-center justify-center gap-2 sm:w-[550px]"
      onSubmit={handleSubmit}
    >
      <div className="flex h-9 w-full flex-row items-center gap-5">
        <input
          type="text"
          className="h-full w-full flex-1 appearance-none rounded-md p-2 ring-1 ring-gray-300 focus:border-transparent focus:outline-none sm:w-4"
          placeholder="Search..."
          value={bookTitle}
          onChange={handleBookTitleChange}
        />
        <button
          type="submit"
          className="flex h-full w-24 items-center justify-center gap-2 rounded-md bg-cyan-800/80 p-2 px-4 text-sm text-white hover:bg-cyan-700"
        >
          <span className="h-4 w-4">
            <AddIcon />
          </span>
          New
        </button>
      </div>
      {error && (
        <div className="flex w-full items-start">
          <div className="rounded-full bg-red-200 px-3 py-1 text-xs text-red-800">
            {error}
          </div>
        </div>
      )}
    </form>
  );
};

export default NewBookForm;
