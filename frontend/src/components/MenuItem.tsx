import { BookItem } from "./Book";

type MenuItemProps = {
  book: BookItem;
  label: string;
  onClick: (book: BookItem) => void;
};

const MenuItem = (props: MenuItemProps) => {
  const { book, label, onClick } = props;
  return (
    <button
      className="z-50 flex h-8 w-full items-center justify-start rounded-sm p-2 text-sm hover:bg-slate-100"
      onClick={() => onClick(book)}
    >
      {label}
    </button>
  );
};

export default MenuItem;
