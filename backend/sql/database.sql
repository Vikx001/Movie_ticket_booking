-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 10, 2024 at 02:46 PM
-- Server version: 11.1.3-MariaDB
-- PHP Version: 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `studio_ghibil`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `learning_outcomes` text DEFAULT NULL,
  `course_inclusions` text DEFAULT NULL,
  `is_certified` int(11) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `course_content` text NOT NULL,
  `status` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `total_enrollments` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `user_id`, `title`, `description`, `learning_outcomes`, `course_inclusions`, `is_certified`, `author`, `course_content`, `status`, `rating`, `total_enrollments`, `created_at`, `updated_at`) VALUES
(3, NULL, 'My Course 11', 'My Course Description 1', '\"LO Line 1 \\nLO Line 2\\nLO Line 3\"', '\"CI Line 1\\nCI Line 2\\nCI Line 3\"', 1, 'John Doe', 'http://www.youtube.com', 1, 0, 0, '2024-02-10 00:21:39', '2024-02-10 02:27:44'),
(4, NULL, 'My Course 1', 'My Course Description', '\"LO Line 1 \\r\\n LO Line 2 \\r\\n LO Line 3 \\r\\n\"', '\"CI Line 1 \\r\\n CI Line 2 \\r\\n CI Line 3 \\r\\n\"', 1, 'John Doe', 'http://www.youtube.com', 1, 0, 0, '2024-02-10 00:22:47', '2024-02-10 00:22:47'),
(5, NULL, 'Quisquam similique a', 'Dolor proident exce', '\"Officia ratione ipsa\"', '\"Necessitatibus exerc\"', 0, 'Aperiam molestiae to', 'Obcaecati duis omnis', -1, 0, 0, '2024-02-10 01:13:47', '2024-02-10 02:41:05');

-- --------------------------------------------------------

--
-- Table structure for table `course_categories`
--

