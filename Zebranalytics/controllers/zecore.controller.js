const Venta = require('../models/venta.model')
const Producto = require('../models/producto.model')
const ejs = require('ejs');
const path = require('path');
const ejsFilePath = path.join(__dirname, '../views/correo.ejs');

const { createTransport } = require('nodemailer');

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();

// función para validar que venga un token
const validateToken = (req, res, next) => {
    const token = req.headers["authorization"];
    // validar token
    if (!token || token !== process.env.ZECORE_API_KEY) {
        return res.status(401).json({ message: "Acceso no autorizado. NO SE PUEDE" });
    }
    // token ok, seguir
    next();
};

// ejs.renderFile('correo.ejs', data, ((err, html) => {
//   if (err) {
//       console.error('Error rendering EJS:', err);
//       return;
//   }
// }));

const sendEmail = async (emailDetails, html) => {
  // const html = await ejs.renderFile('correo.ejs', { venta: ventaDetails });
  const transporter = createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS
    },
  });
  

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: emailDetails.email,
    subject: emailDetails.subject,
    html: html
  };

  try { 
    // const info = 
    await transporter.sendMail(mailOptions, html);
    // console.log('Email sent: ' + info.response);
    return 'success';
  } catch (error) {
    console.error(error);
    return 'error';
  }
};

exports.postVenta = async (request, response, next) => {
  try {
    validateToken(request, response, async () => {
      const jsonData = request.body;
      const { name, last_name, itemCode, email } = jsonData;
      const venta = new Venta(name, last_name, itemCode, email);
      await venta.insertarVenta();

      const preguntas = await Producto.encuesta(itemCode);
      const marca = preguntas.length > 0 ? preguntas[0].NombreMarca : ''
      const html = await ejs.renderFile(ejsFilePath, { preguntas: preguntas, marca: marca, name: name });

      const emailDetails = {
        subject: 'Encuesta sobre producto',
        email: email
      };

      await sendEmail(emailDetails, html);
      response.status(200).json({ message: "Información procesada y correo enviado exitosamente" });
    });
  } catch (error) {
    console.error('Error:', error);
    if (!response.headersSent) {
      response.status(500).json({ message: "Error al procesar la información" });
    }
  }
}

exports.postProducto = (request, response, next) =>{
    validateToken;
    const jsonData = request.body;
    const { Nombre, ItemCode, categoria_nombre,  NombreMarca, WebsiteIMG, Title, Description, WebName } = jsonData;
    const producto = new Producto(Nombre, ItemCode, categoria_nombre, NombreMarca, WebsiteIMG, Title, Description, WebName)
    producto.insertarProducto()
        .then(() => {
            return response
            .status(200)
            .json({
                message: "Información procesada exitosamente",
            });
        })
        .catch((error) => {
            console.log("Error processing info " + error);
            return response
            .status(500)
            .json({ message: "Error al procesar la información" });
        });
}

exports.deleteProducto = (request, response, next) =>{
  validateToken;
  const jsonData = request.body;
  const ItemCode = jsonData;
  Producto.eliminarProducto(ItemCode)
      .then(() => {
          return response
          .status(200)
          .json({
              message: "Información procesada exitosamente",
          });
      })
      .catch((error) => {
          console.log("Error processing info " + error);
          return response
          .status(500)
          .json({ message: "Error al procesar la información" });
      });
}

exports.modifyProducto = (request, response, next) =>{
  validateToken;
  const jsonData = request.body;
  const { Nombre, ItemCode, NombreMarca, WebsiteIMG, Title, Description, WebName } = jsonData;
  console.log(Nombre);
  Producto.modificarProducto(Nombre, ItemCode, NombreMarca, WebsiteIMG, Title, Description, WebName)
      .then(() => {
          return response
          .status(200)
          .json({
              message: "Información procesada exitosamente",
          });
      })
      .catch((error) => {
          console.log("Error processing info " + error);
          return response
          .status(500)
          .json({ message: "Error al procesar la información" });
      });
}