import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const role = localStorage.getItem('role');
    const savedTheme = localStorage.getItem('theme') || 'light';

    if (role) setUserRole(role);
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <nav className="navbar">
      <button onClick={() => setShowSidebar(!showSidebar)} className="sidebar-toggle">☰</button>
      <h1 className="navbar-logo">GBOOK</h1>

      <div className="navbar-search">
        <input type="text" placeholder="Cari buku..." />
      </div>

      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      
      <div className="navbar-profile" title={`Masuk sebagai ${userRole}`}>
        <img src="/profile-icon.png" alt="" />
        {userRole && (
          <span style={{ marginLeft: "0.5rem", fontWeight: "bold", color: "#fcefee" }}>
            {userRole}
          </span>
        )}
      </div>



      {showSidebar && (
        <aside className="sidebar">
          <ul>
            <li>
              <button onClick={() => setShowCategory(!showCategory)} className="sidebar-category-btn">
                📚 Category
              </button>
              {showCategory && (
                <ul className="dropdown">
                  <li><Link href="#">Novel</Link></li>
                  <li><Link href="#">Komik</Link></li>
                  <li><Link href="#">Ensiklopedia</Link></li>
                  <li><Link href="#">Pelajaran</Link></li>
                </ul>
              )}
            </li>
            <li><Link href="#">🔖 Bookmark</Link></li>
            <li><Link href="#">❤️ Like</Link></li>
            <li><Link href="#">📜 History</Link></li>
          </ul>
        </aside>
      )}
    </nav>
  );
}
