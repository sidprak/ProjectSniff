USE fbhack;

CREATE TABLE `packet` (
  `packet_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `dest` varchar(255) NOT NULL,
  `src` varchar(255) NOT NULL,
  `size` INT NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`packet_id`),
  KEY `dest_idx` (`dest`)
) ENGINE=InnoDB;

CREATE TABLE `geoip` (
  `geoip_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(255) NOT NULL,
  `latitude` FLOAT NOT NULL,
  `longitude` FLOAT NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`geoip_id`)
) ENGINE=InnoDB;

CREATE TABLE `reverse_lkp` (
  `reverse_lkp_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(255) NOT NULL,
  `domain` TEXT(1024) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`reverse_lkp_id`)
) ENGINE=InnoDB;

CREATE TABLE `name_ip` (
  `name_ip_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`name_ip_id`),
  UNIQUE KEY (`ip_address`),
  UNIQUE KEY (`name`),
  UNIQUE KEY (`ip_address`, `name`)
) ENGINE=InnoDB;
