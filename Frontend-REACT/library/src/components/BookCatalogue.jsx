import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookService from '../services/BookService';

const getImage = (img) =>
  img ? `http://localhost:9090${img}` : null;

const BookCatalogue = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ authorId: '', categoryId: '' });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const [bRes, aRes, cRes] = await Promise.all([
      BookService.getAllBooks(),
      BookService.getAuthors(),
      BookService.getCategories(),
    ]);
    setBooks(bRes.data);
    setAuthors(aRes.data);
    setCategories(cRes.data);
  };

  const filteredBooks = books.filter((book) => {
    const matchAuthor = filters.authorId === '' || book.auteurId == filters.authorId;
    const matchCategory = filters.categoryId === '' || book.categoryId == filters.categoryId;
    return matchAuthor && matchCategory;
  });

  return (
    <div>
      <div className="catalogue-toolbar">
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
          <h1 className="page-title">Library Catalogue</h1>
          <span className="page-count">{filteredBooks.length} titles</span>
        </div>

        <div className="catalogue-filters">
          <select
            className="filter-select"
            value={filters.authorId}
            onChange={(e) => setFilters({ ...filters, authorId: e.target.value })}
          >
            <option value="">All authors</option>
            {authors.map((a) => (
              <option key={a.id} value={a.id}>
                {a.prenom} {a.nom}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={filters.categoryId}
            onChange={(e) => setFilters({ ...filters, categoryId: e.target.value })}
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name || c.nom}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="catalogue-empty">
          <p className="catalogue-empty__title">No books found</p>
          <p style={{ fontSize: '13px' }}>Try adjusting your filters</p>
        </div>
      ) : (
        <div className="book-grid">
          {filteredBooks.map((book) => (
            <Link to={`/book/${book.id}`} className="book-card" key={book.id}>
              <div className="book-card__cover">
                {getImage(book.imageUrl) ? (
                  <img src={getImage(book.imageUrl)} alt={book.titre} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'var(--paper-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--ink-faint)' }}>No cover</span>
                  </div>
                )}
                <div className="book-card__overlay">
                  <span className="book-card__view">View details</span>
                </div>
              </div>
              <div className="book-card__title">{book.titre}</div>
              <div className="book-card__author">{book.auteurPrenom} {book.auteurNom}</div>
              {book.categoryName && (
                <span className="book-card__badge">{book.categoryName}</span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookCatalogue;
