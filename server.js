const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const crypto = require('crypto');

// const secretKey = crypto.randomBytes(32).toString('hex');
// console.log('Generated Secret Key:', secretKey);
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use('/api/users', userRoutes); // Ensure routes are imported correctly
app.use('/api/posts', postRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
