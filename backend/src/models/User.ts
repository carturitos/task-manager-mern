import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  nombre: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    nombre: {
      type: String,
      required: [true, 'Por favor ingresa tu nombre'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Por favor ingresa tu email'],
      unique: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingresa un email válido'],
    },
    password: {
      type: String,
      required: [true, 'Por favor ingresa una contraseña'],
      minlength: 6,
      select: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
