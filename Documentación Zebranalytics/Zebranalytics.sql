SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: zebranalytic_zebranalytics
--

-- --------------------------------------------------------
DELIMITER $$
--
-- Procedures
--
CREATE PROCEDURE agregarImagenMarca (IN unombre VARCHAR(255), IN uimagen VARCHAR(255))   BEGIN
    INSERT INTO imagenmarca VALUES (unombre, uimagen);
END$$

CREATE PROCEDURE crearUsuario (IN uCorreo VARCHAR(64), IN uNombre VARCHAR(30), IN uPassword VARCHAR(400), IN uIDRol INT)   BEGIN
	INSERT INTO usuario (CorreoEmpleado, Nombre, Password) VALUES (uCorreo, uNombre, uPassword);
	INSERT INTO rol_usuario (IDRol, CorreoEmpleado, FechaAsignacion) VALUES (uIDRol, uCorreo, CURRENT_DATE());
END$$

CREATE PROCEDURE deleteRol (IN uRolID INT)   BEGIN
	UPDATE rol_usuario SET IDRol = 0 WHERE IDRol = uRolID;
    DELETE FROM rol_usuario WHERE IDRol = uRolID;
    DELETE FROM asignado WHERE IDRol = uRolID;
    DELETE FROM rol WHERE IDRol = uRolID;
    SELECT @max_id := MAX(IDRol) FROM rol;
    SET @alter_statement = CONCAT('ALTER TABLE rol AUTO_INCREMENT = ', @max_id + 1);
    PREPARE stmt FROM @alter_statement;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

CREATE PROCEDURE deleteUsuario (IN uCorreo VARCHAR(64))   BEGIN
    DELETE FROM rol_usuario WHERE CorreoEmpleado = uCorreo COLLATE utf8mb4_unicode_ci;
    DELETE FROM usuario WHERE CorreoEmpleado = uCorreo COLLATE utf8mb4_unicode_ci;
END$$

CREATE PROCEDURE editName (IN uNombreMarca VARCHAR(50), IN uNuevoNombre VARCHAR(50))   BEGIN
	SET FOREIGN_KEY_CHECKS = 0;
	UPDATE imagenmarca SET nombre = uNuevoNombre WHERE nombre = uNombreMarca COLLATE utf8mb4_unicode_ci;
    UPDATE preguntas SET NombreMarca = uNuevoNombre WHERE NombreMarca = uNombreMarca COLLATE utf8mb4_unicode_ci;
    UPDATE categorias SET nombre_marca = uNuevoNombre WHERE nombre_marca = uNombreMarca COLLATE utf8mb4_unicode_ci;
    SET FOREIGN_KEY_CHECKS = 1;
    
END$$

CREATE PROCEDURE eliminarMarca (IN uNombreMarca VARCHAR(50))   BEGIN
	DELETE FROM opciones_pregunta WHERE IDPreguntas IN (SELECT IDPreguntas FROM preguntas WHERE NombreMarca = uNombreMarca COLLATE utf8mb4_unicode_ci);
    DELETE FROM preguntas WHERE NombreMarca = uNombreMarca COLLATE utf8mb4_unicode_ci;
	DELETE FROM categorias WHERE nombre_marca = uNombreMarca COLLATE utf8mb4_unicode_ci;
    DELETE FROM imagenmarca WHERE nombre = uNombreMarca COLLATE utf8mb4_unicode_ci;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table asignado
--

