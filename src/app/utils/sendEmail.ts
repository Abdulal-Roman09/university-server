import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (to: string, html: string) => {
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
            from: "abdulalnomanforcse@gmail.com",
            to,
            subject: "Your Parcel Submission is Successful",
            text: "Your parcel has been successfully submitted. Thank you for using our service!",
            html,
        });

        console.log("Message sent:", info.messageId);
    } catch (error) {
        console.error("Email error:", error);
    }
};
