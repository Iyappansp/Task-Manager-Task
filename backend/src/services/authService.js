const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET, JWT_EXPIRE } = require('../config/env');

class AuthService {
  // Register new user
  async register(userData) {
    const { name, email, password } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = this.generateToken(user._id);

    return {
      user: user.toJSON(),
      token,
    };
  }

  // Login user
  async login(credentials) {
    const { email, password } = credentials;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate token
    const token = this.generateToken(user._id);

    return {
      user: user.toJSON(),
      token,
    };
  }

  // Generate JWT token
  generateToken(userId) {
    return jwt.sign({ userId }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });
  }
}

module.exports = new AuthService();