CREATE TABLE `course_categories` (
  `id` int(11) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `course_categories`
--

INSERT INTO `course_categories` (`id`, `slug`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'animation', 'Animation', 1, '2024-02-10 11:42:37', '2024-02-10 11:42:37'),
(2, 'film-and-video', 'Film & Video', 1, '2024-02-10 11:42:37', '2024-02-10 11:42:37'),
(3, '2d-animation', '2D Animation', 1, '2024-02-10 11:43:38', '2024-02-10 11:43:38'),
(4, '2d-painting', '2D Painting', 1, '2024-02-10 11:43:38', '2024-02-10 11:43:38'),
(5, 'open-toonz', 'Open Toonz', 1, '2024-02-10 11:46:09', '2024-02-10 11:46:09'),
(6, 'stylized-scene', 'Stylized Scene', 1, '2024-02-10 11:46:09', '2024-02-10 11:46:09'),
(7, 'surrealism', 'Surrealism', 1, '2024-02-10 11:47:19', '2024-02-10 11:47:19'),
(8, 'formative', 'Formative', 1, '2024-02-10 11:47:19', '2024-02-10 11:47:19'),
(9, 'fine-arts', 'Fine Arts', 1, '2024-02-10 11:47:54', '2024-02-10 11:47:54'),
(10, 'illustration', 'Illustration', 1, '2024-02-10 11:47:54', '2024-02-10 11:47:54');

-- --------------------------------------------------------

--
-- Table structure for table `course_contents`
--

CREATE TABLE `course_contents` (
  `id` int(11) NOT NULL,
  `course_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `course_content` text DEFAULT NULL,
  `duration` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `phone_no` varchar(50) DEFAULT NULL,
  `area_of_interests` text DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `user_id`, `full_name`, `phone_no`, `area_of_interests`, `status`, `created_at`, `updated_at`) VALUES
(13, 50, 'Super Administrator', '588576884', '', 1, '2024-02-09 15:45:53', '2024-02-09 15:45:53'),
(14, 51, 'Super Administrator', '588576884', '', 1, '2024-02-09 15:59:04', '2024-02-09 15:59:04');

-- --------------------------------------------------------

--
-- Table structure for table `enrollments`
--

CREATE TABLE `enrollments` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `payment_status` int(11) DEFAULT NULL,
  `enrollment_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `securitylogs`
--

CREATE TABLE `securitylogs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `ip_address` varchar(100) DEFAULT NULL,
  `last_login` date DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email_id` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email_id`, `password`, `role`, `status`, `created_at`, `updated_at`) VALUES
(23, 'admin@admin.com', '$2b$10$QgmWr73495bzYEYtXvfyIODV8/x93Ig64Pfz3BhkPHrlhsut8P0Gy', 'admin', 1, '2024-02-08 15:06:33', '2024-02-08 15:06:33'),
(24, 'admin1@admin.com', '$2b$10$x.e3D0lS88oVA782h5EJd.O/mrJNVieRaXGGWOWm8h7bzOBMy45JC', 'admin', 1, '2024-02-08 15:34:38', '2024-02-08 15:34:38'),
(25, 'admin2@admin.com', '$2b$10$aSJaQcp8kAcDQTeQH8U.FOlinA9FlMfy57GWYMAENhu5KFTb1uXYS', 'admin', 1, '2024-02-08 16:36:10', '2024-02-08 16:36:10'),
(26, 'admin3@admin.com', '$2b$10$Tyk.MK6jy6.xxLSlTdvmuulAfTdresS1AGBP97nzrMZbo/sUc/sPq', 'admin', 1, '2024-02-08 16:42:47', '2024-02-08 16:42:47'),
(27, 'admin5@admin.com', '$2b$10$zAPFSomQrJylplfV5mp9Z.xKAmhew7eqAdz4VMVwebmV1lEAopCdC', 'admin', 1, '2024-02-08 17:27:52', '2024-02-08 17:27:52'),
(28, 'admin8@admin.com', '$2b$10$fCRDJyhn9a09wuAtVk4Qnu5lxFWqSb4eOU304GeqJLVP9n5c63W2.', 'admin', 1, '2024-02-09 15:00:59', '2024-02-09 15:00:59'),
(29, 'admin9@admin.com', '$2b$10$JUMb0NZuEmbhNu84TrkJ1.pzWjrXAw3qmXiu99.GTxHPPg2gTJmde', 'admin', 1, '2024-02-09 15:01:15', '2024-02-09 15:01:15'),
(30, 'admin10@admin.com', '$2b$10$TZKreJiCh.4A/bgzZ4VGAO.QFOTP2JviCqc1YUQCs5MiLuRth0Rrq', 'admin', 1, '2024-02-09 15:02:35', '2024-02-09 15:02:35'),
(31, 'admin11@admin.com', '$2b$10$pTAF0ggC8.VB9w.4EqAgjeSVf8Hk6vGu6mexLTbmsUJcRM6MYk72a', 'admin', 1, '2024-02-09 15:03:09', '2024-02-09 15:03:09'),
(32, 'admin12@admin.com', '$2b$10$mjEfWVqdFbyfVfR5EwmZceDHdvQNIGzPuYDMFsOS4Ia5xM7.VBGoS', 'admin', 1, '2024-02-09 15:03:54', '2024-02-09 15:03:54'),
(33, 'admin13@admin.com', '$2b$10$K55UpLaQq/AT8B2HrGv3N.PEYi3VAfQeGHes3.4ca8J5MU9LigqP.', 'admin', 1, '2024-02-09 15:05:34', '2024-02-09 15:05:34'),
(34, 'admin14@admin.com', '$2b$10$8pVPojoHX2PeU6GEjjAKAuZJI89ZZD3hpBIvB8FbDuQOvcwSF4Z0O', 'admin', 1, '2024-02-09 15:08:35', '2024-02-09 15:08:35'),
(35, 'admin15@admin.com', '$2b$10$5ehRu6yfMZ8wt.Doeo9hE.NU6PbHQNmTAH3etBXR6HL0M45Cao0/u', 'admin', 1, '2024-02-09 15:13:33', '2024-02-09 15:13:33'),
(36, 'admin16@admin.com', '$2b$10$IxOkg1AntfhenBh4txsgyOXYpVbodPTefo97L8w39qy24Z8oHplpK', 'admin', 1, '2024-02-09 15:14:01', '2024-02-09 15:14:01'),
(37, 'admin17@admin.com', '$2b$10$CA0rdNM3oxTlxPIGqvy2oe.F67Ozoel6pJy9pyXOPCk7cWMly0l9C', 'admin', 1, '2024-02-09 15:15:56', '2024-02-09 15:15:56'),
(38, 'admin18@admin.com', '$2b$10$Q4qhVe9Uc0MVci8dotOqJuzw3xdqe7VnpIhPhkyxYGmujnmgNB73G', 'admin', 1, '2024-02-09 15:17:41', '2024-02-09 15:17:41'),
(39, 'admin19@admin.com', '$2b$10$YYz4PPKKTs4QlyRXiFLPtuHqrW9uuZIhAxv6ZRT1llSSqwZMxdNkm', 'admin', 1, '2024-02-09 15:18:50', '2024-02-09 15:18:50'),
(40, 'admin20@admin.com', '$2b$10$dJZH4yVE09Uv1Mns6jupeORbknK0uqOyYbGR4ZKJA0JGm/HJq9Msq', 'admin', 1, '2024-02-09 15:18:59', '2024-02-09 15:18:59'),
(41, 'admin21@admin.com', '$2b$10$X5iAKcZo1NBKAaEOPle6meTwxRJqe9txi1sNjt6ud9wR35jZxvwla', 'admin', 1, '2024-02-09 15:20:04', '2024-02-09 15:20:04'),
(42, 'admin22@admin.com', '$2b$10$1jPbbgY.sfd4xNVO3mBUNO7B6kohyWIg9OYqKXDSo2evKyPJ0GpCe', 'admin', 1, '2024-02-09 15:21:18', '2024-02-09 15:21:18'),
(43, 'admin23@admin.com', '$2b$10$.jUv5cNZmnaUnNk8JaIR0.zw94GqKmNSW8dqXfURPt.dEnQ5IXvnC', 'admin', 1, '2024-02-09 15:21:36', '2024-02-09 15:21:36'),
(44, 'admin24@admin.com', '$2b$10$WhFb1TrAeOKA0lSBH3NUzOkDSIAKxEsiCtDeHn9Rtc.Y1iitxdJpK', 'admin', 1, '2024-02-09 15:23:29', '2024-02-09 15:23:29'),
(45, 'admin25@admin.com', '$2b$10$J3Tfje0S1cMCAtmHMt7qe.6NQG5b98SqMZozA1PmWHfQW0poBoGIe', 'admin', 1, '2024-02-09 15:41:16', '2024-02-09 15:41:16'),
(46, 'admin26@admin.com', '$2b$10$dfxsjwCw7DzNbjcsp67pAuGZRynR7S0MnkcMRDvXUF9PG8CcXLPE2', 'admin', 1, '2024-02-09 15:41:51', '2024-02-09 15:41:51'),
(47, 'admin27@admin.com', '$2b$10$Ch2vO0Fa71rV1VmPpTgLiuPi6PNi6QbYZt8w5T5C9KwlwUO5r35Oi', 'admin', 1, '2024-02-09 15:42:10', '2024-02-09 15:42:10'),
(48, 'admin28@admin.com', '$2b$10$iFRm/mNGh4bdJvsrNGh1eeHvVdwyu70vZ9I6vJYQ7w380wIuA2XL2', 'admin', 1, '2024-02-09 15:42:55', '2024-02-09 15:42:55'),
(49, 'admin29@admin.com', '$2b$10$buuDwcRNwJM3VkqO/8BvHeWkXE.8VVBNPBPnAS5OD12NRC3Fb3sWu', 'admin', 1, '2024-02-09 15:44:08', '2024-02-09 15:44:08'),
(50, 'admin30@admin.com', '$2b$10$l/3euPNYrt1prXXnxwl2aukxoFx8yf/oiuQe8ZuK8Edfej8VWuDTa', 'admin', 1, '2024-02-09 15:45:53', '2024-02-09 15:45:53'),
(51, 'admin31@admin.com', '$2b$10$tAEhs22zxytbDZCJ/kIDKubgKue9GjzeFQfC0bClEkPfAicSdOBL2', 'admin', 1, '2024-02-09 15:59:04', '2024-02-09 15:59:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `course_categories`
--
ALTER TABLE `course_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course_contents`
--
ALTER TABLE `course_contents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `securitylogs`
--
ALTER TABLE `securitylogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `course_categories`
--
ALTER TABLE `course_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `course_contents`
--
ALTER TABLE `course_contents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `enrollments`
--
ALTER TABLE `enrollments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `securitylogs`
--
ALTER TABLE `securitylogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `course_contents`
--
ALTER TABLE `course_contents`
  ADD CONSTRAINT `course_contents_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`);

--
-- Constraints for table `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD CONSTRAINT `enrollments_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  ADD CONSTRAINT `enrollments_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`);

--
-- Constraints for table `securitylogs`
--
ALTER TABLE `securitylogs`
  ADD CONSTRAINT `securitylogs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
