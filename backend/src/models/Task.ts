import mongoose, { Schema, Document, Types } from 'mongoose';

interface ITask extends Document {
  titulo: string;
  descripcion?: string;
  completada: boolean;
  prioridad: 'baja' | 'media' | 'alta';
  usuario: Types.ObjectId;
  fechaVencimiento?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    titulo: {
      type: String,
      required: [true, 'Por favor ingresa un título'],
      trim: true,
    },
    descripcion: {
      type: String,
      trim: true,
    },
    completada: {
      type: Boolean,
      default: false,
    },
    prioridad: {
      type: String,
      enum: ['baja', 'media', 'alta'],
      default: 'media',
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fechaVencimiento: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;
