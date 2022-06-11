

const nodemailer = require('nodemailer')
const path = require('path')
const pug = require('pug');
const { convert } = require('html-to-text')
const dotenv = require('dotenv')
dotenv.config({path: './.env'})

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST_DEV,
    port: process.env.EMAIL_PORT_DEV,
    auth: {
      user: process.env.EMAIL_USER_DEV,
      pass: process.env.EMAIL_PASS_DEV,
    }
  }) 
module.exports = class {
  constructor(mailOptions, template, options, locals) {
    this.mailOptions = mailOptions
    this.template = template
    this.options = options
    this.locals = locals
  }
  generateTxtAndHTML() {
    this.html =
      pug.renderFile(
        path.join(
          `${__dirname}`,
          '../views',
          'emails.templates',
          `${this.template}.pug`),
        this.options)
    this.text = convert(this.html)
    this.mailOptions = {
      ...this.mailOptions,
      html: this.html,
      text: this.text
    }
    return this
  }
  async sendEmail() {
    return new Promise((resolve, reject) => {
      transporter.sendMail(this.mailOptions, (err, info) => {
        if (err) {
          reject({
            response: 'failed',
            error: err
          })
        } else {
          resolve({
            response: 'success',
            info
          })
        }
      })
    })
  }
}