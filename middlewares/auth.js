const jwt = require('jsonwebtoken');
const SECRET = '96f83da51ff7f9779a78b8533b5e5d6bc28a07943c56eff09e7433db3ba9e26b';

const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('Access Denied');
  
  try {
    const verified = jwt.verify(token, SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

module.exports = authenticate;
