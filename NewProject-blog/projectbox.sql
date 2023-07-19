/*
Navicat MySQL Data Transfer

Source Server         : text
Source Server Version : 80012
Source Host           : localhost:3306
Source Database       : projectbox

Target Server Type    : MYSQL
Target Server Version : 80012
File Encoding         : 65001

Date: 2023-07-19 16:51:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for essay
-- ----------------------------
DROP TABLE IF EXISTS `essay`;
CREATE TABLE `essay` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(35) NOT NULL,
  `titleimg` longtext,
  `titletype` int(11) NOT NULL,
  `essayrange` varchar(2) NOT NULL,
  `essaybody` longtext NOT NULL,
  `author` varchar(45) NOT NULL,
  `time` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of essay
-- ----------------------------
INSERT INTO `essay` VALUES ('1', 'dasdasd', null, '1', '2', '<p>dqwdasdasdqwdadsd</p>', '菜鸡管理员', '2023-05-14 13:58:03.755');
INSERT INTO `essay` VALUES ('2', 'adsdawd', null, '1', '1', '<p>dasdad</p>', '菜鸡管理员', '2023-05-14 13:58:56.114');
INSERT INTO `essay` VALUES ('3', 'adsdawd', 'undefined', '1', '1', '<p>dasdad</p>', '菜鸡管理员', '2023-05-14 13:59:41.554');
INSERT INTO `essay` VALUES ('4', 'adsdawd', 'undefined', '1', '1', '<p>dasdad</p>', '菜鸡管理员', '2023-05-14 13:59:44.908');
INSERT INTO `essay` VALUES ('5', 'adsdawd', null, '1', '1', '<p>dasdad</p>', '菜鸡管理员', '2023-05-14 14:00:00.281');
INSERT INTO `essay` VALUES ('6', 'adsdawd', null, '1', '1', '<p>dasdad</p>', '菜鸡管理员', '2023-05-14 14:00:29.209');
INSERT INTO `essay` VALUES ('7', 'adsdawd', null, '1', '1', '<p>dasdad</p>', '菜鸡管理员', '2023-05-14 14:00:32.660');
INSERT INTO `essay` VALUES ('8', 'adsdawd', null, '1', '1', '<p>dasdad</p>', '菜鸡管理员', '2023-05-14 14:00:54.815');
INSERT INTO `essay` VALUES ('9', 'adsdawd', null, '1', '1', '<p>dasdad</p>', '菜鸡管理员', '2023-05-14 14:01:07.093');
INSERT INTO `essay` VALUES ('10', 'adsdawd', null, '1', '1', '<p>dasdad</p>', '菜鸡管理员', '2023-05-14 14:01:25.776');
INSERT INTO `essay` VALUES ('11', 'adsdawd', null, '1', '1', '<p>dasdad</p>', '菜鸡管理员', '2023-05-14 14:01:29.547');
INSERT INTO `essay` VALUES ('12', 'adsdawd', null, '1', '1', '<p>dasdad</p>', '菜鸡管理员', '2023-05-14 14:02:49.665');
INSERT INTO `essay` VALUES ('13', 'adsdawd', null, '1', '1', '<p>dasdad</p>', '菜鸡管理员', '2023-05-14 14:03:06.837');
INSERT INTO `essay` VALUES ('14', 'adsdawd', null, '1', '1', '<p>dasdad</p>', '菜鸡管理员', '2023-05-14 14:03:14.818');
INSERT INTO `essay` VALUES ('15', 'adsdawd', null, '1', '1', '<p>dasdad</p>', '菜鸡管理员', '2023-05-14 14:03:49.500');
INSERT INTO `essay` VALUES ('16', 'adsdawd', 'http://localhost:8085/imgs/cbaf8d7af0d0b4b3fc23768d9aff3797', '1', '1', '<p>dasdad</p>', '菜鸡管理员', '2023-05-14 14:04:39.679');
INSERT INTO `essay` VALUES ('17', 'adsdawd', null, '1', '1', '<p>dasdad</p>', '菜鸡管理员', '2023-05-14 14:04:58.226');
INSERT INTO `essay` VALUES ('18', '标题', 'http://localhost:8085/imgs/b2363b47c249c267cf560d03f771f15d', '1', '1', '<h1 style=\"text-align: center;\">dasdadadsjodi</h1><p><span style=\"font-size: 48px;\">阿松大</span></p><p style=\"text-align: left;\"><br></p>', '菜鸡管理员', '2023-05-14 14:05:50.930');
INSERT INTO `essay` VALUES ('19', '达手段', '', '1', '1', '<p>阿松大现在才</p>', '菜鸡管理员', '2023-05-14 14:10:37.575');
INSERT INTO `essay` VALUES ('20', '大碗大苏打', 'http://localhost:8085/imgs/384f8dfd79829912be7a982768c43a03', '1', '1', '<p>啊圣诞袜</p>', '菜鸡管理员', '2023-05-14 17:02:17.646');
INSERT INTO `essay` VALUES ('21', '啊圣诞袜', '', '1', '1', '<p>打撒达瓦地区</p>', '菜鸡管理员', '2023-05-14 17:04:33.260');
INSERT INTO `essay` VALUES ('22', '啊圣诞袜', '', '1', '1', '<p>打撒达瓦地区</p>', '菜鸡管理员', '2023-05-14 17:05:28.491');
INSERT INTO `essay` VALUES ('23', '啊圣诞袜', '', '1', '1', '<p>阿松大</p>', '菜鸡管理员', '2023-05-14 17:07:03.129');
INSERT INTO `essay` VALUES ('24', '', '', '1', '1', '<p>阿斯顿自行车</p>', '菜鸡管理员', '2023-05-14 17:08:46.328');
INSERT INTO `essay` VALUES ('25', '', '', '1', '1', '<p>阿斯顿自行车</p>', '菜鸡管理员', '2023-05-14 17:09:02.923');
INSERT INTO `essay` VALUES ('26', '', '', '1', '1', '<p>大学城自行车</p>', '菜鸡管理员', '2023-05-14 17:09:31.382');
INSERT INTO `essay` VALUES ('27', '', '', '1', '1', '<p>大虚的发表</p>', '菜鸡管理员', '2023-05-14 17:10:07.779');
INSERT INTO `essay` VALUES ('28', '', '', '1', '1', '', '菜鸡管理员', '2023-05-14 17:11:04.248');
INSERT INTO `essay` VALUES ('29', '的全国十多个', '', '1', '1', '<p>边防官兵</p>', '菜鸡管理员', '2023-05-14 17:12:20.047');
INSERT INTO `essay` VALUES ('30', '123123', '', '1', '1', '<p>41232·13</p>', '菜鸡管理员', '2023-05-14 17:12:37.835');
INSERT INTO `essay` VALUES ('31', '和肉体和人格和', '', '1', '1', '<p>合同给对方v吧</p>', '菜鸡管理员', '2023-05-14 17:13:00.647');
INSERT INTO `essay` VALUES ('32', '地区为凤尾', '', '1', '1', '<p>葛瑞格v额地方</p>', '菜鸡管理员', '2023-05-14 17:13:40.275');
INSERT INTO `essay` VALUES ('33', '二哥如果', null, '3', '2', '<p>大部分v地方v</p>', '菜鸡管理员', '2023-05-14 17:14:05.317');
INSERT INTO `essay` VALUES ('34', '大苏打的', '', '2', '2', '<p>的功夫v</p>', '菜鸡管理员', '2023-05-14 17:14:50.475');
INSERT INTO `essay` VALUES ('35', '短期无法收到', '', '2', '2', '<p>给对方v表达式</p>', '菜鸡管理员', '2023-05-14 17:15:14.340');
INSERT INTO `essay` VALUES ('36', '', '', '1', '1', '<p><br></p>', '菜鸡管理员', '2023-05-14 17:16:15.004');
INSERT INTO `essay` VALUES ('37', '地区为大众', '', '1', '1', '<p><br></p>', '菜鸡管理员', '2023-05-14 17:19:28.649');
INSERT INTO `essay` VALUES ('38', '的青蛙打伞', '', '1', '1', '<p><br></p>', '菜鸡管理员', '2023-05-14 17:20:08.513');
INSERT INTO `essay` VALUES ('39', '而且我打算', '', '1', '1', '<p>的</p>', '菜鸡管理员', '2023-05-14 17:45:06.838');
INSERT INTO `essay` VALUES ('40', '阿松大', '', '1', '1', '<p><img src=\"http://localhost:8085/blogimgs/7bf7118da6bf15fcf888e7e2a88c3cbe\" alt=\"\" data-href=\"\" style=\"\"/></p><p><img src=\"http://localhost:8085/blogimgs/eeefd6082760c96555c08d9e5ad7db78\" alt=\"\" data-href=\"\" style=\"\"/></p><p><img src=\"http://localhost:8085/blogimgs/2b55217e02e66011cc50f4a1c0c41873\" alt=\"\" data-href=\"\" style=\"\"/></p>', '菜鸡管理员', '2023-06-03 15:58:15.991');
INSERT INTO `essay` VALUES ('41', '123', '', '1', '1', '<p><img src=\"http://localhost:8085/blogimgs/be50087757fbfb236eb5cae888ef2997\" alt=\"\" data-href=\"\" style=\"\"/></p><p><img src=\"http://localhost:8085/blogimgs/c9417bfd868d5bd85e251e1564838d6a\" alt=\"\" data-href=\"\" style=\"\"/></p>', '菜鸡管理员', '2023-06-03 15:59:17.379');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `nickname` varchar(12) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `headimg` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `nickname_UNIQUE` (`nickname`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'admin', '4cb35ecf2fa466e7572444a0ac5fc868', '菜鸡管理员', null);
INSERT INTO `users` VALUES ('21', '2628758793@qq.com', 'd232656ab47fa53057f59643a7faeb69', 'wonendie', null);
