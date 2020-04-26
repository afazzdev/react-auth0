const express = require('express');
require('dotenv').config();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
const checkScope = require('express-jwt-authz');

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
});

const app = express();

function checkRole(role) {
  return function (req, res, next) {
    const assignedRoles = req.user['http://localhost:3000/roles'];
    if (Array.isArray(assignedRoles) && assignedRoles.includes(role)) {
      return next();
    } else {
      return res.status(401).send('Insufficient role');
    }
  };
}

app.get('/public', function (req, res) {
  res.json({
    message: 'Hello from public API',
  });
});

app.get('/private', jwtCheck, function (req, res) {
  res.json({
    message: 'Hello from Private API',
  });
});

app.get('/courses', jwtCheck, checkScope(['read:courses']), function (
  req,
  res
) {
  res.json({
    courses: [
      { id: 1, title: 'Building apps with react and redux' },
      { id: 2, title: 'Creating Reusable react components' },
    ],
  });
});

app.get('/admin', jwtCheck, checkRole('admin'), function (req, res) {
  res.json({
    message: 'Hello from Admin API',
  });
});

app.listen(3001, () => {
  console.log(`listening on : ${process.env.REACT_APP_AUTH0_AUDIENCE}`);
});
