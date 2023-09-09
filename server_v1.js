// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const printToLabelPrinter = (content) => {
  // Use a package or method that can send content directly to your Brother QL-800.
  // For example, the 'node-thermal-printer' package might be suitable (though you'll need to check compatibility).
  // This is a placeholder, and the actual implementation will depend on the tool or library you choose.
};

// Use the cors middleware and allow all origins
app.use(cors());

app.use(express.json());

app.post('/print', (req, res) => {
  const { content } = req.body;

  try {
    printToLabelPrinter(content); // Print once
    //printToLabelPrinter(content); // Print second copy

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Use the cors middleware and allow all origins
app.use(cors());

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

