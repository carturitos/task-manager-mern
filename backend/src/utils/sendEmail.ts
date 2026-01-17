import nodemailer from 'nodemailer';

interface EmailOptions {
    email: string;
    subject: string;
    message: string;
}

const sendEmail = async (options: EmailOptions): Promise<void> => {
    try {
        // Configurar transporter con Gmail
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true para port 465, false para otros puertos
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD, // App Password de Gmail
            },
        });

        // Opciones del mensaje
        const mailOptions = {
            from: `Task Manager <${process.env.SMTP_EMAIL}>`,
            to: options.email,
            subject: options.subject,
            text: options.message,
        };

        // Enviar email
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email enviado exitosamente:', info.messageId);
    } catch (error) {
        console.error('❌ Error detallado al enviar email:', error);
        throw error;
    }
};

export default sendEmail;
