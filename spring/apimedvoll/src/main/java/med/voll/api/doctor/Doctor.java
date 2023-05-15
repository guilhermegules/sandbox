package med.voll.api.doctor;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import med.voll.api.address.Address;
import org.springframework.data.annotation.Id;

@Table(name = "doctor")
@Entity(name = "doctor")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String crm;

    @Enumerated(EnumType.STRING)
    private DoctorSpeciality doctorSpeciality;

    @Embedded
    private Address address;


    public Doctor(CreateDoctorData doctorData) {
        this.name = doctorData.name();
        this.email = doctorData.email();
        this.crm = doctorData.crm();
        this.doctorSpeciality = doctorData.specialty();
        this.address = new Address(doctorData.address());
    }
}
