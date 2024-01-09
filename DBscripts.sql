-- Create database:
create database StudioGhibli;

-- Use database:
use StudioGhibli;

-- User table: 
create table User(
UserID INT AUTO_INCREMENT PRIMARY KEY,
Username VARCHAR(50),
PhoneNo VARCHAR(20),
EmailID VARCHAR(100),
Password VARCHAR(255),
Role VARCHAR(50),
Status INT,
CreatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
UpdatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);

-- Course table:
create table Course (
    CourseID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    CourseName VARCHAR(255),
    Description TEXT,
    StartDate DATE,
    EndDate DATE,
    Image VARCHAR(255),
    Status INT,
    CreatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    Price DECIMAL(10, 2),
    Duration VARCHAR(50),
    Review TEXT,
    Rating DECIMAL(3, 2),
    ReviewDate DATE,
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

-- Enrollment table:
create table Enrollment (
    EnrollmentID INT AUTO_INCREMENT PRIMARY KEY,
    CourseID INT,
    UserID INT,
    Status INT,
    EnrollmentDate DATE,
    CreatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (CourseID) REFERENCES Course(CourseID),
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

-- SecurityLog table:
create table SecurityLog (
    LogID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    ActionType VARCHAR(50),
    Description TEXT,
    CreatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

