package br.edu.qi.appthewitcher;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class CasaDeVidroLutaActivity extends AppCompatActivity {

    Button btnCasaDeVidroLutar1, btnCasaDeVidroLutar2;
    MediaPlayer mediaPlayer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_casa_de_vidro_luta);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        getSupportActionBar().hide();

        btnCasaDeVidroLutar1 = (Button) findViewById(R.id.btnCasaDeVidroLutarOp1);
        btnCasaDeVidroLutar2 = (Button) findViewById(R.id.btnCasaDeVidroLutarOp2);

        mediaPlayer = MediaPlayer.create(this, R.raw.casadevidro);
        mediaPlayer.start();

        btnCasaDeVidroLutar1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirCasaDeVidro5();
            }
        });

        btnCasaDeVidroLutar2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirCasaDeVidroLuta();
            }
        });
    }

    private void abrirCasaDeVidro5() {
        mediaPlayer.stop();
        Intent iCasaDeVidro5 = new Intent(this, CasaDeVidro5Activity.class);
        startActivity(iCasaDeVidro5);
    }

    private void abrirCasaDeVidroLuta() {
        mediaPlayer.stop();
        Intent iCasaDeVidroLuta = new Intent(this, CasaDeVidroPerseguicaoActivity.class);
        startActivity(iCasaDeVidroLuta);
    }
}
