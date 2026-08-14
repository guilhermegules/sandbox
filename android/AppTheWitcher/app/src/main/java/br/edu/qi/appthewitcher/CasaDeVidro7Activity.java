package br.edu.qi.appthewitcher;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class CasaDeVidro7Activity extends AppCompatActivity {

    MediaPlayer mediaPlayer;
    Button btnCasaDeVidro7Op1, btnCasaDeVidro7Op2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_casa_de_vidro7);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        getSupportActionBar().hide();

        btnCasaDeVidro7Op2 = (Button) findViewById(R.id.btnCasaDeVidro7Op2);
        btnCasaDeVidro7Op1 = (Button) findViewById(R.id.btnCasaDeVidro7Op1);

        mediaPlayer = MediaPlayer.create(this, R.raw.casadevidro);
        mediaPlayer.start();

        btnCasaDeVidro7Op1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirFinalReal();
            }
        });

        btnCasaDeVidro7Op2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirFinalJakob();
            }
        });
    }

    private void abrirFinalJakob() {
        mediaPlayer.stop();
        Intent iJakob = new Intent(this, CasaDeVidroFinalJakobActivity.class);
        startActivity(iJakob);
    }

    private void abrirFinalReal() {
        mediaPlayer.stop();
        Intent iCasaDeVidroFinal = new Intent(this, CasaDeVidroFinalRealActivity.class);
        startActivity(iCasaDeVidroFinal);
    }
}
