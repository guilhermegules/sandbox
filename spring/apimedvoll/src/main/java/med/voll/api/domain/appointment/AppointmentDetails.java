package med.voll.api.domain.appointment;

import java.time.LocalDateTime;

public record AppointmentDetails(
        Long id,
        Long doctorId,
        Long patientId,
        LocalDateTime date
) {
}
