# Chat Application Backend

This is a backend server for a chat application built using Node.js, Express.js, and MongoDB. It includes authentication with JWT and bcrypt for password hashing.

## Features

- User authentication with JWT (JSON Web Tokens)
- Password hashing using bcrypt
- Real-time chat functionality
- REST API for user and message management
- MongoDB as the database

## Prerequisites

Ensure you have the following installed before proceeding:

- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [MongoDB](https://www.mongodb.com/) (Local or cloud instance)

## Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/chat-app-backend.git
   cd chat-app-backend
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Run the server**
   ```sh
   npm start
   ```
   The server should now be running on `http://localhost:5000`

## Project Structure

```
chat-app-backend/
├── src/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
├── .env
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Contributing

Feel free to fork this repository and make contributions. You can submit a pull request with your changes.


