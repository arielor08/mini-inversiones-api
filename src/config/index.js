module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'secret123',
  env: process.env.NODE_ENV || 'development'
};
