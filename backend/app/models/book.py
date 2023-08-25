from typing import Optional
import uuid
from dataclasses import dataclass, field
from .bookcategory import BookCategory


@dataclass
class Book:
    """
    A class that represents a Book instance
    """
    title: str
    category: BookCategory = BookCategory.TO_READ
    id: uuid.UUID = field(default_factory=uuid.uuid4)


@dataclass
class NewBookRequest:
    """
    A class that represents required fields for request body of a new Book
    """
    title: str


@dataclass
class BookUpdateRequest:
    """
    A class that represents fields for request body of a Book to be updated
    """
    title: str | None = None
    category: BookCategory | None = None
