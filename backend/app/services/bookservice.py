from typing import List
import uuid
from app.models.book import Book, BookUpdateRequest, NewBookRequest
from app.repositories.bookrepository import BookRepository
from app.utils.exceptions import BookNotFoundException


class BookService:
    def __init__(self, book_repository: BookRepository) -> None:
        self._book_repository = book_repository

    def create_book(self, new_book: NewBookRequest):
        return self._book_repository.save(Book(title=new_book.title))

    def update_book(self, id: uuid.UUID, updated_book: BookUpdateRequest) -> Book:
        book = self._book_repository.find_one_by_id(id)
        if not book:
            return BookNotFoundException
        
        if updated_book.title:
            book.title = updated_book.title
        if updated_book.category:
            book.category = updated_book.category

        return self._book_repository.save(book)
    
    def get_book(self, id: uuid.UUID) -> Book:
        book = self._book_repository.find_one_by_id(id)
        if not book:
            raise BookNotFoundException
        return book
    
    def search_book_by_title(self, title: str) -> Book:
        book = self._book_repository.find_one_by_title(title)
        if not book:
            raise BookNotFoundException
        return book

    def find_all_books(self) -> List[Book]:
        return self._book_repository.find_all()

    def delete_book(self, id: uuid.UUID):
        book = self._book_repository.find_one_by_id(id)
        if not book:
            raise BookNotFoundException

        self._book_repository.delete(id)
    