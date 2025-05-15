// testMongoDB.js
const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    console.log(`Using connection string: ${process.env.MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')}`);
    
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    
    console.log('✅ Connection successful!');
    await mongoose.disconnect();
    console.log('Connection closed.');
  } catch (error) {
    console.error(`❌ Connection error: ${error.message}`);
  }
}

testConnection();
