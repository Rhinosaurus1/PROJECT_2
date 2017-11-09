DROP DATABASE IF EXISTS Bill_Tracker_DB;
CREATE DATABASE Bill_Tracker_DB;

USE Bill_Tracker_DB;

CREATE TABLE User(
  user_id INT NOT NULL auto_increment,
  user_name VARCHAR(100) NOT NULL,
  login_name VARCHAR(100) NOT NULL,
  email_address VARCHAR(100),
  password VARCHAR(100) NOT NULL,
  active_status BOOLEAN NOT NULL DEFAULT TRUE,
  PRIMARY KEY (user_id)
);

CREATE TABLE Bills(
  bill_id INT NOT NULL auto_increment,
  user_id INT NOT NULL,
  bill_name VARCHAR(255) NOT NULL,
  bill_category VARCHAR(100),
  due_frequency VARCHAR(100) NOT NULL DEFAULT 'MONTHLY',
  start_month DATE,
  active_status BOOLEAN NOT NULL DEFAULT TRUE,
  PRIMARY KEY (bill_id),
  FOREIGN KEY (user_id) references User (user_id)
);


CREATE TABLE Payments(
  payment_id INT NOT NULL auto_increment,
  bill_id INT NOT NULL,
  month_due DATE NOT NULL,
  paid_status BOOLEAN NOT NULL DEFAULT FALSE,
  date_paid DATE,
  confirmation_code VARCHAR(100),
  amount DOUBLE(11,2),
  active_status BOOLEAN NOT NULL DEFAULT TRUE,
  PRIMARY KEY (payment_id),
  FOREIGN KEY (bill_id) references Bills (bill_id)
);
