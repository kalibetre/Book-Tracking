import sqlite3
from typing import List
import uuid
from app.models.book import Book
from app.models.bookcategory import BookCategory
from app.repositories.bookrepository import BookRepository


class InMemoryRepository(BookRepository):
    def __init__(self, connection: sqlite3.Connection):
        self._conn = connection
        self._cur = self._conn.cursor()

    def save(self, book: Book) -> Book:
        _book = self.find_one_by_id(book.id)
        if _book:
            self._cur.execute("UPDATE books SET title = ?, category = ? WHERE id = ?", (book.title, book.category.value, str(book.id)))
        else:
            self._cur.execute("INSERT INTO books (id, title, category) VALUES (?, ?, ?)", (str(book.id), book.title, book.category.value))

        self._conn.commit()
        return self.find_one_by_id(book.id)


    def find_one_by_id(self, id: uuid.UUID) -> Book | None:
        result = self._cur.execute("SELECT * FROM books WHERE id = ?", (str(id),))
        data = result.fetchall()
        if len(data) > 0:
            return Book(id=uuid.UUID(data[0][0]), title=data[0][1], category=BookCategory(data[0][2]))
        return None


    def find_one_by_title(self, title: str) -> Book | None:
        result = self._cur.execute("SELECT * FROM books WHERE title = ?", (title,))
        data = result.fetchall()
        if len(data) > 0:
            return Book(id=uuid.UUID(data[0][0]), title=data[0][1], category=BookCategory(data[0][2]))
        return None


    def find_all(self) -> List[Book]:
        result = self._cur.execute("SELECT * FROM books")
        data = result.fetchall()
        return [Book(id=uuid.UUID(book[0]), title=book[1], category=BookCategory(book[2])) for book in data]


    def delete(self, id: uuid.UUID):
        self._cur.execute("DELETE FROM books WHERE id = ?", (str(id),))
        self._conn.commit()
