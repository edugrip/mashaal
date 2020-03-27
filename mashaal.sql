-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 27, 2020 at 04:07 PM
-- Server version: 8.0.19-0ubuntu0.19.10.3
-- PHP Version: 7.2.24-0ubuntu0.19.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mashaal`
--

-- --------------------------------------------------------

--
-- Table structure for table `error_codes`
--

CREATE TABLE `error_codes` (
  `id` int NOT NULL,
  `error_code` varchar(1000) NOT NULL,
  `type` tinyint NOT NULL,
  `message` varchar(1000) NOT NULL,
  `severity` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `error_codes`
--

INSERT INTO `error_codes` (`id`, `error_code`, `type`, `message`, `severity`) VALUES
(1, 'ER_PARSE_ERROR', 1, 'iyiuyiuyiuyh', 1);

-- --------------------------------------------------------

--
-- Table structure for table `query_comments`
--

CREATE TABLE `query_comments` (
  `id` int NOT NULL,
  `query_id` int NOT NULL,
  `comment` varchar(2000) NOT NULL,
  `commentator_id` int NOT NULL,
  `parent` int NOT NULL,
  `comment_type` varchar(1) NOT NULL COMMENT 'comment type can be of types: 1. Ask for more info( q) 2. comment (c) 3. Solution (s) ',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `query_comments`
--

INSERT INTO `query_comments` (`id`, `query_id`, `comment`, `commentator_id`, `parent`, `comment_type`) VALUES
(1, 1, 'testing', 1, 0, 's'),
(2, 1, 'testing', 1, 1, 's'),
(3, 1, 'testing', 1, 2, 's'),
(4, 1, 'testing', 1, 1, 's'),
(5, 1, 'testing', 1, 3, 's');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_error`
--

