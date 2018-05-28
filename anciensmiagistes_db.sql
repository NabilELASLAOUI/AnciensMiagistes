-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  lun. 28 mai 2018 à 13:50
-- Version du serveur :  10.1.28-MariaDB
-- Version de PHP :  7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `anciensmiagistes_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `alumni`
--

CREATE TABLE `alumni` (
  `USERID` int(2) NOT NULL,
  `USERGRADYEAR` date NOT NULL,
  `USERCOMPANY` varchar(128) DEFAULT NULL,
  `USERFUNCTION` varchar(128) DEFAULT NULL,
  `USERSALARY` char(32) DEFAULT NULL,
  `USERFIRSTHIRINGYEAR` date DEFAULT NULL,
  `USERHIRINGYEAR` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `article`
--

CREATE TABLE `article` (
  `ARTICLEID` int(2) NOT NULL,
  `USERID` int(2) NOT NULL,
  `CATEGORYID` int(2) NOT NULL,
  `ARTICLENAME` varchar(128) NOT NULL,
  `ARTICLEDATE` date NOT NULL,
  `ARTICLEDESC` text NOT NULL,
  `ARTICLEDOC` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `article`
--

INSERT INTO `article` (`ARTICLEID`, `USERID`, `CATEGORYID`, `ARTICLENAME`, `ARTICLEDATE`, `ARTICLEDESC`, `ARTICLEDOC`) VALUES
(7, 1, 2, 'information importante', '2018-05-01', 'Vocali doctor studiorum levia instrumenta levia locum et non tibiaeque paucae lyrae et hydraulica doctor carpentorum histrionici sit ignaviae instrumenta levia ignaviae pro et bybliothecis et celebratae nunc tinnitu locum fabricantur resultantes studiorum\r\nVocali doctor studiorum levia instrumenta levia locum et non tibiaeque paucae lyrae et hydraulica doctor carpentorum histrionici sit ignaviae instrumenta levia ignaviae pro et bybliothecis et celebratae nunc tinnitu locum fabricantur resultantes studiorum Vocali doctor studiorum levia instrumenta levia locum et non tibiaeque paucae lyrae et hydraulica doctor carpentorum histrionici sit ignaviae instrumenta levia ignaviae pro et bybliothecis et celebratae nunc tinnitu locum fabricantur resultantes studiorum\r\nVocali doctor studiorum levia instrumenta levia locum et non tibiaeque paucae lyrae et hydraulica doctor carpentorum histrionici sit ignaviae instrumenta levia ignaviae pro et bybliothecis et celebratae nunc tinnitu locum fabricantur resultantes studiorum\r\nVocali doctor studiorum levia instrumenta levia locum et non tibiaeque paucae lyrae et hydraulica doctor carpentorum histrionici sit ignaviae instrumenta levia ignaviae pro et bybliothecis et celebratae nunc tinnitu locum fabricantur resultantes studiorum', 'fichier_1526595118711.pdf'),
(45, 6, 2, 'Vocali doctor studiorum levia ', '2018-05-22', 'Vocali doctor studiorum levia instrumenta levia locum et non tibiaeque paucae lyrae et hydraulica doctor carpentorum histrionici sit ignaviae instrumenta levia ignaviae pro et bybliothecis et celebratae nunc tinnitu locum fabricantur resultantes studiorum\r\nVocali doctor studiorum levia instrumenta levia locum et non tibiaeque paucae lyrae et hydraulica doctor carpentorum histrionici sit ignaviae instrumenta levia ignaviae pro et bybliothecis et celebratae nunc tinnitu locum fabricantur resultantes studiorum Vocali doctor studiorum levia instrumenta levia locum et non tibiaeque paucae lyrae et hydraulica doctor carpentorum histrionici sit ignaviae instrumenta levia ignaviae pro et bybliothecis et celebratae nunc tinnitu locum fabricantur resultantes studiorum\r\nVocali doctor studiorum levia instrumenta levia locum et non tibiaeque paucae lyrae et hydraulica doctor carpentorum histrionici sit ignaviae instrumenta levia ignaviae pro et bybliothecis et celebratae nunc tinnitu locum fabricantur resultantes studiorum\r\nVocali doctor studiorum levia instrumenta levia locum et non tibiaeque paucae lyrae et hydraulica doctor carpentorum histrionici sit ignaviae instrumenta levia ignaviae pro et bybliothecis et celebratae nunc tinnitu locum fabricantur resultantes studiorum', 'fichier_1526819323106.txt'),
(51, 6, 2, 'Vocali doctor studiorum levia ', '2018-05-26', 'Vocali doctor studiorum levia instrumenta levia locum et non tibiaeque paucae lyrae et hydraulica doctor carpentorum histrionici sit ignaviae instrumenta levia ignaviae pro et bybliothecis et celebratae nunc tinnitu locum fabricantur resultantes studiorum\r\nVocali doctor studiorum levia instrumenta levia locum et non tibiaeque paucae lyrae et hydraulica doctor carpentorum histrionici sit ignaviae instrumenta levia ignaviae pro et bybliothecis et celebratae nunc tinnitu locum fabricantur resultantes studiorum Vocali doctor studiorum levia instrumenta levia locum et non tibiaeque paucae lyrae et hydraulica doctor carpentorum histrionici sit ignaviae instrumenta levia ignaviae pro et bybliothecis et celebratae nunc tinnitu locum fabricantur resultantes studiorum\r\nVocali doctor studiorum levia instrumenta levia locum et non tibiaeque paucae lyrae et hydraulica doctor carpentorum histrionici sit ignaviae instrumenta levia ignaviae pro et bybliothecis et celebratae nunc tinnitu locum fabricantur resultantes studiorum\r\nVocali doctor studiorum levia instrumenta levia locum et non tibiaeque paucae lyrae et hydraulica doctor carpentorum histrionici sit ignaviae instrumenta levia ignaviae pro et bybliothecis et celebratae nunc tinnitu locum fabricantur resultantes studiorum', ''),
(52, 6, 2, 'Vocali doctor studiorum', '2018-05-26', 'Vocali doctor studiorum levia instrumenta levia locum et non tibiaeque paucae lyrae et hydraulica doctor carpentorum histrionici sit ignaviae instrumenta levia ignaviae pro et bybliothecis et celebratae nunc tinnitu locum fabricantur resultantes studiorum\r\nVocali doctor studiorum levia instrumenta levia locum et non tibiaeque paucae lyrae et hydraulica doctor carpentorum histrionici sit ignaviae instrumenta levia ignaviae pro et bybliothecis et celebratae nunc tinnitu locum fabricantur resultantes studiorum Vocali doctor studiorum levia instrumenta levia locum et non tibiaeque paucae lyrae et hydraulica doctor carpentorum histrionici sit ignaviae instrumenta levia ignaviae pro et bybliothecis et celebratae nunc tinnitu locum fabricantur resultantes studiorum\r\nVocali doctor studiorum levia instrumenta levia locum et non tibiaeque paucae lyrae et hydraulica doctor carpentorum histrionici sit ignaviae instrumenta levia ignaviae pro et bybliothecis et celebratae nunc tinnitu locum fabricantur resultantes studiorum\r\nVocali doctor studiorum levia instrumenta levia locum et non tibiaeque paucae lyrae et hydraulica doctor carpentorum histrionici sit ignaviae instrumenta levia ignaviae pro et bybliothecis et celebratae nunc tinnitu locum fabricantur resultantes studiorum', 'fichier_1527349826036.SQL'),
(53, 6, 2, 'Vocali doctor studiorum', '2018-05-26', 'Vocali doctor studiorum levia instrumenta levia locum et non tibiaeque paucae lyrae et hydraulica doctor carpentorum histrionici sit ignaviae instrumenta levia ignaviae pro et bybliothecis et celebratae nunc tinnitu locum fabricantur resultantes studiorum\r\nVocali doctor studiorum levia instrumenta levia locum et non tibiaeque paucae lyrae et hydraulica doctor carpentorum histrionici sit ignaviae instrumenta levia ignaviae pro et bybliothecis et celebratae nunc tinnitu locum fabricantur resultantes studiorum Vocali doctor studiorum levia instrumenta levia locum et non tibiaeque paucae lyrae et hydraulica doctor carpentorum histrionici sit ignaviae instrumenta levia ignaviae pro et bybliothecis et celebratae nunc tinnitu locum fabricantur resultantes studiorum\r\nVocali doctor studiorum levia instrumenta levia locum et non tibiaeque paucae lyrae et hydraulica doctor carpentorum histrionici sit ignaviae instrumenta levia ignaviae pro et bybliothecis et celebratae nunc tinnitu locum fabricantur resultantes studiorum\r\nVocali doctor studiorum levia instrumenta levia locum et non tibiaeque paucae lyrae et hydraulica doctor carpentorum histrionici sit ignaviae instrumenta levia ignaviae pro et bybliothecis et celebratae nunc tinnitu locum fabricantur resultantes studiorum', 'fichier_1527349844168.pdf'),
(54, 6, 2, 'Lorem ipsum dolor sit amet', '2018-05-26', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis mattis nunc. Praesent aliquet felis vitae orci pulvinar euismod. Pellentesque quis arcu condimentum risus posuere dignissim in vel nisl. Etiam et velit libero. Fusce ultrices, ex nec venenatis accumsan, arcu sem fermentum eros, dictum pulvinar magna erat et leo. Vivamus sed porttitor purus. Nulla ultrices justo sed justo cursus, nec laoreet orci tempus. Curabitur varius purus at nibh maximus accumsan. Phasellus ac molestie velit. Cras semper hendrerit vehicula. Curabitur cursus venenatis dui eget commodo. Nam condimentum congue tellus, in maximus lectus laoreet in. Donec sed varius elit. Mauris erat lacus, ultricies sed pharetra a, convallis ac elit. Praesent nec massa ut nisi vehicula convallis.\r\n\r\nInteger mattis quis neque nec accumsan. Ut magna erat, scelerisque ut viverra nec, fringilla sed turpis. Quisque euismod, tellus nec egestas sollicitudin, ante nisl cursus est, at porta nisi nisl non turpis. Proin tincidunt id lacus et hendrerit. Sed ante lectus, ultricies quis tempor nec, imperdiet eu augue. Etiam ipsum diam, feugiat vitae bibendum at, sodales in lorem. Cras quis massa consequat quam blandit viverra eu sed dui.\r\n\r\nPellentesque ut tincidunt dui, ac venenatis lorem. Fusce iaculis nunc nulla, id ultricies lacus iaculis in. Aliquam volutpat nulla ac felis fermentum, eu finibus sem egestas. Fusce finibus placerat nisl non efficitur. In eleifend maximus blandit. Quisque faucibus congue hendrerit. Quisque sollicitudin vehicula commodo. Vivamus imperdiet, dui quis rhoncus faucibus, mi augue lobortis neque, at feugiat odio neque sit amet lorem. Cras commodo at nisi vitae dapibus. Sed sit amet tincidunt purus. Nullam ullamcorper volutpat ex, non bibendum lacus sagittis sit amet.', 'fichier_1527351126523.jpg'),
(55, 6, 2, 'Lorem ipsum dolor sit amet', '2018-05-26', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis mattis nunc. Praesent aliquet felis vitae orci pulvinar euismod. Pellentesque quis arcu condimentum risus posuere dignissim in vel nisl. Etiam et velit libero. Fusce ultrices, ex nec venenatis accumsan, arcu sem fermentum eros, dictum pulvinar magna erat et leo. Vivamus sed porttitor purus. Nulla ultrices justo sed justo cursus, nec laoreet orci tempus. Curabitur varius purus at nibh maximus accumsan. Phasellus ac molestie velit. Cras semper hendrerit vehicula. Curabitur cursus venenatis dui eget commodo. Nam condimentum congue tellus, in maximus lectus laoreet in. Donec sed varius elit. Mauris erat lacus, ultricies sed pharetra a, convallis ac elit. Praesent nec massa ut nisi vehicula convallis.\r\n\r\nInteger mattis quis neque nec accumsan. Ut magna erat, scelerisque ut viverra nec, fringilla sed turpis. Quisque euismod, tellus nec egestas sollicitudin, ante nisl cursus est, at porta nisi nisl non turpis. Proin tincidunt id lacus et hendrerit. Sed ante lectus, ultricies quis tempor nec, imperdiet eu augue. Etiam ipsum diam, feugiat vitae bibendum at, sodales in lorem. Cras quis massa consequat quam blandit viverra eu sed dui.\r\n\r\nPellentesque ut tincidunt dui, ac venenatis lorem. Fusce iaculis nunc nulla, id ultricies lacus iaculis in. Aliquam volutpat nulla ac felis fermentum, eu finibus sem egestas. Fusce finibus placerat nisl non efficitur. In eleifend maximus blandit. Quisque faucibus congue hendrerit. Quisque sollicitudin vehicula commodo. Vivamus imperdiet, dui quis rhoncus faucibus, mi augue lobortis neque, at feugiat odio neque sit amet lorem. Cras commodo at nisi vitae dapibus. Sed sit amet tincidunt purus. Nullam ullamcorper volutpat ex, non bibendum lacus sagittis sit amet.', ''),
(56, 6, 2, 'Lorem ipsum dolor sit amet', '2018-05-26', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis mattis nunc. Praesent aliquet felis vitae orci pulvinar euismod. Pellentesque quis arcu condimentum risus posuere dignissim in vel nisl. Etiam et velit libero. Fusce ultrices, ex nec venenatis accumsan, arcu sem fermentum eros, dictum pulvinar magna erat et leo. Vivamus sed porttitor purus. Nulla ultrices justo sed justo cursus, nec laoreet orci tempus. Curabitur varius purus at nibh maximus accumsan. Phasellus ac molestie velit. Cras semper hendrerit vehicula. Curabitur cursus venenatis dui eget commodo. Nam condimentum congue tellus, in maximus lectus laoreet in. Donec sed varius elit. Mauris erat lacus, ultricies sed pharetra a, convallis ac elit. Praesent nec massa ut nisi vehicula convallis.\r\n\r\nInteger mattis quis neque nec accumsan. Ut magna erat, scelerisque ut viverra nec, fringilla sed turpis. Quisque euismod, tellus nec egestas sollicitudin, ante nisl cursus est, at porta nisi nisl non turpis. Proin tincidunt id lacus et hendrerit. Sed ante lectus, ultricies quis tempor nec, imperdiet eu augue. Etiam ipsum diam, feugiat vitae bibendum at, sodales in lorem. Cras quis massa consequat quam blandit viverra eu sed dui.\r\n\r\nPellentesque ut tincidunt dui, ac venenatis lorem. Fusce iaculis nunc nulla, id ultricies lacus iaculis in. Aliquam volutpat nulla ac felis fermentum, eu finibus sem egestas. Fusce finibus placerat nisl non efficitur. In eleifend maximus blandit. Quisque faucibus congue hendrerit. Quisque sollicitudin vehicula commodo. Vivamus imperdiet, dui quis rhoncus faucibus, mi augue lobortis neque, at feugiat odio neque sit amet lorem. Cras commodo at nisi vitae dapibus. Sed sit amet tincidunt purus. Nullam ullamcorper volutpat ex, non bibendum lacus sagittis sit amet.', ''),
(57, 6, 2, 'Lorem ipsum dolor sit amet', '2018-05-26', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis mattis nunc. Praesent aliquet felis vitae orci pulvinar euismod. Pellentesque quis arcu condimentum risus posuere dignissim in vel nisl. Etiam et velit libero. Fusce ultrices, ex nec venenatis accumsan, arcu sem fermentum eros, dictum pulvinar magna erat et leo. Vivamus sed porttitor purus. Nulla ultrices justo sed justo cursus, nec laoreet orci tempus. Curabitur varius purus at nibh maximus accumsan. Phasellus ac molestie velit. Cras semper hendrerit vehicula. Curabitur cursus venenatis dui eget commodo. Nam condimentum congue tellus, in maximus lectus laoreet in. Donec sed varius elit. Mauris erat lacus, ultricies sed pharetra a, convallis ac elit. Praesent nec massa ut nisi vehicula convallis.\r\n\r\nInteger mattis quis neque nec accumsan. Ut magna erat, scelerisque ut viverra nec, fringilla sed turpis. Quisque euismod, tellus nec egestas sollicitudin, ante nisl cursus est, at porta nisi nisl non turpis. Proin tincidunt id lacus et hendrerit. Sed ante lectus, ultricies quis tempor nec, imperdiet eu augue. Etiam ipsum diam, feugiat vitae bibendum at, sodales in lorem. Cras quis massa consequat quam blandit viverra eu sed dui.\r\n\r\nPellentesque ut tincidunt dui, ac venenatis lorem. Fusce iaculis nunc nulla, id ultricies lacus iaculis in. Aliquam volutpat nulla ac felis fermentum, eu finibus sem egestas. Fusce finibus placerat nisl non efficitur. In eleifend maximus blandit. Quisque faucibus congue hendrerit. Quisque sollicitudin vehicula commodo. Vivamus imperdiet, dui quis rhoncus faucibus, mi augue lobortis neque, at feugiat odio neque sit amet lorem. Cras commodo at nisi vitae dapibus. Sed sit amet tincidunt purus. Nullam ullamcorper volutpat ex, non bibendum lacus sagittis sit amet.', 'fichier_1527351300384.jpg'),
(58, 6, 2, 'Lorem ipsum dolor sit amet', '2018-05-26', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis mattis nunc. Praesent aliquet felis vitae orci pulvinar euismod. Pellentesque quis arcu condimentum risus posuere dignissim in vel nisl. Etiam et velit libero. Fusce ultrices, ex nec venenatis accumsan, arcu sem fermentum eros, dictum pulvinar magna erat et leo. Vivamus sed porttitor purus. Nulla ultrices justo sed justo cursus, nec laoreet orci tempus. Curabitur varius purus at nibh maximus accumsan. Phasellus ac molestie velit. Cras semper hendrerit vehicula. Curabitur cursus venenatis dui eget commodo. Nam condimentum congue tellus, in maximus lectus laoreet in. Donec sed varius elit. Mauris erat lacus, ultricies sed pharetra a, convallis ac elit. Praesent nec massa ut nisi vehicula convallis.\r\n\r\nInteger mattis quis neque nec accumsan. Ut magna erat, scelerisque ut viverra nec, fringilla sed turpis. Quisque euismod, tellus nec egestas sollicitudin, ante nisl cursus est, at porta nisi nisl non turpis. Proin tincidunt id lacus et hendrerit. Sed ante lectus, ultricies quis tempor nec, imperdiet eu augue. Etiam ipsum diam, feugiat vitae bibendum at, sodales in lorem. Cras quis massa consequat quam blandit viverra eu sed dui.\r\n\r\nPellentesque ut tincidunt dui, ac venenatis lorem. Fusce iaculis nunc nulla, id ultricies lacus iaculis in. Aliquam volutpat nulla ac felis fermentum, eu finibus sem egestas. Fusce finibus placerat nisl non efficitur. In eleifend maximus blandit. Quisque faucibus congue hendrerit. Quisque sollicitudin vehicula commodo. Vivamus imperdiet, dui quis rhoncus faucibus, mi augue lobortis neque, at feugiat odio neque sit amet lorem. Cras commodo at nisi vitae dapibus. Sed sit amet tincidunt purus. Nullam ullamcorper volutpat ex, non bibendum lacus sagittis sit amet.', ''),
(66, 12, 1, 'Lorem ipsum dolor sit amet', '2018-05-28', 'w454w', ''),
(67, 6, 4, 'Developpeur full Stack', '2018-05-28', 'wer', ''),
(68, 6, 4, 'wewe', '2018-05-28', 'ewrewr', 'fichier_1527506835617.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE `category` (
  `CATEGORYID` int(2) NOT NULL,
  `CATEGORYNAME` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`CATEGORYID`, `CATEGORYNAME`) VALUES
(1, 'Emplois'),
(2, 'Stages'),
(3, 'Alternances'),
(4, 'Actualités');

-- --------------------------------------------------------

--
-- Structure de la table `company`
--

CREATE TABLE `company` (
  `USERID` int(2) NOT NULL,
  `COMPANYNAME` varchar(128) NOT NULL,
  `COMPANYDESC` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `rapport`
--

CREATE TABLE `rapport` (
  `RAPPORTID` int(11) NOT NULL,
  `USERID` int(11) NOT NULL,
  `USEREMAIL` varchar(50) NOT NULL,
  `RAPPORTNAME` varchar(100) NOT NULL,
  `RAPPORTDATE` date NOT NULL,
  `RAPPORTDESC` text NOT NULL,
  `RAPPORTDOC` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `rapport`
--

INSERT INTO `rapport` (`RAPPORTID`, `USERID`, `USEREMAIL`, `RAPPORTNAME`, `RAPPORTDATE`, `RAPPORTDESC`, `RAPPORTDOC`) VALUES
(28, 12, 'boubaks85@gmail.com', 'Boubacar Sow', '2018-05-28', '', 'rapport_1527503223518.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `ROLEID` int(2) NOT NULL,
  `ROLENAME` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`ROLEID`, `ROLENAME`) VALUES
(1, 'ADMIN'),
(2, 'ETUDIANT');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `USERID` int(2) NOT NULL,
  `ROLEID` int(2) NOT NULL,
  `USERNAME` varchar(128) NOT NULL,
  `USERSURNAME` varchar(128) NOT NULL,
  `USERADDRESS` varchar(128) NOT NULL,
  `USERPHONE` varchar(128) NOT NULL,
  `USERLOGIN` varchar(128) NOT NULL,
  `USERPWD` varchar(128) NOT NULL,
  `USERSTATUS` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`USERID`, `ROLEID`, `USERNAME`, `USERSURNAME`, `USERADDRESS`, `USERPHONE`, `USERLOGIN`, `USERPWD`, `USERSTATUS`) VALUES
(1, 1, 'sow', 'sow', 'brunstatt', '', 'boubaks85@uha.fr', '$2b$10$80WHJRcbqDzkY7Dv77S2buYL8OcuofBX1FmvCw2Bj.c70FDrCIyh.', 1),
(6, 1, 'sow', 'bouba', 'dfhtrh', '254', 'sow@uha.fr', '$2b$10$r72Udk6CAVi1CRvBzX67EuTVVh/sGAmCh24u/gwWPoh2HIiGEa3he', 1),
(12, 2, 'sow', 'boubacar', '125 B avenue d Altkirch', '0622027408', 'boubaks85@aa.fr', '$2b$10$ZCdKWkqQTn9pgoNUIQtT0.Ajcs88siKczfqT8ofbQdta/qBQT9cYO', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `alumni`
--
ALTER TABLE `alumni`
  ADD PRIMARY KEY (`USERID`);

--
-- Index pour la table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`ARTICLEID`),
  ADD KEY `FK_ARTICLE_CATEGORY` (`CATEGORYID`),
  ADD KEY `FK_ARTICLE_USER` (`USERID`);

--
-- Index pour la table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`CATEGORYID`);

--
-- Index pour la table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`USERID`);

--
-- Index pour la table `rapport`
--
ALTER TABLE `rapport`
  ADD PRIMARY KEY (`RAPPORTID`),
  ADD KEY `FK_RAPPORT_USER` (`USERID`);

--
-- Index pour la table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`ROLEID`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`USERID`),
  ADD KEY `FK_USER_ROLE` (`ROLEID`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `article`
--
ALTER TABLE `article`
  MODIFY `ARTICLEID` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT pour la table `category`
--
ALTER TABLE `category`
  MODIFY `CATEGORYID` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `rapport`
--
ALTER TABLE `rapport`
  MODIFY `RAPPORTID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT pour la table `role`
--
ALTER TABLE `role`
  MODIFY `ROLEID` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `USERID` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `alumni`
--
ALTER TABLE `alumni`
  ADD CONSTRAINT `FK_ALUMNI_USER` FOREIGN KEY (`USERID`) REFERENCES `user` (`USERID`);

--
-- Contraintes pour la table `article`
--
ALTER TABLE `article`
  ADD CONSTRAINT `FK_ARTICLE_CATEGORY` FOREIGN KEY (`CATEGORYID`) REFERENCES `category` (`CATEGORYID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_ARTICLE_USER` FOREIGN KEY (`USERID`) REFERENCES `user` (`USERID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `company`
--
ALTER TABLE `company`
  ADD CONSTRAINT `FK_COMPANY_USER` FOREIGN KEY (`USERID`) REFERENCES `user` (`USERID`);

--
-- Contraintes pour la table `rapport`
--
ALTER TABLE `rapport`
  ADD CONSTRAINT `FK_RAPPORT_USER` FOREIGN KEY (`USERID`) REFERENCES `user` (`USERID`) ON DELETE CASCADE;

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_USER_ROLE` FOREIGN KEY (`ROLEID`) REFERENCES `role` (`ROLEID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
