package br.edu.qi.appthewitcher;

import android.app.Application;
import android.media.MediaPlayer;

public class VariaveisGlobais extends Application{
    //private MediaPlayer mpPrincipal = MediaPlayer.create(, R.raw.abertura);

    private MediaPlayer media;
    //MediaPlayer media = MediaPlayer.create(this, R.raw.abertura);

    public VariaveisGlobais(){
        //media = MediaPlayer.create(this, R.raw.abertura);
        //String filename = "android.resource://" + this.getPackageName() + "/raw/abertura.mp3";



    }




    public MediaPlayer getMediaPlayer(){
        return this.media;
        //return null;
    }

}
