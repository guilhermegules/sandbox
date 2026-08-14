package br.edu.qi.appthewitcher;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class Pantano3Activity extends AppCompatActivity {

    Button btnMoirasOp5, btnMoirasOp6;
    MediaPlayer mediaPlayer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_pantano3);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        getSupportActionBar().hide();

        btnMoirasOp5 = (Button) findViewById(R.id.btnMoirasOp5);
        btnMoirasOp6 = (Button) findViewById(R.id.btnMoirasOp6);

        mediaPlayer = MediaPlayer.create(this, R.raw.pantano);
        mediaPlayer.start();

        btnMoirasOp5.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirMoirasComGeralt();
            }
        });

        btnMoirasOp6.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirGeraltSemMoiras();
            }
        });
    }

    private void abrirMoirasComGeralt() {
        mediaPlayer.stop();
        Intent iMoirasComGeralt = new Intent(this, MoirasEGeraltActivity.class);
        startActivity(iMoirasComGeralt);
    }

    private void abrirGeraltSemMoiras() {
        mediaPlayer.stop();
        Intent iGeraltSemMoiras = new Intent(this, GeraltEnfrentaMoirasActivity.class);
        startActivity(iGeraltSemMoiras);
    }
}
