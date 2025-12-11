const express = require('express');
const authController = require('../controllers/auth.controller');
const validate = require('../middleware/validationMiddleware');
const { registerSchema, loginSchema } = require('../validators/authValidator');

const router = express.Router();

// POST /auth/register - Register new user
router.post('/register', validate(registerSchema), authController.register);

// POST /auth/login - Login user
router.post('/login', validate(loginSchema), authController.login);

module.exports = router;
