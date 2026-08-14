package med.voll.api.domain.appointment;
;
import med.voll.api.domain.doctor.Doctor;
import med.voll.api.domain.doctor.DoctorRepository;
import med.voll.api.domain.exception.RecordNotExistsException;
import med.voll.api.domain.patient.PatientRepository;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    private final DoctorRepository doctorRepository;

    private final PatientRepository patientRepository;

    public AppointmentService(AppointmentRepository appointmentRepository,
                              DoctorRepository doctorRepository,
                              PatientRepository patientRepository
    ) {
        this.appointmentRepository = appointmentRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
    }

    public void schedule(AppointmentCreate appointmentCreate) {
        if(!patientRepository.existsById(appointmentCreate.patientId())) {
            throw new RecordNotExistsException("Patient not exists with ID: " + appointmentCreate.patientId());
        }

        if(appointmentCreate.doctorId() != null && !doctorRepository.existsById(appointmentCreate.doctorId())) {
            throw new RecordNotExistsException("Doctor not exists with ID: " + appointmentCreate.doctorId());
        }

        var doctor = findDoctor(appointmentCreate);

        var patient = patientRepository.findById(appointmentCreate.patientId()).get();

        var appointment = new Appointment(null, doctor, patient, appointmentCreate.date());

        appointmentRepository.save(appointment);
    }

    private Doctor findDoctor(AppointmentCreate appointmentCreate) {
        if(appointmentCreate.doctorId() != null) {
            return doctorRepository.findById(appointmentCreate.doctorId()).get();
        }

        return null;
    }
}
