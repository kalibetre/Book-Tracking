import sqlite3
import uuid
from fastapi.testclient import TestClient
from fastapi import status
from app.db.bookrepositoryimpl import BookRepositoryImpl
from app.db.statements import BookTablePreparedStatement
from app.main import app
from app.models.book import Book
from app.routers.bookrouter import get_book_service
from app.services.bookservice import BookService


def override_get_book_service():
    try:
        connection = sqlite3.connect(":memory:")
        prepare_db(connection)
        repository = BookRepositoryImpl(connection=connection, placeholder="?")
        book_service = BookService(repository)
        yield book_service
    finally:
        connection.close()

app.dependency_overrides[get_book_service] = override_get_book_service

client = TestClient(app)

SAMPLE_BOOKS = [
    Book(title="Whispers of Eternity"),
    Book(title="The Way of Kings"),
    Book(title="The Name of the Wind"),
    Book(title="The Wise Man's Fear"),
    Book(title="The Hero of Ages"),
]

def prepare_db(connection: sqlite3.Connection):
    cursor = connection.cursor()
    stm = BookTablePreparedStatement("?")
    cursor.execute(stm.drop_statement())
    cursor.execute(stm.create_table_statement())
    
    for book in SAMPLE_BOOKS:
        cursor.execute(stm.insert_statement(), (str(book.id), book.title, book.category.value))

    connection.commit()


def test_create_book():
    response = client.post("/api/v1/books", json={"title": "Test Book"})
    assert response.status_code == status.HTTP_201_CREATED
    book = response.json()
    assert book["title"] == "Test Book"    
    assert is_valid_uuid(book["id"])


def test_book_with_same_title_should_not_be_allowed():
    response = client.post("/api/v1/books", json={"title": SAMPLE_BOOKS[0].title})
    assert response.status_code == status.HTTP_400_BAD_REQUEST


def test_create_book_returns_400_for_empty_title():
    response = client.post("/api/v1/books", json={"title": ""})
    assert response.status_code == status.HTTP_400_BAD_REQUEST


def test_get_all_books():
    response = client.get("/api/v1/books")
    assert response.status_code == status.HTTP_200_OK


def test_get_book():
    book_id = SAMPLE_BOOKS[0].id 
    response = client.get(f"/api/v1/books/{book_id}")
    assert response.status_code == status.HTTP_200_OK
    book = response.json()
    assert book["id"] == str(book_id)


def test_get_book_returns_404():
    book_id = uuid.uuid4()
    response = client.get(f"/api/v1/books/{book_id}")
    assert response.status_code == status.HTTP_404_NOT_FOUND


def test_update_book_title():
    book_id = SAMPLE_BOOKS[0].id
    response = client.put(f"/api/v1/books/{book_id}", json={"title": "Updated Book"})
    assert response.status_code == status.HTTP_200_OK
    book = response.json()
    assert book["id"] == str(book_id)
    assert book["title"] == "Updated Book"


def test_update_book_category():
    book_id = SAMPLE_BOOKS[0].id
    response = client.put(f"/api/v1/books/{book_id}", json={"category": "completed"})
    assert response.status_code == status.HTTP_200_OK
    book = response.json()
    assert book["id"] == str(book_id)
    assert book["category"] == "completed"


def is_valid_uuid(uuid_str: str) -> bool:
    try:
        uuid.UUID(uuid_str)
        return True
    except ValueError:
        return False