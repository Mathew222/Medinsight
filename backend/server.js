const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: String,
    personalInfo: {
        dateOfBirth: String,
        age: Number,
        gender: String,
        bloodType: String,
    },
    contactInfo: {
        phone: String,
        address: String,
        emergencyContact: String,
    },
});

const User = mongoose.model('User', userSchema);

// Get User Data
app.get('/api/user', async (req, res) => {
    try {
        const user = await User.findOne({ id: '1' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// Save or Update User Data
app.post('/api/user', async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { id: '1' },
            req.body,
            { new: true, upsert: true }
        );
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
