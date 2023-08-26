import { capitalize } from "@/utils/helpers";
import React from "react";
import { twMerge } from "tailwind-merge";

export enum CategoryLevel {
  ToRead = "to-read",
  InProgress = "in-progress",
  Completed = "completed",
}

const CATEGORY_STYLES = {
  [CategoryLevel.ToRead]: {
    bg: "bg-indigo-100/10",
    ring: "ring-indigo-100",
    pill_bg: "bg-indigo-100",
  },
  [CategoryLevel.InProgress]: {
    bg: "bg-amber-100/10",
    ring: "ring-amber-100",
    pill_bg: "bg-amber-100",
  },
  [CategoryLevel.Completed]: {
    bg: "bg-green-100/10",
    ring: "ring-green-100",
    pill_bg: "bg-green-100",
  },
};

type BookCategoryProps = {
  children?: React.ReactNode;
  level: CategoryLevel;
};

const BookCategory = (props: BookCategoryProps) => {
  const { children, level } = props;

  const bg = CATEGORY_STYLES[level].bg;
  const ring = CATEGORY_STYLES[level].ring;
  const pill_bg = CATEGORY_STYLES[level].pill_bg;

  return (
    <div
      className={twMerge(
        "w-full rounded-sm p-2 ring-1 sm:w-1/3 sm:max-w-[350px]",
        bg,
        ring,
      )}
    >
      <span
        className={twMerge(
          "flex w-28 items-center justify-center rounded-full px-3 text-sm",
          pill_bg,
        )}
      >
        {capitalize(level.replace("-", " "))}
      </span>
      <div className="mt-4 flex flex-wrap gap-3">{children}</div>
    </div>
  );
};

export default BookCategory;
