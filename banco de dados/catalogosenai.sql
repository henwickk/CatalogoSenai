CREATE DATABASE  IF NOT EXISTS `catalogosenai` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `catalogosenai`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: catalogosenai
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `curso`
--

DROP TABLE IF EXISTS `curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curso` (
  `id_curso` int NOT NULL AUTO_INCREMENT,
  `nome_curso` varchar(45) NOT NULL,
  `turno_curso` varchar(45) NOT NULL,
  `descricao_curso` text NOT NULL,
  `grade_curso` varchar(45) NOT NULL,
  `modalidade_curso` varchar(45) NOT NULL,
  `status_curso` varchar(45) NOT NULL,
  `cargaHoraria_curso` text,
  `categoria_curso` varchar(45) NOT NULL,
  `valor_curso` varchar(45) DEFAULT NULL,
  `imagem_curso` varchar(45) NOT NULL,
  `local_curso` varchar(455) NOT NULL,
  `dataPrevInicio_curso` date NOT NULL,
  `fk_usuario` int NOT NULL,
  PRIMARY KEY (`id_curso`),
  KEY `fk_usuario_idx` (`fk_usuario`),
  CONSTRAINT `fk_usuario` FOREIGN KEY (`fk_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curso`
--

LOCK TABLES `curso` WRITE;
/*!40000 ALTER TABLE `curso` DISABLE KEYS */;
INSERT INTO `curso` VALUES (6,'agua','Manhã, Tarde, Noite','cacacas','1789995787704-954998353.pdf','Técnico','Disponível','30','Automotiva','0','1789995787701-869965549.jpg','jojolands','2026-10-31',1),(7,'dead','Manhã, Noite','5565656','1790073620388-151380278.pdf','Técnico','Indisponível','30349','Automotiva','500','1790073620356-311642611.jpg','Senai','2026-11-25',1);
/*!40000 ALTER TABLE `curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nome_usuario` varchar(45) DEFAULT NULL,
  `senha_usuario` varchar(255) DEFAULT NULL,
  `tipo_usuario` varchar(20) DEFAULT NULL,
  `status_usuario` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Administrador','$2b$10$fWVcpwE1IkTA1bj0lGjxfOASigOjdazRU40JlavaEFIRGWrKIbbN2','Administrador','ativo'),(2,'Usuário','$2b$10$KZ0XZkAtsNj0NCaF5izfkOz.1EI1PhCgs3v9My2WmZW2pj.VMAGH6','Usuario','ativo'),(3,'Bobao','$2b$10$DTfo0LWITNw9/Ok4Gkkp6.w8557iVKjoQLsoHcrzaPo54Bk9nomOS','Usuario','ativo');
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

-- Dump completed on 2026-10-09  9:11:08
