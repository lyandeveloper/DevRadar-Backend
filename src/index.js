import express from 'express';
import mongoose from 'mongoose';

mongoose.connect(
  'mongodb+srv://omnistack:admin@cluster0-3vuws.mongodb.net/week10?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const app = express();

app.use(express.json());

app.post('/users', (req, res) => {
  return res.json({ message: 'Hello World' });
});

app.listen(3333);
