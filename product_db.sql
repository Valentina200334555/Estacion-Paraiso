-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3307
-- Tiempo de generación: 11-11-2024 a las 01:22:44
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
-- Base de datos: `product_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `documento` varchar(20) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `telefono` varchar(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`documento`, `nombres`, `direccion`, `telefono`) VALUES
('111234', 'maria', 'carrera 9', '4536999'),
('3333', 'Carlos', 'carrera 4 ', '3333333'),
('2003456', 'jose', 'carrera 3', '555555');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE `empleado` (
  `documento` varchar(20) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `salario` int(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`documento`, `nombres`, `direccion`, `telefono`, `salario`) VALUES
('2342', 'Alejandra', 'calle 20 cuidad del sol', '23566', 1499997),
('444', 'camila', 'carrera 9', '2222222', 222000),
('3456', 'Lucia', 'carrera 23# calle sol', '34578999', 2000000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`) VALUES
(62, 'Habitacion con vista al mar', 'Habitacion comoda para 3 personas con servicios incluidos', 100000.00),
(65, 'Habitacion familiar', 'habitacion para 4 personas', 200000.00),
(66, 'Habitacion premium', 'habitacion de 2 personas con jacuzzi', 350000.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id` int(11) NOT NULL,
  `documento` varchar(50) NOT NULL,
  `check_in` date NOT NULL,
  `check_out` date NOT NULL,
  `tipo_habitacion` enum('deluxe','suite con vista al mar','económica','suite de lujo','doble','familiar','premium') NOT NULL,
  `numero_personas` int(11) NOT NULL,
  `fecha_reserva` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id`, `documento`, `check_in`, `check_out`, `tipo_habitacion`, `numero_personas`, `fecha_reserva`) VALUES
(1, '111234', '2024-11-10', '2024-11-10', 'deluxe', 2, '2024-11-10 14:49:58'),
(4, '2222', '2024-11-10', '2024-11-10', 'familiar', 4, '2024-11-10 15:04:02'),
(5, '111234', '2024-11-10', '2024-11-10', 'doble', 3, '2024-11-10 15:35:01'),
(6, '111234', '2024-11-10', '2024-11-10', 'doble', 3, '2024-11-10 15:35:06'),
(9, '111234', '2024-11-10', '2024-11-10', 'doble', 8, '2024-11-10 15:40:19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`) VALUES
(1, 'maria', '$2b$10$Jq7BflgGs6D7S5Qj9gFkuOZxYms/FrhLg/5Vomd9xZlgdl7MJDud6', 'admin'),
(2, 'Sofia', '$2b$10$UleMw3YoPdWs4Z4ohr0zf.dBRfhKzkMY0HlYgOZS2Zy2j0m2R/JdC', 'user'),
(7, 'valentina', '$2b$10$CYbSFr1IIXBjdgtIztYmnOuR.mM7mXB0gnNi1QrWPF08iIVbAUHfC', 'user'),
(11, 'sara', '$2b$10$YJQfjikPRkb/JdgpDGW//ec0I5XIf09u7ej8aUgj/LY9KJLRpnh9W', 'admin'),
(19, 'pablo', '$2b$10$WVi4QeIFqO6e4b9EBN2di.30EE2hLZzGafRDASGsKeWD5.aDUWYhS', 'user'),
(23, 'pedro', '$2b$10$uI3l0rkCfu1DP9zMmEgc/OKcnsrtJvMNAcHSENtq1z2VYdh4umP4.', 'user');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`documento`),
  ADD UNIQUE KEY `documento` (`documento`);

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`documento`),
  ADD UNIQUE KEY `documento` (`documento`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
