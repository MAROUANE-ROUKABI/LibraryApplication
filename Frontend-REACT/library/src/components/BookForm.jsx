import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BookService from '../services/BookService';

const BookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    titre: '',
    pages: '',
    description: '',
    datePublication: '',
    auteurId: '',
    categoryId: '',
    editeurId: '',
    imageFile: null,
  });

  const [data, setData] = useState({ auteurs: [], categories: [], editeurs: [] });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    loadRelations();
    if (id) loadBook();
  }, [id]);

  const loadRelations = async () => {
    try {
      const [a, c, e] = await Promise.all([
        BookService.getAuthors(),
        BookService.getCategories(),
        BookService.getEditeurs(),
      ]);
      setData({ auteurs: a.data || [], categories: c.data || [], editeurs: e.data || [] });
    } catch (err) {
      console.error('Error loading selection lists:', err);
    }
  };

  const loadBook = async () => {
    try {
      const res = await BookService.getBookById(id);
      setBook({ ...res.data, imageFile: null });
      const imageUrl = res.data.imageUrl ? `http://localhost:9090${res.data.imageUrl}` : null;
      setPreview(imageUrl);
    } catch (err) {
      console.error('Error loading book details:', err);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setBook({ ...book, imageFile: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const livreDto = {
      titre: book.titre,
      pages: Number(book.pages),
      description: book.description,
      datePublication: book.datePublication,
      auteurId: Number(book.auteurId),
      categoryId: Number(book.categoryId),
      editeurId: Number(book.editeurId),
    };
    formData.append('livreDto', JSON.stringify(livreDto));
    if (book.imageFile) formData.append('image', book.imageFile);
    try {
      if (id) await BookService.updateBook(id, formData);
      else await BookService.createBook(formData);
      navigate('/');
    } catch (err) {
      console.error('Submit error:', err.response?.data);
    }
  };

  return (
    <div className="form-page">
      <div className="form-layout">
        <div className="form-cover-panel">
          <div className="form-cover-label">Book cover</div>
          <div className="form-cover-frame">
            {preview ? (
              <img src={preview} alt="Cover preview" />
            ) : (
              <div className="form-cover-empty">
                <div className="form-cover-empty__icon" />
                <span>No cover</span>
              </div>
            )}
          </div>
          <label className="btn-upload">
            Choose image
            <input type="file" hidden onChange={handleFileChange} accept="image/*" />
          </label>
          <p className="form-upload-hint">JPG or PNG · auto-cropped to 7:10</p>
        </div>
        <div>
          <div className="form-header">
            <div>
              <h2 className="form-title">{id ? 'Update entry' : 'New book registration'}</h2>
              <p className="form-subtitle">Fill in all required fields below</p>
            </div>
            <button className="btn-close-form" onClick={() => navigate('/')}>✕</button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="field-label">Book title</label>
              <input
                className="field-input"
                type="text"
                value={book.titre}
                onChange={(e) => setBook({ ...book, titre: e.target.value })}
                placeholder="e.g. The Name of the Wind"
                required
              />
            </div>
            <div className="field">
              <label className="field-label">Description / synopsis</label>
              <textarea
                className="field-textarea"
                rows="4"
                value={book.description}
                onChange={(e) => setBook({ ...book, description: e.target.value })}
                placeholder="Briefly describe the plot or contents..."
              />
            </div>
            <div className="field-row cols-2">
              <div>
                <label className="field-label">Pages</label>
                <input
                  className="field-input"
                  type="number"
                  value={book.pages}
                  onChange={(e) => setBook({ ...book, pages: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="field-label">Publication date</label>
                <input
                  className="field-input"
                  type="date"
                  value={book.datePublication || ''}
                  onChange={(e) => setBook({ ...book, datePublication: e.target.value })}
                />
              </div>
            </div>

            <div className="field-row cols-3">
              <div>
                <label className="field-label">Author</label>
                <select
                  className="field-select"
                  value={book.auteurId}
                  onChange={(e) => setBook({ ...book, auteurId: e.target.value })}
                  required
                >
                  <option value="">Select author</option>
                  {data.auteurs.map((a) => (
                    <option key={a.id} value={a.id}>{a.prenom} {a.nom}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="field-label">Category</label>
                <select
                  className="field-select"
                  value={book.categoryId}
                  onChange={(e) => setBook({ ...book, categoryId: e.target.value })}
                  required
                >
                  <option value="">Select category</option>
                  {data.categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name || c.nom}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="field-label">Publisher</label>
                <select
                  className="field-select"
                  value={book.editeurId}
                  onChange={(e) => setBook({ ...book, editeurId: e.target.value })}
                  required
                >
                  <option value="">Select publisher</option>
                  {data.editeurs.map((ed) => (
                    <option key={ed.id} value={ed.id}>{ed.nom}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-footer">
              <button type="button" className="btn-cancel" onClick={() => navigate('/')}>
                Cancel
              </button>
              <button type="submit" className="btn-submit">
                {id ? 'Save changes' : 'Add to collection'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookForm;
