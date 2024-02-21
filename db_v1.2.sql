-- Create database:
create database StudioGhibli;

-- Use database:
use StudioGhibli;

-- User table: 
create table users(
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(50),
email_id VARCHAR(100),
password VARCHAR(255),
role VARCHAR(50),
status INT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);

-- Customers table: 
create table customers(
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
full_name VARCHAR(255),
phone_no VARCHAR(50),
area_of_interests TEXT,
status INT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id)
 );

-- Course table:
create table courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255),
    description TEXT,
	learning_outcomes TEXT,
    course_inclusions TEXT,
    is_certified INT,
    author VARCHAR(255),
    status INT,
    rating INT,
    total_enrollments INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Course content table:
create table course_contents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT,
    title VARCHAR(255),
    course_content TEXT,
    duration VARCHAR(255),
    status INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Enrollment table:
create table enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    course_id INT,
    status INT,
    payment_method VARCHAR(255),
    payment_status INT,
    enrollment_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- SecurityLog table:
create table securitylogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    ip_address VARCHAR(100),
    last_login DATE,
	status INT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

