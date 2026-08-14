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

public class CasaDeVidroExplicacaoActivity extends AppCompatActivity {

    MediaPlayer mediaPlayer;
    Button btnCasaDeVidroExplicacao;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_casa_de_vidro_explicacao);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        getSupportActionBar().hide();

        btnCasaDeVidroExplicacao = (Button) findViewById(R.id.btnCasaDeVidroExplicacao);

        btnCasaDeVidroExplicacao.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirCasaDeVidro7();
            }
        });

        mediaPlayer = MediaPlayer.create(this, R.raw.casadevidro);
        mediaPlayer.start();

    }

    private void abrirCasaDeVidro7() {
        mediaPlayer.stop();
        Intent iCasaDeVidro7 = new Intent(this, CasaDeVidro7Activity.class);
        startActivity(iCasaDeVidro7);
    }
}
