package med.voll.api.domain.patient;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import med.voll.api.domain.address.Address;

@Table(name = "patient")
@Entity(name = "patient")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Patient {
    private Long id;
    private String name;
    private String email;
    private String cellphone;
    private String cpf;
    @Embedded
    private Address address;
    private boolean active;

    public Patient(PatientRegistrationData patientRegistrationData) {
        active = true;
        name = patientRegistrationData.name();
        email = patientRegistrationData.email();
        cellphone = patientRegistrationData.cellphone();
        cpf = patientRegistrationData.cpf();
        address = new Address(patientRegistrationData.address());
    }

    public void updateData(PatientUpdateData patientUpdateData) {
        if(patientUpdateData.name() != null) {
            this.name = patientUpdateData.name();
        }

        if(patientUpdateData.cellphone() != null) {
            this.cellphone = patientUpdateData.cellphone();
        }

        if(patientUpdateData.address() != null) {
            this.address.updateInfo(patientUpdateData.address());
        }
    }

    public void delete() {
        active = false;
    }
}
