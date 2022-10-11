import { connect } from 'mongoose';

const connection: any = {};

async function dbConnect() {
  if (connection.isConnected) return;

  const db: any = await connect(process.env.MONGO_URI!);

  connection.isConnected = db.connection[0].readyState;
  console.log(connection.isConnected);
}

export default dbConnect;
