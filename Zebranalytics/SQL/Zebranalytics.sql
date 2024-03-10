-- MySQL dump 10.13  Distrib 8.0.27, for macos11 (x86_64)
--
-- Host: localhost    Database: fans
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Asignado`
--

DROP TABLE IF EXISTS `Asignado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Asignado` (
  `IDRol` varchar(20) NOT NULL,
  `IDPermiso` int NOT NULL,
  KEY `FK_IDRol_idx` (`IDRol`),
  KEY `IDPermiso_idx` (`IDPermiso`),
  CONSTRAINT `FK_IDRol` FOREIGN KEY (`IDRol`) REFERENCES `Rol` (`IDRol`),
  CONSTRAINT `IDPermiso` FOREIGN KEY (`IDPermiso`) REFERENCES `Permiso` (`IDPermiso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Asignado`
--

LOCK TABLES `Asignado` WRITE;
/*!40000 ALTER TABLE `Asignado` DISABLE KEYS */;
/*!40000 ALTER TABLE `Asignado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Compra`
--

DROP TABLE IF EXISTS `Compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Compra` (
  `IDCompra` varchar(200) NOT NULL,
  `ItemCode` varchar(20) NOT NULL,
  `CorreoComprador` varchar(64) NOT NULL,
  `IDResena` int NOT NULL,
  `FechaCompra` date NOT NULL,
  PRIMARY KEY (`IDCompra`),
  UNIQUE KEY `IDCompra_UNIQUE` (`IDCompra`),
  UNIQUE KEY `ItemCode_UNIQUE` (`ItemCode`),
  UNIQUE KEY `CorreoComprador_UNIQUE` (`CorreoComprador`),
  UNIQUE KEY `IDResena_UNIQUE` (`IDResena`),
  CONSTRAINT `CorreoComprador` FOREIGN KEY (`CorreoComprador`) REFERENCES `Comprador` (`CorreoComprador`),
  CONSTRAINT `FK2_IDResena` FOREIGN KEY (`IDResena`) REFERENCES `Resena` (`IDResena`),
  CONSTRAINT `FK_ItemCode` FOREIGN KEY (`ItemCode`) REFERENCES `Producto` (`ItemCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Compra`
--

LOCK TABLES `Compra` WRITE;
/*!40000 ALTER TABLE `Compra` DISABLE KEYS */;
INSERT INTO `Compra` VALUES ('CLU01','LB2304','daniel@gmail.com',1,'2024-02-22');
/*!40000 ALTER TABLE `Compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Comprador`
--

DROP TABLE IF EXISTS `Comprador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Comprador` (
  `CorreoComprador` varchar(64) NOT NULL,
  `Nombre` varchar(30) NOT NULL,
  PRIMARY KEY (`CorreoComprador`),
  UNIQUE KEY `CorreoComprador_UNIQUE` (`CorreoComprador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comprador`
--

LOCK TABLES `Comprador` WRITE;
/*!40000 ALTER TABLE `Comprador` DISABLE KEYS */;
INSERT INTO `Comprador` VALUES ('daniel@gmail.com','Daniel Guzman');
/*!40000 ALTER TABLE `Comprador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Marca`
--

DROP TABLE IF EXISTS `Marca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Marca` (
  `NombreMarca` varchar(20) NOT NULL,
  PRIMARY KEY (`NombreMarca`),
  UNIQUE KEY `NombreMarca_UNIQUE` (`NombreMarca`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Marca`
--

