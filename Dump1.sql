CREATE DATABASE  IF NOT EXISTS `prolabor` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_german1_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `prolabor`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: prolabor
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `abroad`
--

DROP TABLE IF EXISTS `abroad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `abroad` (
  `nr` int NOT NULL AUTO_INCREMENT,
  `text` varchar(45) CHARACTER SET latin1 COLLATE latin1_german1_ci DEFAULT NULL,
  PRIMARY KEY (`nr`),
  UNIQUE KEY `nr_UNIQUE` (`nr`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `abroad`
--

LOCK TABLES `abroad` WRITE;
/*!40000 ALTER TABLE `abroad` DISABLE KEYS */;
INSERT INTO `abroad` VALUES (1,'Afrika'),(2,'Amerika'),(3,'Asien'),(4,'Europa'),(5,'Andere');
/*!40000 ALTER TABLE `abroad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `culture_and_art`
--

DROP TABLE IF EXISTS `culture_and_art`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `culture_and_art` (
  `nr` int NOT NULL AUTO_INCREMENT,
  `text` varchar(45) CHARACTER SET latin1 COLLATE latin1_german1_ci DEFAULT NULL,
  PRIMARY KEY (`nr`),
  UNIQUE KEY `nr_UNIQUE` (`nr`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `culture_and_art`
--

LOCK TABLES `culture_and_art` WRITE;
/*!40000 ALTER TABLE `culture_and_art` DISABLE KEYS */;
INSERT INTO `culture_and_art` VALUES (1,'Bühne'),(2,'Literatur'),(3,'Kino'),(4,'Musik'),(5,'Allgemein');
/*!40000 ALTER TABLE `culture_and_art` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `education`
--

DROP TABLE IF EXISTS `education`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `education` (
  `nr` int NOT NULL AUTO_INCREMENT,
  `text` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`nr`),
  UNIQUE KEY `nr_UNIQUE` (`nr`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `education`
--

LOCK TABLES `education` WRITE;
/*!40000 ALTER TABLE `education` DISABLE KEYS */;
INSERT INTO `education` VALUES (1,'Schulformen / Universitäten'),(2,'Lehre / Berufsausbildung'),(3,'Allgemein'),(4,'Pädagogik'),(5,'Schulinterna / UNI-Interna');
/*!40000 ALTER TABLE `education` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `health`
--

DROP TABLE IF EXISTS `health`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `health` (
  `nr` int NOT NULL AUTO_INCREMENT,
  `text` varchar(45) CHARACTER SET latin1 COLLATE latin1_german1_ci DEFAULT NULL,
  PRIMARY KEY (`nr`),
  UNIQUE KEY `nr_UNIQUE` (`nr`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `health`
--

LOCK TABLES `health` WRITE;
/*!40000 ALTER TABLE `health` DISABLE KEYS */;
INSERT INTO `health` VALUES (1,'Allgemeines'),(2,'Suchtstoffe / Drogen');
/*!40000 ALTER TABLE `health` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `justice_police_state_administration`
--

DROP TABLE IF EXISTS `justice_police_state_administration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `justice_police_state_administration` (
  `nr` int NOT NULL AUTO_INCREMENT,
  `text` varchar(45) CHARACTER SET latin1 COLLATE latin1_german1_ci DEFAULT NULL,
  PRIMARY KEY (`nr`),
  UNIQUE KEY `nr_UNIQUE` (`nr`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `justice_police_state_administration`
--

LOCK TABLES `justice_police_state_administration` WRITE;
/*!40000 ALTER TABLE `justice_police_state_administration` DISABLE KEYS */;
INSERT INTO `justice_police_state_administration` VALUES (1,'Grundlagen'),(2,'Sicherheit und Überwachung'),(3,'Gerichte'),(4,'Polizei'),(5,'Kriminalität'),(6,'Gewalt / -prävention'),(7,'Repression / Anti-Repression');
/*!40000 ALTER TABLE `justice_police_state_administration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `main`
--

DROP TABLE IF EXISTS `main`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `main` (
  `nr` int NOT NULL AUTO_INCREMENT,
  `titel` varchar(40) DEFAULT NULL,
  `schule` varchar(50) DEFAULT NULL,
  `ort` varchar(50) DEFAULT NULL,
  `jahr` varchar(4) DEFAULT NULL,
  `datum` varchar(9) DEFAULT NULL,
  `redakteur` varchar(50) DEFAULT NULL,
  `format` varchar(2) DEFAULT NULL,
  `inhalt` varchar(254) DEFAULT NULL,
  `ordner` varchar(10) DEFAULT NULL,
  `kommentar` varchar(150) DEFAULT NULL,
  `schlagwort` varchar(50) DEFAULT NULL,
  `land` varchar(50) DEFAULT NULL,
  `herausgeber_ist` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`nr`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `main`
--

LOCK TABLES `main` WRITE;
/*!40000 ALTER TABLE `main` DISABLE KEYS */;
INSERT INTO `main` VALUES (1,'tszrtz','rtezrtz','trezrtz','1234','dfg','dfg','fg','dfg','fdg','dfg','dfg','dfg','dfg'),(2,'ttt','sss','ooo','jjj','ddd','rrr','f2','iii','ord','kkk','sch','lll','hhh'),(4,'ttx','sss','ooo','jjj','ddd','rrr','01','iii','ord','kkk','sch','lll','hhh');
/*!40000 ALTER TABLE `main` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media` (
  `nr` int NOT NULL AUTO_INCREMENT,
  `text` varchar(45) CHARACTER SET latin1 COLLATE latin1_german1_ci DEFAULT NULL,
  PRIMARY KEY (`nr`),
  UNIQUE KEY `nr_UNIQUE` (`nr`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
INSERT INTO `media` VALUES (1,'Online-Medien'),(2,'\"Soziale Netzwerke\"'),(3,'TV / Radio'),(4,'Printmedien'),(5,'Zensur'),(6,'Games');
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `military`
--

DROP TABLE IF EXISTS `military`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `military` (
  `nr` int NOT NULL AUTO_INCREMENT,
  `text` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`nr`),
  UNIQUE KEY `nr_UNIQUE` (`nr`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `military`
--

LOCK TABLES `military` WRITE;
/*!40000 ALTER TABLE `military` DISABLE KEYS */;
INSERT INTO `military` VALUES (1,'Rüstung'),(2,'Armeen'),(3,'Krieg');
/*!40000 ALTER TABLE `military` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `politics_society`
--

DROP TABLE IF EXISTS `politics_society`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `politics_society` (
  `nr` int NOT NULL AUTO_INCREMENT,
  `text` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`nr`),
  UNIQUE KEY `Nr_UNIQUE` (`nr`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `politics_society`
--

LOCK TABLES `politics_society` WRITE;
/*!40000 ALTER TABLE `politics_society` DISABLE KEYS */;
INSERT INTO `politics_society` VALUES (1,'Demokratie / Parlamentarismus'),(2,'Antifaschismus / Faschismus / Neofaschismus'),(3,'Andere Formen der Gesellschaft'),(4,'Europäische Union'),(5,'Geschichte'),(6,'Theorie und Wissenschaft'),(7,'Philosophie'),(8,'Globalisierung'),(9,'Emanzipative Bewegungen'),(10,'Tierwelt'),(11,'Ökologie'),(12,'Städtebau / Architektur'),(13,'Verkehr'),(14,'Datenschutz / Sicherheit'),(15,'Sport'),(16,'Werbung');
/*!40000 ALTER TABLE `politics_society` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `religion`
--

DROP TABLE IF EXISTS `religion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `religion` (
  `nr` int NOT NULL AUTO_INCREMENT,
  `text` varchar(45) CHARACTER SET latin1 COLLATE latin1_german1_ci DEFAULT NULL,
  PRIMARY KEY (`nr`),
  UNIQUE KEY `nr_UNIQUE` (`nr`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `religion`
--

LOCK TABLES `religion` WRITE;
/*!40000 ALTER TABLE `religion` DISABLE KEYS */;
INSERT INTO `religion` VALUES (1,'Christliche'),(2,'Islamische'),(3,'Jüdische'),(4,'Buddhismus / Ostasiatisch'),(5,'Esoterik / Sekten / Andere');
/*!40000 ALTER TABLE `religion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social`
--

DROP TABLE IF EXISTS `social`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `social` (
  `nr` int NOT NULL AUTO_INCREMENT,
  `text` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`nr`),
  UNIQUE KEY `nr_UNIQUE` (`nr`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social`
--

LOCK TABLES `social` WRITE;
/*!40000 ALTER TABLE `social` DISABLE KEYS */;
INSERT INTO `social` VALUES (1,'Arbeitswelt'),(2,'Kämpfe'),(3,'Migration'),(4,'Diskriminierung'),(5,'Armut und Reichtum'),(6,'Sexualität, Selbstbestimmung');
/*!40000 ALTER TABLE `social` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `states`
--

DROP TABLE IF EXISTS `states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `states` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `states`
--

LOCK TABLES `states` WRITE;
/*!40000 ALTER TABLE `states` DISABLE KEYS */;
INSERT INTO `states` VALUES (1,'Baden-Württemberg'),(2,'Bayern'),(3,'Berlin'),(4,'Brandenburg'),(5,'Bremen'),(6,'Hamburg'),(7,'Hessen'),(8,'Mecklenburg-Vorpommern'),(9,'Niedersachsen'),(10,'Nordrhein-Westfalen'),(11,'Rheinland-Pfalz'),(12,'Saarland'),(13,'Sachsen-Anhalt'),(14,'Sachsen'),(15,'Schleswig-Holstein'),(16,'Thüringen'),(17,'Ausland');
/*!40000 ALTER TABLE `states` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students_activities`
--

DROP TABLE IF EXISTS `students_activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students_activities` (
  `nr` int NOT NULL AUTO_INCREMENT,
  `text` varchar(45) CHARACTER SET latin1 COLLATE latin1_german1_ci DEFAULT NULL,
  PRIMARY KEY (`nr`),
  UNIQUE KEY `nr_UNIQUE` (`nr`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students_activities`
--

LOCK TABLES `students_activities` WRITE;
/*!40000 ALTER TABLE `students_activities` DISABLE KEYS */;
INSERT INTO `students_activities` VALUES (1,'SV / Mitbestimmung'),(2,'Aktionen'),(3,'Projekttage');
/*!40000 ALTER TABLE `students_activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `titles`
--

DROP TABLE IF EXISTS `titles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `titles` (
  `nr` int NOT NULL AUTO_INCREMENT,
  `tablename` varchar(45) CHARACTER SET latin1 COLLATE latin1_german1_ci DEFAULT NULL,
  `headline` varchar(45) CHARACTER SET latin1 COLLATE latin1_german1_ci DEFAULT NULL,
  `headline_nr` int NOT NULL,
  PRIMARY KEY (`nr`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `titles`
--

LOCK TABLES `titles` WRITE;
/*!40000 ALTER TABLE `titles` DISABLE KEYS */;
INSERT INTO `titles` VALUES (1,'justice_police_state_administration','Justiz, Polizei, Staat und Verwaltung',11),(2,'education','Bildung',5),(3,'politics_society','Politik und Gesellschaft',1),(4,'students_activities','Schüler*innen Aktivitäten',8),(5,'social','Soziales',2),(7,'abroad','Außen',3),(8,'media','Medien',6),(9,'health','Gesundheit',4),(10,'culture_and_art','Kunst & Kultur',7),(11,'religion','Religion',9),(12,'military','Militär',10);
/*!40000 ALTER TABLE `titles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-05 18:59:36
