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

public class CasaDeVidro5Activity extends AppCompatActivity {

    Button btnCasaDeVidro5Op1;
    MediaPlayer mediaPlayer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_casa_de_vidro5);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        getSupportActionBar().hide();

        btnCasaDeVidro5Op1 = (Button) findViewById(R.id.btnCasaDeVidro5Op1);

        mediaPlayer = MediaPlayer.create(this, R.raw.casadevidro);
        mediaPlayer.start();

        btnCasaDeVidro5Op1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirCasaDeVidro6();
            }
        });

    }

    private void abrirCasaDeVidro6() {
        mediaPlayer.stop();
        Intent iCasaDeVidro6 = new Intent(this, CasaDeVidro6Activity.class);
        startActivity(iCasaDeVidro6);
    }
}
