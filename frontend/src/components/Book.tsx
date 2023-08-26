import OptionIcon from "@/icons/OptionIcon";
import React from "react";

type BookProps = {
  children?: React.ReactNode;
  title: string;
};

const Book = (props: BookProps) => {
  const { title } = props;
  return (
    <div className="flex w-full select-none flex-row rounded-sm bg-white p-3 ring-1 ring-slate-200 drop-shadow-sm">
      <p className="flex-1 pt-1">{title}</p>
      <button className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100">
        <span className="h-4 w-4">
          <OptionIcon />
        </span>
      </button>
    </div>
  );
};

export default Book;
