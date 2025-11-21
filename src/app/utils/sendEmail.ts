import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async () => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: config.NODE_ENV === "production",
            auth: {
                user: "mdroman45678910@gmail.com",
                pass: "scjm jimy yybv datn",
            },
        });

        const info = await transporter.sendMail({
            from: "mdroman45678910@gmail.com",
            to: "abdulal.roman09@gmail.com",
            subject: "Hello ✔",
            text: "Hello world?",
            html: "<b>Hello world?</b>",
        });

        console.log("Message sent:", info.messageId);
    } catch (error) {
        console.error("Email error:", error);
    }
};
