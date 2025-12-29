package com.ggm.dsmovie.services;

import com.ggm.dsmovie.dtos.MovieDTO;
import com.ggm.dsmovie.entities.Movie;
import com.ggm.dsmovie.repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MovieService {

    @Autowired
    private MovieRepository repository;

    @Transactional(readOnly = true)
    public Page<MovieDTO> findAll(Pageable pageable) {
        Page<Movie> result = this.repository.findAll(pageable);
        Page<MovieDTO> page = result.map(movie -> new MovieDTO(movie));
        return page;
    }

    @Transactional(readOnly = true)
    public MovieDTO findById(Long id) {
        Movie result = this.repository.findById(id).get();
        MovieDTO movieDto = new MovieDTO(result);
        return movieDto;
    }
}
