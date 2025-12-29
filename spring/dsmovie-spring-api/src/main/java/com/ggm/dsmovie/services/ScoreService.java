package com.ggm.dsmovie.services;

import com.ggm.dsmovie.dtos.MovieDTO;
import com.ggm.dsmovie.dtos.ScoreDTO;
import com.ggm.dsmovie.entities.Score;
import com.ggm.dsmovie.entities.User;
import com.ggm.dsmovie.repositories.MovieRepository;
import com.ggm.dsmovie.repositories.ScoreRepository;
import com.ggm.dsmovie.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ScoreService {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ScoreRepository scoreRepository;

    @Transactional
    public MovieDTO saveScore(ScoreDTO scoreDTO) {
        var user = userRepository.findByEmail(scoreDTO.getEmail());

        if(user == null) {
            user = new User();
            user.setEmail(scoreDTO.getEmail());
            user = userRepository.saveAndFlush(user);
        }

        var movie = movieRepository.findById(scoreDTO.getMovieId()).get();

        var score = new Score();
        score.setMovie(movie);
        score.setUser(user);
        score.setValue(scoreDTO.getScore());

        score = scoreRepository.saveAndFlush(score);

        double totalScore = 0.0;
        for(Score s : movie.getScores()) {
            totalScore += s.getValue();
        }

        double scoreAverage = totalScore / movie.getScores().size();

        movie.setScore(scoreAverage);
        movie.setCount(movie.getScores().size());

        movie = movieRepository.save(movie);

        return new MovieDTO(movie);
    }
}
