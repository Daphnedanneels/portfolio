-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Machine: localhost:3306
-- Gegenereerd op: 29 apr 2016 om 21:55
-- Serverversie: 5.5.38
-- PHP-versie: 5.5.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Databank: `jonasdevacio3rie`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `mst_moestuinen`
--

CREATE TABLE `mst_moestuinen` (
`id` int(11) NOT NULL,
  `naam` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `foto` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `hash` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `rijen` int(11) NOT NULL,
  `kolommen` int(11) NOT NULL,
  `eigenaar` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=220 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Gegevens worden geëxporteerd voor tabel `mst_moestuinen`
--

INSERT INTO `mst_moestuinen` (`id`, `naam`, `foto`, `hash`, `rijen`, `kolommen`, `eigenaar`, `created`) VALUES
(217, 'Mijn Tuin', 'uploads/th_36_572380f15993d.jpg', '6fa4a54e81694958d52d9f9d0e3bb967', 4, 4, 36, '2016-04-29 15:42:42'),
(218, 'Mijn Moestuin', 'uploads/th_37_57238450ae845.jpg', '011d84152424ebdcf682a2d11c86e0dd', 3, 3, 37, '2016-04-29 15:57:04'),
(219, 'Mijn Groenseltuin', 'uploads/th_40_5723b6feee8d0.jpg', '621e1c11a0f8ea360f8849b6c998a323', 2, 3, 40, '2016-04-29 19:33:19');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `mst_moestuinen_users`
--

CREATE TABLE `mst_moestuinen_users` (
`id` int(11) NOT NULL,
  `moestuin_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=183 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Gegevens worden geëxporteerd voor tabel `mst_moestuinen_users`
--

INSERT INTO `mst_moestuinen_users` (`id`, `moestuin_id`, `user_id`) VALUES
(177, 217, 38),
(178, 217, 37),
(181, 219, 39),
(182, 219, 38);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `mst_notities`
--

CREATE TABLE `mst_notities` (
`id` int(11) NOT NULL,
  `moestuin_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `notitie` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `mst_percelen`
--

CREATE TABLE `mst_percelen` (
`id` int(11) NOT NULL,
  `moestuin_id` int(11) NOT NULL,
  `plant_id` int(11) NOT NULL,
  `nummer` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `watered` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB AUTO_INCREMENT=1759 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Gegevens worden geëxporteerd voor tabel `mst_percelen`
--

INSERT INTO `mst_percelen` (`id`, `moestuin_id`, `plant_id`, `nummer`, `status`, `created`, `watered`) VALUES
(1728, 217, 0, 0, 0, '2016-04-29 15:42:43', '2016-04-29 15:42:43'),
(1729, 217, 0, 1, 0, '2016-04-29 15:42:43', '2016-04-29 15:42:43'),
(1730, 217, 0, 2, 0, '2016-04-29 15:42:43', '2016-04-29 15:42:43'),
(1731, 217, 5, 3, 1, '2016-04-29 15:45:27', '2016-04-29 15:45:27'),
(1732, 217, 0, 4, 0, '2016-04-29 15:42:43', '2016-04-29 15:42:43'),
(1733, 217, 8, 5, 1, '2016-04-29 15:42:56', '2016-04-29 15:42:56'),
(1734, 217, 0, 6, 0, '2016-04-29 15:42:43', '2016-04-29 15:42:43'),
(1735, 217, 0, 7, 0, '2016-04-29 19:51:13', '2016-04-29 19:03:13'),
(1736, 217, 7, 8, 1, '2016-04-29 19:34:26', '2016-04-29 19:34:26'),
(1737, 217, 0, 9, 0, '2016-04-29 15:42:43', '2016-04-29 15:42:43'),
(1738, 217, 0, 10, 0, '2016-04-29 15:42:43', '2016-04-29 15:42:43'),
(1739, 217, 0, 11, 0, '2016-04-29 15:45:21', '2016-04-29 13:40:06'),
(1740, 217, 0, 12, 0, '2016-04-29 15:42:43', '2016-04-29 15:42:43'),
(1741, 217, 0, 13, 0, '2016-04-29 15:42:43', '2016-04-29 15:42:43'),
(1742, 217, 0, 14, 0, '2016-04-29 15:42:43', '2016-04-29 15:42:43'),
(1743, 217, 0, 15, 0, '2016-04-29 19:34:24', '2016-04-28 15:04:15'),
(1744, 218, 0, 0, 0, '2016-04-29 15:57:04', '2016-04-29 15:57:04'),
(1745, 218, 0, 1, 0, '2016-04-29 15:57:04', '2016-04-29 15:57:04'),
(1746, 218, 5, 2, 1, '2016-04-29 16:01:47', '2016-04-29 16:01:47'),
(1747, 218, 0, 3, 0, '2016-04-29 15:57:04', '2016-04-29 15:57:04'),
(1748, 218, 4, 4, 1, '2016-04-29 16:01:49', '2016-04-29 16:01:49'),
(1749, 218, 5, 5, 1, '2016-04-29 19:03:37', '2016-04-28 16:11:37'),
(1750, 218, 0, 6, 0, '2016-04-29 15:57:04', '2016-04-29 15:57:04'),
(1751, 218, 0, 7, 0, '2016-04-29 15:57:04', '2016-04-29 15:57:04'),
(1752, 218, 0, 8, 0, '2016-04-29 16:02:09', '2016-04-29 16:02:07'),
(1753, 219, 0, 0, 0, '2016-04-29 19:33:19', '2016-04-29 19:33:19'),
(1754, 219, 0, 1, 0, '2016-04-29 19:33:19', '2016-04-29 19:33:19'),
(1755, 219, 5, 2, 1, '2016-04-29 19:33:48', '2016-04-29 19:33:48'),
(1756, 219, 0, 3, 0, '2016-04-29 19:33:19', '2016-04-29 19:33:19'),
(1757, 219, 4, 4, 1, '2016-04-29 19:33:31', '2016-04-29 19:33:31'),
(1758, 219, 3, 5, 1, '2016-04-29 19:33:34', '2016-04-29 19:33:34');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `mst_planten`
--

CREATE TABLE `mst_planten` (
`id` int(11) NOT NULL,
  `plant_naam` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `tijd_tot_oogst` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `tijd_tot_water` int(20) NOT NULL,
  `foto` varchar(250) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Gegevens worden geëxporteerd voor tabel `mst_planten`
--

INSERT INTO `mst_planten` (`id`, `plant_naam`, `tijd_tot_oogst`, `tijd_tot_water`, `foto`) VALUES
(1, 'ajuin', '32', 8, 'ajuin.svg'),
(2, 'auberghine', '65', 10, 'auberghine.svg'),
(3, 'broccoli', '26', 12, 'broccoli.svg'),
(4, 'champignon', '5', 7, 'champignon.svg'),
(5, 'knol', '29', 14, 'knol.svg'),
(6, 'komkommer', '14', 6, 'komkommer.svg'),
(7, 'paprika', '19', 9, 'paprika.svg'),
(8, 'pompoen', '54', 24, 'pompoen.svg'),
(9, 'sla', '24', 4, 'sla.svg'),
(10, 'wortel', '8', 6, 'wortel.svg');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `mst_users`
--

CREATE TABLE `mst_users` (
`id` int(11) NOT NULL,
  `voornaam` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `achternaam` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `wachtwoord` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `foto` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `hash` varchar(500) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Gegevens worden geëxporteerd voor tabel `mst_users`
--

INSERT INTO `mst_users` (`id`, `voornaam`, `achternaam`, `email`, `wachtwoord`, `foto`, `hash`) VALUES
(36, 'jonas', 'devacht', 'jonas.devacht@outlook.be', '$2a$12$q.MOqgCySoN5Ry.oSJx5qul38Vu9HnkXBr4Ls9xUu/0bAOx84nBrC', 'uploads/th_jonas.devacht@outlook.be_572380c89e0fc.jpg', '930b4782b4f10fe119e5434223162ab9'),
(37, 'Joyce', 'Ryckewaert', 'joyceryckewaert@msn.com', '$2a$12$s0tAi2Nq.pSgwrYDDRcVx.b4IuRsaQLgWR92zSgy7MFJXF6cc014m', 'uploads/th_joyceryckewaert@msn.com_572383ec5843f.jpg', 'd7aa8b4f7d4f1af2496af0216581eca4'),
(38, 'Jonas ', 'Dubbelganger', 'jonas@jonas.be', '$2a$12$XKocOQipKx4tubj5msjyaO/jMY9i6Io7nbX2yedHH7HN7tH9xlAz.', 'uploads/th_jonas@jonas.be_5723852bd52e1.png', '7932630967069b6f7b9619d40d7d87ea'),
(39, 'Samuel ', 'De potter', 'samuel@samuel.be', '$2a$12$.QE5db8De0I4DdxW2dnKxenS3X4WJfWl8iyX59VpnH8fa1V/cD28.', 'uploads/th_samuel@samuel.be_57239bf37821a.jpg', '601e019d4a78302e0585fa45830003c7'),
(40, 'Simon', 'VandeVRT', 'simon@vrt.be', '$2a$12$89R5Gv2xAQTkhmnP.AQC5e770rbQNbG.IzkzaJB6uGKZ/Ri6ERrdS', 'uploads/th_simon@vrt.be_5723b3e3a8a07.jpg', '225284896309d78506e7bb50b43c8f69');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `mst_moestuinen`
--
ALTER TABLE `mst_moestuinen`
 ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `mst_moestuinen_users`
--
ALTER TABLE `mst_moestuinen_users`
 ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `mst_notities`
--
ALTER TABLE `mst_notities`
 ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `mst_percelen`
--
ALTER TABLE `mst_percelen`
 ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `mst_planten`
--
ALTER TABLE `mst_planten`
 ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `mst_users`
--
ALTER TABLE `mst_users`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `mst_moestuinen`
--
ALTER TABLE `mst_moestuinen`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=220;
--
-- AUTO_INCREMENT voor een tabel `mst_moestuinen_users`
--
ALTER TABLE `mst_moestuinen_users`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=183;
--
-- AUTO_INCREMENT voor een tabel `mst_notities`
--
ALTER TABLE `mst_notities`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT voor een tabel `mst_percelen`
--
ALTER TABLE `mst_percelen`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1759;
--
-- AUTO_INCREMENT voor een tabel `mst_planten`
--
ALTER TABLE `mst_planten`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT voor een tabel `mst_users`
--
ALTER TABLE `mst_users`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=41;