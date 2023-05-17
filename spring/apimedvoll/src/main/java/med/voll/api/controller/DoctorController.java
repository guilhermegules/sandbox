package med.voll.api.controller;

import jakarta.validation.Valid;
import med.voll.api.doctor.CreateDoctorData;
import med.voll.api.doctor.Doctor;
import med.voll.api.doctor.DoctorRepository;
import med.voll.api.doctor.ListDoctorData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        return this.doctorRepository.findAll(pageable).map(ListDoctorData::new);
    }
}
