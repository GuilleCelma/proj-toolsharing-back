const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer")
//require("../templates/template")

router.post('/send-email', (req, res, next) => {
	console.log("NODEMAILER: ",req.body )
	let { email, subject, message } = req.body;
	let transporter = nodemailer.createTransport({
	  service: 'Gmail',
	  auth: {
		user: process.env.GOOGLE_USER,
		pass: process.env.GOOGLE_PASSWORD,
	  }
	});
	transporter.sendMail({
	  from: '"Tooly" <tooly@gmail.com>',
	  to: email, 
	  subject: subject, 
	  text: message,
	  html: `<b>${message}</b>`
	  //html: templates.templateExample(message)
	})
	.then(info => {
		console.log ('message', {email, subject, message, info})
		res.json('message', {email, subject, message, info})})
	.catch(error => console.log(error));
  });
  
  
  module.exports = router