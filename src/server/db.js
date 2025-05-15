const mongoose = require('mongoose');
require('dotenv').config();

// Debug logging for MongoDB connection
const connectDB = async () => {
  try {
    console.log('MongoDB: Attempting to connect to MongoDB Atlas...');
    console.log(`MongoDB: Using connection string: ${process.env.MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')}`);
    
    await mongoose.connect(process.env.MONGODB_URI, {
      // Added connection options for better resilience
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      retryReads: true
    });
    
    console.log('MongoDB: Connection successful!');
    
    // Add connection event listeners for more detailed debugging
    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB: Connection error: ${err.message}`);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB: Connection disconnected');
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB: Connection reconnected');
    });
    
    return mongoose.connection;  } catch (error) {
    console.error(`MongoDB: Connection error: ${error.message}`);
    
    // Provide more specific guidance based on error type
    if (error.message.includes('bad auth')) {
      console.error('MongoDB: Authentication failed. Please check your username and password in the .env file.');
      console.error('MongoDB: If you need to create a new database user:');
      console.error('MongoDB: 1. Go to MongoDB Atlas at https://cloud.mongodb.com/');
      console.error('MongoDB: 2. Select your cluster "shopmmo"');
      console.error('MongoDB: 3. Go to "Database Access" under Security');
      console.error('MongoDB: 4. Create a new user with appropriate permissions');
    } else if (error.message.includes('ENOTFOUND')) {
      console.error('MongoDB: Could not resolve the hostname. Please check your cluster name in the connection string.');
    } else if (error.message.includes('timed out')) {
      console.error('MongoDB: Connection timed out. Please check your network settings and firewall rules.');
    }
    
    console.log('MongoDB: Application will continue to run without database functionality.');
    return null;
  }
};

module.exports = connectDB;

module.exports = connectDB;
