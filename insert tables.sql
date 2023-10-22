-- Insert sample data into the PatientInfo table
INSERT INTO PatientInfo (id, email, password, name, address, gender)
VALUES
(1, 'ayush@gmail.com', 'securepass', 'Ayush Khandelwal', '123 Main St', 'Male'),
(2, 'ashmitha@gmail.com', 'safepassword', 'Ashmitha', '456 Elm St', 'Female'),
(3, 'ramesh@gmail.com', 'secretkey', 'Ramesh Kumar', '789 Oak St', 'Male');

-- Insert sample data into the HealthRecord table
INSERT INTO HealthRecord (id, date, conditions, surgeries, medication)
VALUES
(1, '2023-01-14', 'Allergies', 'None', 'Antihistamines'),
(2, '2023-01-15', 'High Blood Pressure', 'Appendectomy', 'Lisinopril'),
(3, '2023-01-16', 'Diabetes', 'Knee Surgery', 'Metformin');

-- Insert sample data into the DoctorInfo table
INSERT INTO DoctorInfo (email, gender, password, name)
VALUES
('dr.karanveer@gmail.com', 'Male', 'doctorpass', 'Dr. Karanveer Singh Kalsi'),
('dr.karan@gmail.com', 'Male', 'healthpass', 'Dr. Karan'),
('dr.jay@gmail.com', 'Male', 'healthpass', 'Dr. Jay');

-- Insert sample data into the AppointmentSchedule table
INSERT INTO AppointmentSchedule (id, date, starttime, endtime, status)
VALUES
(1, '2023-01-19', '09:00', '10:00', 'Done'),
(2, '2023-01-20', '10:00', '11:00', 'Done'),
(3, '2023-01-22', '14:00', '15:00', 'Done');

-- Insert sample data into the PatientAppointments table
INSERT INTO PatientAppointments (email, id, concerns, symptoms)
VALUES
('ayush@gmail.com', 1, 'Fever', 'Headache'),
('ashmitha@gmail.com', 2, 'Sore Throat', 'Cough'),
('ramesh@gmail.com', 3, 'Back Pain', 'Fatigue');

-- Insert sample data into the DoctorAvailability table
INSERT INTO DoctorAvailability (id, starttime, endtime, breaktime, day)
VALUES
(1, '09:00', '17:00', '12:00', 'Tuesday'),
(2, '09:00', '17:00', '12:00', 'Friday'),
(3, '09:00', '17:00', '12:00', 'Sunday');

-- Insert sample data into the PatientRecords table
INSERT INTO PatientRecords (email, id)
VALUES
('ayush@gmail.com', 1),
('ashmitha@gmail.com', 2),
('ramesh@gmail.com', 3);

-- Insert sample data into the Diagnosis table
INSERT INTO Diagnosis(id, email, diagnosis, prescription)
VALUES
(1, 'dr.karanveer@gmail.com', 'Influenza', 'Rest and fluids'),
(2, 'dr.karan@gmail.com', 'Strep Throat', 'Antibiotics'),
(3, 'dr.karan@gmail.com', 'Muscle Strain', 'Pain relievers');

-- Insert sample data into the DoctorSchedule table
INSERT INTO DoctorSchedule (id, email)
VALUES
(1, 'dr.karanveer@gmail.com'),
(2, 'dr.karan@gmail.com');

-- Insert sample data into the DoctorAccessRecords table
INSERT INTO DoctorAccessRecords(id, email)
VALUES
(1, 'dr.karanveer@gmail.com'),
(2, 'dr.karan@gmail.com'),
(3, 'dr.karan@gmail.com');
