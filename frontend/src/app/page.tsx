import Books from "@/components/Books";
import NewBookForm from "@/components/NewBookForm";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-4">
      <div className="mb-6 flex w-full justify-center">
        <NewBookForm></NewBookForm>
      </div>
      <div className="mx-10 flex w-full flex-col justify-center gap-4 sm:flex-row">
        <Books />
      </div>
    </main>
  );
}
