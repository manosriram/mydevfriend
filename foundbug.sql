-- MySQL dump 10.13  Distrib 8.0.21, for osx10.15 (x86_64)
--
-- Host: localhost    Database: foundbug
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat` (
  `chatId` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user1` varchar(32) NOT NULL,
  `user2` varchar(32) NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  `last_message_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user1`,`user2`),
  UNIQUE KEY `id` (`chatId`),
  UNIQUE KEY `chat_unique` (`user1`,`user2`)
) ENGINE=InnoDB AUTO_INCREMENT=302 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
INSERT INTO `chat` VALUES (276,'mano','mano',0,NULL),(207,'mano','manoaa',1,'2021-02-01 12:26:02'),(284,'mano','manomano',0,NULL),(204,'mano','manosriram',0,NULL),(285,'mano','sriram123',1,'2021-02-01 12:26:06'),(208,'manoaa','manosriram',1,NULL);
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friendship`
--

DROP TABLE IF EXISTS `friendship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friendship` (
  `user` varchar(32) NOT NULL,
  `friend` varchar(32) NOT NULL,
  PRIMARY KEY (`user`,`friend`),
  KEY `friend` (`friend`),
  CONSTRAINT `friendship_ibfk_1` FOREIGN KEY (`user`) REFERENCES `user` (`username`),
  CONSTRAINT `friendship_ibfk_2` FOREIGN KEY (`friend`) REFERENCES `user` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friendship`
--

LOCK TABLES `friendship` WRITE;
/*!40000 ALTER TABLE `friendship` DISABLE KEYS */;
/*!40000 ALTER TABLE `friendship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `chatId` bigint unsigned NOT NULL,
  `message` text NOT NULL,
  `sent` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `sentBy` varchar(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `chatId` (`chatId`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`chatId`) REFERENCES `chat` (`chatId`)
) ENGINE=InnoDB AUTO_INCREMENT=284 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (264,204,'aa','2020-12-21 05:24:43','mano'),(265,207,'dsdsd','2020-12-21 15:16:55','manoaa'),(266,208,'sdsd','2020-12-21 19:19:39','manoaa'),(267,276,'hi mano!','2020-12-22 18:47:42','mano'),(268,204,'hi!','2020-12-22 18:48:08','mano'),(269,207,'asddsddd','2021-01-17 05:47:01','mano'),(270,207,'asdsd','2021-01-17 05:47:05','mano'),(271,204,'hi mano!','2021-01-17 05:56:47','mano'),(272,207,'hey, sorry for the delay...','2021-01-17 07:31:02','manoaa'),(273,207,'its ok, how are you?','2021-01-17 07:31:52','mano'),(274,207,'good...','2021-01-17 07:31:58','manoaa'),(275,207,'nice. so still a dev?','2021-01-17 07:32:10','mano'),(276,207,'um... yup :)','2021-01-17 07:32:17','manoaa'),(277,207,'hi','2021-01-17 17:10:18','mano'),(278,207,'hi','2021-01-18 16:56:28','mano'),(279,207,'aaa','2021-01-31 17:16:23','mano'),(280,207,'aaa','2021-02-01 10:48:13','mano'),(281,207,'aaaaa','2021-02-01 17:51:54','mano'),(282,207,'sdsd','2021-02-01 17:56:02','mano'),(283,285,'asdadasd','2021-02-01 17:56:06','mano');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userid` bigint unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(32) DEFAULT NULL,
  `lastName` varchar(32) DEFAULT NULL,
  `username` varchar(32) NOT NULL,
  `email` varchar(32) NOT NULL,
  `password` varchar(64) DEFAULT NULL,
  `location` varchar(32) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `profilePic` varchar(64) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `gender` varchar(32) NOT NULL,
  `active` tinyint(1) DEFAULT '0',
  `bio` text,
  `status` enum('online','offline') DEFAULT 'offline',
  PRIMARY KEY (`username`),
  UNIQUE KEY `userid` (`userid`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (141,'asdasd','asdasd','asdasd','mano.sriram0@gm2ail.com','$2a$10$tkgtJpq0GQ0P/MxouEopWOI.0JedZcmijRQGWSzRLS6zmFXODwCpK','asdasdasd','2020-12-31',NULL,'2021-01-18 08:55:27','Male',1,'asdasdasdasd','online'),(22,'Arivazhagan','Mano Sriram','mano','mano@mail.com','$2a$10$shFir42p/obydHWNpvtKved2jVD6UKvcQlm6sGBFbDcy7.ToBHHOS','Visakhapatnam, India','2020-12-30',NULL,'2020-12-20 05:01:24','Male',1,NULL,'offline'),(150,'Arivazhagan','ManoSriram','mano_sriram','contact@manosriram.com','$2a$10$9ZmpPWCUsA5sjpWlDHe6surtQzvhBEYWmnPGUVdG28IvlfcXJO4Xq','asdasd','2021-02-02',NULL,'2021-02-01 16:44:05','Male',1,'asd','offline'),(25,'Arivazhagan','ManoSriram','manoaa','mano124@mail.com','$2a$10$5TLq.2AePTygRbZg8V1Dwe6SqNFL0Q3LZIC49gkbczBGz3FCwN73C','asdasdad','2020-12-31',NULL,'2020-12-21 07:41:55','asdasdad',1,'something wonderful!','offline'),(153,'Arivazhagan','ManoSriram','manosriram','mano.sriram0@gmail.com','$2a$10$Y77ec22BxEGLkxQ3TeUEB.uIPzaXVuwFv1R3gmbIj6HN7NL6.dkfC','vizag','2021-12-31',NULL,'2021-02-02 07:46:10','Male',1,'','offline');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_language`
--

DROP TABLE IF EXISTS `user_language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_language` (
  `username` varchar(32) NOT NULL,
  `language` varchar(32) NOT NULL,
  PRIMARY KEY (`username`,`language`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_language`
--

LOCK TABLES `user_language` WRITE;
/*!40000 ALTER TABLE `user_language` DISABLE KEYS */;
INSERT INTO `user_language` VALUES ('mano_sriram','C Shell'),('mano_sriram','F-Script'),('mano_sriram','NXT-G'),('mano123','C'),('mano123','Caml'),('mano123','F-Script'),('mano123','FL'),('manomano','dBase'),('sriram123','A-0 System'),('sriram123','FL');
/*!40000 ALTER TABLE `user_language` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-02 14:15:14
