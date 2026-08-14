package br.edu.qi.appthewitcher;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class CasaDeVidro3Activity extends AppCompatActivity {

    Button btnCasaDeVidroOp5, btnCasaDeVidroOp6;
    MediaPlayer mediaPlayer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_casa_de_vidro3);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        getSupportActionBar().hide();

        btnCasaDeVidroOp5 = (Button) findViewById(R.id.btnCasaDeVidroOp5);
        btnCasaDeVidroOp6 = (Button) findViewById(R.id.btnCasaDeVidroOp6);

        mediaPlayer = MediaPlayer.create(this, R.raw.casadevidro);
        mediaPlayer.start();

        btnCasaDeVidroOp5.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirCasaDeVidro4();
            }
        });

        btnCasaDeVidroOp6.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirVoltarCidade();
            }
        });
    }

    private void abrirCasaDeVidro4() {
        mediaPlayer.stop();
        Intent iCasaDeVidro4 = new Intent(this, CasaDeVidro4Activity.class);
        startActivity(iCasaDeVidro4);
    }

    private void abrirVoltarCidade() {
        mediaPlayer.stop();
        Intent iCidade = new Intent(this, VoltarParaCidadeActivity.class);
        startActivity(iCidade);
    }
}
