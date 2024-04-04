-- MySQL dump 10.13  Distrib 8.0.27, for macos11 (x86_64)
--
-- Host: localhost    Database: proyecto
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
-- Table structure for table `asignado`
--

DROP TABLE IF EXISTS `asignado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asignado` (
  `IDRol` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `IDPermiso` int NOT NULL,
  KEY `FK_IDRol_idx` (`IDRol`),
  KEY `IDPermiso_idx` (`IDPermiso`),
  CONSTRAINT `FK_IDRol` FOREIGN KEY (`IDRol`) REFERENCES `rol` (`IDRol`),
  CONSTRAINT `IDPermiso` FOREIGN KEY (`IDPermiso`) REFERENCES `permiso` (`IDPermiso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignado`
--

LOCK TABLES `asignado` WRITE;
/*!40000 ALTER TABLE `asignado` DISABLE KEYS */;
INSERT INTO `asignado` VALUES ('1',1),('1',2),('1',3),('2',2),('2',3),('3',3);
/*!40000 ALTER TABLE `asignado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compra`
--

DROP TABLE IF EXISTS `compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compra` (
  `IDCompra` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ItemCode` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CorreoComprador` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `IDResena` int NOT NULL,
  `FechaCompra` date NOT NULL,
  PRIMARY KEY (`IDCompra`),
  UNIQUE KEY `IDCompra_UNIQUE` (`IDCompra`),
  UNIQUE KEY `ItemCode_UNIQUE` (`ItemCode`),
  UNIQUE KEY `CorreoComprador_UNIQUE` (`CorreoComprador`),
  UNIQUE KEY `IDResena_UNIQUE` (`IDResena`),
  CONSTRAINT `CorreoComprador` FOREIGN KEY (`CorreoComprador`) REFERENCES `comprador` (`CorreoComprador`),
  CONSTRAINT `FK2_IDResena` FOREIGN KEY (`IDResena`) REFERENCES `resena` (`IDResena`),
  CONSTRAINT `FK_ItemCode` FOREIGN KEY (`ItemCode`) REFERENCES `producto` (`ItemCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compra`
--

LOCK TABLES `compra` WRITE;
/*!40000 ALTER TABLE `compra` DISABLE KEYS */;
INSERT INTO `compra` VALUES ('CLU01','LB2304','daniel@gmail.com',1,'2024-02-22');
/*!40000 ALTER TABLE `compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comprador`
--

DROP TABLE IF EXISTS `comprador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comprador` (
  `CorreoComprador` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Nombre` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`CorreoComprador`),
  UNIQUE KEY `CorreoComprador_UNIQUE` (`CorreoComprador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comprador`
--

LOCK TABLES `comprador` WRITE;
/*!40000 ALTER TABLE `comprador` DISABLE KEYS */;
INSERT INTO `comprador` VALUES ('daniel@gmail.com','Daniel Guzman');
/*!40000 ALTER TABLE `comprador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ImagenMarca`
--

DROP TABLE IF EXISTS `ImagenMarca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ImagenMarca` (
  `nombre` varchar(50) NOT NULL,
  `imagen` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`nombre`),
  UNIQUE KEY `id_UNIQUE` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ImagenMarca`
--

LOCK TABLES `ImagenMarca` WRITE;
/*!40000 ALTER TABLE `ImagenMarca` DISABLE KEYS */;
INSERT INTO `ImagenMarca` VALUES ('Luuna','/img/luuna.png'),('Mappa','/img/mappa.png'),('Nooz','/img/nooz.png');
/*!40000 ALTER TABLE `ImagenMarca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marca`
--

DROP TABLE IF EXISTS `marca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marca` (
  `NombreMarca` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`NombreMarca`),
  UNIQUE KEY `NombreMarca_UNIQUE` (`NombreMarca`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marca`
--

LOCK TABLES `marca` WRITE;
/*!40000 ALTER TABLE `marca` DISABLE KEYS */;
INSERT INTO `marca` VALUES ('LUUNA'),('MAPPA'),('NOOZ');
/*!40000 ALTER TABLE `marca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `opciones_pregunta`
--

DROP TABLE IF EXISTS `opciones_pregunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opciones_pregunta` (
  `IDopcion` int NOT NULL AUTO_INCREMENT,
  `IDPreguntas` int NOT NULL,
  `TextoOpcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`IDopcion`),
  KEY `IDPreguntas_idx` (`IDPreguntas`),
  CONSTRAINT `FK_opciones_preguntas` FOREIGN KEY (`IDPreguntas`) REFERENCES `preguntas` (`IDPreguntas`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opciones_pregunta`
--

LOCK TABLES `opciones_pregunta` WRITE;
/*!40000 ALTER TABLE `opciones_pregunta` DISABLE KEYS */;
/*!40000 ALTER TABLE `opciones_pregunta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permiso`
--

DROP TABLE IF EXISTS `permiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permiso` (
  `IDPermiso` int NOT NULL AUTO_INCREMENT,
  `Accion` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Descripcion` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`IDPermiso`),
  UNIQUE KEY `IDPermiso_UNIQUE` (`IDPermiso`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permiso`
--

LOCK TABLES `permiso` WRITE;
/*!40000 ALTER TABLE `permiso` DISABLE KEYS */;
INSERT INTO `permiso` VALUES (1,'Administra','Permite modificar todo'),(2,'actualizaReview','Permite modificar encuestas'),(3,'Analiza','Permite ver las gráficas');
/*!40000 ALTER TABLE `permiso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preguntas`
--

DROP TABLE IF EXISTS `preguntas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `preguntas` (
  `IDPreguntas` int NOT NULL AUTO_INCREMENT,
  `NombreMarca` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `EstadoObligatorio` tinyint NOT NULL,
  `TipoPregunta` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Pregunta` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Categoria` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`IDPreguntas`),
  UNIQUE KEY `IDPreguntas_UNIQUE` (`IDPreguntas`),
  KEY `FK_NombreMarca_idx` (`NombreMarca`),
  CONSTRAINT `FK_NombreMarca` FOREIGN KEY (`NombreMarca`) REFERENCES `marca` (`NombreMarca`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preguntas`
--

LOCK TABLES `preguntas` WRITE;
/*!40000 ALTER TABLE `preguntas` DISABLE KEYS */;
INSERT INTO `preguntas` VALUES (28,'NOOZ',1,'Checkbox','Prueba','Camas'),(29,'LUUNA',1,'Checkbox','Prueba','Almohadas'),(31,'NOOZ',0,'Abierta','Prueba colchones','Colchones'),(34,'NOOZ',1,'Checkbox','prueba','Accesorios'),(36,'LUUNA',1,'Checkbox','jajja','Almohadas'),(37,'LUUNA',1,'Checkbox','Es resistente?','Muebles'),(38,'LUUNA',1,'Checkbox','¿Messi?','Blancos'),(39,'LUUNA',1,'Checkbox','Prueba','Ninos'),(40,'MAPPA',1,'Checkbox','prueba mappa','Maletas'),(41,'MAPPA',1,'Checkbox','Porfa','Mochilas'),(42,'MAPPA',1,'Abierta','accesorios mappa','Accesorios'),(43,'NOOZ',1,'Checkbox','nooz colchones','Colchones'),(44,'NOOZ',1,'Checkbox','almohadas?','Almohadas'),(45,'NOOZ',1,'Checkbox','camas nooz','Camas'),(46,'NOOZ',1,'Checkbox','blancos nooz','Blancos'),(47,'NOOZ',1,'Checkbox','accesorios nooz','Accesorios');
/*!40000 ALTER TABLE `preguntas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preguntas_resena`
--

DROP TABLE IF EXISTS `preguntas_resena`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `preguntas_resena` (
  `IDPreguntas` int NOT NULL,
  `IDResena` int NOT NULL,
  KEY `FK_IDResena_idx` (`IDResena`),
  KEY `IDPreguntas_idx` (`IDPreguntas`),
  CONSTRAINT `FK_IDResena` FOREIGN KEY (`IDResena`) REFERENCES `resena` (`IDResena`),
  CONSTRAINT `IDPreguntas` FOREIGN KEY (`IDPreguntas`) REFERENCES `preguntas` (`IDPreguntas`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preguntas_resena`
--

LOCK TABLES `preguntas_resena` WRITE;
/*!40000 ALTER TABLE `preguntas_resena` DISABLE KEYS */;
/*!40000 ALTER TABLE `preguntas_resena` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `ItemCode` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `NombreMarca` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Nombre` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `WebsiteIMG` varchar(800) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Title` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` varchar(400) COLLATE utf8mb4_unicode_ci NOT NULL,
  `WebName` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ItemCode`),
  UNIQUE KEY `ItemCode_UNIQUE` (`ItemCode`),
  UNIQUE KEY `NombreMarca_UNIQUE` (`NombreMarca`),
  CONSTRAINT `NombreMarca` FOREIGN KEY (`NombreMarca`) REFERENCES `marca` (`NombreMarca`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES ('LB2304','LUUNA','Cama Nuevo León-KING','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/cama-nuevo-león-king/base-nuevo-leon.jpg','Base Nuevo León King Size','Base de cama king size de madera y metal. la pareja ideal para un buen soporte y durabilidad. Sus patas de acero son un plus para un descanso estable ¿Te mandamos la tuya?','bc17952711');
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resena`
--

DROP TABLE IF EXISTS `resena`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resena` (
  `IDResena` int NOT NULL AUTO_INCREMENT,
  `ItemCode` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `TiempoEspera` int NOT NULL,
  `EstadoContestacion` tinyint NOT NULL,
  `FechaContestacion` date NOT NULL,
  PRIMARY KEY (`IDResena`),
  UNIQUE KEY `IDResena_UNIQUE` (`IDResena`),
  UNIQUE KEY `ItemCode_UNIQUE` (`ItemCode`),
  CONSTRAINT `ItemCode` FOREIGN KEY (`ItemCode`) REFERENCES `producto` (`ItemCode`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resena`
--

LOCK TABLES `resena` WRITE;
/*!40000 ALTER TABLE `resena` DISABLE KEYS */;
INSERT INTO `resena` VALUES (1,'LB2304',15,1,'2024-03-08');
/*!40000 ALTER TABLE `resena` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `respuestas`
--

DROP TABLE IF EXISTS `respuestas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `respuestas` (
  `IDRespuesta` int NOT NULL AUTO_INCREMENT,
  `IDResena` int NOT NULL,
  `Calificacion` int NOT NULL,
  `Opinion` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Visibilidad` tinyint NOT NULL,
  `Fecha` date NOT NULL,
  `Titulo` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`IDRespuesta`),
  UNIQUE KEY `IDRespuesta_UNIQUE` (`IDRespuesta`),
  UNIQUE KEY `IDResena_UNIQUE` (`IDResena`),
  CONSTRAINT `IDResena` FOREIGN KEY (`IDResena`) REFERENCES `resena` (`IDResena`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `respuestas`
--

LOCK TABLES `respuestas` WRITE;
/*!40000 ALTER TABLE `respuestas` DISABLE KEYS */;
INSERT INTO `respuestas` VALUES (1,1,4,'Me gusto, lo volveria a comprar',0,'2024-03-08','Buen servicio');
/*!40000 ALTER TABLE `respuestas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `IDRol` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Descripcion` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`IDRol`),
  UNIQUE KEY `IDRol_UNIQUE` (`IDRol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES ('1','Administrador'),('2','CRM'),('3','Analista');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol_usuario`
--

DROP TABLE IF EXISTS `rol_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol_usuario` (
  `IDRol` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CorreoEmpleado` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `FechaAsignacion` date NOT NULL,
  `FechaTerminacion` date DEFAULT NULL,
  KEY `CorreoEmpleado_idx` (`CorreoEmpleado`),
  KEY `IDRol_idx` (`IDRol`),
  CONSTRAINT `CorreoEmpleado` FOREIGN KEY (`CorreoEmpleado`) REFERENCES `usuario` (`CorreoEmpleado`),
  CONSTRAINT `IDRol` FOREIGN KEY (`IDRol`) REFERENCES `rol` (`IDRol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol_usuario`
--

LOCK TABLES `rol_usuario` WRITE;
/*!40000 ALTER TABLE `rol_usuario` DISABLE KEYS */;
INSERT INTO `rol_usuario` VALUES ('1','admin','0000-00-00',NULL),('2','crm','0000-00-00',NULL),('3','analista','0000-00-00',NULL);
/*!40000 ALTER TABLE `rol_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `CorreoEmpleado` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Nombre` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Password` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`CorreoEmpleado`),
  UNIQUE KEY `CorreoEmpleado_UNIQUE` (`CorreoEmpleado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES ('admin','admin','$2a$12$IKwi9bpyUjMEerqpAiY6NuPDHiGoMyIOXIUQrUh1.4Dy75WhnEKBy'),('analista','analista','$2a$12$d8lbV/YFnYxIO1YgBoPfluicqJZ1g05tN5TqFadhL7rLDMJ6wKeA6'),('crm','crm','$2a$12$hj4WHisTYkDZzGkE1bWN2eS.yNIskUmT0U5QPYWU4pTDDkLWZJ1Xe');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-04  7:10:13
