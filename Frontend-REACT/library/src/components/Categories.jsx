import React, { useState, useEffect } from 'react';
import BookService from '../services/BookService';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => { loadCategories(); }, []);

  const loadCategories = async () => {
    try {
      const res = await BookService.getCategories();
      setCategories(res.data);
    } catch (err) {
      console.error('Could not load categories', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const categoryData = { name: categoryName };
      if (editId) await BookService.updateCategory(editId, categoryData);
      else await BookService.createCategory(categoryData);
      setCategoryName('');
      setEditId(null);
      loadCategories();
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  const handleEdit = (category) => {
    setEditId(category.id);
    setCategoryName(category.name || category.nom);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this category?')) {
      await BookService.deleteCategory(id);
      loadCategories();
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setCategoryName('');
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Categories</h1>
      </div>

      <div className="manager-layout">
        <div className="manager-form-card">
          <h2 className="manager-form-title">{editId ? 'Edit category' : 'Add new category'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="field-label">Category name</label>
              <input
                className="field-input"
                type="text"
                placeholder="e.g. Science Fiction"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '1rem' }}>
              <button type="submit" className="btn-submit" style={{ flex: 1 }}>
                {editId ? 'Save changes' : 'Add category'}
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
                <th>ID</th>
                <th>Category</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="td-muted">#{category.id}</td>
                  <td>{category.name || category.nom}</td>
                  <td>
                    <div className="table-actions">
                      <button className="btn-table-edit" onClick={() => handleEdit(category)}>Edit</button>
                      <button className="btn-table-delete" onClick={() => handleDelete(category.id)}>Delete</button>
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

export default Categories;
