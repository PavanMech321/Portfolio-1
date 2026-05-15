const path = require('path');

const express = require('express');
const nodemailer = require('nodemailer');

const rootDir = require('../util/path');

const router = express.Router();

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

router.get('/contact', (req, res, next) => {
    console.log("Contact page request received");
    res.render('Contact', { docTitle: 'Contact Us', message: '', error: '' });
});

router.post('/contact', async (req, res, next) => {
    try {
        console.log("Contact form submitted");
        
        const { firstName, lastName, email, phone, message } = req.body;

        // Validation
        if (!firstName || !lastName || !email || !message) {
            return res.render('Contact', {
                docTitle: 'Contact Us',
                message: '',
                error: 'Please fill in all required fields (First Name, Last Name, Email, Message)'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.render('Contact', {
                docTitle: 'Contact Us',
                message: '',
                error: 'Please enter a valid email address'
            });
        }

        // Email to admin (your email)
        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `New Contact Form Submission from ${firstName} ${lastName}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                <hr>
                <p><em>This is an automated email from your portfolio contact form.</em></p>
            `
        };

        // Confirmation email to user
        const userMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'We received your message - Portfolio Contact',
            html: `
                <h2>Thank you for contacting us!</h2>
                <p>Hi ${firstName},</p>
                <p>We have received your message and will get back to you as soon as possible.</p>
                <hr>
                <h3>Your Message Details:</h3>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                <hr>
                <p>Best regards,<br>Professional Pavan</p>
            `
        };

        // Send both emails
        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(userMailOptions);

        console.log("Emails sent successfully");
        return res.render('Contact', {
            docTitle: 'Contact Us',
            message: '✓ Your message has been sent successfully! We will contact you soon.',
            error: ''
        });

    } catch (error) {
        console.error("Error sending email:", error);
        return res.render('Contact', {
            docTitle: 'Contact Us',
            message: '',
            error: 'An error occurred while sending your message. Please try again later.'
        });
    }
});

module.exports = router;
