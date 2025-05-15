require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react']
});

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { StaticRouter } = require('react-router-dom/dist/server');
require('dotenv').config();

// Database connection with debug logging
const connectDB = require('./db');

// Routes
const itemRoutes = require('./routes/itemRoutes');

// React App component
const App = require('../client/App').default;

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', '..', 'public')));

// Configure file upload with multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '..', '..', 'public', 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// API Routes
app.use('/api/items', itemRoutes);

// Server-side rendering middleware
app.get('*', (req, res) => {
  const context = {};
  // Use React.createElement instead of JSX
  const content = ReactDOMServer.renderToString(
    React.createElement(
      StaticRouter,
      { location: req.url, context },
      React.createElement(App)
    )
  );

  // If StaticRouter redirected
  if (context.url) {
    return res.redirect(301, context.url);
  }

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Shop Registration SSR App</title>
      <link rel="stylesheet" href="/css/style.css">
    </head>
    <body>
      <div id="root">${content}</div>
      <script src="/js/bundle.js"></script>
    </body>
    </html>
  `;

  res.send(html);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).send({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
  });
});

module.exports = app;
