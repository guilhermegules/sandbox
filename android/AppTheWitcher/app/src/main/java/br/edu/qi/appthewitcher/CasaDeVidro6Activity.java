package br.edu.qi.appthewitcher;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import java.util.Timer;

public class CasaDeVidro6Activity extends AppCompatActivity {

    MediaPlayer mediaPlayer;
    Button btnCasaDeVidro6Op1, btnCasaDeVidro6Op2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_casa_de_vidro6);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        getSupportActionBar().hide();

        btnCasaDeVidro6Op1 = (Button) findViewById(R.id.btnCasaDeVidro6Op1);
        btnCasaDeVidro6Op2 = (Button) findViewById(R.id.btnCasaDeVidro6Op2);

        mediaPlayer = MediaPlayer.create(this, R.raw.casadevidro);
        mediaPlayer.start();

        btnCasaDeVidro6Op1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirCasaDeVidro7();
            }
        });

        btnCasaDeVidro6Op2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirExplicacoes();
            }
        });
    }

    private void abrirCasaDeVidro7() {
        mediaPlayer.stop();
        Intent iCasaDeVidro7 = new Intent(this, CasaDeVidro7Activity.class);
        startActivity(iCasaDeVidro7);
    }

    private void abrirExplicacoes() {
        mediaPlayer.stop();
        Intent iExplicacao = new Intent(this, CasaDeVidroExplicacaoActivity.class);
        startActivity(iExplicacao);
    }
}
