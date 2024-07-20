import nodemailer from "nodemailer";

import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "ramvarsha9944@gmail.com",
        pass: process.env.GMAIL_PASSWORD || "",
    },
});

 // Simple Mail Options which can be overridden & used anytime
const mailOption = {
    from: "ramvarsha9944@gmail.com",
    to: [],
    subject: "Email Testing",
    text: "Sending Email are so easy with nodemailer & Gmail",
};

export {
    mailOption,
    transporter
};