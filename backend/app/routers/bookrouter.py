from typing import List
import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from app.db.bookrepositoryimpl import BookRepositoryImpl
from app.db.util import get_db_connection
from app.models.book import Book, BookUpdateRequest, NewBookRequest
from app.utils.exceptions import BookNotFoundException, BookTitleAlreadyTaken
from app.services.bookservice import BookService


book_router = APIRouter(
    prefix="/books",
    tags=["Books"]
)

def get_book_service():
    try:
        conn = get_db_connection()
        repository = BookRepositoryImpl(connection=conn)
        book_service = BookService(repository)
        yield book_service
    finally:
        conn.close()

@book_router.post("/", response_model=Book, status_code=status.HTTP_201_CREATED)
def create_book(book: NewBookRequest, book_service: BookService = Depends(get_book_service)):
    try:
        if len(book.title) == 0:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Title is required")
        return book_service.create_book(book)
    except BookTitleAlreadyTaken:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Book with the same title exsits")


@book_router.get("/", response_model=List[Book])
def find_all_books(book_service: BookService = Depends(get_book_service)):
    return book_service.find_all_books()


@book_router.get("/{id}")
def get_book(id: uuid.UUID, book_service: BookService = Depends(get_book_service)):
    try:
        return book_service.get_book(id)
    except BookNotFoundException:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found")


@book_router.put("/{id}", response_model=Book)
def update_book(id: uuid.UUID, book: BookUpdateRequest, book_service: BookService = Depends(get_book_service)):
    try:
        return book_service.update_book(id, book)
    except BookNotFoundException:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found")


@book_router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_book(id: uuid.UUID, book_service: BookService = Depends(get_book_service)):
    try:
        return book_service.delete_book(id)
    except BookNotFoundException:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found")

