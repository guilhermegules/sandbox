package br.edu.qi.appthewitcher;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class CasaDeVidro2Activity extends AppCompatActivity {

    Button btnCasaDeVidroOp3, btnCasaDeVidroOp4;
    MediaPlayer mediaPlayer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_casa_de_vidro2);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        getSupportActionBar().hide();

        btnCasaDeVidroOp3 = (Button) findViewById(R.id.btnCasaDeVidroOp3);
        btnCasaDeVidroOp4 = (Button) findViewById(R.id.btnCasaDeVidroOp4);

        mediaPlayer = MediaPlayer.create(this, R.raw.casadevidro);
        mediaPlayer.start();

        btnCasaDeVidroOp3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirCasaDeVidro2();
            }
        });

        btnCasaDeVidroOp4.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirVoltarCidade();
            }
        });
    }

    private void abrirCasaDeVidro2() {
        mediaPlayer.stop();
        Intent iCasaDeVidro2 = new Intent(this, CasaDeVidro3Activity.class);
        startActivity(iCasaDeVidro2);
    }

    private void abrirVoltarCidade() {
        mediaPlayer.stop();
        Intent iCidade = new Intent(this, VoltarParaCidadeActivity.class);
        startActivity(iCidade);
    }
}
