const jwt = require('jsonwebtoken');
const db = require('../models/db');
const SECRET = '96f83da51ff7f9779a78b8533b5e5d6bc28a07943c56eff09e7433db3ba9e26b';

const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    
    // Check if any required field is missing
    if (!name || !email || !password) {
      return res.status(400).send('All fields (name, email, password) are required');
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
      
      db.query(sql, [name, email, hashedPassword], (err, result) => {
        if (err) {
          console.error('Database error:', err);  // Log detailed error
          return res.status(400).send('Error during user registration');
        }
        res.send('User Registered');
      });
    } catch (error) {
      console.error('Error during hashing password or other processing:', error);  // Log error details
      res.status(500).send('Unexpected error occurred during registration');
    }
  };
  
  

exports.login = (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) return res.status(404).send('User Not Found');
    
    const user = results[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid Password');
    
    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
};
