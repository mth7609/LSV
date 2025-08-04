/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: abroad
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `abroad` (
  `nr` int NOT NULL AUTO_INCREMENT,
  `text` varchar(45) CHARACTER SET latin1 COLLATE latin1_german1_ci DEFAULT NULL,
  `active` tinyint DEFAULT NULL,
  PRIMARY KEY (`nr`),
  UNIQUE KEY `nr_UNIQUE` (`nr`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = latin1 COLLATE = latin1_german1_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: archive_data
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `archive_data` (
  `nr` int NOT NULL AUTO_INCREMENT,
  `dataset_number` int NOT NULL,
  `name` varchar(45) CHARACTER SET latin1 COLLATE latin1_german1_ci DEFAULT NULL,
  `school_publisher` varchar(45) CHARACTER SET latin1 COLLATE latin1_german1_ci DEFAULT NULL,
  `year` varchar(45) CHARACTER SET latin1 COLLATE latin1_german1_ci DEFAULT NULL,
  `number` varchar(10) CHARACTER SET latin1 COLLATE latin1_german1_ci DEFAULT NULL,
  `city` varchar(45) CHARACTER SET latin1 COLLATE latin1_german1_ci DEFAULT NULL,
  `state` varchar(45) CHARACTER SET latin1 COLLATE latin1_german1_ci DEFAULT NULL,
  `publisher_is` varchar(10) CHARACTER SET latin1 COLLATE latin1_german1_ci DEFAULT NULL,
  `topics_list` varchar(256) CHARACTER SET latin1 COLLATE latin1_german1_ci DEFAULT NULL,
  `timestamp` bigint DEFAULT NULL,
  PRIMARY KEY (`nr`),
  UNIQUE KEY `nr_UNIQUE` (`nr`),
  UNIQUE KEY `dataset_number_UNIQUE` (`dataset_number`)
) ENGINE = InnoDB AUTO_INCREMENT = 1080 DEFAULT CHARSET = latin1 COLLATE = latin1_german1_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: constants
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `constants` (
  `nr` int NOT NULL AUTO_INCREMENT,
  `const_name` varchar(32) CHARACTER SET latin1 COLLATE latin1_german1_ci DEFAULT NULL,
  `const_value` int DEFAULT NULL,
  PRIMARY KEY (`nr`),
  UNIQUE KEY `nr_UNIQUE` (`nr`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = latin1 COLLATE = latin1_german1_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: culture_and_art
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `culture_and_art` (
  `nr` int NOT NULL AUTO_INCREMENT,
  `text` varchar(45) CHARACTER SET latin1 COLLATE latin1_german1_ci DEFAULT NULL,
  `active` tinyint DEFAULT NULL,
  PRIMARY KEY (`nr`),
  UNIQUE KEY `nr_UNIQUE` (`nr`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = latin1 COLLATE = latin1_german1_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: dataset_comments
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `dataset_comments` (
  `nr` int NOT NULL AUTO_INCREMENT,
  `dataset_number` int DEFAULT NULL,
  `comment` varchar(2048) CHARACTER SET latin1 COLLATE latin1_german1_ci DEFAULT NULL,
  PRIMARY KEY (`nr`),
  UNIQUE KEY `nr_UNIQUE` (`nr`),
  UNIQUE KEY `dataset_number_UNIQUE` (`dataset_number`)
) ENGINE = InnoDB AUTO_INCREMENT = 638 DEFAULT CHARSET = latin1 COLLATE = latin1_german1_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: dataset_top_headlines
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `dataset_top_headlines` (
  `nr` int NOT NULL DEFAULT '0',
  `names` varchar(45) CHARACTER SET latin1 COLLATE latin1_german1_ci NOT NULL,
  `arraypos` int DEFAULT NULL,
  UNIQUE KEY `nr_UNIQUE` (`nr`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1 COLLATE = latin1_german1_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: education
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `education` (
  `nr` int NOT NULL AUTO_INCREMENT,
  `text` varchar(45) DEFAULT NULL,
  `active` tinyint DEFAULT NULL,
  PRIMARY KEY (`nr`),
  UNIQUE KEY `nr_UNIQUE` (`nr`)
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: health
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `health` (
  `nr` int NOT NULL AUTO_INCREMENT,
  `text` varchar(45) CHARACTER SET latin1 COLLATE latin1_german1_ci DEFAULT NULL,
  `active` tinyint DEFAULT NULL,
  PRIMARY KEY (`nr`),
  UNIQUE KEY `nr_UNIQUE` (`nr`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = latin1 COLLATE = latin1_german1_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: images
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `images` (
  `nr` int NOT NULL AUTO_INCREMENT,
  `image_nr` int NOT NULL,
  `image_path` varchar(45) CHARACTER SET latin1 COLLATE latin1_german1_ci NOT NULL,
  PRIMARY KEY (`nr`),
  UNIQUE KEY `nr_UNIQUE` (`nr`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = latin1 COLLATE = latin1_german1_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: info_labels
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `info_labels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` text CHARACTER SET latin1 COLLATE latin1_german1_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = latin1 COLLATE = latin1_german1_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: justice_police_state_administration
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `justice_police_state_administration` (
  `nr` int NOT NULL AUTO_INCREMENT,
  `text` varchar(45) CHARACTER SET latin1 COLLATE latin1_german1_ci DEFAULT NULL,
  `active` tinyint DEFAULT NULL,
  PRIMARY KEY (`nr`),
  UNIQUE KEY `nr_UNIQUE` (`nr`)
) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: media
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `media` (
  `nr` int NOT NULL AUTO_INCREMENT,
  `text` varchar(45) CHARACTER SET latin1 COLLATE latin1_german1_ci DEFAULT NULL,
  `active` tinyint DEFAULT NULL,
  PRIMARY KEY (`nr`),
  UNIQUE KEY `nr_UNIQUE` (`nr`)
) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = latin1 COLLATE = latin1_german1_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: military
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `military` (
  `nr` int NOT NULL AUTO_INCREMENT,
  `text` varchar(45) DEFAULT NULL,
  `active` tinyint DEFAULT NULL,
  PRIMARY KEY (`nr`),
  UNIQUE KEY `nr_UNIQUE` (`nr`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: output_text
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `output_text` (
  `nr` int NOT NULL AUTO_INCREMENT,
  `name` varchar(64) CHARACTER SET latin1 COLLATE latin1_german1_ci NOT NULL,
  `value` varchar(64) CHARACTER SET latin1 COLLATE latin1_german1_ci NOT NULL,
  PRIMARY KEY (`nr`),
  UNIQUE KEY `nr_UNIQUE` (`nr`)
) ENGINE = InnoDB AUTO_INCREMENT = 53 DEFAULT CHARSET = latin1 COLLATE = latin1_german1_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: politics_society
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `politics_society` (
  `nr` int NOT NULL AUTO_INCREMENT,
  `text` varchar(45) DEFAULT NULL,
  `active` tinyint DEFAULT NULL,
  PRIMARY KEY (`nr`),
  UNIQUE KEY `Nr_UNIQUE` (`nr`)
) ENGINE = InnoDB AUTO_INCREMENT = 17 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: religion
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `religion` (
  `nr` int NOT NULL AUTO_INCREMENT,
  `text` varchar(45) CHARACTER SET latin1 COLLATE latin1_german1_ci DEFAULT NULL,
  `active` tinyint DEFAULT NULL,
  PRIMARY KEY (`nr`),
  UNIQUE KEY `nr_UNIQUE` (`nr`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = latin1 COLLATE = latin1_german1_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sha2
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `sha2` (
  `nr` int unsigned NOT NULL AUTO_INCREMENT,
  `sha2val` varchar(256) COLLATE latin1_german1_ci NOT NULL,
  `userName` varchar(256) COLLATE latin1_german1_ci NOT NULL,
  PRIMARY KEY (`nr`)
) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = latin1 COLLATE = latin1_german1_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: social
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `social` (
  `nr` int NOT NULL AUTO_INCREMENT,
  `text` varchar(45) DEFAULT NULL,
  `active` tinyint DEFAULT NULL,
  PRIMARY KEY (`nr`),
  UNIQUE KEY `nr_UNIQUE` (`nr`)
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: states
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `states` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `active` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: students_activities
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `students_activities` (
  `nr` int NOT NULL AUTO_INCREMENT,
  `text` varchar(45) CHARACTER SET latin1 COLLATE latin1_german1_ci DEFAULT NULL,
  `active` tinyint DEFAULT NULL,
  PRIMARY KEY (`nr`),
  UNIQUE KEY `nr_UNIQUE` (`nr`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = latin1 COLLATE = latin1_german1_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: top_headlines
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `top_headlines` (
  `nr` int NOT NULL AUTO_INCREMENT,
  `names` varchar(45) CHARACTER SET latin1 COLLATE latin1_german1_ci NOT NULL,
  `arraypos` int DEFAULT NULL,
  PRIMARY KEY (`nr`),
  UNIQUE KEY `nr_UNIQUE` (`nr`)
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = latin1 COLLATE = latin1_german1_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: topic_headlines
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `topic_headlines` (
  `nr` int NOT NULL AUTO_INCREMENT,
  `tablename` varchar(45) CHARACTER SET latin1 COLLATE latin1_german1_ci DEFAULT NULL,
  `headline` varchar(45) CHARACTER SET latin1 COLLATE latin1_german1_ci DEFAULT NULL,
  `headline_nr` int NOT NULL,
  `amount_topics` int NOT NULL,
  PRIMARY KEY (`nr`)
) ENGINE = InnoDB AUTO_INCREMENT = 13 DEFAULT CHARSET = latin1 COLLATE = latin1_german1_ci;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: abroad
# ------------------------------------------------------------

INSERT INTO
  `abroad` (`nr`, `text`, `active`)
VALUES
  (1, 'Afrika', NULL);
INSERT INTO
  `abroad` (`nr`, `text`, `active`)
VALUES
  (2, 'Amerika', NULL);
INSERT INTO
  `abroad` (`nr`, `text`, `active`)
VALUES
  (3, 'Asien', NULL);
INSERT INTO
  `abroad` (`nr`, `text`, `active`)
VALUES
  (4, 'Europa', NULL);
INSERT INTO
  `abroad` (`nr`, `text`, `active`)
VALUES
  (5, 'Andere', NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: archive_data
# ------------------------------------------------------------

INSERT INTO
  `archive_data` (
    `nr`,
    `dataset_number`,
    `name`,
    `school_publisher`,
    `year`,
    `number`,
    `city`,
    `state`,
    `publisher_is`,
    `topics_list`,
    `timestamp`
  )
VALUES
  (
    935,
    122,
    'Antifa Jugendinfo',
    'Antifa Jugendfront',
    '1991',
    '47',
    'Berlin',
    'Berlin',
    'free',
    '0_1 0_8 1_5 4_5 9_1 9_2',
    NULL
  );
INSERT INTO
  `archive_data` (
    `nr`,
    `dataset_number`,
    `name`,
    `school_publisher`,
    `year`,
    `number`,
    `city`,
    `state`,
    `publisher_is`,
    `topics_list`,
    `timestamp`
  )
VALUES
  (
    1033,
    102,
    'creative',
    'Rückert-Oberschule',
    '1987',
    '5',
    'Berlin',
    'Berlin',
    'school',
    '0_0 0_1 0_4 0_9 0_10 0_14 1_0 1_1 1_3 2_1 2_2 2_3 3_0 4_0 4_1 4_2 4_3 5_2 5_6 6_0 6_1 6_2 6_3 6_4 7_1 7_2 8_0 8_2 9_2 10_5 10_6',
    NULL
  );
INSERT INTO
  `archive_data` (
    `nr`,
    `dataset_number`,
    `name`,
    `school_publisher`,
    `year`,
    `number`,
    `city`,
    `state`,
    `publisher_is`,
    `topics_list`,
    `timestamp`
  )
VALUES
  (
    1043,
    101,
    'creative',
    'Rückert-Oberschule',
    '1987',
    '1',
    'Berlin',
    'Berlin',
    'school',
    '0_11 0_12 0_14 2_3 4_2 4_4 5_2 5_6 6_3 7_0',
    NULL
  );
INSERT INTO
  `archive_data` (
    `nr`,
    `dataset_number`,
    `name`,
    `school_publisher`,
    `year`,
    `number`,
    `city`,
    `state`,
    `publisher_is`,
    `topics_list`,
    `timestamp`
  )
VALUES
  (
    1058,
    6,
    'creative',
    'Rückert-Oberschule',
    '1987',
    '1',
    'Berlin',
    'Berlin',
    'school',
    '0_11 0_12 0_14 2_3 4_2 4_4 5_2 5_6 6_3 7_0',
    1752702972571
  );
INSERT INTO
  `archive_data` (
    `nr`,
    `dataset_number`,
    `name`,
    `school_publisher`,
    `year`,
    `number`,
    `city`,
    `state`,
    `publisher_is`,
    `topics_list`,
    `timestamp`
  )
VALUES
  (
    1060,
    7,
    'creative',
    'Rückert-Oberschule',
    '1987',
    '1',
    'Berlin',
    'Berlin',
    'school',
    '0_11 0_12 0_14 2_3 4_2 4_4 5_2 5_6 6_3 7_0',
    1752784684379
  );
INSERT INTO
  `archive_data` (
    `nr`,
    `dataset_number`,
    `name`,
    `school_publisher`,
    `year`,
    `number`,
    `city`,
    `state`,
    `publisher_is`,
    `topics_list`,
    `timestamp`
  )
VALUES
  (
    1063,
    100,
    'creative',
    'Rückert-Oberschule',
    '1987',
    '2',
    'Berlin',
    'Berlin',
    'school',
    '0_14 1_1 2_3 5_0 5_6 6_0 6_3 8_2 10_0',
    1752789008045
  );
INSERT INTO
  `archive_data` (
    `nr`,
    `dataset_number`,
    `name`,
    `school_publisher`,
    `year`,
    `number`,
    `city`,
    `state`,
    `publisher_is`,
    `topics_list`,
    `timestamp`
  )
VALUES
  (
    1072,
    2,
    'creative',
    'Rückert-Oberschule',
    '1987',
    '5',
    'Berlin',
    'Berlin',
    'school',
    '0_0 0_1 0_4 0_9 0_10 0_14 1_0 1_1 1_3 2_1 2_2 2_3 3_0 4_0 4_1 4_2 4_3 5_2 5_6 6_0 6_1 6_2 6_3 6_4 7_1 7_2 8_0 8_2 9_2 10_5 10_6',
    1752872200346
  );
INSERT INTO
  `archive_data` (
    `nr`,
    `dataset_number`,
    `name`,
    `school_publisher`,
    `year`,
    `number`,
    `city`,
    `state`,
    `publisher_is`,
    `topics_list`,
    `timestamp`
  )
VALUES
  (
    1073,
    1,
    'creative',
    'Rückert-Oberschule',
    '1987',
    '2',
    'Berlin',
    'Berlin',
    'school',
    '0_14 1_1 2_3 5_0 5_6 6_0 6_3 8_2 10_0',
    1752876478748
  );
INSERT INTO
  `archive_data` (
    `nr`,
    `dataset_number`,
    `name`,
    `school_publisher`,
    `year`,
    `number`,
    `city`,
    `state`,
    `publisher_is`,
    `topics_list`,
    `timestamp`
  )
VALUES
  (
    1074,
    8,
    'creative',
    'Rückert-Oberschule',
    '1987',
    '5',
    'Berlin',
    'Berlin',
    'school',
    '0_0 0_1 0_4 0_9 0_10 0_14 1_0 1_1 1_3 2_1 2_2 2_3 3_0 4_0 4_1 4_2 4_3 5_2 5_6 6_0 6_1 6_2 6_3 6_4 7_1 7_2 8_0 8_2 9_2 10_5 10_6',
    1752876496972
  );
INSERT INTO
  `archive_data` (
    `nr`,
    `dataset_number`,
    `name`,
    `school_publisher`,
    `year`,
    `number`,
    `city`,
    `state`,
    `publisher_is`,
    `topics_list`,
    `timestamp`
  )
VALUES
  (
    1077,
    3,
    'creative',
    'Rückert-Oberschule',
    '1987',
    '2',
    'Berlin',
    'Berlin',
    'school',
    '0_14 1_1 2_3 5_0 5_6 6_0 6_3 8_2 10_0',
    1752876570639
  );
INSERT INTO
  `archive_data` (
    `nr`,
    `dataset_number`,
    `name`,
    `school_publisher`,
    `year`,
    `number`,
    `city`,
    `state`,
    `publisher_is`,
    `topics_list`,
    `timestamp`
  )
VALUES
  (
    1078,
    9,
    'creative',
    'Rückert-Oberschule',
    '1987',
    '1',
    'Berlin',
    'Berlin',
    'school',
    '0_11 0_12 0_14 2_3 4_2 4_4 5_2 5_6 6_3 7_0 9_0 9_1',
    1753211061818
  );
INSERT INTO
  `archive_data` (
    `nr`,
    `dataset_number`,
    `name`,
    `school_publisher`,
    `year`,
    `number`,
    `city`,
    `state`,
    `publisher_is`,
    `topics_list`,
    `timestamp`
  )
VALUES
  (
    1079,
    4,
    'creative',
    'Rückert-Oberschule',
    '1987',
    '2',
    'Berlin',
    'Berlin',
    'school',
    '0_14 1_1 2_3 5_0 5_6 6_0 6_3 8_2 10_0',
    1753291521291
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: constants
# ------------------------------------------------------------

INSERT INTO
  `constants` (`nr`, `const_name`, `const_value`)
VALUES
  (1, 'searchTopItemCnt', 7);
INSERT INTO
  `constants` (`nr`, `const_name`, `const_value`)
VALUES
  (2, 'maxSearchSets', 10);
INSERT INTO
  `constants` (`nr`, `const_name`, `const_value`)
VALUES
  (3, 'datasetTopItemCount', 8);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: culture_and_art
# ------------------------------------------------------------

INSERT INTO
  `culture_and_art` (`nr`, `text`, `active`)
VALUES
  (1, 'Bühne', NULL);
INSERT INTO
  `culture_and_art` (`nr`, `text`, `active`)
VALUES
  (2, 'Literatur', NULL);
INSERT INTO
  `culture_and_art` (`nr`, `text`, `active`)
VALUES
  (3, 'Kino', NULL);
INSERT INTO
  `culture_and_art` (`nr`, `text`, `active`)
VALUES
  (4, 'Musik', NULL);
INSERT INTO
  `culture_and_art` (`nr`, `text`, `active`)
VALUES
  (5, 'Allgemein', NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: dataset_comments
# ------------------------------------------------------------

INSERT INTO
  `dataset_comments` (`nr`, `dataset_number`, `comment`)
VALUES
  (
    491,
    122,
    'Antifaschistische%20Sch%C3%BCler%2Finnen-Zeitung'
  );
INSERT INTO
  `dataset_comments` (`nr`, `dataset_number`, `comment`)
VALUES
  (499, 123, '');
INSERT INTO
  `dataset_comments` (`nr`, `dataset_number`, `comment`)
VALUES
  (
    589,
    102,
    '(_x)%0AKritischer%20Leserbrief.%0AThomas%20Mann.%0AMichael%20Jackson.%0ADostojewskij.'
  );
INSERT INTO
  `dataset_comments` (`nr`, `dataset_number`, `comment`)
VALUES
  (599, 101, '(_x)%0ABerliner%20Senat.');
INSERT INTO
  `dataset_comments` (`nr`, `dataset_number`, `comment`)
VALUES
  (616, 6, '666666666666');
INSERT INTO
  `dataset_comments` (`nr`, `dataset_number`, `comment`)
VALUES
  (618, 7, '(_x)%0ABerliner%20Senat.');
INSERT INTO
  `dataset_comments` (`nr`, `dataset_number`, `comment`)
VALUES
  (
    621,
    100,
    '(_x)%2C%0AETA%20Hoffmann.%0AComputer%20C64.'
  );
INSERT INTO
  `dataset_comments` (`nr`, `dataset_number`, `comment`)
VALUES
  (
    630,
    2,
    '(_x)%0AKritischer%20Leserbrief.%0AThomas%20Mann.%0AMichael%20Jackson.%0ADostojewskij.'
  );
INSERT INTO
  `dataset_comments` (`nr`, `dataset_number`, `comment`)
VALUES
  (
    631,
    1,
    '(_x)%2C%0AETA%20Hoffmann.%0AComputer%20C64.'
  );
INSERT INTO
  `dataset_comments` (`nr`, `dataset_number`, `comment`)
VALUES
  (
    632,
    8,
    '(_x)%0AKritischer%20Leserbrief.%0AThomas%20Mann.%0AMichael%20Jackson.%0ADostojewskij.'
  );
INSERT INTO
  `dataset_comments` (`nr`, `dataset_number`, `comment`)
VALUES
  (635, 3, '3333333333');
INSERT INTO
  `dataset_comments` (`nr`, `dataset_number`, `comment`)
VALUES
  (636, 9, '(_x)%0ABerliner%20Senat.');
INSERT INTO
  `dataset_comments` (`nr`, `dataset_number`, `comment`)
VALUES
  (637, 4, '4444444444444444');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: dataset_top_headlines
# ------------------------------------------------------------

INSERT INTO
  `dataset_top_headlines` (`nr`, `names`, `arraypos`)
VALUES
  (1, 'Name', 0);
INSERT INTO
  `dataset_top_headlines` (`nr`, `names`, `arraypos`)
VALUES
  (2, 'Ausgabe', 6);
INSERT INTO
  `dataset_top_headlines` (`nr`, `names`, `arraypos`)
VALUES
  (3, 'Jahr', 5);
INSERT INTO
  `dataset_top_headlines` (`nr`, `names`, `arraypos`)
VALUES
  (4, 'Ort', 2);
INSERT INTO
  `dataset_top_headlines` (`nr`, `names`, `arraypos`)
VALUES
  (6, 'Schule / Herausgeber', 1);
INSERT INTO
  `dataset_top_headlines` (`nr`, `names`, `arraypos`)
VALUES
  (7, 'Herausgeber ist', 4);
INSERT INTO
  `dataset_top_headlines` (`nr`, `names`, `arraypos`)
VALUES
  (8, 'Land', 3);
INSERT INTO
  `dataset_top_headlines` (`nr`, `names`, `arraypos`)
VALUES
  (9, 'Nummer', 8);
INSERT INTO
  `dataset_top_headlines` (`nr`, `names`, `arraypos`)
VALUES
  (10, 'Merken', 9);
INSERT INTO
  `dataset_top_headlines` (`nr`, `names`, `arraypos`)
VALUES
  (11, 'Speichern', 10);
INSERT INTO
  `dataset_top_headlines` (`nr`, `names`, `arraypos`)
VALUES
  (12, 'Bemerkung zur Zeitschrift', 7);
INSERT INTO
  `dataset_top_headlines` (`nr`, `names`, `arraypos`)
VALUES
  (13, 'Löschen', 11);
INSERT INTO
  `dataset_top_headlines` (`nr`, `names`, `arraypos`)
VALUES
  (14, 'Anfordern', 12);
INSERT INTO
  `dataset_top_headlines` (`nr`, `names`, `arraypos`)
VALUES
  (15, 'Neu', 13);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: education
# ------------------------------------------------------------

INSERT INTO
  `education` (`nr`, `text`, `active`)
VALUES
  (1, 'Schulformen / Universitäten', NULL);
INSERT INTO
  `education` (`nr`, `text`, `active`)
VALUES
  (2, 'Lehre / Berufsausbildung', NULL);
INSERT INTO
  `education` (`nr`, `text`, `active`)
VALUES
  (3, 'Allgemein', NULL);
INSERT INTO
  `education` (`nr`, `text`, `active`)
VALUES
  (4, 'Pädagogik', NULL);
INSERT INTO
  `education` (`nr`, `text`, `active`)
VALUES
  (5, 'Schulinterna / UNI-Interna', NULL);
INSERT INTO
  `education` (`nr`, `text`, `active`)
VALUES
  (6, 'Außerschulische', NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: health
# ------------------------------------------------------------

INSERT INTO
  `health` (`nr`, `text`, `active`)
VALUES
  (1, 'Allgemeines', NULL);
INSERT INTO
  `health` (`nr`, `text`, `active`)
VALUES
  (2, 'Suchtstoffe / Drogen', NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: images
# ------------------------------------------------------------

INSERT INTO
  `images` (`nr`, `image_nr`, `image_path`)
VALUES
  (1, 1, 'images/LOGO1_blau_300.gif');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: info_labels
# ------------------------------------------------------------

INSERT INTO
  `info_labels` (`id`, `text`)
VALUES
  (
    1,
    'Willkommen bei dem Archiv der Jugendzeitschriften<br><br>\nLandesSchülerVertretung Berlin (LSV)<br>\nHellersdorfer Weg 35<br>\n12689 Berlin<br><br>\nTelefon: 030 22 35 88 47<br>\n\n                        E-Mail: briefkasten@lsv-berlin.de'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: justice_police_state_administration
# ------------------------------------------------------------

INSERT INTO
  `justice_police_state_administration` (`nr`, `text`, `active`)
VALUES
  (1, 'Grundlagen', NULL);
INSERT INTO
  `justice_police_state_administration` (`nr`, `text`, `active`)
VALUES
  (2, 'Sicherheit und Überwachung', NULL);
INSERT INTO
  `justice_police_state_administration` (`nr`, `text`, `active`)
VALUES
  (3, 'Gerichte', NULL);
INSERT INTO
  `justice_police_state_administration` (`nr`, `text`, `active`)
VALUES
  (4, 'Polizei', NULL);
INSERT INTO
  `justice_police_state_administration` (`nr`, `text`, `active`)
VALUES
  (5, 'Kriminalität', NULL);
INSERT INTO
  `justice_police_state_administration` (`nr`, `text`, `active`)
VALUES
  (6, 'Gewalt / -prävention', NULL);
INSERT INTO
  `justice_police_state_administration` (`nr`, `text`, `active`)
VALUES
  (7, 'Repression / Anti-Repression', NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: media
# ------------------------------------------------------------

INSERT INTO
  `media` (`nr`, `text`, `active`)
VALUES
  (1, 'Online-Medien', NULL);
INSERT INTO
  `media` (`nr`, `text`, `active`)
VALUES
  (2, '\"Soziale Netzwerke\"', NULL);
INSERT INTO
  `media` (`nr`, `text`, `active`)
VALUES
  (3, 'TV / Radio', NULL);
INSERT INTO
  `media` (`nr`, `text`, `active`)
VALUES
  (4, 'Printmedien', NULL);
INSERT INTO
  `media` (`nr`, `text`, `active`)
VALUES
  (5, 'Zensur', NULL);
INSERT INTO
  `media` (`nr`, `text`, `active`)
VALUES
  (6, 'Games', NULL);
INSERT INTO
  `media` (`nr`, `text`, `active`)
VALUES
  (7, 'Computer', NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: military
# ------------------------------------------------------------

INSERT INTO
  `military` (`nr`, `text`, `active`)
VALUES
  (1, 'Rüstung', NULL);
INSERT INTO
  `military` (`nr`, `text`, `active`)
VALUES
  (2, 'Armeen', NULL);
INSERT INTO
  `military` (`nr`, `text`, `active`)
VALUES
  (3, 'Krieg', NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: output_text
# ------------------------------------------------------------

INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (
    1,
    'mainWindowHeadline',
    'Archiv der Jugendzeitschriften'
  );
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (
    2,
    'searchWindowHeadline',
    'Präsentation der Suchergebnisse'
  );
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (3, 'searchWindowSubheadline', ' ');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (4, 'school', 'Schule');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (5, 'free', 'Frei');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (6, 'search', 'Suchen');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (7, 'statusSearchEntry', 'Sucheingabe Nr.:');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (8, 'dbConnected', 'Verbunden mit Datenbank');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (
    9,
    'dbDisconnected',
    'Keine Verbindung zur Datenbank'
  );
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (
    10,
    'mainWindowHeadlineInput',
    'Dateneingabe zum Archiv der Jugendzeitschriften'
  );
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (11, 'input', 'Übernehmen');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (12, 'save', 'Speichern');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (
    13,
    'datasetWindowHeadline',
    'Inhalt der Zeitschrift'
  );
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (14, 'enterData', 'Daten eingeben');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (15, 'dataset', 'Zeitschrift');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (16, 'notFound', 'nicht gefunden');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (17, 'newDataset', 'Neue Zeitschrift');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (18, 'monday', 'Montag');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (19, 'tuesday', 'Dienstag');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (20, 'wednesday', 'Mittwoch');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (21, 'thursday', 'Donnerstag');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (22, 'friday', 'Freitag');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (23, 'saturday', 'Samstag');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (24, 'sunday', 'Sonntag');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (25, 'toLarge', 'zu groß');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (26, 'notSaved', 'nicht gespeichert');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (27, 'saved', 'gespeichert');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (28, 'remembered', 'gemerkt');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (29, 'databaseLogin', 'Datenbank Anmeldung');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (30, 'userName', 'Benutzername');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (31, 'passwordLabel', 'Passwort');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (32, 'cancel', 'Abbrechen');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (33, 'login', 'Anmelden');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (34, 'print', 'Drucken');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (35, 'change', 'Ändern');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (36, 'remove', 'Entfernen');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (37, 'editField', 'Bearbeitung');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (38, 'topics', 'Schlagwörter');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (
    39,
    'dataCouldBeChanged',
    'Daten können jetzt geändert werden'
  );
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (
    40,
    'statusValidNumber',
    'Bitte gültige Nummer eingeben'
  );
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (
    41,
    'statusDatasetNumberInput',
    'Bitte Nummer der Zeitschrift eingeben'
  );
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (42, 'notExists', 'nicht vorhanden');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (43, 'exists', 'ist vorhanden');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (
    44,
    'deletingOfDataset',
    'Das Löschen von Zeitschrift'
  );
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (45, 'confirm', 'bitte bestätigen');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (
    46,
    'versionOfProgram',
    'Version des Programms vom'
  );
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (47, 'changed', 'geändert');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (48, 'oneMoment', 'Einen Moment...');
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (
    49,
    'statusDatasetOnList',
    'Zeitschrift schon auf Merkliste'
  );
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (
    50,
    'statusDatasetEnter',
    'Bitte Datensatznummer eingeben'
  );
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (
    51,
    'wrongUserOrPassword',
    'Benutzername oder Passwort falsch!'
  );
INSERT INTO
  `output_text` (`nr`, `name`, `value`)
VALUES
  (52, 'close', 'Schliessen');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: politics_society
# ------------------------------------------------------------

INSERT INTO
  `politics_society` (`nr`, `text`, `active`)
VALUES
  (1, 'Demokratie / Parlamentarismus', NULL);
INSERT INTO
  `politics_society` (`nr`, `text`, `active`)
VALUES
  (
    2,
    'Antifaschismus / Faschismus / Neofaschismus',
    NULL
  );
INSERT INTO
  `politics_society` (`nr`, `text`, `active`)
VALUES
  (3, 'Andere Formen der Gesellschaft', NULL);
INSERT INTO
  `politics_society` (`nr`, `text`, `active`)
VALUES
  (4, 'Europäische Union', NULL);
INSERT INTO
  `politics_society` (`nr`, `text`, `active`)
VALUES
  (5, 'Geschichte', NULL);
INSERT INTO
  `politics_society` (`nr`, `text`, `active`)
VALUES
  (6, 'Theorie und Wissenschaft', NULL);
INSERT INTO
  `politics_society` (`nr`, `text`, `active`)
VALUES
  (7, 'Philosophie', NULL);
INSERT INTO
  `politics_society` (`nr`, `text`, `active`)
VALUES
  (8, 'Globalisierung', NULL);
INSERT INTO
  `politics_society` (`nr`, `text`, `active`)
VALUES
  (9, 'Emanzipative Bewegungen', NULL);
INSERT INTO
  `politics_society` (`nr`, `text`, `active`)
VALUES
  (10, 'Tierwelt', NULL);
INSERT INTO
  `politics_society` (`nr`, `text`, `active`)
VALUES
  (11, 'Ökologie', NULL);
INSERT INTO
  `politics_society` (`nr`, `text`, `active`)
VALUES
  (12, 'Städtebau / Architektur', NULL);
INSERT INTO
  `politics_society` (`nr`, `text`, `active`)
VALUES
  (13, 'Verkehr', NULL);
INSERT INTO
  `politics_society` (`nr`, `text`, `active`)
VALUES
  (14, 'Datenschutz / Sicherheit', NULL);
INSERT INTO
  `politics_society` (`nr`, `text`, `active`)
VALUES
  (15, 'Sport', NULL);
INSERT INTO
  `politics_society` (`nr`, `text`, `active`)
VALUES
  (16, 'Werbung', NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: religion
# ------------------------------------------------------------

INSERT INTO
  `religion` (`nr`, `text`, `active`)
VALUES
  (1, 'Christliche', NULL);
INSERT INTO
  `religion` (`nr`, `text`, `active`)
VALUES
  (2, 'Islamische', NULL);
INSERT INTO
  `religion` (`nr`, `text`, `active`)
VALUES
  (3, 'Jüdische', NULL);
INSERT INTO
  `religion` (`nr`, `text`, `active`)
VALUES
  (4, 'Buddhismus / Ostasiatisch', NULL);
INSERT INTO
  `religion` (`nr`, `text`, `active`)
VALUES
  (5, 'Esoterik / Sekten / Andere', NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sha2
# ------------------------------------------------------------

INSERT INTO
  `sha2` (`nr`, `sha2val`, `userName`)
VALUES
  (
    6,
    'b18a5e6b50af3073f63ac2c4ee837a7c9c6f06d7e91206980283509e3738311e',
    'admin2'
  );
INSERT INTO
  `sha2` (`nr`, `sha2val`, `userName`)
VALUES
  (
    7,
    '45537b6ad7112eae2dcaa9933213cc2c4757418882aa255c523967057fc0177a',
    'admin1'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: social
# ------------------------------------------------------------

INSERT INTO
  `social` (`nr`, `text`, `active`)
VALUES
  (1, 'Arbeitswelt', NULL);
INSERT INTO
  `social` (`nr`, `text`, `active`)
VALUES
  (2, 'Kämpfe', NULL);
INSERT INTO
  `social` (`nr`, `text`, `active`)
VALUES
  (3, 'Migration', NULL);
INSERT INTO
  `social` (`nr`, `text`, `active`)
VALUES
  (4, 'Diskriminierung', NULL);
INSERT INTO
  `social` (`nr`, `text`, `active`)
VALUES
  (5, 'Armut und Reichtum', NULL);
INSERT INTO
  `social` (`nr`, `text`, `active`)
VALUES
  (6, 'Sexualität, Selbstbestimmung', NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: states
# ------------------------------------------------------------

INSERT INTO
  `states` (`id`, `name`, `active`)
VALUES
  (1, 'Baden-Württemberg', NULL);
INSERT INTO
  `states` (`id`, `name`, `active`)
VALUES
  (2, 'Bayern', NULL);
INSERT INTO
  `states` (`id`, `name`, `active`)
VALUES
  (3, 'Berlin', NULL);
INSERT INTO
  `states` (`id`, `name`, `active`)
VALUES
  (4, 'Brandenburg', NULL);
INSERT INTO
  `states` (`id`, `name`, `active`)
VALUES
  (5, 'Bremen', NULL);
INSERT INTO
  `states` (`id`, `name`, `active`)
VALUES
  (6, 'Hamburg', NULL);
INSERT INTO
  `states` (`id`, `name`, `active`)
VALUES
  (7, 'Hessen', NULL);
INSERT INTO
  `states` (`id`, `name`, `active`)
VALUES
  (8, 'Mecklenburg-Vorpommern', NULL);
INSERT INTO
  `states` (`id`, `name`, `active`)
VALUES
  (9, 'Niedersachsen', NULL);
INSERT INTO
  `states` (`id`, `name`, `active`)
VALUES
  (10, 'Nordrhein-Westfalen', NULL);
INSERT INTO
  `states` (`id`, `name`, `active`)
VALUES
  (11, 'Rheinland-Pfalz', NULL);
INSERT INTO
  `states` (`id`, `name`, `active`)
VALUES
  (12, 'Saarland', NULL);
INSERT INTO
  `states` (`id`, `name`, `active`)
VALUES
  (13, 'Sachsen-Anhalt', NULL);
INSERT INTO
  `states` (`id`, `name`, `active`)
VALUES
  (14, 'Sachsen', NULL);
INSERT INTO
  `states` (`id`, `name`, `active`)
VALUES
  (15, 'Schleswig-Holstein', NULL);
INSERT INTO
  `states` (`id`, `name`, `active`)
VALUES
  (16, 'Thüringen', NULL);
INSERT INTO
  `states` (`id`, `name`, `active`)
VALUES
  (17, 'Ausland', NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: students_activities
# ------------------------------------------------------------

INSERT INTO
  `students_activities` (`nr`, `text`, `active`)
VALUES
  (1, 'SV / Mitbestimmung', NULL);
INSERT INTO
  `students_activities` (`nr`, `text`, `active`)
VALUES
  (2, 'Aktionen', NULL);
INSERT INTO
  `students_activities` (`nr`, `text`, `active`)
VALUES
  (3, 'Projekttage', NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: top_headlines
# ------------------------------------------------------------

INSERT INTO
  `top_headlines` (`nr`, `names`, `arraypos`)
VALUES
  (1, 'Name', 0);
INSERT INTO
  `top_headlines` (`nr`, `names`, `arraypos`)
VALUES
  (2, 'Ausgabe', 6);
INSERT INTO
  `top_headlines` (`nr`, `names`, `arraypos`)
VALUES
  (3, 'Jahr', 5);
INSERT INTO
  `top_headlines` (`nr`, `names`, `arraypos`)
VALUES
  (4, 'Ort', 2);
INSERT INTO
  `top_headlines` (`nr`, `names`, `arraypos`)
VALUES
  (5, 'Ergebnisse', 7);
INSERT INTO
  `top_headlines` (`nr`, `names`, `arraypos`)
VALUES
  (6, 'Schule / Herausgeber', 1);
INSERT INTO
  `top_headlines` (`nr`, `names`, `arraypos`)
VALUES
  (7, 'Herausgeber ist', 4);
INSERT INTO
  `top_headlines` (`nr`, `names`, `arraypos`)
VALUES
  (8, 'Land', 3);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: topic_headlines
# ------------------------------------------------------------

INSERT INTO
  `topic_headlines` (
    `nr`,
    `tablename`,
    `headline`,
    `headline_nr`,
    `amount_topics`
  )
VALUES
  (
    1,
    'justice_police_state_administration',
    'Justiz, Polizei, Staat und Verwaltung',
    11,
    7
  );
INSERT INTO
  `topic_headlines` (
    `nr`,
    `tablename`,
    `headline`,
    `headline_nr`,
    `amount_topics`
  )
VALUES
  (2, 'education', 'Bildung', 5, 6);
INSERT INTO
  `topic_headlines` (
    `nr`,
    `tablename`,
    `headline`,
    `headline_nr`,
    `amount_topics`
  )
VALUES
  (
    3,
    'politics_society',
    'Politik und Gesellschaft',
    1,
    16
  );
INSERT INTO
  `topic_headlines` (
    `nr`,
    `tablename`,
    `headline`,
    `headline_nr`,
    `amount_topics`
  )
VALUES
  (
    4,
    'students_activities',
    'Schüler*innen Aktivitäten',
    8,
    3
  );
INSERT INTO
  `topic_headlines` (
    `nr`,
    `tablename`,
    `headline`,
    `headline_nr`,
    `amount_topics`
  )
VALUES
  (5, 'social', 'Soziales', 2, 6);
INSERT INTO
  `topic_headlines` (
    `nr`,
    `tablename`,
    `headline`,
    `headline_nr`,
    `amount_topics`
  )
VALUES
  (7, 'abroad', 'Außen', 3, 5);
INSERT INTO
  `topic_headlines` (
    `nr`,
    `tablename`,
    `headline`,
    `headline_nr`,
    `amount_topics`
  )
VALUES
  (8, 'media', 'Medien', 6, 7);
INSERT INTO
  `topic_headlines` (
    `nr`,
    `tablename`,
    `headline`,
    `headline_nr`,
    `amount_topics`
  )
VALUES
  (9, 'health', 'Gesundheit', 4, 2);
INSERT INTO
  `topic_headlines` (
    `nr`,
    `tablename`,
    `headline`,
    `headline_nr`,
    `amount_topics`
  )
VALUES
  (10, 'culture_and_art', 'Kunst & Kultur', 7, 5);
INSERT INTO
  `topic_headlines` (
    `nr`,
    `tablename`,
    `headline`,
    `headline_nr`,
    `amount_topics`
  )
VALUES
  (11, 'religion', 'Religion', 9, 5);
INSERT INTO
  `topic_headlines` (
    `nr`,
    `tablename`,
    `headline`,
    `headline_nr`,
    `amount_topics`
  )
VALUES
  (12, 'military', 'Militär', 10, 3);

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
