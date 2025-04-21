-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 21, 2025 at 09:24 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jollibee_v1`
--

-- --------------------------------------------------------

--
-- Table structure for table `jb_advertisement`
--

CREATE TABLE `jb_advertisement` (
  `advertisement_aid` int(11) NOT NULL,
  `advertisement_title` varchar(50) NOT NULL,
  `advertisement_image` varchar(50) NOT NULL,
  `advertisement_is_active` tinyint(1) NOT NULL,
  `advertisement_created` varchar(20) NOT NULL,
  `advertisement_datetime` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jb_advertisement`
--

INSERT INTO `jb_advertisement` (`advertisement_aid`, `advertisement_title`, `advertisement_image`, `advertisement_is_active`, `advertisement_created`, `advertisement_datetime`) VALUES
(3, 'Advertisement -1', 'ad-1.webp', 1, '2025-04-21 15:03:04', '2025-04-21 15:03:04'),
(4, 'Advertisement -2', 'ad-2.webp', 1, '2025-04-21 15:03:15', '2025-04-21 15:03:15'),
(5, 'Advertisement - 3', 'ad-3.webp', 1, '2025-04-21 15:03:26', '2025-04-21 15:03:26');

-- --------------------------------------------------------

--
-- Table structure for table `jb_category`
--

