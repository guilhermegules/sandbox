package med.voll.api.controller;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import med.voll.api.domain.patient.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("patient")
public class PatientController {

    private final PatientRepository patientRepository;

    public PatientController(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @PostMapping
    @Transactional
    public ResponseEntity<PatientDetailsData> register(@RequestBody @Valid PatientRegistrationData body, UriComponentsBuilder uriBuilder) {
        var patient = new Patient(body);

        this.patientRepository.save(patient);
        var uri = uriBuilder.path("/patient/{id}").buildAndExpand(patient.getId()).toUri();

        return ResponseEntity.created(uri).body(new PatientDetailsData(patient));
    }

    @GetMapping
    public ResponseEntity<Page<PatientListData>> list(@PageableDefault(size = 10, sort = {"name"}) Pageable pageable) {
       var page = this.patientRepository.findAllByActiveTrue(pageable).map(PatientListData::new);
       return ResponseEntity.ok(page);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PatientDetailsData> details(@PathVariable Long id) {
        var patient = this.patientRepository.getReferenceById(id);
        return ResponseEntity.ok(new PatientDetailsData(patient));
    }

    @PutMapping
    @Transactional
    public ResponseEntity<PatientDetailsData> update(@RequestBody @Valid PatientUpdateData body) {
        var patient = this.patientRepository.getReferenceById(body.id());
        patient.updateData(body);
        return ResponseEntity.ok(new PatientDetailsData(patient));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Object> delete(@PathVariable Long id) {
        var patient = this.patientRepository.getReferenceById(id);
        patient.delete();
        return ResponseEntity.noContent().build();
    }
}
