const express = require('express');
const path = require('path');

const app = express();
const PORT = 80;

// Serve static files (HTML, CSS, JS) from the current directory
app.use(express.static(__dirname));

// Route to serve main.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'main.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
