package br.edu.qi.appthewitcher;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class PrimeiraEtapaActivity extends AppCompatActivity {

    Button btnQ1Op1, btnQ1Op2, btnQ1Op3;
    MediaPlayer mediaPlayer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_primeira_etapa);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        getSupportActionBar().hide();

        btnQ1Op1 = (Button) findViewById(R.id.btnQ1Op1);
        btnQ1Op2 = (Button) findViewById(R.id.btnQ1Op2);
        btnQ1Op3 = (Button) findViewById(R.id.btnQ1Op3);

        mediaPlayer = MediaPlayer.create(this, R.raw.abertura);
        mediaPlayer.start();

        btnQ1Op1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirCasaDeVidro();
            }
        });

        btnQ1Op2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirPantano();
            }
        });

        btnQ1Op3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirTriss();
            }
        });

    }

    private void abrirCasaDeVidro() {
        mediaPlayer.stop();
        Intent iCasaDeVidro = new Intent(this, CasaDeVidroActivity.class);
        startActivity(iCasaDeVidro);
    }

    private void abrirTriss() {
        mediaPlayer.stop();
        Intent iTriss = new Intent(this, TrissActivity.class);
        startActivity(iTriss);
    }

    private void abrirPantano() {
        mediaPlayer.stop();
        Intent iPantano = new Intent(this, PantanoActivity.class);
        startActivity(iPantano);
    }
}
