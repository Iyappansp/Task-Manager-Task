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

    console.log('🔐 Login attempt:');
    console.log('  Email received:', email);
    console.log('  Email length:', email?.length);
    console.log('  Password received:', password);
    console.log('  Password length:', password?.length);

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found for email:', email);
      throw new Error('Invalid email or password');
    }

    console.log('✅ User found:', user.email);
    console.log('  Stored hash:', user.password);

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    console.log('🔍 Password comparison result:', isPasswordValid);
    
    if (!isPasswordValid) {
      console.log('❌ Password does not match');
      throw new Error('Invalid email or password');
    }

    console.log('✅ Login successful');

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
