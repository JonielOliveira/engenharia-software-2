const jwt = require('jsonwebtoken');

// Middleware para autorizar pelo `role`
const authorizeRole = (role) => {
  return (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(403).json({ message: 'Acesso negado' });

    try {
      // Decodifique o token para obter o payload (incluindo o role)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Verifique se o `role` do usuário corresponde ao `role` exigido
      if (decoded.role !== role) {
        return res.status(403).json({ message: 'Acesso negado' });
      }

      // Armazene o payload no `req.user` e prossiga
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).json({ message: 'Token inválido' });
    }
  };
};

module.exports = authorizeRole;
