const express = require('express')
const nodemailer = require("nodemailer");
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
const port = process.env.PORT || 3010
const login = process.env.SMTP_LOGIN ||"---"
const password = process.env.SMTP_PASSWORD ||"---"
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())
// app.options('*', cors());
// app.all('*', function (req, res) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
// })
app.use(bodyParser.json())

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: login,
        pass: password,
    },
});
app.get("/", function (req, res) {
    res.send('Hello')
})
app.post('/sendMessage', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let {message, email, name} = req.body

    await transporter.sendMail({
        from: "HR wants me",
        to: "temalggt540@gmail.com",
        subject: "HR написал",
        html: `
                <b>${message}</b>
                <a>${email}</a>
                ${name}
`
    });

    res.send("ok")
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

