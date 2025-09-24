const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/User');
const auth = require('./middleware/auth');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully.'))
    .catch(err => console.error('MongoDB connection error:', err));

// --- AUTH ROUTES ---
app.post('/api/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ msg: 'Please enter all fields' });
        
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: 'User with this email already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ email, password: hashedPassword });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ msg: 'Please enter all fields' });
        
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const payload = { id: user._id, email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'your_default_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- RECIPE ROUTES ---
app.post('/api/recipes/save', auth, async (req, res) => {
    try {
        const { recipeId } = req.body;
        const user = await User.findById(req.user.id);

        if (user.savedRecipes.includes(recipeId)) {
            return res.status(400).json({ msg: 'Recipe already saved' });
        }

        user.savedRecipes.push(recipeId);
        await user.save();
        res.json(user.savedRecipes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/recipes/saved', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user.savedRecipes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});