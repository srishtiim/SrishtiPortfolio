import sqlite3
import datetime
import pandas as pd

DB_NAME = "books.db"

def init_db():
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    
    # Create books table
    c.execute('''
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            genre TEXT,
            total_pages INTEGER,
            status TEXT DEFAULT 'Want to Read',
            rating INTEGER,
            notes TEXT,
            added_date DATE,
            completed_date DATE
        )
    ''')
    
    # Create reading_sessions table
    c.execute('''
        CREATE TABLE IF NOT EXISTS reading_sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            book_id INTEGER,
            date DATE,
            pages_read INTEGER,
            comments TEXT,
            FOREIGN KEY (book_id) REFERENCES books (id)
        )
    ''')
    
    conn.commit()
    conn.close()

def add_book(title, author, genre, total_pages, status='Want to Read'):
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    added_date = datetime.date.today()
    c.execute('''
        INSERT INTO books (title, author, genre, total_pages, status, added_date)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (title, author, genre, total_pages, status, added_date))
    conn.commit()
    conn.close()

def get_books(status=None):
    conn = sqlite3.connect(DB_NAME)
    query = "SELECT * FROM books"
    params = ()
    if status is not None:
        query += " WHERE status = ?"
        params = (status,)
    
    df = pd.read_sql_query(query, conn, params=params)
    conn.close()
    return df

def get_book_by_id(book_id):
    conn = sqlite3.connect(DB_NAME)
    # Using read_sql_query to get a DataFrame for consistency, or standard cursor
    df = pd.read_sql_query("SELECT * FROM books WHERE id = ?", conn, params=(book_id,))
    conn.close()
    if not df.empty:
        return df.iloc[0]
    return None

def update_book_status(book_id, status):
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    if status == 'Completed':
        completed_date = datetime.date.today()
        c.execute("UPDATE books SET status = ?, completed_date = ? WHERE id = ?", (status, completed_date, book_id))
    else:
        c.execute("UPDATE books SET status = ? WHERE id = ?", (status, book_id))
    conn.commit()
    conn.close()

def log_reading_session(book_id, pages_read, comments=""):
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    date = datetime.date.today()
    c.execute('''
        INSERT INTO reading_sessions (book_id, date, pages_read, comments)
        VALUES (?, ?, ?, ?)
    ''', (book_id, date, pages_read, comments))
    conn.commit()
    conn.close()

def get_reading_history(book_id=None):
    conn = sqlite3.connect(DB_NAME)
    query = '''
        SELECT rs.id, rs.date, rs.pages_read, rs.comments, b.title 
        FROM reading_sessions rs
        JOIN books b ON rs.book_id = b.id
    '''
    params = ()
    if book_id:
        query += " WHERE rs.book_id = ?"
        params = (book_id,)
    
    query += " ORDER BY rs.date DESC"
    
    df = pd.read_sql_query(query, conn, params=params)
    conn.close()
    return df

def get_total_pages_read_per_book(book_id):
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute("SELECT SUM(pages_read) FROM reading_sessions WHERE book_id = ?", (book_id,))
    result = c.fetchone()[0]
    conn.close()
    return result if result else 0

def get_all_reading_sessions():
    conn = sqlite3.connect(DB_NAME)
    query = "SELECT date, pages_read FROM reading_sessions"
    df = pd.read_sql_query(query, conn)
    conn.close()
    return df

# Initialize DB on import if not exists (or call explicitly)
if __name__ == "__main__":
    init_db()
