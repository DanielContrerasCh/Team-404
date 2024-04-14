const Venta = require('../models/venta.model')
const Producto = require('../models/producto.model')

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


const sendEmail = async (emailDetails) => {
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
    text: emailDetails.text
  };

  try { 
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return 'success';
  } catch (error) {
    console.error(error);
    return 'error';
  }
};

exports.postVenta = (request, response, next) =>{
  validateToken;
  const jsonData = request.body;
  const { name, last_name, itemCode, email } = jsonData;
  const venta = new Venta(name, last_name, itemCode, email);
  venta.insertarVenta()
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

  const emailDetails = {
    subject: 'Compra reciente',
    text: 'gracias por tu compra ' + name + ' ' + last_name, // Pass text content
    email: email // Pass email address
  };

  sendEmail(emailDetails);
}

exports.postProducto = (request, response, next) =>{
    validateToken;
    const jsonData = request.body;
    const { Nombre, ItemCode, NombreMarca, WebsiteIMG, Title, Description, WebName } = jsonData;
    const producto = new Producto(Nombre, ItemCode, NombreMarca, WebsiteIMG, Title, Description, WebName)
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