import { Verification_Email_Template, Welcome_Email_Template } from "../libs/EmailTemplate.js";
import { transporter } from "./email.config.js";

export const sendVerificationCode = async (email, verificationCode) => {
  try {
    const response = await transporter.sendMail({
      from: '"QuickHire 👻" <arindamsharma0123@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Verify your Email", // Subject line
      text: "Verify your Email", // plain text body
      html: Verification_Email_Template.replace("{verificationCode}",verificationCode) // html body
    });
    console.log('Email send successfully',response)
  } catch (error) {
    console.log("Email error");
  }
};

export const welcomeEmail = async (email, name) => {
  try {
    const response = await transporter.sendMail({
      from: '"QuickHire 👻" <arindamsharma0123@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Welcome Email ", // Subject line
      text: "Welcome Email", // plain text body
      html: Welcome_Email_Template.replace("{name}",name) // html body
    });
    console.log('Email send successfully',response)
  } catch (error) {
    console.log("Email error");
  }
};
