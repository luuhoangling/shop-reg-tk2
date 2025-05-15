# Shop Reg Game TruyKich2 

## Features


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

   None 

## Building and Running the Application

### Development Mode

Build the client-side bundle:

   ```
   npm run build
   ```

Run the application in development mode (with hot-reload):

   ```
   npm run dev
   ```

Open `http://localhost:3000`.
