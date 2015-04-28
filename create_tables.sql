# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.6.23)
# Database: music
# Generation Time: 2015-04-28 22:26:35 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table album
# ------------------------------------------------------------

DROP TABLE IF EXISTS `album`;

CREATE TABLE `album` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `band_id` int(10) unsigned DEFAULT NULL,
  `name` varchar(60) DEFAULT '',
  `release_date` varchar(50) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `album` WRITE;
/*!40000 ALTER TABLE `album` DISABLE KEYS */;

INSERT INTO `album` (`id`, `band_id`, `name`, `release_date`)
VALUES
	(1,1,'blah',NULL);

/*!40000 ALTER TABLE `album` ENABLE KEYS */;
UNLOCK TABLES;

# Dump of table artist
# ------------------------------------------------------------

DROP TABLE IF EXISTS `artist`;

CREATE TABLE `artist` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) DEFAULT '',
  `last_name` varchar(30) DEFAULT '',
  `instrument` varchar(60) DEFAULT '',
  `genre` varchar(60) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `artist` WRITE;
/*!40000 ALTER TABLE `artist` DISABLE KEYS */;

INSERT INTO `artist` (`id`, `first_name`, `last_name`, `instrument`, `genre`)
VALUES
	(1,'Les','Claypool','Bass',''),
	(2,'Larry','LeLonde','Guitar',''),
	(3,'Tim','Alexander','Drums',''),
	(4,'Brian','Keyhoe','Guitar',''),
	(5,'Thom','Yorke','Vocals',''),
	(6,'Colin','Greenwood','Bass',''),
	(7,'Johnny','Greenwood','Guitar','');

/*!40000 ALTER TABLE `artist` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table artist_for_band
# ------------------------------------------------------------

DROP TABLE IF EXISTS `artist_for_band`;

CREATE TABLE `artist_for_band` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `band_id` int(10) unsigned NOT NULL,
  `artist_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `artist_for_band` WRITE;
/*!40000 ALTER TABLE `artist_for_band` DISABLE KEYS */;

INSERT INTO `artist_for_band` (`id`, `band_id`, `artist_id`)
VALUES
	(1,1,1),
	(2,1,2),
	(3,1,3),
	(4,3,1),
	(5,3,4),
	(6,4,5),
	(7,4,6),
	(8,4,7);

/*!40000 ALTER TABLE `artist_for_band` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table band
# ------------------------------------------------------------

DROP TABLE IF EXISTS `band`;

CREATE TABLE `band` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(60) DEFAULT NULL,
  `genre` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `band` WRITE;
/*!40000 ALTER TABLE `band` DISABLE KEYS */;

INSERT INTO `band` (`id`, `name`, `genre`)
VALUES
	(1,'Primus','Metal'),
	(3,'Duo De Twang','Twang'),
	(4,'Radiohead','Alternative Rock'),
	(5,'Macklemore','Rap'),
	(7,'Atmosphere','Rap'),
	(11,'blah','duh'),
	(10,'updated','genreblah'),
	(14,'blah','blah');

/*!40000 ALTER TABLE `band` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table contributer_for_song
# ------------------------------------------------------------

DROP TABLE IF EXISTS `contributer_for_song`;

CREATE TABLE `contributer_for_song` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `song_id` int(10) unsigned NOT NULL,
  `artist_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table event
# ------------------------------------------------------------

DROP TABLE IF EXISTS `event`;

CREATE TABLE `event` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `artist_id` int(10) unsigned NOT NULL,
  `name` varchar(40) DEFAULT '',
  `time` datetime DEFAULT NULL,
  `location_longitude` decimal(7,4) DEFAULT NULL,
  `location_latitude` decimal(7,4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table song
# ------------------------------------------------------------

DROP TABLE IF EXISTS `song`;

CREATE TABLE `song` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `album_id` int(10) unsigned DEFAULT NULL,
  `name` varchar(30) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `song` WRITE;
/*!40000 ALTER TABLE `song` DISABLE KEYS */;

INSERT INTO `song` (`id`, `album_id`, `name`)
VALUES
	(2,1,'song name');

/*!40000 ALTER TABLE `song` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
