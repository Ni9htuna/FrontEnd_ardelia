import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [role, setRole] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!role) {
      alert('Pilih dulu role kamu ya!');
      return;
    }

    // Simpan role ke localStorage
    localStorage.setItem("role", role);
    router.push('/books');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Masuk ke Perpustakaan Online</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <select
            className="input"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="" disabled>
              Masuk sebagai
            </option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>

          <button type="submit" className="login-button">
            Masuk
          </button>
        </form>
        <p className="signup-text">
          Belum punya akun? <a href="/register">Daftar</a>
        </p>
      </div>
    </div>
  );
}