CREATE TABLE `tbl_error` (
  `id` int NOT NULL,
  `error` varchar(500) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_error`
--

INSERT INTO `tbl_error` (`id`, `error`) VALUES
(1, 'test error');

-- --------------------------------------------------------

--
-- Table structure for table `temporary_queries`
--

CREATE TABLE `temporary_queries` (
  `id` int NOT NULL,
  `email` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `complaint` varchar(30) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `temporary_queries`
--

INSERT INTO `temporary_queries` (`id`, `email`, `complaint`) VALUES
(1, 's:w1W5D5A187fRIl3HC5WToEP82vRd5JuN.a28R3KfP/3ZlMSnaauwL/tAeHvdaWr6nZT/YWkz8Zss', 'eawsefd'),
(2, 's:HO16OerKLDRLln-NMDb7pivm5LGBMJmN.7F4sQqTAaLmubgGHiwEErdDYDm2R/BBAjDHkNbKmxZM', 'kwlf'),
(3, 's:CdL6bdsd5sZxJQr2NPqoZwZ11zC0rHcX.dk3PiZPKl2jTjAAhLaOIVLygLUYAOHQpB7s7/WktrO8', 'ewf'),
(4, 's:Zi8eIDRJUVJ7URSOwUDvC1Ze72e1Y8wr.CkueO993C6guQzldj9YNSHFM2tXTtADK3Js9eXD3UrE', 'sa'),
(5, 's:rDQ-LpGOeInEVsLS0j8dROZ8JaGAf6sE.JeMwIkCGktN2otiq7CQ1fibldgBx2BgIiuaLGMNNkVI', 'ed'),
(6, 's:_RCtnynh5uPo9OzrSAA0F9o48plmP-Cz.E7BQc3lo89S5k0hyo+5N8/Wg5n5vJcH1bQ6aHO7u92U', 'qew'),
(7, 's:2vvvQ-zUOlnmL7HI7twAj9qgeqhahp1j.8OdG/i+3nUUhKBvrnl+Ck47G768oL34svlXaLCNEq9I', 'asdf'),
(8, 's:bGREyElcXST2pvEP-TPYdOq68C-Z6cwC.RsjBfkwKlz/8CAWhJk8I1IdyDkBdelPbq4054Tp+2hE', 'dew'),
(9, 's:5GHKW9vmqbzZHkQfLzHw8vgDmsmTkXYC.kJr37Qp73HU4c1oGe/q4zBnnamAKdcS311ESt+ZApS8', 'fwefds'),
(10, 's:y5tvchtTDsIwe8p--NHQ2I0XfyvT5MId.eJQ7ay6t3T5Ds4BZ3A2Rzw/BMRKo3bA0LRw9hL1fhok', 'kkjjj'),
(11, 's:y5tvchtTDsIwe8p--NHQ2I0XfyvT5MId.eJQ7ay6t3T5Ds4BZ3A2Rzw/BMRKo3bA0LRw9hL1fhok', 'kjj'),
(12, 's:yCy2IMllYH4TAQDpkqQf389DSXktqEd9.E7fkwHGSaiPzyKEokaKbrDmbdfROJy4zA7Jt63yqSgg', 'e5t4er'),
(13, 's:YIZ59CPv51rijLPYM-zMYLZAQqcVa-9h.08OQX+RArsO3rBEnS25AJ9f+nEZstzEwDs/meC4iHbY', 'sdf'),
(14, 's:YrIz3TgH7evdb0l2g1yt23qpWcwStRQt.xX1ktUg0stNd7TtF2X9MCexEm1UiBo/NQHoLFRWQf7U', 'dsk'),
(15, 's:bG-CMQUXypnxpRlxUPzTSPgeX38P8sCS.NFq1hl47OV/aFNWJ1SlRBikX2EQ4JsPrp0O2b381GrM', 'asdf'),
(16, 's:dF4serGz-fM-qAq0dIKB3yndnI6KoGhm.2VwKbaJUH8rlhAke1qS7lBuBcxS5uvF1ZYLjCiBcUxM', 'testing'),
(17, 's:-IklCiW8W5veZ4_Oxe23ugSqcz53MavV.swZ8B2Z8l3K3LljoPkGBr29B2TpYL9yR6ANc0zC1JMk', 'testing'),
(18, 's:3qlK8ad6cBbem1iRg6L2mWjQ6SlMt1g8.L1N6tEvjv0nCNbc/LWKAAPRDxXTDxPEy2gFOx1cDFx0', 'krishan'),
(19, 's:ig_JCAGifLJdqDVJsJZs_MJZ53I-RobN.FcCZK1qOgRLcE05G71NAYWBuu4GmZo+lbTB9KQL7HCs', 'ewd'),
(20, 's:ZXJ4k3jE9EoBn0QHHS4oKtVcNpbLChhJ.mODRRxk9rkFc/GN9Cf9HjxH87UcwlhkrO7HB5iUtyas', 'idihsfa'),
(36, 's:BlhBj498ImcXlkoYvEMG3wFogUdf3qvx.sjltFO/hRmKIGQEjDmBovvg58lvAl2xdBBQYMhmJUVw', 'testing');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `password` varchar(30) DEFAULT NULL,
  `role` tinyint(1) NOT NULL DEFAULT '0',
  `token` varchar(1000) DEFAULT NULL,
  `verified` int DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `token`, `verified`) VALUES
(1, 'krishan', 'test@gmail.com', '1234', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtyaXNoYW5zb2toYWwyMDAwQGdtYWlsLmNvbSIsImlhdCI6MTU4NDEwNjQzMiwiZXhwIjoxNTg3MTA2NDMyfQ.ssayRuTZc1dssKK2hAWPo6fRTzFnGqpkW-2SL3DpPD0', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_queries`
--

CREATE TABLE `user_queries` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `complaint` varchar(5000) NOT NULL,
  `status` int NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_queries`
--

INSERT INTO `user_queries` (`id`, `user_id`, `complaint`, `status`) VALUES
(1, 1, 'idihsfa1235f', 1),
(2, 1, 'krishan', 2),
(3, 1, 'testing', 1),
(4, 1, 'djshg', 1),
(5, 1, 'fwskdhj', 0),
(6, 1, 'kerwlfd', 0),
(7, 1, 'sda', 0),
(8, 1, 'hdksfj', 0),
(9, 1, 'ed', 0),
(10, 1, 'sfd', 0),
(11, 1, 'ersdgf', 0),
(12, 1, 'sdf', 0),
(13, 1, 'sdj', 0),
(14, 1, 'edffds', 0),
(15, 1, 'vkjlblc', 0),
(16, 1, 'krishan', 0),
(17, 1, 'krishan', 0),
(18, 1, 'testing', 0),
(19, 1, 'testing', 0),
(20, 1, 'krishan', 0),
(21, 1, 'asd', 0),
(22, 1, 'refdsf', 0),
(23, 1, 'jksdgc', 0),
(24, 1, 'nhadsfkj', 0),
(25, 1, 'kjlhgfd', 0),
(26, 1, 'asdf', 0),
(27, 1, 'jfsd', 0),
(28, 1, 'kedfs', 0),
(29, 1, 'dfdjas', 0),
(30, 1, 'dasz', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `error_codes`
--
ALTER TABLE `error_codes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `query_comments`
--
ALTER TABLE `query_comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_error`
--
ALTER TABLE `tbl_error`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `temporary_queries`
--
ALTER TABLE `temporary_queries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_queries`
--
ALTER TABLE `user_queries`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `error_codes`
--
ALTER TABLE `error_codes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `query_comments`
--
ALTER TABLE `query_comments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `tbl_error`
--
ALTER TABLE `tbl_error`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `temporary_queries`
--
ALTER TABLE `temporary_queries`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `user_queries`
--
ALTER TABLE `user_queries`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
