const fetch = require('node-fetch');

const printContent = 'Hello, World!';

fetch('http://localhost:3001/print', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ content: printContent }),
})
  .then(response => {
    if (!response.ok) {
      return response.json().then(data => {
        throw new Error(data.message || 'Error printing label');
      });
    }
    console.log('Label printed');
  })
  .catch(error => {
    console.error(error.message || 'Error printing label');
  });