CREATE TABLE `jb_category` (
  `category_aid` int(11) NOT NULL,
  `category_title` varchar(30) NOT NULL,
  `category_thumbnail` varchar(50) NOT NULL,
  `category_is_active` tinyint(1) NOT NULL,
  `category_datetime` varchar(20) NOT NULL,
  `category_created` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jb_category`
--

INSERT INTO `jb_category` (`category_aid`, `category_title`, `category_thumbnail`, `category_is_active`, `category_datetime`, `category_created`) VALUES
(3, 'Meals Under 750 kcal', 'thumb-meals-under-750.webp', 1, '2025-04-21 14:57:49', '2025-04-21 14:57:49'),
(4, 'Jollibee Kids Meal', 'thumb-jollibee-kids-meal.webp', 1, '2025-04-21 14:58:35', '2025-04-21 14:58:35'),
(5, 'Beverages', 'thumb-beverages.webp', 1, '2025-04-21 14:58:47', '2025-04-21 14:58:47'),
(6, 'Desserts & Sweet Pies', 'thumb-desserts.webp', 1, '2025-04-21 14:59:03', '2025-04-21 14:59:03'),
(7, 'Fries & Sides', 'thumb-sides.webp', 1, '2025-04-21 14:59:16', '2025-04-21 14:59:16'),
(8, 'Chicken Nuggets', 'thumb-nuggets.webp', 1, '2025-04-21 14:59:28', '2025-04-21 14:59:28'),
(9, 'Sandwiches & Savory Pies', 'thumb-sandwich.webp', 1, '2025-04-21 14:59:39', '2025-04-21 14:59:39'),
(10, 'Chicken Fillet', 'thumb-fillet.webp', 1, '2025-04-21 14:59:51', '2025-04-21 14:59:51'),
(11, 'Jolly Spaghetti & Palabok', 'thumb-pasta.webp', 1, '2025-04-21 15:00:53', '2025-04-21 15:00:53'),
(12, 'Burgers', 'thumb-burger.webp', 1, '2025-04-21 15:01:04', '2025-04-21 15:01:04'),
(13, 'Chickenjoy', 'thumb-chickenjoy.webp', 1, '2025-04-21 15:01:14', '2025-04-21 15:01:14'),
(14, 'Jolly Meal Savers', 'thumb-jolly-savers.webp', 1, '2025-04-21 15:01:25', '2025-04-21 15:01:25'),
(15, 'Super Meals', 'thumb-supermeal.webp', 1, '2025-04-21 15:01:39', '2025-04-21 15:01:39'),
(16, 'Family Meals', 'thumb-family.webp', 1, '2025-04-21 15:02:10', '2025-04-21 15:02:10'),
(17, 'Breakfast', 'thumb-breakfast.png', 1, '2025-04-21 15:02:29', '2025-04-21 15:02:29');

-- --------------------------------------------------------

--
-- Table structure for table `jb_food`
--

CREATE TABLE `jb_food` (
  `food_aid` int(11) NOT NULL,
  `food_title` varchar(50) NOT NULL,
  `food_image` varchar(60) NOT NULL,
  `food_price` varchar(11) NOT NULL,
  `food_category_id` int(11) NOT NULL,
  `food_is_active` tinyint(1) NOT NULL,
  `food_created` varchar(20) NOT NULL,
  `food_datetime` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jb_food`
--

INSERT INTO `jb_food` (`food_aid`, `food_title`, `food_image`, `food_price`, `food_category_id`, `food_is_active`, `food_created`, `food_datetime`) VALUES
(3, '1-pc. Chickenjoy w/ Coke Zero', 'under-70-1-pc-Chickenjoy-w-Coke Zero.webp', '117', 3, 1, '2025-04-21 15:04:07', '2025-04-21 15:13:53'),
(4, 'Yumburger Kiddie Meal', 'kid-Yumburger-Kiddie-Meal.webp', '100', 4, 1, '2025-04-21 15:05:19', '2025-04-21 15:05:19'),
(5, 'Iced Latte', 'beverage-iced-latte.webp', '59', 5, 1, '2025-04-21 15:05:45', '2025-04-21 15:05:45'),
(6, 'Peach Mango Pie', 'dessert-peach-mango.webp', '43', 6, 1, '2025-04-21 15:06:11', '2025-04-21 15:06:11'),
(7, 'Chicken Macaroni Soup', 'sides-chicken-macaroni -soup.webp', '51', 7, 1, '2025-04-21 15:06:39', '2025-04-21 15:06:39'),
(8, '6-pc. Chicken Nuggets', 'nugget-6-pc-chicken-nuggets.webp', '106', 8, 1, '2025-04-21 15:07:09', '2025-04-21 15:07:09'),
(9, 'Crunchy Chicken Sandwich', 'sandwich-crunchy-chicken-sandwich.webp', '62', 9, 1, '2025-04-21 15:07:32', '2025-04-21 15:07:32'),
(10, 'Pepper Cream Chicken Fillet', 'fillter-pepper-cream-chicken-fillet.webp', '74', 10, 1, '2025-04-21 15:07:53', '2025-04-21 15:07:53'),
(11, 'Jolly Spaghetti w/ Yumburger', 'pasta-jolly-spaghetti-yumburger.webp', '127', 11, 1, '2025-04-21 15:08:35', '2025-04-21 15:08:35'),
(12, 'Amazing Aloha Champ Jr', 'burger-amazing-Aloha-Champ- Jr.webp', '135', 12, 1, '2025-04-21 15:08:57', '2025-04-21 15:13:15'),
(13, '1 - pc. Chickenjoy w/ Jolly Spaghetti', 'chickenjoy-1-pc-Chickenjoy-Jolly-Spaghetti.webp', '136', 13, 1, '2025-04-21 15:09:20', '2025-04-21 15:13:36'),
(14, 'Jolly Spaghetti w/ Drink', 'saver-Jolly-Spaghetti-Drink.webp', '82', 14, 1, '2025-04-21 15:09:53', '2025-04-21 15:09:53'),
(15, 'Yumburger, Half Jolly Spaghetti & Reg. Fries Super', 'super-Yumburger-Half-Jolly-Spaghetti-Reg-Fries.webp', '139', 15, 1, '2025-04-21 15:10:24', '2025-04-21 15:10:24'),
(16, 'Chickenjoy Bucket Family Meals', 'family-chickenjoy-bucket-family-meals.webp', '745', 16, 1, '2025-04-21 15:10:57', '2025-04-21 15:10:57'),
(17, 'Breakfast Hotdog', 'breakfast-Hotdog.webp', '105', 17, 1, '2025-04-21 15:11:20', '2025-04-21 15:11:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `jb_advertisement`
--
ALTER TABLE `jb_advertisement`
  ADD PRIMARY KEY (`advertisement_aid`);

--
-- Indexes for table `jb_category`
--
ALTER TABLE `jb_category`
  ADD PRIMARY KEY (`category_aid`);

--
-- Indexes for table `jb_food`
--
ALTER TABLE `jb_food`
  ADD PRIMARY KEY (`food_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `jb_advertisement`
--
ALTER TABLE `jb_advertisement`
  MODIFY `advertisement_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `jb_category`
--
ALTER TABLE `jb_category`
  MODIFY `category_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `jb_food`
--
ALTER TABLE `jb_food`
  MODIFY `food_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
