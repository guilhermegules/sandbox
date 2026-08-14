package br.edu.qi.appthewitcher;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class CasaDeVidroPerseguicaoActivity extends AppCompatActivity {

    Button btnCasaDeVidroPerseguicao1, btnCasaDeVidroPerseguicao2;
    MediaPlayer mediaPlayer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_casa_de_vidro_perseguicao);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        getSupportActionBar().hide();

        btnCasaDeVidroPerseguicao1 = (Button) findViewById(R.id.btnCasaDeVidroPerseguir1);
        btnCasaDeVidroPerseguicao2 = (Button) findViewById(R.id.btnCasaDeVidroPerseguir2);

        mediaPlayer = MediaPlayer.create(this, R.raw.casadevidro);
        mediaPlayer.start();

        btnCasaDeVidroPerseguicao1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirFinalBruxa();
            }
        });

        btnCasaDeVidroPerseguicao2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirCasaDeVidro5();
            }
        });
    }

    private void abrirCasaDeVidro5() {
        mediaPlayer.stop();
        Intent iCasaDeVidro5 = new Intent(this, CasaDeVidro5Activity.class);
        startActivity(iCasaDeVidro5);
    }

    private void abrirFinalBruxa() {
        mediaPlayer.stop();
        Intent iFinalBruxa = new Intent(this, CasaDeVidroFinalBruxaActivity.class);
        startActivity(iFinalBruxa);
    }
}
