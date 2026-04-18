import apiClient from '../apiClient';

const BookService = {
    // Books
    getAllBooks: () => apiClient.get('/livres'),
    getBookById: (id) => apiClient.get(`/livres/${id}`),
    getBooksByAuteur: (id) => apiClient.get(`/livres/auteur/${id}`),
    getBooksByCategorie: (id) => apiClient.get(`/livres/categorie/${id}`),
    getBooksByEditeur: (id) => apiClient.get(`/livres/editeur/${id}`),
    createBook: (formData) => apiClient.post('/livres', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
    updateBook: (id, data) => apiClient.put(`/livres/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
    deleteBook: (id) => apiClient.delete(`/livres/${id}`),
    // Editors
       getEditeurs: () => apiClient.get('/editeurs'),
    createEditeur: (data) => apiClient.post('/editeurs', data),
    updateEditeur: (id, data) => apiClient.put(`/editeurs/${id}`, data),
    deleteEditeur: (id) => apiClient.delete(`/editeurs/${id}`),
    // Authors
       getAuthors: () => apiClient.get('/auteurs'),
    getAuthorById: (id) => apiClient.get(`/auteurs/${id}`),
    createAuthor: (data) => apiClient.post('/auteurs', data ),
    updateAuthor: (id, data) => apiClient.put(`/auteurs/${id}`, data ),
    deleteAuthor: (id) => apiClient.delete(`/auteurs/${id}`),
    // Categories
     getCategories: () => apiClient.get('/categories'),
    createCategory: (data) => apiClient.post('/categories', data),
    updateCategory: (id, data) => apiClient.put(`/categories/${id}`, data),
    deleteCategory: (id) => apiClient.delete(`/categories/${id}`),
};

export default BookService;