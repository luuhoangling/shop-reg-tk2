# Shop Registration App

An Express.js and React SSR application with MongoDB Atlas integration for managing shop items.

## Features

- Server-Side Rendering (SSR) with React and Express.js
- MongoDB Atlas connection with detailed logging
- Upload functionality for item information and images
- CRUD operations for items
- Responsive design

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB Atlas account

## Setup

1. Clone this repository

   ```
   git clone [your-repository-url]
   cd shop-reg-tk2
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   PORT=3000
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database-name>?retryWrites=true&w=majority
   NODE_ENV=development
   ```
   Replace `<username>`, `<password>`, `<cluster>` and `<database-name>` with your MongoDB Atlas credentials.

## MongoDB Atlas Setup

1. Sign up for an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (you can use the free tier)
3. Create a database user in the "Database Access" section with readWrite permissions
4. In the "Network Access" section, add your IP address or allow all IPs (0.0.0.0/0)
5. Get the connection string from the "Connect" button on your cluster and update it in the `.env` file

## Building and Running the Application

### Development Mode

1. Build the client-side bundle:

   ```
   npm run build
   ```

2. Run the application in development mode (with hot-reload):

   ```
   npm run dev
   ```

   Or use the combined script to build and run at once:

   ```
   npm run build && npm run dev
   ```

### Production Mode

1. Build the optimized client-side bundle:

   ```
   npm run build
   ```

2. Run the application in production mode:
   ```
   npm start
   ```

The application will be available at `http://localhost:3000` (or the port you've configured in the `.env` file).

## Project Structure

```
shop-reg-tk2/
├── public/               # Static files
│   ├── css/              # CSS styles
│   ├── js/               # Compiled JavaScript bundle
│   └── uploads/          # Uploaded images
├── src/
│   ├── client/           # React client-side code
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── App.js        # Main React component
│   │   └── index.js      # Client entry point
│   ├── models/           # MongoDB models
│   ├── server/           # Express.js server code
│   │   ├── routes/       # API routes
│   │   ├── db.js         # MongoDB connection
│   │   └── index.js      # Server entry point
│   └── views/            # Server-side view templates
├── .env                  # Environment variables
├── .gitignore            # Git ignore configuration
├── .babelrc              # Babel configuration
├── package.json          # Project dependencies
├── README.md             # Project documentation
└── webpack.config.js     # Webpack configuration
```

## API Endpoints

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| GET    | /api/items     | Get all items     |
| GET    | /api/items/:id | Get an item by ID |
| POST   | /api/items     | Create a new item |
| PUT    | /api/items/:id | Update an item    |
| DELETE | /api/items/:id | Delete an item    |

## Available Scripts

- `npm start`: Run the application in production mode
- `npm run dev`: Run the application in development mode with nodemon (auto-reload)
- `npm run build`: Build the client-side bundle using webpack
- `npm run build:dev`: Build the client-side bundle in development mode with watch mode

## Troubleshooting

If you encounter issues:

1. **MongoDB Connection Errors**: Check your connection string in the `.env` file and user access permissions
2. **Port Conflicts**: Change the port in the `.env` file if the default port is already in use
3. **Application Crashes**: Check the logs and ensure all dependencies are correctly installed

## License

ISC

```
npm run build
```

## Running the Application

For development with hot-reloading:

```
npm run dev
```

For production:

```
npm start
## License

ISC

```

shop-reg-tk2/
├── public/ # Static files
│ ├── css/ # CSS styles
│ ├── js/ # Compiled JavaScript bundle
│ └── uploads/ # Uploaded images
├── src/
│ ├── client/ # React client-side code
│ │ ├── components/ # Reusable components
│ │ ├── pages/ # Page components
│ │ ├── App.js # Main React component
│ │ └── index.js # Client entry point
│ ├── models/ # MongoDB models
│ ├── server/ # Express.js server code
│ │ ├── routes/ # API routes
│ │ ├── db.js # MongoDB connection
│ │ └── index.js # Server entry point
│ └── views/ # Server-side view templates
├── .babelrc # Babel configuration
├── .env # Environment variables
├── package.json # Project dependencies
├── README.md # Project documentation
└── webpack.config.js # Webpack configuration

```

## API Endpoints

| Method | Endpoint     | Description         |
|--------|--------------|---------------------|
| GET    | /api/items   | Get all items       |
| GET    | /api/items/:id | Get an item by ID |
| POST   | /api/items   | Create a new item   |
| PUT    | /api/items/:id | Update an item    |
| DELETE | /api/items/:id | Delete an item    |

## License

ISC
```
