package med.voll.api.controller;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import med.voll.api.domain.appointment.AppointmentCreate;
import med.voll.api.domain.appointment.AppointmentDetails;
import med.voll.api.domain.appointment.AppointmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("appointment")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping
    @Transactional
    public ResponseEntity<Object> createAppointment(@RequestBody @Valid AppointmentCreate body) {
        appointmentService.schedule(body);

        return  ResponseEntity.ok(new AppointmentDetails(null, null, null, null));
    }
}
