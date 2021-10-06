const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer")
//require("../templates/template")

router.post('/send-email', (req, res, next) => {
	console.log("NODEMAILER ROUTE ARRIVED: ",req.body )
	let { email, subject, message } = req.body;
	console.log("NODEMAILER MAIL PREPARED: ",email )
	let transporter = nodemailer.createTransport({
	  service: 'Gmail',
	  auth: {
		user: process.env.GOOGLE_USERNAME,
		pass: process.env.GOOGLE_PASSWORD,
	  }
	});
	console.log("TRANSPORTER CREATED: ", transporter)
	transporter.sendMail({
	  from: '"Tooly" <tooly@gmail.com>',
	  to: email, 
	  subject: subject, 
	  text: message,
	  html: `<b>${message}</b>`
	  //html: templates.templateExample(message)
	})
	console.log("EMAIL SENT")
	.then(info => {
		console.log ('MESSAGE SENT', {email, subject, message, info})
		res.json('message', {email, subject, message, info})})
	.catch(error => console.log(error));
  });
  
  
  module.exports = router