import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User';
import sendEmail from '../utils/sendEmail';

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

// Solicitar recuperación de contraseña
export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'No existe un usuario con ese email' });
      return;
    }

    // Generar token de reset
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash del token y guardarlo en la base de datos
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos
    await user.save();

    // Crear URL de reset
    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

    const message = `Has solicitado recuperar tu contraseña. Por favor haz clic en el siguiente enlace para continuar:\n\n${resetUrl}\n\nEste enlace expirará en 10 minutos.\n\nSi no solicitaste esto, por favor ignora este correo.`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Recuperación de Contraseña - Task Manager',
        message,
      });

      res.status(200).json({ message: 'Email de recuperación enviado' });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      res.status(500).json({ message: 'Error al enviar el email' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

// Resetear contraseña
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const resettoken = req.params.resettoken as string;
    const { password } = req.body;

    // Hash del token recibido
    const hashedToken = crypto.createHash('sha256').update(resettoken).digest('hex');

    // Buscar usuario con el token y que no haya expirado
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400).json({ message: 'Token inválido o expirado' });
      return;
    }

    // Hash de nueva contraseña
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};
