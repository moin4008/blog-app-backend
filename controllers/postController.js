const db = require('../models/db');

exports.createPost = (req, res) => {
  const { title, subtitle, tags, content } = req.body;
  const sql = 'INSERT INTO posts (title, subtitle, tags, content, userId) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [title, subtitle, tags, content, req.user.id], (err, result) => {
    if (err) return res.status(400).send(err);
    res.send('Post Created');
  });
};

exports.updatePost = (req, res) => {
  const { id, title, subtitle, tags, content } = req.body;
  const sql = 'UPDATE posts SET title = ?, subtitle = ?, tags = ?, content = ? WHERE id = ? AND userId = ?';
  db.query(sql, [title, subtitle, tags, content, id, req.user.id], (err) => {
    if (err) return res.status(400).send(err);
    res.send('Post Updated');
  });
};

exports.deletePost = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM posts WHERE id = ? AND userId = ?';
  db.query(sql, [id, req.user.id], (err) => {
    if (err) return res.status(400).send(err);
    res.send('Post Deleted');
  });
};

exports.getAllPosts = (req, res) => {
  const sql = 'SELECT * FROM posts';
  db.query(sql, (err, results) => {
    if (err) return res.status(400).send(err);
    res.json(results);
  });
};

exports.getPost = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM posts WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(400).send(err);
    res.json(results[0]);
  });
};

exports.getPostsByTag = (req, res) => {
  const { tag } = req.params;
  const sql = 'SELECT * FROM posts WHERE tags LIKE ?';
  db.query(sql, [`%${tag}%`], (err, results) => {
    if (err) return res.status(400).send(err);
    res.json(results);
  });
};
