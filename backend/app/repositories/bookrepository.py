import uuid
from abc import ABC, abstractmethod
from typing import List
from app.db.statements import BookTablePreparedStatement
from app.models.book import Book
from app.models.bookcategory import BookCategory

class BookRepository(ABC):
    def __init__(self, connection, placeholder = '%s'):
        self._conn = connection
        self._stm = BookTablePreparedStatement(placeholder)
        cur = self._conn.cursor()
        cur.execute(self._stm.create_table_statement())
        self._conn.commit()
        cur.close()
    

    def save(self, book: Book) -> Book:
        _book = self.find_one_by_id(book.id)
        cur = self._conn.cursor()
        if _book:
            cur.execute(self._stm.update_statement(), (book.title, book.category.value, str(book.id)))
        else:
            cur.execute(self._stm.insert_statement(), (str(book.id), book.title, book.category.value))

        self._conn.commit()
        cur.close()
        return self.find_one_by_id(book.id)


    def find_one_by_id(self, id: uuid.UUID) -> Book | None:
        cur = self._conn.cursor()
        cur.execute(self._stm.select_by_id_statement(), (str(id),))
        data = cur.fetchall()
        cur.close()
        if len(data) > 0:
            return Book(id=uuid.UUID(data[0][0]), title=data[0][1], category=BookCategory(data[0][2]))
        return None


    def find_one_by_title(self, title: str) -> Book | None:
        cur = self._conn.cursor()
        cur.execute(self._stm.select_by_title_statement(), (title,))
        data = cur.fetchall()
        cur.close()
        if len(data) > 0:
            return Book(id=uuid.UUID(data[0][0]), title=data[0][1], category=BookCategory(data[0][2]))
        return None


    def find_all(self) -> List[Book]:
        cur = self._conn.cursor()
        cur.execute(self._stm.select_all_statement())
        data = cur.fetchall()
        cur.close()
        return [Book(id=uuid.UUID(book[0]), title=book[1], category=BookCategory(book[2])) for book in data]


    def delete(self, id: uuid.UUID):
        cur = self._conn.cursor()
        cur.execute(self._stm.delete_by_id_statement(), (str(id),))
        self._conn.commit()
        cur.close()
