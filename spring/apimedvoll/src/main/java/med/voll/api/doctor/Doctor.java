package med.voll.api.doctor;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import med.voll.api.address.Address;

@Table(name = "doctor")
@Entity(name = "doctor")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Doctor {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String crm;
    private String phone;
    private boolean active;

    @Enumerated(EnumType.STRING)
    @Column(name = "specialty")
    private DoctorSpeciality doctorSpeciality;

    @Embedded
    private Address address;

    public Doctor(CreateDoctorData doctorData) {
        this.name = doctorData.name();
        this.email = doctorData.email();
        this.crm = doctorData.crm();
        this.doctorSpeciality = doctorData.specialty();
        this.address = new Address(doctorData.address());
        this.phone = doctorData.phone();
        this.active = true;
    }

    public void updateInfo(UpdateDoctorData doctorData) {
        if (doctorData.name() != null) {
            this.name = doctorData.name();
        }

        if (doctorData.phone() != null) {
            this.phone = doctorData.phone();
        }

        if (doctorData.address() != null) {
            this.address.updateInfo(doctorData.address());
        }
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
