import uuid
from abc import ABC, abstractmethod
from typing import List
from app.models.book import Book

class BookRepository(ABC):
    
    @abstractmethod
    def save(self, book: Book) -> Book:
       raise NotImplementedError 


    @abstractmethod
    def find_one_by_id(self, id: uuid.UUID) -> Book | None:
        raise NotImplementedError 


    @abstractmethod
    def find_one_by_title(self, title: str) -> Book | None:
        raise NotImplementedError 


    @abstractmethod
    def find_all(self) -> List[Book]:
        raise NotImplementedError 


    @abstractmethod
    def delete(self, id: uuid.UUID):
        raise NotImplementedError 

