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

public class CasaDeVidroFinalBruxaActivity extends AppCompatActivity {

    //Timer timer;
    MediaPlayer mediaPlayer;
    Button btnFinalBruxa;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_casa_de_vidro_final_bruxa);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        getSupportActionBar().hide();

        btnFinalBruxa = (Button) findViewById(R.id.btnFinalBruxa);

        mediaPlayer = MediaPlayer.create(this, R.raw.casadevidro);
        mediaPlayer.start();

        btnFinalBruxa.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirGeraltFerimento();
            }
        });

        /*timer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                timer.cancel();
                abrirGeraltFerimento();
            }
        }, 8000, 1000);*/
    }

    private void abrirGeraltFerimento() {
        mediaPlayer.stop();
        Intent iFerimento = new Intent(this, CasaDeVidroFerimentoActivity.class);
        startActivity(iFerimento);
    }
}
