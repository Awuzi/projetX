const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.params.token
  if (token == null) return res.send("invalid token");
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  })
};
