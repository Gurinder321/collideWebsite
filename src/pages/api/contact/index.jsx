import ReactDOMServer from "react-dom/server";
import EmailConfirmation from "@/template/email";
import nodemailer from "nodemailer";

const emailuser = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

let emailSent = false;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  if (emailSent) {
    return res.status(429).json({ message: "Email already sent. Try again later." });
  }
  emailSent = true;

  const { fullName, email, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: emailuser,
        pass: pass,
      },
    });

    const emailHtml = ReactDOMServer.renderToStaticMarkup(
      <EmailConfirmation name={fullName} email={email} message={message} />
    );

    const mailOptions = {
      from: email,
      replyTo: email,
      to: emailuser,
      subject: `New Message Submitted via balkhabra ${fullName}`,
      text: message,
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send the message." });
  } finally {
    emailSent = false;
  }
}
