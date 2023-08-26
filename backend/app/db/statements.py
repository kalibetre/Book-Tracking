class BookTablePreparedStatement:
    def __init__(self, placeholder: str) -> None:
        self._placeholder = placeholder
    
    def update_statement(self) -> str:
        return f'UPDATE books SET title = {self._placeholder}, category = {self._placeholder} WHERE id = {self._placeholder};'
    
    def insert_statement(self) -> str:
        return f'INSERT INTO books (id, title, category) VALUES ({self._placeholder}, {self._placeholder}, {self._placeholder});'
    
    def select_by_id_statement(self) -> str:
        return f'SELECT * FROM books WHERE id = {self._placeholder};'
    
    def select_by_title_statement(self) -> str:
        return f'SELECT * FROM books WHERE title = {self._placeholder};'
    
    def select_all_statement(self) -> str:
        return f'SELECT * FROM books;'
    
    def delete_by_id_statement(self) -> str:
        return f'DELETE FROM books WHERE id = {self._placeholder};'
    
    def drop_statement(self) -> str:
        return f'DROP TABLE IF EXISTS books;'
    
    def create_table_statement(self) -> str:
        return f'CREATE TABLE IF NOT EXISTS books (id VARCHAR(50) PRIMARY KEY, title TEXT, category VARCHAR(20));'
