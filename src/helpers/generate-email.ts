import { Request, Response } from 'express';
const nodemailer = require('nodemailer');

export const generateEmail = async (token: any, email: any, req: Request, res: Response) => {
    try {
        if (email) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.KEY_EMAIL
                }
            });
            const mailOptions = {

                from: process.env.EMAIL,
                to: email,
                subject: 'Recuperación de contraseña',
                text: `http://${req.headers.host}/reset/reset-password/${token}`
            };

            transporter.sendMail(mailOptions, (error: any, info: any) => {
                if (error) {
                    console.error('Error al enviar el correo:', error);
                    return res.status(500).json({ message: 'Error al enviar el correo' });
                } else {
                    console.log('Correo electrónico enviado:', info.response);
                    return res.status(200).json({ message: 'Correo electrónico enviado correctamente' });
                }
            });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const emailConfirmation = async (email: any, req: Request, res: Response) => {
    try {
        if (email) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.KEY_EMAIL
                }
            });
            const mailOptions = {

                from: process.env.EMAIL,
                to: email,
                subject: 'Actualizacion de Contraseña',
                text: 'Exitoso Cambio De Contraseña'
            };

            transporter.sendMail(mailOptions, (error: any, info: any) => {
                if (error) {
                    console.error('Error al enviar el correo:', error);
                    return res.status(500).json({ message: 'Error al enviar el correo' });
                } else {
                    console.log('Correo electrónico enviado:', info.response);
                    return res.status(200).json({ message: 'Correo electrónico enviado correctamente' });
                }
            });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const generateWelcomeEmail = async (email: string, username: string, req: any, res: any) => {
    try {
        if (email) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.KEY_EMAIL
                }
            });
            const mailOptions = {

                from: process.env.EMAIL,
                to: email,
                subject: 'Bienvenido a ProveerTen',
                html: `
                    <p>¡Hola ${username}!</p>
                    <p>Bienvenido a nuestra plataforma. Agradecemos tu registro y esperamos que disfrutes de nuestros servicios.</p>
                    <p>Gracias,</p>
                    <p>Equipo de la Plataforma</p>
                `
            };

            transporter.sendMail(mailOptions, (error: any, info: any) => {
                if (error) {
                    console.error('Error al enviar el correo:', error);
                    return res.status(500).json({ message: 'Error al enviar el correo' });
                } else {
                    console.log('Correo electrónico enviado:', info.response);
                    return res.status(200).json({ message: 'Correo electrónico enviado correctamente' });
                }
            });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}
