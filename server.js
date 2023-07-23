const sendgridMail = require("@sendgrid/mail")
const express = require('express');
const { template } = require('./template')

const app = express();
const port = 3000; // Puedes cambiar el número de puerto si lo deseas

let SENDGRID_API_KEY = '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'
let SENDGRID_FROM_EMAIL =  'amigosecreto@grupoboticario.com.co';

sendgridMail.setApiKey(SENDGRID_API_KEY);

// console.log({template})
const temp = template.concat('')
// console.log(temp)

app.get('/', async(req, res) => {
  res.send('¡Esta es la ruta raiz!');
})


// Ruta de ejemplo
app.get('/:email', async(req, res) => {
    const { params } = req
    const { email } = params

    const ran = Math.floor(Math.random() * 10000);

    console.log({ email, params })

    const mailDetail = {
        to: email,
        from: SENDGRID_FROM_EMAIL,
        subject: `sebas mail ${ran}`,
        html: temp,
      };


      try {
        if(email!=='favicon.ico'){
            console.log('Enviando')
          let result_send = await sendgridMail.send(mailDetail);
          console.log(result_send)
          return result_send;
        }
      } catch (e) {
        console.log("Error sending an email");
        console.log(e);
      }


    res.send('¡Hola, mundo de Sebas!');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor Express funcionando en http://localhost:${port}`);
});