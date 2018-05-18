DROP DATABASE IF EXISTS anciensmiagistes_db;

CREATE DATABASE IF NOT EXISTS anciensmiagistes_db;
USE anciensmiagistes_db;
# -----------------------------------------------------------------------------
#       TABLE : USER
# -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS USER
 (
   USERID INTEGER(2) NOT NULL AUTO_INCREMENT ,
   ROLEID INTEGER(2) NOT NULL  ,
   USERNAME VARCHAR(128) NOT NULL  ,
   USERSURNAME VARCHAR(128) NOT NULL  ,
   USERADDRESS VARCHAR(128) NOT NULL  ,
   USERPHONE VARCHAR(128) NOT NULL  ,
   USERLOGIN VARCHAR(128) NOT NULL  ,
   USERPWD VARCHAR(128) NOT NULL  ,
   USERSTATUS BOOL NOT NULL  
   , PRIMARY KEY (USERID) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       TABLE : COMPANY
# -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS COMPANY
 (
   USERID INTEGER(2) NOT NULL  ,
   COMPANYNAME VARCHAR(128) NOT NULL  ,
   COMPANYDESC VARCHAR(255) NOT NULL  
   , PRIMARY KEY (USERID) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       TABLE : CATEGORY
# -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS CATEGORY
 (
   CATEGORYID INTEGER(2) NOT NULL AUTO_INCREMENT ,
   CATEGORYNAME VARCHAR(128) NOT NULL  
   , PRIMARY KEY (CATEGORYID) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       TABLE : ALUMNI
# -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ALUMNI
 (
   USERID INTEGER(2) NOT NULL  ,
   USERGRADYEAR DATE NOT NULL  ,
   USERCOMPANY VARCHAR(128) NULL  ,
   USERFUNCTION VARCHAR(128) NULL  ,
   USERSALARY CHAR(32) NULL  ,
   USERFIRSTHIRINGYEAR DATE NULL  ,
   USERHIRINGYEAR DATE NULL  
   , PRIMARY KEY (USERID) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       TABLE : ROLE
# -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ROLE
 (
   ROLEID INTEGER(2) NOT NULL AUTO_INCREMENT ,
   ROLENAME VARCHAR(128) NOT NULL  
   , PRIMARY KEY (ROLEID) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       TABLE : ARTICLE
# -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ARTICLE
 (
   ARTICLEID INTEGER(2) NOT NULL AUTO_INCREMENT ,
   USERID INTEGER(2) NOT NULL  ,
   CATEGORYID INTEGER(2) NOT NULL  ,
   ARTICLENAME VARCHAR(128) NOT NULL  ,
   ARTICLEDATE DATE NOT NULL  ,
   ARTICLEDESC VARCHAR(255) NOT NULL  ,
   ARTICLEDOC VARCHAR(128) NULL  
   , PRIMARY KEY (ARTICLEID) 
 ) 
 comment = "";


# -----------------------------------------------------------------------------
#       CREATION DES REFERENCES DE TABLE
# -----------------------------------------------------------------------------


ALTER TABLE USER 
  ADD FOREIGN KEY FK_USER_ROLE (ROLEID)
      REFERENCES ROLE (ROLEID) ;


ALTER TABLE COMPANY 
  ADD FOREIGN KEY FK_COMPANY_USER (USERID)
      REFERENCES USER (USERID) ;


ALTER TABLE ALUMNI 
  ADD FOREIGN KEY FK_ALUMNI_USER (USERID)
      REFERENCES USER (USERID) ;


ALTER TABLE ARTICLE 
  ADD FOREIGN KEY FK_ARTICLE_USER (USERID)
      REFERENCES USER (USERID) ;


ALTER TABLE ARTICLE 
  ADD FOREIGN KEY FK_ARTICLE_CATEGORY (CATEGORYID)
      REFERENCES CATEGORY (CATEGORYID) ;

