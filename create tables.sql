CREATE DATABASE HospitalManagement;
USE HospitalManagement;

CREATE TABLE PatientInfo(
  email VARCHAR(50) PRIMARY KEY,
  password VARCHAR(30) NOT NULL,
  name VARCHAR(50) NOT NULL,
  address VARCHAR(60) NOT NULL,
  gender VARCHAR(20) NOT NULL
);

CREATE TABLE HealthRecord(
  id INT PRIMARY KEY,
  date DATE NOT NULL,
  conditions VARCHAR(100) NOT NULL,
  surgeries VARCHAR(100) NOT NULL,
  medication VARCHAR(100) NOT NULL
);

CREATE TABLE DoctorInfo(
  email VARCHAR(50) UNIQUE,
  gender VARCHAR(20) NOT NULL,
  password VARCHAR(30) NOT NULL,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (email)
);

CREATE TABLE AppointmentSchedule(
  id INT PRIMARY KEY,
  date DATE NOT NULL,
  starttime TIME NOT NULL,
  endtime TIME NOT NULL,
  status VARCHAR(15) NOT NULL
);

CREATE TABLE PatientAppointments(
  email VARCHAR(50) NOT NULL,
  id INT NOT NULL,
  concerns VARCHAR(40) NOT NULL,
  symptoms VARCHAR(40) NOT NULL,
  FOREIGN KEY (email) REFERENCES PatientInfo (email) ON DELETE CASCADE,
  FOREIGN KEY (id) REFERENCES AppointmentSchedule (id) ON DELETE CASCADE,
  PRIMARY KEY (email, id)
);

CREATE TABLE DoctorAvailability(
  id INT NOT NULL,
  starttime TIME NOT NULL,
  endtime TIME NOT NULL,
  breaktime TIME NOT NULL,
  day VARCHAR(20) NOT NULL,
  PRIMARY KEY (id, starttime, endtime, day)
);

CREATE TABLE PatientRecords(
  email VARCHAR(50) NOT NULL,
  id INT NOT NULL,
  FOREIGN KEY (email) REFERENCES PatientInfo (email) ON DELETE CASCADE,
  FOREIGN KEY (id) REFERENCES HealthRecord (id) ON DELETE CASCADE,
  PRIMARY KEY (id)
);

CREATE TABLE Diagnosis(
  id INT NOT NULL,
  email VARCHAR(50) NOT NULL,
  diagnosis VARCHAR(40) NOT NULL,
  prescription VARCHAR(50) NOT NULL,
  FOREIGN KEY (id) REFERENCES AppointmentSchedule (id) ON DELETE CASCADE,
  FOREIGN KEY (email) REFERENCES DoctorInfo (email) ON DELETE CASCADE,
  PRIMARY KEY (id, email)
);

CREATE TABLE DoctorSchedule(
  id INT NOT NULL,
  email VARCHAR(50) NOT NULL,
  FOREIGN KEY (id) REFERENCES DoctorAvailability (id) ON DELETE CASCADE,
  FOREIGN KEY (email) REFERENCES DoctorInfo (email) ON DELETE CASCADE,
  PRIMARY KEY (id, email)
);

CREATE TABLE DoctorAccessRecords(
  id INT NOT NULL,
  email VARCHAR(50) NOT NULL,
  FOREIGN KEY (email) REFERENCES DoctorInfo (email) ON DELETE CASCADE,
  FOREIGN KEY (id) REFERENCES HealthRecord (id) ON DELETE CASCADE,
  PRIMARY KEY (id, email)
);


