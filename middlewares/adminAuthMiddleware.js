// adminAuthMiddleware.js
const jwt = require('jsonwebtoken'); 
const { pool } = require('../db'); 

const adminAuthMiddleware = async (req, res, next) => {
  try {
  
    const token1 = req.cookies.token
    if (!token1) {
      return res.redirect('/not-allowed'); 
    }


    const decodedToken = jwt.verify(token1, process.env.JWT_SECRET_KEY);
    req.user = decodedToken;

    const userQuery = await pool.query('SELECT email FROM users WHERE id = $1', [req.user.id]);
    const user = userQuery.rows[0];

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
      return res.redirect('/not-allowed'); 
    }

    next(); 
  } catch (error) {
    console.error('Authentication error:', error);
    res.redirect('/not-allowed'); 
  }
};

module.exports = adminAuthMiddleware;
