CREATE DATABASE  IF NOT EXISTS `andon` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `andon`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: andon
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `fontes`
--

DROP TABLE IF EXISTS `fontes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fontes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `modelo` varchar(255) DEFAULT NULL,
  `realizado` int DEFAULT NULL,
  `tempo` int DEFAULT NULL,
  `is_current` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fontes`
--

LOCK TABLES `fontes` WRITE;
/*!40000 ALTER TABLE `fontes` DISABLE KEYS */;
INSERT INTO `fontes` VALUES (1,'storm40',0,0,_binary '\0'),(3,'storm60',0,0,_binary '\0'),(4,'storm70',0,0,_binary '\0'),(5,'storm120',0,0,_binary '\0'),(6,'storm150',0,0,_binary '\0'),(7,'storm200',0,0,_binary '\0'),(8,'lite40',0,0,_binary '\0'),(9,'lite60',0,0,_binary '\0'),(10,'lite70',0,0,_binary '\0'),(11,'lite120',0,0,_binary '\0'),(12,'lite200',0,0,_binary '\0'),(13,'bob70',0,0,_binary '\0'),(14,'bob90',0,0,_binary ''),(15,'bob120',0,0,_binary '\0'),(16,'bob200',0,0,_binary '\0');
/*!40000 ALTER TABLE `fontes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-04 13:42:59
