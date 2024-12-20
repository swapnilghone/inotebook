const connectToMongo = require("./db");
const express = require('express');
const cors = require('cors');

connectToMongo();
const app = express();
app.use(cors());
const port = process.env.PORT

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Jai Bhim.....')
})

// Available routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNotebook app listening on port ${port}`)
})