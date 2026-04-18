import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

import BookCatalogue from './components/BookCatalogue';
import BookForm from './components/BookForm';
import AuthorManager from './components/AuthorManager';
import EditorManager from './components/EditorManager';
import Categories from './components/Categories';
import BookDetails from './components/BookDetails';

import './App.css';

function App() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="app-wrapper">
      <nav className="lib-nav">
        <Link className="lib-nav__brand" to="/">
          <span className="lib-nav__brand-icon">LB</span>
          BOOKS 'N STUFF
        </Link>

        <ul className="lib-nav__links">
          <li><Link className={isActive('/')} to="/">Catalogue</Link></li>
          <li><Link className={isActive('/authors')} to="/authors">Authors</Link></li>
          <li><Link className={isActive('/categories')} to="/categories">Categories</Link></li>
          <li><Link className={isActive('/editors')} to="/editors">Editors</Link></li>
        </ul>
        <Link  style={{ textDecoration: 'none' }} className="lib-nav__add" to="/add">+ Add Book</Link>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<BookCatalogue />} />
          <Route path="/add" element={<BookForm />} />
          <Route path="/edit/:id" element={<BookForm />} />
          <Route path="/authors" element={<AuthorManager />} />
          <Route path="/editors" element={<EditorManager />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </main>

      <footer className="lib-footer">
        <span>© 2026 — Library Management System</span>
        <span>MAROUANE ROUKABI - DWFSD</span>
      </footer>
    </div>
  );
}

export default App;
