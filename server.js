require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
app.use(cors());  // 🔗 Izinkan request dari frontend

// Konfigurasi Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Endpoint untuk mengirim email
app.post('/send-email', async (req, res) => {
    const { recipientEmail, description, fileLink } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipientEmail,
        subject: 'Verifikasi Email',
        text: `${description}\n\nKlik link ini untuk verifikasi: ${fileLink}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: 'Email berhasil dikirim!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Gagal mengirim email!' });
    }
});
