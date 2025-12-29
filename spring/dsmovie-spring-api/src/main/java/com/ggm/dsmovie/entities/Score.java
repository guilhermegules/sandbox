package com.ggm.dsmovie.entities;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "tb_score")
public class Score {
    @EmbeddedId
    private ScorePK scorePK = new ScorePK();
    private Double value;

    public Score() {
    }

    public void setMovie(Movie movie) {
        this.scorePK.setMovie(movie);
    }

    public void setUser(User user) {
        this.scorePK.setUser(user);
    }

    public ScorePK getPk() {
        return scorePK;
    }

    public void setPk(ScorePK pk) {
        this.scorePK = pk;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }
}
