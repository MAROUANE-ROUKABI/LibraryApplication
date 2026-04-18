import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import BookService from '../services/bookService';

const getImage = (img) =>
  img ? `http://localhost:9090${img}` : null;

const formatDate = (dateStr) => {
  if (!dateStr) return 'TBA';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    BookService.getBookById(id)
      .then((res) => setBook(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!book)
    return (
      <div className="spinner-wrap">
        <div className="spinner" />
      </div>
    );

  return (
    <div>
      <div className="details-layout">
        <div>
          <div className="details-cover">
            {getImage(book.imageUrl) ? (
              <img src={getImage(book.imageUrl)} alt={book.titre} />
            ) : (
              <div style={{ aspectRatio: '2/3', background: 'var(--paper-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '12px', color: 'var(--ink-faint)' }}>No cover</span>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="details-crumb">
            <Link to="/">Library</Link>
            <span>›</span>
            <span>{book.categoryName}</span>
          </div>
          <h1 className="details-title">{book.titre}</h1>
          <div className="details-tags">
            <span className="details-tag details-tag--accent">{book.categoryName}</span>
            <span className="details-tag">{book.pages} pages</span>
          
          </div>     <div className="details-meta-row">
  <div>
    <div className="details-meta-row__item-label">Author</div>
    <div className="details-meta-row__item-value">{book.auteurPrenom} {book.auteurNom}</div>
  </div>
  <div>
    <div className="details-meta-row__item-label">Published by</div>
    <div className="details-meta-row__item-value">{book.editeurNom}</div>
  </div>
  <div>
    <div className="details-meta-row__item-label">Release date</div>
    <div className="details-meta-row__item-value">{formatDate(book.datePublication)}</div>
  </div>
</div>
          <div className="details-section-label">Synopsis</div>
          
          <p className="details-synopsis">
            {book.description || 'No description provided for this book.'}
          </p>
          <div className="details-actions">
            <Link to={`/edit/${book.id}`} className="btn-edit">
              Edit details
            </Link>
            <button
              className="btn-delete"
              onClick={() => {
                if (window.confirm('Remove this book? This cannot be undone.')) {
                  BookService.deleteBook(book.id).then(() => navigate('/'));
                }
              }}
            >
              Remove from library
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
