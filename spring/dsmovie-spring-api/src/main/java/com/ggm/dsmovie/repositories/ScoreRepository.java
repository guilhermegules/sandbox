package com.ggm.dsmovie.repositories;

import com.ggm.dsmovie.entities.Score;
import com.ggm.dsmovie.entities.ScorePK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScoreRepository extends JpaRepository<Score, ScorePK> {
}
