const express = require('express');
const router = express.Router();
const db = require('../db');

// Ruta para obtener todos los posts
router.get('/', (req, res) => {
    const sql = `
        SELECT posts.*, autores.nombre, autores.email, autores.imagen
        FROM posts 
        JOIN autores ON posts.autor_id = autores.id
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener los posts:', err.message);
            return res.status(500).json({ error: 'Error al obtener los posts' });
        }
        res.json(results);
    });

});

// Ruta para obtener un post específico por su ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT posts.*, autores.nombre, autores.email, autores.imagen
        FROM posts 
        JOIN autores ON posts.autor_id = autores.id
        WHERE posts.id = ?
    `;
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener el post:', err.message);
            return res.status(500).json({ error: 'Error al obtener el post' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }
        res.json(results[0]);
    });
});

// Ruta para crear un nuevo post
router.post('/', (req, res) => {
    const { titulo, descripcion, fecha_creacion, categoria, autor_id } = req.body;
    const sql = `
        INSERT INTO posts (titulo, descripcion, fecha_creacion, categoria, autor_id)
        VALUES (?, ?, ?, ?, ?)
    `;
    db.query(sql, [titulo, descripcion, fecha_creacion, categoria, autor_id], (err, result) => {
        if (err) {
            console.error('Error al crear el post:', err.message);
            return res.status(500).json({ error: 'Error al crear el post' });
        }
        res.status(201).json({ message: 'Post creado', postId: result.insertId });
    });

});

// Ruta para actualizar un post por su ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, categoria } = req.body;
    const sql = `
        UPDATE posts
        SET titulo = ?, descripcion = ?, categoria = ?
        WHERE id = ?
    `;
    db.query(sql, [titulo, descripcion, categoria, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar el post:', err.message);
            return res.status(500).json({ error: 'Error al actualizar el post' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }
        res.json({ message: 'Post actualizado' });
    });
});

// Ruta para eliminar un post por su ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM posts WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar el post:', err.message);
            return res.status(500).json({ error: 'Error al eliminar el post' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }
        res.json({ message: 'Post eliminado' });
    });
});

module.exports = router;