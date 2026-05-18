const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (your HTML, CSS)
app.use(express.static('public'));

// Store members in memory (for free tier)
// For production, use MongoDB Atlas (I'll show you)
let members = [];
let nextId = 1;

// API Routes
app.get('/api/members/count', (req, res) => {
    res.json({ count: members.length });
});

app.get('/api/members/all', (req, res) => {
    res.json({ members, total: members.length });
});

app.post('/api/members/register', (req, res) => {
    const { firstName, lastName, email, dateOfBirth, gender, phone } = req.body;
    
    // Validation
    if (!firstName || !lastName || !email || !dateOfBirth || !gender) {
        return res.status(400).json({ message: 'All required fields must be filled' });
    }
    
    // Check duplicate email
    if (members.find(m => m.email === email)) {
        return res.status(400).json({ message: 'Email already registered' });
    }
    
    // Create new member
    const newMember = {
        id: nextId++,
        firstName,
        lastName,
        email,
        dateOfBirth,
        gender,
        phone: phone || '',
        registeredAt: new Date(),
        memberId: `KCG${String(nextId).padStart(4, '0')}`
    };
    
    members.push(newMember);
    
    res.json({
        success: true,
        message: 'Registration successful!',
        totalMembers: members.length,
        member: newMember
    });
});

// Serve your HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌐 http://localhost:${PORT}`);
});