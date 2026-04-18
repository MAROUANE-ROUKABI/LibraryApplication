import React, { useState, useEffect } from 'react';
import BookService from '../services/BookService';

const EditorManager = () => {
  const [editors, setEditors] = useState([]);
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ street: '', city: '', zipCode: '', country: '' });

  useEffect(() => { load(); }, []);

  const load = async () => {
    const res = await BookService.getEditeurs();
    setEditors(res.data);
  };

  const save = async (e) => {
    e.preventDefault();

    const payload = {
      nom: name,
      address: {
        street: form.street,
        city: form.city,
        zipCode: form.zipCode,
        country: form.country
      }
    };

    if (editId) {
      await BookService.updateEditeur(editId, payload);
    } else {
      await BookService.createEditeur(payload);
    }

    // reset form
    setName('');
    setForm({ street: '', city: '', zipCode: '', country: '' });
    setEditId(null);
    load();
  };

  const handleCancel = () => {
    setName('');
    setForm({ street: '', city: '', zipCode: '', country: '' });
    setEditId(null);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Publishers</h1>
      </div>

      <div className="manager-layout">
        <div className="manager-form-card">
          <h2 className="manager-form-title">{editId ? 'Edit publisher' : 'Add new publisher'}</h2>
          <form onSubmit={save}>
            <div className="field">
              <label className="field-label">Publisher name</label>
              <input
                className="field-input"
                type="text"
                placeholder="e.g. Penguin Books"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label className="field-label">Street</label>
              <input className="field-input" type="text" placeholder="e.g. 123 Main St"
                value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} />
            </div>

            <div className="field">
              <label className="field-label">City</label>
              <input className="field-input" type="text" placeholder="e.g. London"
                value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            </div>

            <div className="field-row cols-2">
              <div>
                <label className="field-label">Zip code</label>
                <input className="field-input" type="text" placeholder="e.g. SW1A 1AA"
                  value={form.zipCode} onChange={(e) => setForm({ ...form, zipCode: e.target.value })} />
              </div>
              <div>
                <label className="field-label">Country</label>
                <input className="field-input" type="text" placeholder="e.g. United Kingdom"
                  value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '1rem' }}>
              <button type="submit" className="btn-submit" style={{ flex: 1 }}>
                {editId ? 'Save changes' : 'Add publisher'}
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
                <th>Publisher name</th>
                <th>Address</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {editors.map((ed) => (
                <tr key={ed.id}>
                  <td>{ed.nom}</td>
                  <td className="td-muted">
                    {[
                      ed.address?.street,
                      ed.address?.city,
                      ed.address?.zipCode,
                      ed.address?.country
                    ].filter(Boolean).join(', ') || '—'}
                  </td>

                  <td>
                    <div className="table-actions">
                      <button
                        className="btn-table-edit"
                        onClick={() => {
                          setName(ed.nom);
                          setEditId(ed.id);

                          setForm({
                            street: ed.address?.street || '',
                            city: ed.address?.city || '',
                            zipCode: ed.address?.zipCode || '',
                            country: ed.address?.country || ''
                          });
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="btn-table-delete"
                        onClick={() => BookService.deleteEditeur(ed.id).then(load)}
                      >
                        Delete
                      </button>
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

export default EditorManager;