package med.voll.api.doctor;

public record ListDoctorData(
        Long id,
        String name,
        String email,
        String crm,
        DoctorSpeciality speciality) {
    public ListDoctorData(Doctor doctor) {
        this(
                doctor.getId(),
                doctor.getName(),
                doctor.getEmail(),
                doctor.getCrm(),
                doctor.getDoctorSpeciality()
        );
    }
}
