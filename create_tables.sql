# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.6.23)
# Database: music
# Generation Time: 2015-04-29 02:57:25 +0000
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
	(1,1,'Frizzle Fry','1990'),
	(2,1,'Sailing the Seas of Cheese','May 14, 1991'),
	(3,2,'Kid A','2000'),
	(4,2,'In Rainbows','2007'),
	(5,3,'When Life Gives You Lemons, You Paint That Shit Gold','2008'),
	(6,3,'God Loves Ugly','2002'),
	(7,4,'The Heist','October 9, 2012'),
	(8,5,'The Man in a Blue Turban with a Face','2004'),
	(9,5,'Life Fantastic','2011'),
	(10,6,'The Sunset Tree','2005'),
	(11,6,'All Hail West Texas','February 19, 2002'),
	(12,7,'The Lonesome Crowded West','1997'),
	(13,7,'We Were Dead Before the Ship Even Sank','2007'),
	(14,7,'Good News for People Who Love Bad News','April 6, 2004');

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
  `band_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `artist` WRITE;
/*!40000 ALTER TABLE `artist` DISABLE KEYS */;

INSERT INTO `artist` (`id`, `first_name`, `last_name`, `instrument`, `genre`, `band_id`)
VALUES
	(1,'Les','Claypool','Bass','',1),
	(2,'Larry','LaLonde','Guitar','',1),
	(3,'Tim','Alexander','Drums','',1),
	(4,'Thom','Yorke','Vocals','',2),
	(5,'Jonny','Greenwood','Keys','',2),
	(6,'Phillip','Selway','Drums','',2),
	(7,'Ed','O\'Brien','Guitar','',2),
	(8,'Colin','Greenwood','Bass','',2),
	(9,'Sean (Slug)','Daley','Vocals','',3),
	(10,'Anthony (Ant)','Davis','DJ','',3),
	(11,'Ben','Haggerty','Vocals','',4),
	(12,'Ryan','Lewis','DJ','',4),
	(13,'Honus','Honus','Vocals','',5),
	(14,'Pow','Pow','Drums','',5),
	(15,'Shono','Murphy','Guitar (others)','',5),
	(16,'Brown','Sugar','Bass (Others)','',5),
	(17,'John','Darnielle','Vocals / Guitar','',6),
	(18,'Peter','Hughes','Bass','',6),
	(19,'John','Wurster','Drums','',6),
	(20,'Isaaic','Brock','Vocals','',7),
	(21,'Jeremiah','Green','Drums','',7),
	(22,'Tom','Peloso','Bass / Keys','',7),
	(23,'Jim','Fairchild','Guitar','',7);

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
	(2,'Radiohead','Alternative Rock'),
	(3,'Atmosphere','Hip Hop'),
	(4,'Macklemore','Hip Hop'),
	(5,'Man Man','Rock'),
	(6,'The Mountain Goats','Folk Metal'),
	(7,'Modest Mouse','Alternative Rock');

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
  `name` varchar(60) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `song` WRITE;
/*!40000 ALTER TABLE `song` DISABLE KEYS */;

INSERT INTO `song` (`id`, `album_id`, `name`)
VALUES
	(1,1,'The Toys Go Winding Down'),
	(2,1,'Too Many Puppies'),
	(3,2,'American Life'),
	(4,2,'Jerry Was a Race Car Driver'),
	(5,3,'Kid A'),
	(6,3,'Everything in its Right Place'),
	(7,3,'Idioteque'),
	(8,4,'Nude'),
	(9,4,'15 Steps'),
	(10,4,'Weird Fishes/Arpeggi'),
	(11,4,'All I Need'),
	(12,4,'House of Cards'),
	(13,4,'Videotape'),
	(14,5,'You'),
	(15,5,'Me'),
	(16,5,'Guarantees'),
	(17,5,'Painting'),
	(18,5,'Shoulda Known'),
	(19,5,'Like the Rest of Us'),
	(20,6,'Godlovesugly'),
	(21,6,'Lovelife'),
	(22,6,'A Song About a Friend'),
	(23,6,'Fuck You Lucy'),
	(24,6,'Modern Man\'s Hustle'),
	(25,7,'Ten Thousand Hours'),
	(26,7,'The Wake'),
	(27,7,'White Walls'),
	(28,7,'Wing$'),
	(29,7,'Thrift Shop'),
	(30,8,'Gold Teeth'),
	(31,8,'Magic Blood'),
	(32,9,'Piranhas Club'),
	(33,9,'Life Fantastic'),
	(34,10,'You or Your Memory'),
	(35,10,'This Year'),
	(36,10,'Dance Music'),
	(37,10,'Lion\'s Teeth'),
	(38,10,'Love Love Love'),
	(39,11,'The Best Ever Death Metal Band in Denton'),
	(40,11,'Fault Lines'),
	(41,11,'The Mess Inside'),
	(42,12,'Doin\' the Cockroach'),
	(43,12,'Out of Gas'),
	(44,12,'Polar Opposites'),
	(45,12,'Bankrupt on Selling'),
	(46,12,'Styrofoam Boots/It\'s All Nice on Ice, Alright'),
	(47,13,'Dashboard'),
	(48,13,'Fire it Up'),
	(49,13,'Missed the Boat'),
	(50,14,'The World at Large'),
	(52,14,'Ocean Breathes Salty'),
	(53,14,'Float On');

/*!40000 ALTER TABLE `song` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
