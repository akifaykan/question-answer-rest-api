import nodemailer from 'nodemailer'

export const sendEMail = async (mailOptions) => {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env

    let transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        }
    })

    let info = await transporter.sendMail(mailOptions, function(err, info){
        if (err) console.log(err)
    })
}
