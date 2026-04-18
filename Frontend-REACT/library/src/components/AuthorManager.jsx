import React, { useState, useEffect } from 'react';
import BookService from '../services/BookService';

const AuthorManager = () => {
  const [authors, setAuthors] = useState([]);
  const [form, setForm] = useState({ nom: '', prenom: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => { loadAuthors(); }, []);

  const loadAuthors = async () => {
    const res = await BookService.getAuthors();
    setAuthors(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) await BookService.updateAuthor(editId, form);
    else await BookService.createAuthor(form);
    setForm({ nom: '', prenom: '' });
    setEditId(null);
    loadAuthors();
  };

  const handleEdit = (a) => {
    setForm(a);
    setEditId(a.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this author?')) {
      await BookService.deleteAuthor(id);
      loadAuthors();
    }
  };
  
  const handleCancel = () => {
    setForm({ nom: '', prenom: '' });
    setEditId(null);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Authors</h1>
      </div>

      <div className="manager-layout">
        <div className="manager-form-card">
          <h2 className="manager-form-title">{editId ? 'Edit author' : 'Add new author'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="field-label">First name</label>
              <input
                className="field-input"
                type="text"
                placeholder="e.g. Patrick"
                value={form.prenom}
                onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                required
              />
            </div>
            <div className="field">
              <label className="field-label">Last name</label>
              <input
                className="field-input"
                type="text"
                placeholder="e.g. Rothfuss"
                value={form.nom}
                onChange={(e) => setForm({ ...form, nom: e.target.value })}
                required
              />
            </div>         
            <div style={{ display: 'flex', gap: '8px', marginTop: '1rem' }}>
              <button type="submit" className="btn-submit" style={{ flex: 1 }}>
                {editId ? 'Save changes' : 'Add author'}
              </button>
              {editId && (
                <button type="button" className="btn-cancel" onClick={handleCancel}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="manager-table-wrap">
          <table className="manager-table">
            <thead>
              <tr>
                
                <th>First name</th>
                <th>Last name</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((a) => (
                <tr key={a.id}>
                  <td>{a.prenom}</td>
                  <td>{a.nom}</td>
                  <td>
                    <div className="table-actions">
                      <button className="btn-table-edit" onClick={() => handleEdit(a)}>Edit</button>
                      <button className="btn-table-delete" onClick={() => handleDelete(a.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuthorManager;
