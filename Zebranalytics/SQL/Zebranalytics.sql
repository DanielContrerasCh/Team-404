-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-03-2024 a las 23:47:07
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `zebranalytics`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignado`
--

CREATE TABLE `asignado` (
  `IDRol` varchar(20) NOT NULL,
  `IDPermiso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `asignado`
--

INSERT INTO `asignado` (`IDRol`, `IDPermiso`) VALUES
('1', 1),
('1', 2),
('1', 3),
('2', 2),
('2', 3),
('3', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compra`
--

-- CREATE TABLE `compra` (
-- Estructura de tabla para la tabla `compra`
--

CREATE TABLE `compra` (
  `IDCompra` varchar(200) NOT NULL,
  `ItemCode` varchar(20) NOT NULL,
  `CorreoComprador` varchar(64) NOT NULL,
  `IDResena` int(11) NOT NULL,
  `FechaCompra` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `compra`
--

INSERT INTO `compra` (`IDCompra`, `ItemCode`, `CorreoComprador`, `IDResena`, `FechaCompra`) VALUES
('CLU01', 'LB2304', 'daniel@gmail.com', 1, '2024-02-22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comprador`
--

CREATE TABLE `comprador` (
  `CorreoComprador` varchar(64) NOT NULL,
  `Nombre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `comprador`
--

INSERT INTO `comprador` (`CorreoComprador`, `Nombre`) VALUES
('daniel@gmail.com', 'Daniel Guzman');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marca`
--

CREATE TABLE `marca` (
  `NombreMarca` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `marca`
--

INSERT INTO `marca` (`NombreMarca`) VALUES
('LUUNA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permiso`
--

CREATE TABLE `permiso` (
  `IDPermiso` int(11) NOT NULL,
  `Accion` varchar(100) NOT NULL,
  `Descripcion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `permiso`
--

INSERT INTO `permiso` (`IDPermiso`, `Accion`, `Descripcion`) VALUES
(1, 'Administra', 'Permite modificar todo'),
(2, 'actualizaReview', 'Permite modificar encuestas'),
(3, 'Analiza', 'Permite ver las gráficas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas`
--

CREATE TABLE `preguntas` (
  `IDPreguntas` int(11) NOT NULL,
  `NombreMarca` varchar(20) NOT NULL,
  `EstadoObligatorio` tinyint(4) NOT NULL,
  `TipoPregunta` varchar(50) NOT NULL,
  `Pregunta` varchar(150) NOT NULL,
  `Categoria` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `preguntas`
--

INSERT INTO `preguntas` (`IDPreguntas`, `NombreMarca`, `EstadoObligatorio`, `TipoPregunta`, `Pregunta`, `Categoria`) VALUES
(1, 'LUUNA', 1, 'Rango', 'Del 1-5 ¿Cuánto le das?', 'COLCHONES');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas_resena`
--

CREATE TABLE `preguntas_resena` (
  `IDPreguntas` int(11) NOT NULL,
  `IDResena` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `ItemCode` varchar(20) NOT NULL,
  `NombreMarca` varchar(20) NOT NULL,
  `Nombre` varchar(60) NOT NULL,
  `WebsiteIMG` varchar(800) NOT NULL,
  `Title` varchar(60) NOT NULL,
  `Description` varchar(400) NOT NULL,
  `WebName` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`ItemCode`, `NombreMarca`, `Nombre`, `WebsiteIMG`, `Title`, `Description`, `WebName`) VALUES
('LB2304', 'LUUNA', 'Cama Nuevo León-KING', 'https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/cama-nuevo-león-king/base-nuevo-leon.jpg', 'Base Nuevo León King Size', 'Base de cama king size de madera y metal. la pareja ideal para un buen soporte y durabilidad. Sus patas de acero son un plus para un descanso estable ¿Te mandamos la tuya?', 'bc17952711');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resena`
--

CREATE TABLE `resena` (
  `IDResena` int(11) NOT NULL,
  `ItemCode` varchar(20) NOT NULL,
  `TiempoEspera` int(11) NOT NULL,
  `EstadoContestacion` tinyint(4) NOT NULL,
  `FechaContestacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `resena`
--

INSERT INTO `resena` (`IDResena`, `ItemCode`, `TiempoEspera`, `EstadoContestacion`, `FechaContestacion`) VALUES
(1, 'LB2304', 15, 1, '2024-03-08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas`
--

CREATE TABLE `respuestas` (
  `IDRespuesta` int(11) NOT NULL,
  `IDResena` int(11) NOT NULL,
  `Calificacion` int(11) NOT NULL,
  `Opinion` varchar(200) NOT NULL,
  `Visibilidad` tinyint(4) NOT NULL,
  `Fecha` date NOT NULL,
  `Titulo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `respuestas`
--

INSERT INTO `respuestas` (`IDRespuesta`, `IDResena`, `Calificacion`, `Opinion`, `Visibilidad`, `Fecha`, `Titulo`) VALUES
(1, 1, 4, 'Me gusto, lo volveria a comprar', 1, '2024-03-08', 'Buen servicio');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `IDRol` varchar(20) NOT NULL,
  `Descripcion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`IDRol`, `Descripcion`) VALUES
('1', 'Administrador'),
('2', 'CRM'),
('3', 'Analista');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_usuario`
--

CREATE TABLE `rol_usuario` (
  `IDRol` varchar(20) NOT NULL,
  `CorreoEmpleado` varchar(64) NOT NULL,
  `FechaAsignacion` date NOT NULL,
  `FechaTerminacion` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `rol_usuario`
--

INSERT INTO `rol_usuario` (`IDRol`, `CorreoEmpleado`, `FechaAsignacion`, `FechaTerminacion`) VALUES
('1', 'admin', '0000-00-00', NULL),
('2', 'crm', '0000-00-00', NULL),
('3', 'analista', '0000-00-00', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `CorreoEmpleado` varchar(64) NOT NULL,
  `Nombre` varchar(30) NOT NULL,
  `Password` varchar(400) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`CorreoEmpleado`, `Nombre`, `Password`) VALUES
('admin', 'admin', '$2a$12$IKwi9bpyUjMEerqpAiY6NuPDHiGoMyIOXIUQrUh1.4Dy75WhnEKBy'),
('analista', 'analista', '$2a$12$d8lbV/YFnYxIO1YgBoPfluicqJZ1g05tN5TqFadhL7rLDMJ6wKeA6'),
('crm', 'crm', '$2a$12$hj4WHisTYkDZzGkE1bWN2eS.yNIskUmT0U5QPYWU4pTDDkLWZJ1Xe');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asignado`
--
ALTER TABLE `asignado`
  ADD KEY `FK_IDRol_idx` (`IDRol`),
  ADD KEY `IDPermiso_idx` (`IDPermiso`);

--
-- Indices de la tabla `compra`
--
ALTER TABLE `compra`
  ADD PRIMARY KEY (`IDCompra`),
  ADD UNIQUE KEY `IDCompra_UNIQUE` (`IDCompra`),
  ADD UNIQUE KEY `ItemCode_UNIQUE` (`ItemCode`),
  ADD UNIQUE KEY `CorreoComprador_UNIQUE` (`CorreoComprador`),
  ADD UNIQUE KEY `IDResena_UNIQUE` (`IDResena`);

--
-- Indices de la tabla `comprador`
--
ALTER TABLE `comprador`
  ADD PRIMARY KEY (`CorreoComprador`),
  ADD UNIQUE KEY `CorreoComprador_UNIQUE` (`CorreoComprador`);

--
-- Indices de la tabla `marca`
--
ALTER TABLE `marca`
  ADD PRIMARY KEY (`NombreMarca`),
  ADD UNIQUE KEY `NombreMarca_UNIQUE` (`NombreMarca`);

--
-- Indices de la tabla `permiso`
--
ALTER TABLE `permiso`
  ADD PRIMARY KEY (`IDPermiso`),
  ADD UNIQUE KEY `IDPermiso_UNIQUE` (`IDPermiso`);

--
-- Indices de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD PRIMARY KEY (`IDPreguntas`),
  ADD UNIQUE KEY `IDPreguntas_UNIQUE` (`IDPreguntas`),
  ADD KEY `FK_NombreMarca_idx` (`NombreMarca`);

--
-- Indices de la tabla `preguntas_resena`
--
ALTER TABLE `preguntas_resena`
  ADD KEY `FK_IDResena_idx` (`IDResena`),
  ADD KEY `IDPreguntas_idx` (`IDPreguntas`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`ItemCode`),
  ADD UNIQUE KEY `ItemCode_UNIQUE` (`ItemCode`),
  ADD UNIQUE KEY `NombreMarca_UNIQUE` (`NombreMarca`);

--
-- Indices de la tabla `resena`
--
ALTER TABLE `resena`
  ADD PRIMARY KEY (`IDResena`),
  ADD UNIQUE KEY `IDResena_UNIQUE` (`IDResena`),
  ADD UNIQUE KEY `ItemCode_UNIQUE` (`ItemCode`);

--
-- Indices de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD PRIMARY KEY (`IDRespuesta`),
  ADD UNIQUE KEY `IDRespuesta_UNIQUE` (`IDRespuesta`),
  ADD UNIQUE KEY `IDResena_UNIQUE` (`IDResena`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`IDRol`),
  ADD UNIQUE KEY `IDRol_UNIQUE` (`IDRol`);

--
-- Indices de la tabla `rol_usuario`
--
ALTER TABLE `rol_usuario`
  ADD KEY `CorreoEmpleado_idx` (`CorreoEmpleado`),
  ADD KEY `IDRol_idx` (`IDRol`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`CorreoEmpleado`),
  ADD UNIQUE KEY `CorreoEmpleado_UNIQUE` (`CorreoEmpleado`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `permiso`
--
ALTER TABLE `permiso`
  MODIFY `IDPermiso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  MODIFY `IDPreguntas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `resena`
--
ALTER TABLE `resena`
  MODIFY `IDResena` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  MODIFY `IDRespuesta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asignado`
--
ALTER TABLE `asignado`
  ADD CONSTRAINT `FK_IDRol` FOREIGN KEY (`IDRol`) REFERENCES `rol` (`IDRol`),
  ADD CONSTRAINT `IDPermiso` FOREIGN KEY (`IDPermiso`) REFERENCES `permiso` (`IDPermiso`);

--
-- Filtros para la tabla `compra`
--
ALTER TABLE `compra`
  ADD CONSTRAINT `CorreoComprador` FOREIGN KEY (`CorreoComprador`) REFERENCES `comprador` (`CorreoComprador`),
  ADD CONSTRAINT `FK2_IDResena` FOREIGN KEY (`IDResena`) REFERENCES `resena` (`IDResena`),
  ADD CONSTRAINT `FK_ItemCode` FOREIGN KEY (`ItemCode`) REFERENCES `producto` (`ItemCode`);

--
-- Filtros para la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD CONSTRAINT `FK_NombreMarca` FOREIGN KEY (`NombreMarca`) REFERENCES `marca` (`NombreMarca`);

--
-- Filtros para la tabla `preguntas_resena`
--
ALTER TABLE `preguntas_resena`
  ADD CONSTRAINT `FK_IDResena` FOREIGN KEY (`IDResena`) REFERENCES `resena` (`IDResena`),
  ADD CONSTRAINT `IDPreguntas` FOREIGN KEY (`IDPreguntas`) REFERENCES `preguntas` (`IDPreguntas`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `NombreMarca` FOREIGN KEY (`NombreMarca`) REFERENCES `marca` (`NombreMarca`);

--
-- Filtros para la tabla `resena`
--
ALTER TABLE `resena`
  ADD CONSTRAINT `ItemCode` FOREIGN KEY (`ItemCode`) REFERENCES `producto` (`ItemCode`);

--
-- Filtros para la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD CONSTRAINT `IDResena` FOREIGN KEY (`IDResena`) REFERENCES `resena` (`IDResena`);

--
-- Filtros para la tabla `rol_usuario`
--
ALTER TABLE `rol_usuario`
  ADD CONSTRAINT `CorreoEmpleado` FOREIGN KEY (`CorreoEmpleado`) REFERENCES `usuario` (`CorreoEmpleado`),
  ADD CONSTRAINT `IDRol` FOREIGN KEY (`IDRol`) REFERENCES `rol` (`IDRol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
