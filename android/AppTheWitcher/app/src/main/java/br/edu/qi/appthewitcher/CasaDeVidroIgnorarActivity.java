package br.edu.qi.appthewitcher;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.media.MediaPlayer;
import android.os.Bundle;

import java.util.Timer;
import java.util.TimerTask;

public class CasaDeVidroIgnorarActivity extends AppCompatActivity {

    Timer timer = new Timer();
    MediaPlayer mediaPlayer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_casa_de_vidro_ignorar);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        getSupportActionBar().hide();

        mediaPlayer = MediaPlayer.create(this, R.raw.casadevidro);
        mediaPlayer.start();

        timer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                abrirFinal();
                timer.cancel();
            }
        }, 8000, 1000);
    }

    public void abrirFinal() {
        mediaPlayer.stop();
        Intent iFinal = new Intent(this, EncerramentoActivity.class);
        startActivity(iFinal);
    }
}
