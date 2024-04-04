"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("./app");
dotenv_1.default.config();

// Move the 'app' definition to a wider scope
let app;
const express = require('express');
const { createTransport } = require('nodemailer');

function main() {
    return __awaiter(this, void 0, void 0, function* () {
        app = yield (0, app_1.startServer)();
        app.use(express.json())
        app.listen(process.env.PORT);
        console.log("app listening on port " + process.env.PORT);
        defineRoutes(app);
    });
}
main();

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

const mysql = require("mysql");

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  database: 'zebranalytics',
  password: '',
  multipleStatements: true,
});

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

// Define routes function
function defineRoutes(app) {
  // endpoint para recibir una venta de zecore
  app.post(
    "/procesar-informacion",
    validateToken,
    async (request, response) => {
      try {
        // Parse the JSON payload from the request body
        const jsonData = request.body;

        // Establish a connection to the MySQL database
        pool.getConnection((err, connection) => {
          if (err) {
            console.error("Error connecting to database: ", err);
            return response
              .status(500)
              .json({ message: "Error al conectar a la base de datos" });
          }

          // Prepare an SQL query to insert the JSON data into the database
          const query = `
            INSERT INTO student
              (name, last_name, favorite_color, email, birth_date) 
            VALUES 
              (?, ?, ?, ?, ?)
          `;

          const {name, last_name, favorite_color, email, birth_date } = jsonData;

          const emailDetails = {
            subject: 'Prueba',
            text: 'si', // Pass text content
            email: email // Pass email address
          };

          sendEmail(emailDetails);
          // Execute the SQL query
          connection.query(query, [name, last_name, favorite_color, email, birth_date], (err, results) => {
            // Release the connection
            connection.release();

            if (err) {
              console.error("Error executing query: ", err);
              return response
                .status(500)
                .json({ message: "Error al procesar la información" });
            }

            // Return a success response
            return response.json({
              message: "Información procesada exitosamente",
              insertedId: results.insertId,
            });
          });
        });
      } catch (error) {
        console.error("Error processing request: ", error);
        return response
          .status(500)
          .json({ message: "Error al procesar la información" });
      }
    }
  );
}
