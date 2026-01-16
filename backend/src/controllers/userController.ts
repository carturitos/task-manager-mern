import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, email, password } = req.body;

    // Validar que no exista el usuario
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'El usuario ya existe' });
      return;
    }

    // Hash de contraseña
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Crear usuario
    const user = await User.create({
      nombre,
      email,
      password: hashedPassword,
    });

    // Generar token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user: { id: user._id, nombre: user.nombre, email: user.email },
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validar que exista el usuario
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      res.status(401).json({ message: 'Credenciales inválidas' });
      return;
    }

    // Validar contraseña
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Credenciales inválidas' });
      return;
    }

    // Generar token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Sesión iniciada',
      token,
      user: { id: user._id, nombre: user.nombre, email: user.email },
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById((req as any).userId);
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};
