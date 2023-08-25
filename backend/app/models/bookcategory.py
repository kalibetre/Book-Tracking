from enum import Enum


class BookCategory(Enum):
    """
    BookCategory Enumeration to differentiate between the various states a particular
    book can be in.
    """
    TO_READ="to-read"
    IN_PROGRESS="in-progress"
    COMPLETED="completed"
