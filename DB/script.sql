-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`status`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`status` ;

CREATE TABLE IF NOT EXISTS `mydb`.`status` (
  `statusId` INT NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  `description` VARCHAR(500) NULL,
  PRIMARY KEY (`statusId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`categories` ;

CREATE TABLE IF NOT EXISTS `mydb`.`categories` (
  `categoryId` INT NOT NULL,
  `categoryName` VARCHAR(45) NOT NULL,
  `description` VARCHAR(500) NULL,
  PRIMARY KEY (`categoryId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`recordings`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`recordings` ;

CREATE TABLE IF NOT EXISTS `mydb`.`recordings` (
  `recordId` INT AUTO_INCREMENT PRIMARY KEY,
  `workName` VARCHAR(500) NOT NULL,
  `startTime` TIMESTAMP(6) NOT NULL default current_timestamp,
  `endTime` TIMESTAMP(6) NOT NULL default current_timestamp,
  `recordedDate` DATETIME(6) NOT NULL default now(),
  `updatedDate` DATETIME(6) NOT NULL default now(),
  `status` INT NOT NULL,
  `category` INT NOT NULL,
  INDEX `fk_recordings_status1_idx` (`status` ASC) VISIBLE,
  INDEX `fk_recordings_categories1_idx` (`category` ASC) VISIBLE,
  UNIQUE INDEX `recordId_UNIQUE` (`recordId` ASC) VISIBLE,
  CONSTRAINT `fk_recordings_status1`
    FOREIGN KEY (`status`)
    REFERENCES `mydb`.`status` (`statusId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_recordings_categories1`
    FOREIGN KEY (`category`)
    REFERENCES `mydb`.`categories` (`categoryId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
commit;

insert into status value(1,'In Progress',null),
     (2,'Finished',null),
     (3,'Cancelled',null);

insert into categories value(1,'Development',null),
     (2,'Test',null),
     (3,'Document',null);
     
insert into recordings value(1,'Fast Work', now(), now(), now(), now(), 1, 1);

commit;