LOCK TABLES `Marca` WRITE;
/*!40000 ALTER TABLE `Marca` DISABLE KEYS */;
INSERT INTO `Marca` VALUES ('LUUNA');
/*!40000 ALTER TABLE `Marca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Permiso`
--

DROP TABLE IF EXISTS `Permiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Permiso` (
  `IDPermiso` int NOT NULL AUTO_INCREMENT,
  `Accion` varchar(100) NOT NULL,
  `Descripcion` varchar(100) NOT NULL,
  PRIMARY KEY (`IDPermiso`),
  UNIQUE KEY `IDPermiso_UNIQUE` (`IDPermiso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Permiso`
--

LOCK TABLES `Permiso` WRITE;
/*!40000 ALTER TABLE `Permiso` DISABLE KEYS */;
/*!40000 ALTER TABLE `Permiso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Preguntas`
--

DROP TABLE IF EXISTS `Preguntas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Preguntas` (
  `IDPreguntas` varchar(20) NOT NULL,
  `NombreMarca` varchar(20) NOT NULL,
  `TipoPregunta` varchar(50) NOT NULL,
  `EstadoObligatorio` tinyint NOT NULL,
  `Pregunta` varchar(150) NOT NULL,
  `Categoria` varchar(25) NOT NULL,
  PRIMARY KEY (`IDPreguntas`),
  UNIQUE KEY `IDPreguntas_UNIQUE` (`IDPreguntas`),
  KEY `FK_NombreMarca_idx` (`NombreMarca`),
  CONSTRAINT `FK_NombreMarca` FOREIGN KEY (`NombreMarca`) REFERENCES `Marca` (`NombreMarca`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Preguntas`
--

LOCK TABLES `Preguntas` WRITE;
/*!40000 ALTER TABLE `Preguntas` DISABLE KEYS */;
INSERT INTO `Preguntas` VALUES ('PLUUNA1','LUUNA','Abierta',0,'¿Del 1-5 cuánto le das a este producto?','COLCHONES');
/*!40000 ALTER TABLE `Preguntas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Preguntas_Resena`
--

DROP TABLE IF EXISTS `Preguntas_Resena`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Preguntas_Resena` (
  `IDPreguntas` varchar(20) NOT NULL,
  `IDResena` int NOT NULL,
  KEY `FK_IDResena_idx` (`IDResena`),
  KEY `IDPreguntas_idx` (`IDPreguntas`),
  CONSTRAINT `FK_IDResena` FOREIGN KEY (`IDResena`) REFERENCES `Resena` (`IDResena`),
  CONSTRAINT `IDPreguntas` FOREIGN KEY (`IDPreguntas`) REFERENCES `Preguntas` (`IDPreguntas`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Preguntas_Resena`
--

LOCK TABLES `Preguntas_Resena` WRITE;
/*!40000 ALTER TABLE `Preguntas_Resena` DISABLE KEYS */;
/*!40000 ALTER TABLE `Preguntas_Resena` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Producto`
--

DROP TABLE IF EXISTS `Producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Producto` (
  `ItemCode` varchar(20) NOT NULL,
  `NombreMarca` varchar(20) NOT NULL,
  `Nombre` varchar(60) NOT NULL,
  `WebsiteIMG` varchar(800) NOT NULL,
  `Title` varchar(60) NOT NULL,
  `Description` varchar(400) NOT NULL,
  `WebName` varchar(20) NOT NULL,
  PRIMARY KEY (`ItemCode`),
  UNIQUE KEY `ItemCode_UNIQUE` (`ItemCode`),
  UNIQUE KEY `NombreMarca_UNIQUE` (`NombreMarca`),
  CONSTRAINT `NombreMarca` FOREIGN KEY (`NombreMarca`) REFERENCES `Marca` (`NombreMarca`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Producto`
--

LOCK TABLES `Producto` WRITE;
/*!40000 ALTER TABLE `Producto` DISABLE KEYS */;
INSERT INTO `Producto` VALUES ('LB2304','LUUNA','Cama Nuevo León-KING','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/cama-nuevo-león-king/base-nuevo-leon.jpg','Base Nuevo León King Size','Base de cama king size de madera y metal. la pareja ideal para un buen soporte y durabilidad. Sus patas de acero son un plus para un descanso estable ¿Te mandamos la tuya?','bc17952711');
/*!40000 ALTER TABLE `Producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Resena`
--

DROP TABLE IF EXISTS `Resena`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Resena` (
  `IDResena` int NOT NULL AUTO_INCREMENT,
  `ItemCode` varchar(20) NOT NULL,
  `TiempoEspera` int NOT NULL,
  `EstadoContestacion` tinyint NOT NULL,
  `FechaContestacion` date NOT NULL,
  PRIMARY KEY (`IDResena`),
  UNIQUE KEY `IDResena_UNIQUE` (`IDResena`),
  UNIQUE KEY `ItemCode_UNIQUE` (`ItemCode`),
  CONSTRAINT `ItemCode` FOREIGN KEY (`ItemCode`) REFERENCES `Producto` (`ItemCode`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Resena`
--

LOCK TABLES `Resena` WRITE;
/*!40000 ALTER TABLE `Resena` DISABLE KEYS */;
INSERT INTO `Resena` VALUES (1,'LB2304',15,1,'2024-03-08');
/*!40000 ALTER TABLE `Resena` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Respuestas`
--

DROP TABLE IF EXISTS `Respuestas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Respuestas` (
  `IDRespuesta` int NOT NULL AUTO_INCREMENT,
  `IDResena` int NOT NULL,
  `Calificacion` int NOT NULL,
  `Opinion` varchar(200) NOT NULL,
  `Visibilidad` tinyint NOT NULL,
  `Fecha` date NOT NULL,
  `Titulo` varchar(100) NOT NULL,
  PRIMARY KEY (`IDRespuesta`),
  UNIQUE KEY `IDRespuesta_UNIQUE` (`IDRespuesta`),
  UNIQUE KEY `IDResena_UNIQUE` (`IDResena`),
  CONSTRAINT `IDResena` FOREIGN KEY (`IDResena`) REFERENCES `Resena` (`IDResena`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Respuestas`
--

LOCK TABLES `Respuestas` WRITE;
/*!40000 ALTER TABLE `Respuestas` DISABLE KEYS */;
INSERT INTO `Respuestas` VALUES (1,1,4,'Me gusto, lo volveria a comprar',1,'2024-03-08','Buen servicio');
/*!40000 ALTER TABLE `Respuestas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Rol`
--

DROP TABLE IF EXISTS `Rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Rol` (
  `IDRol` varchar(20) NOT NULL,
  `Descripcion` varchar(100) NOT NULL,
  PRIMARY KEY (`IDRol`),
  UNIQUE KEY `IDRol_UNIQUE` (`IDRol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rol`
--

LOCK TABLES `Rol` WRITE;
/*!40000 ALTER TABLE `Rol` DISABLE KEYS */;
/*!40000 ALTER TABLE `Rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Rol_Usuario`
--

DROP TABLE IF EXISTS `Rol_Usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Rol_Usuario` (
  `IDRol` varchar(20) NOT NULL,
  `CorreoEmpleado` varchar(64) NOT NULL,
  `FechaAsignacion` date NOT NULL,
  `FechaTerminacion` date DEFAULT NULL,
  KEY `CorreoEmpleado_idx` (`CorreoEmpleado`),
  KEY `IDRol_idx` (`IDRol`),
  CONSTRAINT `CorreoEmpleado` FOREIGN KEY (`CorreoEmpleado`) REFERENCES `Usuario` (`CorreoEmpleado`),
  CONSTRAINT `IDRol` FOREIGN KEY (`IDRol`) REFERENCES `Rol` (`IDRol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rol_Usuario`
--

LOCK TABLES `Rol_Usuario` WRITE;
/*!40000 ALTER TABLE `Rol_Usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `Rol_Usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuario`
--

DROP TABLE IF EXISTS `Usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Usuario` (
  `CorreoEmpleado` varchar(64) NOT NULL,
  `Nombre` varchar(30) NOT NULL,
  `Password` varchar(15) NOT NULL,
  PRIMARY KEY (`CorreoEmpleado`),
  UNIQUE KEY `CorreoEmpleado_UNIQUE` (`CorreoEmpleado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuario`
--

LOCK TABLES `Usuario` WRITE;
/*!40000 ALTER TABLE `Usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `Usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-09 18:10:23
