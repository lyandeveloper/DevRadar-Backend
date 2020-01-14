import express from 'express';

const app = express();

app.use(express.json());

app.post('/users', (req, res) => {
  return res.json({ message: 'Hello World' });
});

app.listen(3333);
