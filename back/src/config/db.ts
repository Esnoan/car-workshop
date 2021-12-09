import { connect } from 'mongoose';

const dbConnect = async () => {
  const dbUri = process.env.MONGODB_URI ?? '';

  const mongoose = await connect(dbUri);
  mongoose.connection.on(
    'error',
    console.error.bind(console, 'connection error:')
  );
  mongoose.connection.on(
    'connected',
    console.log.bind(console, 'connection success:')
  );
};

export default dbConnect;
