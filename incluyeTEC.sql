-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: incluyetec
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES ('0652d0c5-7cff-4bd8-9dfa-5cc8d59a0d5b','Gabinetes','2023-11-15 17:15:26','2023-11-15 17:15:26'),('0849721d-84b4-43dd-aafd-f5873b0ebc33','Memorias RAM','2023-11-15 17:15:19','2023-11-15 17:15:19'),('0f414091-7dd2-4ae7-8f0b-92b822b30b2b','Mothers','2023-11-15 17:04:33','2023-11-15 17:04:33'),('55ad7a35-8c52-45ab-a1e4-98d28b36c512','Discos','2023-11-15 17:15:34','2023-11-15 17:15:34'),('74e79947-a9a9-4c67-9c52-4c5da58a617f','Monitores','2023-11-15 17:04:16','2023-11-15 17:04:16'),('884a6651-96b4-446a-b8ea-4393f7bee18e','Muebles','2023-11-15 17:15:47','2023-11-15 17:15:47'),('9c57dde3-3ac0-487d-b527-3d90a89d5f35','Procesadores','2023-11-15 17:14:12','2023-11-15 17:14:12'),('9d93ed89-932c-4181-ab5e-53253b353301','Fuentes','2023-11-15 17:15:42','2023-11-15 17:15:42'),('d5454c74-7c4e-49c8-95b7-b20fe490271e','Notebooks','2023-11-15 17:03:49','2023-11-15 17:03:49'),('eaa885af-f984-49d3-8179-6179a8af4020','Microfonos','2023-11-15 17:04:28','2023-11-15 17:04:28');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` varchar(45) NOT NULL,
  `name` varchar(200) NOT NULL,
  `list_price` decimal(10,2) unsigned NOT NULL,
  `special_price` decimal(10,2) unsigned NOT NULL,
  `installments` tinyint NOT NULL,
  `installments_num` int unsigned NOT NULL,
  `interest` tinyint NOT NULL,
  `interest_rate` int unsigned NOT NULL,
  `interest_price` decimal(10,2) unsigned NOT NULL,
  `stock` tinyint NOT NULL,
  `shipment` tinyint NOT NULL,
  `warranty` tinyint NOT NULL,
  `warranty_duration` varchar(45) NOT NULL,
  `img_name` varchar(45) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `id_category` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_category_idx` (`id_category`),
  CONSTRAINT `id_category` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('0ef42ed7-5fd4-4451-9bc4-02b199bd8a47','Monitor Gamer Samsung 24 G50 Curvo 144Hz Full HD VA FreeSync',291739.00,146599.00,1,12,0,0,0.00,1,1,1,'12 meses','1700085140874.jpg','2023-11-15 21:52:20','2023-11-15 21:52:20','74e79947-a9a9-4c67-9c52-4c5da58a617f'),('31b164f4-034e-46bf-8b3a-4be5a0556ccb','Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler',120000.00,85000.00,1,12,1,5,126000.00,0,0,0,'0','1700083726376.jpg','2023-11-15 21:28:46','2023-11-15 21:28:46','884a6651-96b4-446a-b8ea-4393f7bee18e'),('35ae6fe8-a9d2-4d66-8449-f0e79665a82e','Gabinete Antec NX292 MESH RGB Vidrio Templado',70000.00,45600.00,0,0,0,0,0.00,1,1,1,'6 meses','1700084334125.jpg','2023-11-15 21:38:54','2023-11-15 21:38:54','0652d0c5-7cff-4bd8-9dfa-5cc8d59a0d5b'),('8ed29540-7b5e-407f-9f48-8b6811278a90','Fuente Be Quiet 1000W 80 Plus Gold PURE POWER 11 Full Modular',272736.00,22728.00,1,12,0,0,0.00,1,0,1,'12 meses','1700084211843.jpg','2023-11-15 21:36:51','2023-11-15 21:36:51','9d93ed89-932c-4181-ab5e-53253b353301'),('9b0d9cac-b4fd-441e-a6bf-7f35e576eb0a','Micrófono HyperX QuadCast Streaming Condensador',198985.50,99990.50,1,12,0,0,0.00,1,1,1,'12 meses','1700085330470.jpg','2023-11-15 21:55:30','2023-11-15 21:55:30','eaa885af-f984-49d3-8179-6179a8af4020'),('9bcfc046-190b-4b09-9e39-ba871b948db6','Memoria Adata DDR4 16GB (2x8GB) 4133MHz XPG Spectrix D60G RGB',142687.00,71700.00,1,12,0,0,0.00,1,1,1,'12 meses','1700085237511.jpg','2023-11-15 21:53:57','2023-11-15 21:53:57','0849721d-84b4-43dd-aafd-f5873b0ebc33'),('bd9f6c4c-325a-449c-bcc6-1b3f6cd2a17a','Notebook Gamer Thunderobot 911 AIR FHD IPS 15.6\\\" Core I7 12700H 16GB 512GB SSD NVMe RTX 3050 W11 Pro 144Hz',1882567.00,945990.00,1,12,0,0,0.00,1,1,1,'12 meses','1700084981490.jpg','2023-11-15 21:49:41','2023-11-15 21:49:41','d5454c74-7c4e-49c8-95b7-b20fe490271e'),('d4b1f8a6-e677-4804-9060-96d833ecfb1c','Mother Asrock Z390 Phantom Gaming 4S Wi-Fi BULK Pack',83781.00,42100.00,1,12,0,0,0.00,1,1,1,'12 meses','1700085281905.jpg','2023-11-15 21:54:41','2023-11-15 21:54:41','0f414091-7dd2-4ae7-8f0b-92b822b30b2b'),('da346eb7-cab9-4b3f-afb8-30463b2056b0','Disco Solido SSD Team 512GB GX2 530MB/s',55423.00,27850.00,1,12,0,0,0.00,1,1,1,'12 meses','1700085193704.jpg','2023-11-15 21:53:13','2023-11-15 21:53:13','55ad7a35-8c52-45ab-a1e4-98d28b36c512'),('de885740-5825-43dc-8e58-8cf376dfb307','Silla Gamer Corsair T3 Rush Fabric Carbon',557015.00,278900.00,1,12,1,5,584865.75,1,1,1,'12 meses','1700083021601.jpg','2023-11-15 21:13:55','2023-11-15 22:03:12','884a6651-96b4-446a-b8ea-4393f7bee18e'),('f808864e-f7da-43fb-88ad-b793189f36e0','Notebook Gamer Dell Alienware 15.6 Core i7 11800H 16GB 512GB SSD NVMe RTX 3060 W10 144Hz',1400000.00,1228000.00,1,12,0,0,0.00,1,1,1,'6 meses','1700085078148.jpg','2023-11-15 21:51:18','2023-11-15 21:51:18','d5454c74-7c4e-49c8-95b7-b20fe490271e');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-15 20:22:01
