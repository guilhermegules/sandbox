CREATE TABLE appointment (
    id BIGINT NOT NULL AUTO_INCREMENT,
    doctor_id BIGINT NOT NULL,
    patient_id BIGINT NOT NULL,
    date DATETIME NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_appointment_doctor_id FOREIGN KEY(doctor_id) REFERENCES doctor(id),
    CONSTRAINT fk_appointment_patient_id FOREIGN KEY(patient_id) REFERENCES patient(id)
);