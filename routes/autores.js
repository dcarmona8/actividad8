const express = require('express');
const router = express.Router();
const db = require('../db');  // Importa la conexión a la base de datos

// Ruta para obtener todos los autores
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM autores';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener los autores:', err.message);
            return res.status(500).json({ error: 'Error al obtener los autores' });
        }
        res.json(results);
    });
});

// Ruta para obtener un autor específico por su ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM autores WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener el autor:', err.message);
            return res.status(500).json({ error: 'Error al obtener el autor' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Autor no encontrado' });
        }
        res.json(results[0]);
    });
});

// Ruta para crear un nuevo autor
router.post('/', (req, res) => {
    const { nombre, email, imagen } = req.body;
    const sql = 'INSERT INTO autores (nombre, email, imagen) VALUES (?, ?, ?)';
    db.query(sql, [nombre, email, imagen], (err, result) => {
        if (err) {
            console.error('Error al crear el autor:', err.message);
            return res.status(500).json({ error: 'Error al crear el autor' });
        }
        res.status(201).json({
            message: 'Nuevo autor creado',
            autor: { id: result.insertId, nombre, email, imagen }
        });
    });
});

// Ruta para actualizar un autor por su ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, email, imagen } = req.body;
    const sql = 'UPDATE autores SET nombre = ?, email = ?, imagen = ? WHERE id = ?';
    db.query(sql, [nombre, email, imagen, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar el autor:', err.message);
            return res.status(500).json({ error: 'Error al actualizar el autor' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Autor no encontrado' });
        }
        res.json({ message: 'Autor actualizado' });
    });
});

// Ruta para eliminar un autor por su ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM autores WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar el autor:', err.message);
            return res.status(500).json({ error: 'Error al eliminar el autor' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Autor no encontrado' });
        }
        res.json({ message: 'Autor eliminado' });
    });
});

module.exports = router;
