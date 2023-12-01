const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    var decoded = jwt.verify(token, process.env.JWT_KEY);
  } catch (err) {
    return res.status(401).json({ wiadomosc: 'Błąd autoryzacji' });
  }
  next();
};
