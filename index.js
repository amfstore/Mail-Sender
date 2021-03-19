const express = require('express');
const bodyParser = require('bodyParser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());


app.get('/',()=>{
    resizeBy.send('Selamat Datang Di My Send Mailer')
})

app.post('/api/forma', (req,res)=>{

    let data = req.body
    let smtpTransport = nodemailer.createTransport({
        service:'Gmail' ,
        Port:465,
        auth:{
            user:'arim8062@gmail.com',
            pass:'amfcode1304'
        }
    })


let mailOptions={
    from:data.email,
    to:'arim8062@gmail.com',
    subject: `Message From ${data.name}`,
    html:`
    
    <h3>Informations</h3>
    <ul>
    <li>Nama Lengkap: ${data.name}</li>
    <li>Email:  ${data.email}</li>
    </ul>

    <h3>Pesan</h3>
    <p>${data.pesan}</p>
    `
};

smtpTransport.sendMail(mailOptions, (error,respons)=>{

    if(error){
        res.send(error)
    }
    else{
        res.send('Berhasil!')
    }

})

smtpTransport.close();



})

const PORT = process.env.PORT||3001;

app.listen(PORT,()=>{
    console.log(`server starting at port ${PORT}`);
})