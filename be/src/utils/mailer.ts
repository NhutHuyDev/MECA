import nodemailer, { SendMailOptions } from 'nodemailer'
import log from './logger'
import config from '@/config'
import { InternalServerError } from '@/core/error.responses'

/**
 * @description create a test smtp account
 */

async function createTestCreds() {
  const creds = await nodemailer.createTestAccount()

  log.info({ creds })
}

/**
 * @description config fake smtp
 */

const smtp = config.smtp

const transporter = nodemailer.createTransport({
  ...smtp,
  auth: { user: smtp.user, pass: smtp.pass },
  tls: {
    rejectUnauthorized: false
  }
})

async function sendEmail(payload: SendMailOptions) {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      log.error(err, 'sending email error')
      throw new InternalServerError('sending email error')
    }
  })
}

export default sendEmail
