import Book from "@/components/Book";
import BookCategory, { CategoryLevel } from "@/components/BookCategory";
import NewBookForm from "@/components/NewBookForm";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-4">
      <div className="mb-6 flex w-full justify-center">
        <NewBookForm></NewBookForm>
      </div>
      <div className="mx-10 flex w-full flex-col justify-center gap-4 sm:flex-row">
        <BookCategory level={CategoryLevel.ToRead}>
          {[
            "Whispers of Eternity",
            "Chronicles of the Forgotten",
            "Midnight's Embrace",
          ].map((title, i) => (
            <Book title={title} />
          ))}
        </BookCategory>

        <BookCategory level={CategoryLevel.InProgress}>
          {[
            "Spectrum of Dreams",
            "Echoes in the Mist",
            "The Celestial Paradox",
            "Crimson Veil Conspiracy",
          ].map((title, i) => (
            <Book title={title} />
          ))}
        </BookCategory>

        <BookCategory level={CategoryLevel.Completed}>
          {[
            "Ripples of Destiny",
            "Enigma of the Lost Cipher",
            "Aetherial Chronicles",
          ].map((title, i) => (
            <Book title={title} />
          ))}
        </BookCategory>
      </div>
    </main>
  );
}
