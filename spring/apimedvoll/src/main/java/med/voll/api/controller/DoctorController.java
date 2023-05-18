package med.voll.api.controller;

import jakarta.validation.Valid;
import med.voll.api.doctor.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("doctor")
public class DoctorController {

    @Autowired
    private DoctorRepository doctorRepository;

    @PostMapping
    @Transactional
    public void create(@RequestBody @Valid CreateDoctorData body) {
        this.doctorRepository.save(new Doctor(body));
    }

    @GetMapping
    public Page<ListDoctorData> getDoctors(@PageableDefault(size = 10, sort = {"name"}) Pageable pageable) {
        return this.doctorRepository.findAllByActiveTrue(pageable).map(ListDoctorData::new);
    }

    @PutMapping
    @Transactional
    public void update(@RequestBody @Valid UpdateDoctorData body) {
        var doctor = this.doctorRepository.getReferenceById(body.id());
        doctor.updateInfo(body);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public void delete(@PathVariable Long id) {
        var doctor = this.doctorRepository.getReferenceById(id);
        doctor.setActive(false);
    }
}
