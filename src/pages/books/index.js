import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/navbar";

export default function Index() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  console.log(books, "data buku");

  const deleteBook = async (id) => {
    await fetch(`/api/books/${id}`, {
      method: "DELETE",
    });
    setBooks(books.filter((b) => b.id !== id));
  };

  return (
    <>
      <Navbar />

      <div className="booklist-container">
        <h1 className="booklist-title">Daftar Buku</h1>

        {/* Tombol Tambah Buku */}
        <Link href="/books/add" legacyBehavior>
          <a className="booklist-add">Tambah Buku</a>
        </Link>

        <ul className="booklist-items">
          {books.map((b) => (
            <li key={b.id} className="booklist-item">
              <Link href={`/books/${b.id}`} className="booklist-link">
                {b.title} oleh {b.author}
              </Link>
              <div className="booklist-actions">
                <Link href={`/books/${b.id}`} className="booklist-edit">
                  Edit Buku
                </Link>
                <button
                  onClick={() => deleteBook(b.id)}
                  className="booklist-delete"
                >
                  Hapus Buku
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
