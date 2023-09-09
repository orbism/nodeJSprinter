// server.js
const express = require('express');
const cors = require('cors');
const printer = require('printer');
const app = express();
const port = 3001;

const printToLabelPrinter = (content) => {
  try {
    // Assuming content is directly printable, but you might need to adapt depending on data type/format
    printer.printDirect({
      data: content,
      printer: 'Brother QL-800',  // Explicitly specify the printer name
      type: 'RAW', // Send raw data to printer
      success: function(jobID) {
        console.log(`Sent to printer with ID: ${jobID}`);
      },
      error: function(err) {
        throw err;
      }
    });
  } catch (error) {
    console.error('Failed to print', error);
    throw error;
  }
};

// Use the cors middleware and allow all origins
app.use(cors());

app.use(express.json());

app.post('/print', (req, res) => {
  const { content } = req.body;

  try {
    printToLabelPrinter(content);  // Print once
    printToLabelPrinter(content);  // Print second copy

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

