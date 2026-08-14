package br.edu.qi.appthewitcher;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class CasaDeVidroProcurarActivity extends AppCompatActivity {

    Button btnCasaDeVidroProcurar1, btnCasaDeVidroProcurar2;
    MediaPlayer mediaPlayer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_casa_de_vidro_procurar);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        getSupportActionBar().hide();

        btnCasaDeVidroProcurar1 = (Button) findViewById(R.id.btnCasaDeVidroProcurar1);
        btnCasaDeVidroProcurar2 = (Button) findViewById(R.id.btnCasaDeVidroProcurar2);

        mediaPlayer = MediaPlayer.create(this, R.raw.casadevidro);
        mediaPlayer.start();

        btnCasaDeVidroProcurar1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirLuta();
            }
        });

        btnCasaDeVidroProcurar2.setOnClickListener(new View.OnClickListener() {
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

    private void abrirLuta() {
        mediaPlayer.stop();
        Intent iCasaDeVidroLuta = new Intent(this, CasaDeVidroLutaActivity.class);
        startActivity(iCasaDeVidroLuta);
    }
}
