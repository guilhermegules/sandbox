package med.voll.api.doctor;

public record ListDoctorData(String name, String email, String crm, DoctorSpeciality speciality) {
    public ListDoctorData(Doctor doctor) {
        this(doctor.getName(), doctor.getEmail(), doctor.getCrm(), doctor.getDoctorSpeciality());
    }
}
