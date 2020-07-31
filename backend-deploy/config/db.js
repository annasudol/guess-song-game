/* eslint-disable @typescript-eslint/no-var-requires */
const mongoose = require('mongoose');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const connectDB = async () => {
  // eslint-disable-next-line no-undef
  const conn = await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-i8t1t.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });

  console.log(`MangoDB connected: ${conn.connection.host}`);
};

// eslint-disable-next-line no-undef
module.exports = connectDB;