CREATE TABLE asignado (
  IDRol int(11) NOT NULL,
  IDPermiso int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table asignado
--


-- --------------------------------------------------------

--
-- Table structure for table bitacoraModificaPregunta
--

CREATE TABLE bitacoraModificaPregunta (
  IDbitacoraEditaPreguntas int(11) NOT NULL,
  IDpregunta int(11) NOT NULL,
  PreguntaAnterior varchar(400) DEFAULT NULL,
  PreguntaNueva varchar(400) DEFAULT NULL,
  Correo varchar(400) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table bitacoraRespuestas
--

CREATE TABLE bitacoraRespuestas (
  IDResena int(11) NOT NULL,
  Pregunta varchar(150) DEFAULT NULL,
  Respuesta varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table categorias
--

CREATE TABLE categorias (
  categoria_id int(11) NOT NULL,
  categoria_nombre varchar(50) NOT NULL,
  nombre_marca varchar(50) NOT NULL,
  TiempoEncuesta int(11) DEFAULT 15,
  header varchar(255) DEFAULT NULL,
  footer varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table imagenmarca
--

CREATE TABLE imagenmarca (
  nombre varchar(50) NOT NULL,
  imagen varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table opciones_pregunta
--

CREATE TABLE opciones_pregunta (
  IDopcion int(11) NOT NULL,
  IDPreguntas int(11) NOT NULL,
  TextoOpcion varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table permiso
--

CREATE TABLE permiso (
  IDPermiso int(11) NOT NULL,
  Accion varchar(100) NOT NULL,
  Descripcion varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table permiso
--


-- --------------------------------------------------------

--
-- Table structure for table preguntas
--

CREATE TABLE preguntas (
  IDPreguntas int(11) NOT NULL,
  EstadoObligatorio tinyint(4) NOT NULL,
  TipoPregunta varchar(50) NOT NULL,
  Pregunta varchar(150) NOT NULL,
  Categoria varchar(50) NOT NULL,
  NombreMarca varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Triggers preguntas
--

DELIMITER $$
CREATE TRIGGER editaPregunta AFTER UPDATE ON preguntas FOR EACH ROW BEGIN
    IF OLD.Pregunta <> NEW.Pregunta THEN
        INSERT INTO bitacoraModificaPregunta(IDpregunta, PreguntaAnterior, PreguntaNueva, Correo)
        VALUES (NEW.IDPreguntas, OLD.Pregunta, NEW.Pregunta, @updating_user);
    END IF;
END
$$
DELIMITER ;


-- --------------------------------------------------------

--
-- Table structure for table producto
--

CREATE TABLE producto (
  ItemCode varchar(20) NOT NULL,
  NombreMarca varchar(20) NOT NULL,
  WebsiteIMG varchar(800) NOT NULL,
  Title varchar(60) NOT NULL,
  Description varchar(400) NOT NULL,
  WebName varchar(20) NOT NULL,
  Nombre varchar(255) NOT NULL,
  categoria_nombre varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table resena
--

CREATE TABLE resena (
  IDResena int(11) NOT NULL,
  ItemCode varchar(20) NOT NULL,
  EstadoContestacion tinyint(1) DEFAULT 0,
  FechaContestacion date DEFAULT NULL,
  correoComprador varchar(100) NOT NULL,
  calificacion int(11) DEFAULT NULL,
  Visibilidad tinyint(1) DEFAULT NULL,
  flagged tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table rol
--

CREATE TABLE rol (
  IDRol int(11) NOT NULL,
  Descripcion varchar(200) NOT NULL,
  creadoPor varchar(400) DEFAULT NULL,
  createdAt timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table rol
--


-- --------------------------------------------------------

--
-- Table structure for table usuario
--

CREATE TABLE usuario (
  CorreoEmpleado varchar(100) NOT NULL,
  Nombre varchar(100) NOT NULL,
  Password varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table usuario
--

-- --------------------------------------------------------

--
-- Table structure for table rol_usuario
--

CREATE TABLE rol_usuario (
  IDRol int(11) NOT NULL,
  CorreoEmpleado varchar(100) NOT NULL,
  FechaAsignacion date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table rol_usuario
--


-- --------------------------------------------------------

--
-- Table structure for table venta
--

CREATE TABLE venta (
  id int(11) NOT NULL,
  created_at timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  name varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  last_name varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  email varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  itemCode varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table asignado
--
ALTER TABLE asignado
  ADD KEY IDPermiso (IDPermiso),
  ADD KEY IDRol (IDRol) USING BTREE;

--
-- Indexes for table bitacoraModificaPregunta
--
ALTER TABLE bitacoraModificaPregunta
  ADD PRIMARY KEY (IDbitacoraEditaPreguntas);

--
-- Indexes for table bitacoraRespuestas
--
ALTER TABLE bitacoraRespuestas
  ADD KEY fk_bitacoraRespuestas_resena (IDResena);

--
-- Indexes for table categorias
--
ALTER TABLE categorias
  ADD PRIMARY KEY (categoria_id),
  ADD KEY fk_Categorias_nombreMarca (nombre_marca);

--
-- Indexes for table imagenmarca
--
ALTER TABLE imagenmarca
  ADD PRIMARY KEY (nombre),
  ADD UNIQUE KEY id_UNIQUE (nombre);

--
-- Indexes for table opciones_pregunta
--
ALTER TABLE opciones_pregunta
  ADD PRIMARY KEY (IDopcion),
  ADD KEY IDPreguntas_idx (IDPreguntas);

--
-- Indexes for table permiso
--
ALTER TABLE permiso
  ADD PRIMARY KEY (IDPermiso);

--
-- Indexes for table preguntas
--
ALTER TABLE preguntas
  ADD PRIMARY KEY (IDPreguntas),
  ADD UNIQUE KEY IDPreguntas_UNIQUE (IDPreguntas),
  ADD KEY fk_preguntas_nombreMarca (NombreMarca);

--
-- Indexes for table producto
--
ALTER TABLE producto
  ADD PRIMARY KEY (ItemCode),
  ADD KEY producto_fk_categoria (categoria_nombre);

--
-- Indexes for table resena
--
ALTER TABLE resena
  ADD PRIMARY KEY (IDResena),
  ADD UNIQUE KEY IDResena_UNIQUE (IDResena);
ALTER TABLE resena ADD FULLTEXT KEY ItemCode (ItemCode);

--
-- Indexes for table rol
--
ALTER TABLE rol
  ADD UNIQUE KEY Descripcion (Descripcion),
  ADD KEY IDRol (IDRol) USING BTREE;

--
-- Indexes for table rol_usuario
--
ALTER TABLE rol_usuario
  ADD UNIQUE KEY CorreoEmpleado (CorreoEmpleado),
  ADD KEY IDRol (IDRol) USING BTREE;

--
-- Indexes for table usuario
--
ALTER TABLE usuario
  ADD PRIMARY KEY (CorreoEmpleado);

--
-- Indexes for table venta
--
ALTER TABLE venta
  ADD PRIMARY KEY (id);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table bitacoraModificaPregunta
--
ALTER TABLE bitacoraModificaPregunta
  MODIFY IDbitacoraEditaPreguntas int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table categorias
--
ALTER TABLE categorias
  MODIFY categoria_id int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table opciones_pregunta
--
ALTER TABLE opciones_pregunta
  MODIFY IDopcion int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table permiso
--
ALTER TABLE permiso
  MODIFY IDPermiso int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table preguntas
--
ALTER TABLE preguntas
  MODIFY IDPreguntas int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table resena
--
ALTER TABLE resena
  MODIFY IDResena int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table rol
--
ALTER TABLE rol
  MODIFY IDRol int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table venta
--
ALTER TABLE venta
  MODIFY id int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table asignado
--
ALTER TABLE asignado
  ADD CONSTRAINT asignado_FK_1 FOREIGN KEY (IDRol) REFERENCES rol (IDRol),
  ADD CONSTRAINT asignado_FK_2 FOREIGN KEY (IDPermiso) REFERENCES permiso (IDPermiso),
  ADD CONSTRAINT fk_asignado_permiso FOREIGN KEY (IDPermiso) REFERENCES permiso (IDPermiso),
  ADD CONSTRAINT fk_asignado_rol FOREIGN KEY (IDRol) REFERENCES rol (IDRol);

--
-- Constraints for table bitacoraRespuestas
--
ALTER TABLE bitacoraRespuestas
  ADD CONSTRAINT fk_bitacoraRespuestas_IDResena FOREIGN KEY (IDResena) REFERENCES resena (IDResena),
  ADD CONSTRAINT fk_bitacoraRespuestas_resena FOREIGN KEY (IDResena) REFERENCES resena (IDResena);

--
-- Constraints for table categorias
--
ALTER TABLE categorias
  ADD CONSTRAINT fk_Categorias_nombreMarca FOREIGN KEY (nombre_marca) REFERENCES imagenmarca (nombre),
  ADD CONSTRAINT fk_categorias_imagenmarca FOREIGN KEY (nombre_marca) REFERENCES imagenmarca (nombre),
  ADD CONSTRAINT fk_categorias_nombre_marca FOREIGN KEY (nombre_marca) REFERENCES imagenmarca (nombre);

--
-- Constraints for table opciones_pregunta
--
ALTER TABLE opciones_pregunta
  ADD CONSTRAINT fk_opcionesPregunta_preguntas FOREIGN KEY (IDPreguntas) REFERENCES preguntas (IDPreguntas),
  ADD CONSTRAINT fk_opciones_pregunta_preguntas FOREIGN KEY (IDPreguntas) REFERENCES preguntas (IDPreguntas);

--
-- Constraints for table preguntas
--
ALTER TABLE preguntas
  ADD CONSTRAINT fk_preguntas_imagenMarca FOREIGN KEY (NombreMarca) REFERENCES imagenmarca (nombre),
  ADD CONSTRAINT fk_preguntas_nombreMarca FOREIGN KEY (NombreMarca) REFERENCES imagenmarca (nombre);

--
-- Constraints for table rol_usuario
--
ALTER TABLE rol_usuario
  ADD CONSTRAINT fk_rol_usuario_correo FOREIGN KEY (CorreoEmpleado) REFERENCES usuario (CorreoEmpleado),
  ADD CONSTRAINT fk_rol_usuario_rol FOREIGN KEY (IDRol) REFERENCES rol (IDRol);
  

INSERT INTO permiso (IDPermiso, Accion, Descripcion) VALUES
(0, 'sinAsignar', 'Rol no asignado'),
(1, 'modificarUsuario', 'Permitir modificar usuarios'),
(2, 'actualizaReview', 'Permitir modificar encuestas'),
(3, 'verAnaliticas', 'Permitir ver las analíticas');

--
INSERT INTO usuario (CorreoEmpleado, Nombre, Password) VALUES
('A01706616@tec.mx', 'Majo', '$2a$12$sFrJUrL1OyRimIaJHoV6leVtKG0CSnJLYpqcQlIZtJQsKb2eOOl.y'),
('A01710441@tec.mx', 'Daniel', '$2a$12$fEQUkDmHupZ2GcYlq5jy8eHbRA.RNbd1OvAuRcXdixJzDmrgQYqAS'),
('A01710550@tec.mx', 'Maxime Vilcocq', '$2a$12$1G1CdQ3elGKaDFUjeVIL/eP6F0V7Vz6wPj7YArnlg1/99XzdBSAh2'),
('a01710608@tec.mx', 'Daniel Contreras', '$2a$12$N6VJzAgoEXg/wxwIf2qRdeX8ReP3mKkkxp/ymsneJ3ZH2BLjllLbK'),
('A01710704@tec.mx', 'Ethan Luna', '$2a$12$9l9kq5Pqbk1EDUKxZaVUJ.jHkykdSbLyWkzmkJufNgksAg5X.d/mi'),
('ivan.celis@zeb.mx', 'Ivan Celis', '$2a$12$2cE6mgAfuUUz/x.GRwucwe9x.UfkiCvhb/6CIXAIfa/qBho3BRpoq');
--
INSERT INTO rol (IDRol, Descripcion, creadoPor, createdAt) VALUES
(1, 'Administrador', '', '2024-04-15'),
(3, 'Analista', '', '2024-04-15'),
(2, 'CRM', '', '2024-04-15'),
(0, 'Rol no asignado', '', '2024-04-15');

INSERT INTO rol_usuario (IDRol, CorreoEmpleado, FechaAsignacion) VALUES
(1, 'A01706616@tec.mx', '2024-04-16'),
(1, 'A01710441@tec.mx', '2024-05-01'),
(1, 'A01710550@tec.mx', '2024-04-18'),
(1, 'a01710608@tec.mx', '2024-04-16'),
(1, 'A01710704@tec.mx', '2024-04-18'),
(1, 'ivan.celis@zeb.mx', '2024-04-17');

INSERT INTO asignado (IDRol, IDPermiso) VALUES
(1, 2),
(1, 3),
(2, 2),
(2, 3),
(0, 0),
(1, 1),
(3, 3);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

