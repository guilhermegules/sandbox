package com.ggm.dsmovie.controllers;

import com.ggm.dsmovie.dtos.MovieDTO;
import com.ggm.dsmovie.dtos.ScoreDTO;
import com.ggm.dsmovie.services.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/scores")
public class ScoreController {
    @Autowired
    private ScoreService service;

    @PutMapping
    public MovieDTO saveScore(@RequestBody ScoreDTO scoreDTO) {
        var dto = service.saveScore(scoreDTO);
        return dto;
    }
}
