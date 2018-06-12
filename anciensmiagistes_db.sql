-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Mar 12 Juin 2018 à 23:17
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `anciensmiagistes_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `alumni`
--

CREATE TABLE IF NOT EXISTS `alumni` (
  `USERID` int(2) NOT NULL,
  `USERGRADYEAR` date NOT NULL,
  `USERCOMPANY` varchar(128) DEFAULT NULL,
  `USERFUNCTION` varchar(128) DEFAULT NULL,
  `USERSALARY` char(32) DEFAULT NULL,
  `USERFIRSTHIRINGYEAR` date DEFAULT NULL,
  `USERHIRINGYEAR` date DEFAULT NULL,
  PRIMARY KEY (`USERID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `article`
--

CREATE TABLE IF NOT EXISTS `article` (
  `ARTICLEID` int(2) NOT NULL AUTO_INCREMENT,
  `USERID` int(2) NOT NULL,
  `CATEGORYID` int(2) NOT NULL,
  `ARTICLENAME` varchar(128) NOT NULL,
  `ARTICLEDATE` date NOT NULL,
  `ARTICLEDESC` varchar(255) NOT NULL,
  `ARTICLEDOC` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`ARTICLEID`),
  KEY `article_ibfk_2` (`CATEGORYID`),
  KEY `article_ibfk_1` (`USERID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Contenu de la table `article`
--

INSERT INTO `article` (`ARTICLEID`, `USERID`, `CATEGORYID`, `ARTICLENAME`, `ARTICLEDATE`, `ARTICLEDESC`, `ARTICLEDOC`) VALUES
(9, 24, 4, 'Intégration', '2018-06-12', 'Chaque année, l''IUT de Mulhouse organise une journée d''intégration qui regroupe les amicales étudiantes autour d''une rencontre festive. Des tournois sportifs sont organisés avec une remise de prix à la fin de la journée.\r\n\r\nPour accompagner cet événement,', 'fichier_1528837619675.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE IF NOT EXISTS `category` (
  `CATEGORYID` int(2) NOT NULL AUTO_INCREMENT,
  `CATEGORYNAME` varchar(128) NOT NULL,
  PRIMARY KEY (`CATEGORYID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Contenu de la table `category`
--

INSERT INTO `category` (`CATEGORYID`, `CATEGORYNAME`) VALUES
(1, 'stages'),
(2, 'alternances'),
(4, 'Actualités'),
(5, 'emplois');

-- --------------------------------------------------------

--
-- Structure de la table `company`
--

CREATE TABLE IF NOT EXISTS `company` (
  `USERID` int(2) NOT NULL,
  `COMPANYNAME` varchar(128) NOT NULL,
  `COMPANYDESC` varchar(255) NOT NULL,
  PRIMARY KEY (`USERID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `rapport`
--

CREATE TABLE IF NOT EXISTS `rapport` (
  `RAPPORTID` int(11) NOT NULL AUTO_INCREMENT,
  `USERID` int(11) NOT NULL,
  `USEREMAIL` varchar(50) NOT NULL,
  `RAPPORTNAME` varchar(100) NOT NULL,
  `RAPPORTDATE` date NOT NULL,
  `RAPPORTDESC` text NOT NULL,
  `RAPPORTDOC` varchar(50) NOT NULL,
  PRIMARY KEY (`RAPPORTID`),
  KEY `FK_RAPPORT_USER` (`USERID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=23 ;

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE IF NOT EXISTS `role` (
  `ROLEID` int(2) NOT NULL AUTO_INCREMENT,
  `ROLENAME` varchar(128) NOT NULL,
  PRIMARY KEY (`ROLEID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Contenu de la table `role`
--

INSERT INTO `role` (`ROLEID`, `ROLENAME`) VALUES
(1, 'ADMIN'),
(4, 'ETUDIANT'),
(6, 'MODERATEUR'),
(7, 'ALUMNI'),
(9, 'ENTREPRISE'),
(10, 'PROFESSEUR');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `USERID` int(2) NOT NULL AUTO_INCREMENT,
  `ROLEID` int(2) NOT NULL,
  `USERNAME` varchar(128) NOT NULL,
  `USERSURNAME` varchar(128) NOT NULL,
  `USERADDRESS` varchar(128) NOT NULL,
  `USERPHONE` varchar(128) NOT NULL,
  `USERLOGIN` varchar(128) NOT NULL,
  `USERPWD` varchar(128) NOT NULL,
  `USERSTATUS` tinyint(1) NOT NULL,
  PRIMARY KEY (`USERID`),
  KEY `user_ibfk_1` (`ROLEID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=26 ;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`USERID`, `ROLEID`, `USERNAME`, `USERSURNAME`, `USERADDRESS`, `USERPHONE`, `USERLOGIN`, `USERPWD`, `USERSTATUS`) VALUES
(24, 1, 'Admin', 'Admin', '20 rue des frères lumières', '0663731871', 'miagemulhousetest@gmail.com', '$2b$10$a6Th4ED.5Unuu85OeSDkI.iA74JUPAs5X3.ttqfw4jSqANv1fNpcK', 1);

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `alumni`
--
ALTER TABLE `alumni`
  ADD CONSTRAINT `alumni_ibfk_1` FOREIGN KEY (`USERID`) REFERENCES `user` (`USERID`) ON DELETE CASCADE;

--
-- Contraintes pour la table `article`
--
ALTER TABLE `article`
  ADD CONSTRAINT `article_ibfk_1` FOREIGN KEY (`USERID`) REFERENCES `user` (`USERID`) ON DELETE CASCADE,
  ADD CONSTRAINT `article_ibfk_2` FOREIGN KEY (`CATEGORYID`) REFERENCES `category` (`CATEGORYID`) ON DELETE CASCADE;

--
-- Contraintes pour la table `company`
--
ALTER TABLE `company`
  ADD CONSTRAINT `company_ibfk_1` FOREIGN KEY (`USERID`) REFERENCES `user` (`USERID`) ON DELETE CASCADE;

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`ROLEID`) REFERENCES `role` (`ROLEID`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
