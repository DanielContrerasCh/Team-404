const Venta = require('../models/venta.model');
const Producto = require('../models/producto.model');
const Reviews = require('../models/reviews.model');
const ejs = require('ejs');
const path = require('path');
const ejsFilePath = path.join(__dirname, '../views/correo.ejs');

const { createTransport } = require('nodemailer');

const __importDefault = (this && this.__importDefault) || function (mod) {
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

const sendEmail = async (emailDetails, html, headerName, footerName) => {
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
    html: html,
    attachments: [{
      filename: headerName,
      path: './public/img/' + headerName,
      cid: 'unique@zebranalytics.header'
    },{
      filename: footerName,
      path: './public/img/' + footerName,
      cid: 'unique@zebranalytics.footer'
    }]
  };

    // const info = 
  await transporter.sendMail(mailOptions);
};

exports.postVenta = async (request, response, next) => {
  try {
    validateToken(request, response, async () => {
      const jsonData = request.body;
      const { name, last_name, itemCode, email } = jsonData;
      const venta = new Venta(name, last_name, itemCode, email);
      await venta.insertarVenta();
      response.status(200).json({ message: "Información procesada" });
    });
  } catch (error) {
    console.error('Error:', error);
    if (!response.headersSent) {
      response.status(500).json({ message: "Error al procesar la información" });
    }
  }
}

exports.postMail = async (name, email, itemCode, idResena) => {
  try {      
      const preguntas = await Producto.encuesta(itemCode);
      const marca = preguntas.length > 0 ? preguntas[0].NombreMarca : '';
      const nombre = preguntas.length > 0 ? preguntas[0].Nombre : '';
      console.log(preguntas);
      const headerImagePath = await Venta.getHeaderImagePath(itemCode);
      const footerImagePath = await Venta.getFooterImagePath(itemCode);
      const headerName = headerImagePath.split('img/')[1];
      const footerName = footerImagePath.split('img/')[1];
      const html = await ejs.renderFile(ejsFilePath, { preguntas: preguntas, marca: marca, nombre: nombre, name: name, resenaAux: idResena, attachments: [{
          filename: headerName,
          path: './public/img/' + headerName,
          cid: 'unique@zebranalytics.header'
        },{
          filename: footerName,
          path: './public/img/' + footerName,
          cid: 'unique@zebranalytics.footer'
        }] 
      });

      const emailDetails = {
        subject: 'Encuesta sobre producto',
        email: email
      };

      await sendEmail(emailDetails, html, headerName, footerName);
      console.log("Información procesada y correo enviado exitosamente");
  } catch (error) {
    console.error('Error:', error);
  }
}

exports.postProducto = (request, response, next) => {
  try{
    validateToken(request, response, async () => {
    const jsonData = request.body;
    const { Nombre, ItemCode, categoria_nombre, NombreMarca, WebsiteIMG, Title, Description, WebName } = jsonData;
    
    if (Nombre.length > 200) {
      return response.status(400).json({ message: "El nombre del producto excede los 200 caracteres permitidos" });
    }
    
    if (ItemCode.length > 20) {
      return response.status(400).json({ message: "El ItemCode excede los 20 caracteres permitidos" });
    }
  
    if (categoria_nombre.length > 50) {
      return response.status(400).json({ message: "El nombre de categoria excede los 50 caracteres permitidos" });
    }
    
    if (NombreMarca.length > 20) {
      return response.status(400).json({ message: "El nombre de la marca excede los 20 caracteres permitidos" });
    }
  
    if (WebsiteIMG.length > 800) {
      return response.status(400).json({ message: "El WebsiteIMG excede los 800 caracteres permitidos" });
    }
  
    if (Title.length > 60) {
      return response.status(400).json({ message: "El titulo excede los 60 caracteres permitidos" });
    }
  
    if (Description.length > 400) {
      return response.status(400).json({ message: "La descripción excede los 400 caracteres permitidos" });
    }
  
    if (WebName.length > 20) {
      return response.status(400).json({ message: "El WebName excede los 20 caracteres permitidos" });
    }
    const producto = new Producto(Nombre, ItemCode, categoria_nombre, NombreMarca, WebsiteIMG, Title, Description, WebName);
    
    producto.insertarProducto()
      .then(() => {
        return response.status(200).json({ message: "Información procesada exitosamente" });
      })
      .catch((error) => {
        console.log("Error processing info " + error);
        return response.status(500).json({ message: "Error al procesar la información" });
      });
  })} catch (error) {
    console.error('Error:', error);
    if (!response.headersSent) {
      response.status(500).json({ message: "Error al procesar la información" });
    }
  }
}
  

exports.deleteProducto = (request, response, next) =>{
  try {
    validateToken(request, response, async () => {
  const jsonData = request.body;
  const itemCode = jsonData;
  Producto.eliminarProducto(itemCode)
      .then(() => {
          return response
          .status(200)
          .json({
              message: "Información procesada exitosamente",
          });
      }).catch((error) => {
          console.log("Error processing info " + error);
          return response
          .status(500)
          .json({ message: "Error al procesar la información" });
    });}
  )} catch (error) {
    console.error('Error:', error);
    if (!response.headersSent) {
      response.status(500).json({ message: "Error al procesar la información" });
    }
  }
}

exports.modifyProducto = (request, response, next) =>{
  try{
    validateToken(request, response, async () => {
    const jsonData = request.body;
    const { Nombre, ItemCode, categoria_nombre, NombreMarca, WebsiteIMG, Title, Description, WebName } = jsonData;
    
    if (Nombre.length > 200) {
      return response.status(400).json({ message: "El nombre del producto excede los 200 caracteres permitidos" });
    }
    
    if (ItemCode.length > 20) {
      return response.status(400).json({ message: "El ItemCode excede los 20 caracteres permitidos" });
    }
  
    if (categoria_nombre.length > 50) {
      return response.status(400).json({ message: "El nombre de categoria excede los 50 caracteres permitidos" });
    }
    
    if (NombreMarca.length > 20) {
      return response.status(400).json({ message: "El nombre de la marca excede los 20 caracteres permitidos" });
    }
  
    if (WebsiteIMG.length > 800) {
      return response.status(400).json({ message: "El WebsiteIMG excede los 800 caracteres permitidos" });
    }
  
    if (Title.length > 60) {
      return response.status(400).json({ message: "El titulo excede los 60 caracteres permitidos" });
    }
  
    if (Description.length > 400) {
      return response.status(400).json({ message: "La descripción excede los 400 caracteres permitidos" });
    }
  
    if (WebName.length > 20) {
      return response.status(400).json({ message: "El WebName excede los 20 caracteres permitidos" });
    }

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
    })} catch (error) {
      console.error('Error:', error);
      if (!response.headersSent) {
        response.status(500).json({ message: "Error al procesar la información" });
      }
    }
  }

  exports.getReviews = async (request, response, next) => {
    try {
      validateToken(request, response, async () => {
        const reviews = await Reviews.fetchAllVisibleReviews()
        return response.status(200).json(reviews[0]);
      });
    } catch (error) {
      console.error('Error:', error);
      if (!response.headersSent) {
        response.status(500).json({ message: "Error al procesar la información" });
      }
    }
  }