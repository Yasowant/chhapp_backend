const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import database connection
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const chatRoutes = require('./routes/chatRoutes');
// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Body parser middleware to handle JSON requests

// Test Route
app.get('/', (req, res) => {
  res.send('API is Running');
});

// User Routes
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/messages', messageRoutes);

app.use(notFound);
app.use(errorHandler);

// Define Port
const PORT = process.env.PORT || 5000;

// Start the server with better error handling
const server = app
  .listen(PORT, () =>
    console.log(`🚀 Server is live at: http://localhost:${PORT}`)
  )
  .on('error', (err) => {
    console.error('Server Error:', err);
    process.exit(1);
  });

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000',
    // credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('Connected to socket.io');
  socket.on('setup', (userData) => {
    socket.join(userData._id);
    socket.emit('connected');
  });

  socket.on('join chat', (room) => {
    socket.join(room);
    console.log('User Joined Room: ' + room);
  });
  socket.on('typing', (room) => socket.in(room).emit('typing'));
  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

  socket.on('new message', (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log('chat.users not defined');

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit('message recieved', newMessageRecieved);
    });
  });

  socket.off('setup', () => {
    console.log('USER DISCONNECTED');
    socket.leave(userData._id);
  });
});
