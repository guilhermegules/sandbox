package med.voll.api.doctor;

import med.voll.api.address.Address;

public record DoctorDetail(Long id, String name, String email, String crm, DoctorSpeciality speciality, Address address) {
    public DoctorDetail(Doctor doctor) {
        this(doctor.getId(), doctor.getName(), doctor.getEmail(), doctor.getCrm(), doctor.getDoctorSpeciality(), doctor.getAddress());
    }
}
