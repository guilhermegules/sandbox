package med.voll.api.controller;

import jakarta.validation.Valid;
import med.voll.api.domain.doctor.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("doctor")
public class DoctorController {

    @Autowired
    private DoctorRepository doctorRepository;

    @PostMapping
    @Transactional
    public ResponseEntity<DoctorDetail> create(@RequestBody @Valid CreateDoctorData body, UriComponentsBuilder uriBuilder) {
        var doctor = new Doctor(body);

        this.doctorRepository.save(doctor);

        var uri = uriBuilder.path("/doctor/{id}").buildAndExpand(doctor.getId()).toUri();

        return ResponseEntity.created(uri).body(new DoctorDetail(doctor));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorDetail> getDoctorById(@PathVariable Long id) {
        var doctor = this.doctorRepository.getReferenceById(id);
        return ResponseEntity.ok(new DoctorDetail(doctor));
    }

    @GetMapping
    public ResponseEntity<Page<ListDoctorData>> getDoctors(@PageableDefault(size = 10, sort = {"name"}) Pageable pageable) {
        var page = this.doctorRepository.findAllByActiveTrue(pageable).map(ListDoctorData::new);
        return ResponseEntity.ok(page);
    }

    @PutMapping
    @Transactional
    public ResponseEntity<DoctorDetail> update(@RequestBody @Valid UpdateDoctorData body) {
        var doctor = this.doctorRepository.getReferenceById(body.id());
        doctor.updateInfo(body);
        return ResponseEntity.ok(new DoctorDetail(doctor));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Object> delete(@PathVariable Long id) {
        var doctor = this.doctorRepository.getReferenceById(id);
        doctor.setActive(false);
        return ResponseEntity.noContent().build();
    }
}
