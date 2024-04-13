package br.edu.qi.appthewitcher;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import java.util.Timer;
import java.util.TimerTask;

public class CasaDeVidroFinalRealActivity extends AppCompatActivity {

    MediaPlayer mediaPlayer;
    //Timer timer;
    Button btnCasaDeVidroFinalReal;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_casa_de_vidro_final_real);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        getSupportActionBar().hide();

        mediaPlayer = MediaPlayer.create(this, R.raw.casadevidro);
        mediaPlayer.start();

        btnCasaDeVidroFinalReal = (Button) findViewById(R.id.btnCasaDeVidroFinalReal);

        btnCasaDeVidroFinalReal.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirEncerramento();
            }
        });

        /*timer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                timer.cancel();
                abrirEncerramento();
            }
        }, 8000, 1000);*/
    }

    public void abrirEncerramento() {
        mediaPlayer.stop();
        Intent iEncerramento = new Intent(this, EncerramentoActivity.class);
        startActivity(iEncerramento);
    }
}
