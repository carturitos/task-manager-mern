import { Request, Response } from 'express';
import Task from '../models/Task';

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { titulo, descripcion, prioridad, fechaVencimiento } = req.body;
    const userId = (req as any).userId;

    const task = await Task.create({
      titulo,
      descripcion,
      prioridad,
      fechaVencimiento,
      usuario: userId,
    });

    res.status(201).json({
      message: 'Tarea creada exitosamente',
      task,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).userId;
    const tasks = await Task.find({ usuario: userId }).populate('usuario', 'nombre email');

    res.status(200).json(tasks);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    const task = await Task.findById(id).populate('usuario', 'nombre email');
    if (!task) {
      res.status(404).json({ message: 'Tarea no encontrada' });
      return;
    }

    if (task.usuario.toString() !== userId) {
      res.status(403).json({ message: 'No tienes permiso para acceder a esta tarea' });
      return;
    }

    res.status(200).json(task);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;
    const updateData = req.body;

    const task = await Task.findById(id);
    if (!task) {
      res.status(404).json({ message: 'Tarea no encontrada' });
      return;
    }

    if (task.usuario.toString() !== userId) {
      res.status(403).json({ message: 'No tienes permiso para actualizar esta tarea' });
      return;
    }

    const updatedTask = await Task.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({
      message: 'Tarea actualizada exitosamente',
      task: updatedTask,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    const task = await Task.findById(id);
    if (!task) {
      res.status(404).json({ message: 'Tarea no encontrada' });
      return;
    }

    if (task.usuario.toString() !== userId) {
      res.status(403).json({ message: 'No tienes permiso para eliminar esta tarea' });
      return;
    }

    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: 'Tarea eliminada exitosamente' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};
