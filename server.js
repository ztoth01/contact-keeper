const express = require('express');
const fileupload = require('express-fileupload');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();


// Init middlewears
app.use(fileupload());
app.use(express.json({ limit: '10mb', extended: true }));

// Enable upload folder by making it static
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => res.json({ msg: 'Welcome to the ContactKeeper API' }));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));