const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const ThermalPrinter = require("node-thermal-printer").printer;
const Types = require("node-thermal-printer").types;

let printer = new ThermalPrinter({
  type: Types.BROTHER,   // Set type to BROTHER
  interface: 'tcp://localhost',  // This needs to be adjusted based on your printer's connection. If it's USB, you might need another method to communicate.
  options: {
    timeout: 1000
  },
  width: 62,    // The Brother QL-800 has a max print width of 62mm
//  characterSet: 'SCHARSET_USA'
});

const printToLabelPrinter = async (content) => {
  let isConnected = await printer.isPrinterConnected();
  if (!isConnected) {
    throw new Error("Printer not connected");
  }

  printer.setTextDoubleHeight();
  printer.setTextDoubleWidth();
  printer.println(content);
  printer.cut();

  let execute = await printer.execute();
  console.log("Print done:", execute);
};


// Use the cors middleware and allow all origins
app.use(cors());

app.use(express.json());

app.post('/print', async (req, res) => {
  const { content } = req.body;

  try {
    await printToLabelPrinter(content);  // Print once
    await printToLabelPrinter(content);  // Print second copy
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

