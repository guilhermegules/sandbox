package br.edu.qi.appthewitcher;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class CasaDeVidro4Activity extends AppCompatActivity {

    Button btnCasaDeVidroOp7, btnCasaDeVidroOp8;
    MediaPlayer mediaPlayer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_casa_de_vidro4);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        getSupportActionBar().hide();

        btnCasaDeVidroOp7 = (Button) findViewById(R.id.btnCasaDeVidro4Op1);
        btnCasaDeVidroOp8 = (Button) findViewById(R.id.btnCasaDeVidro4Op2);

        mediaPlayer = MediaPlayer.create(this, R.raw.casadevidro);
        mediaPlayer.start();


        btnCasaDeVidroOp7.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirCasaDeVidro5();
            }
        });

        btnCasaDeVidroOp8.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirCasaDeVidroProcurar();
            }
        });
    }

    private void abrirCasaDeVidro5() {
        mediaPlayer.stop();
        Intent iCasaDeVidro5Primeira = new Intent(this, CasaDeVidro5Activity.class);
        startActivity(iCasaDeVidro5Primeira);
    }

    private void abrirCasaDeVidroProcurar() {
        mediaPlayer.stop();
        Intent iProcurar = new Intent(this, CasaDeVidroProcurarActivity.class);
        startActivity(iProcurar);
    }
}
