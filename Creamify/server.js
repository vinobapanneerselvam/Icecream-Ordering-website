const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;


app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',       
  password: 'vinoba@3002',       
  database: 'creamify'
});

db.connect((err) => {
  if (err) {
    console.error('❌ DB connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL database');
  }
});

app.post('/api/order', (req, res) => {
  const { name, mobile, address, type, toppings } = req.body;
  const query = 'INSERT INTO orders (name, mobile, address, type, toppings) VALUES (?, ?, ?, ?, ?)';

  db.query(query, [name, mobile, address, type, toppings], (err, result) => {
    if (err) {
      console.error('❌ Error inserting order:', err);
      res.status(500).send('Failed to place order');
    } else {
      console.log('✅ Order placed:', result.insertId);
      res.status(200).send('Order placed successfully');
    }
  });
});



app.get('/api/orders', (req, res) => {
  db.query('SELECT * FROM orders ORDER BY id DESC', (err, results) => {
    if (err) {
      console.error('❌ Error fetching orders:', err);
      res.status(500).send('Failed to fetch orders');
    } else {
      res.json(results);
    }
  });
});


app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
