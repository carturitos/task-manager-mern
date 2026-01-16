import mongoose from 'mongoose';

const connectDB = async (): Promise<typeof mongoose> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB conectado: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error de conexión: ${error.message}`);
    }
    process.exit(1);
  }
};

export default connectDB;
