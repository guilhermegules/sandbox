package br.edu.qi.appthewitcher;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class Pantano2Activity extends AppCompatActivity {

    Button btnMoirasOp3, btnMoirasOp4;
    MediaPlayer mediaPlayer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_pantano2);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        getSupportActionBar().hide();

        btnMoirasOp3 = (Button) findViewById(R.id.btnMoirasOp3);
        btnMoirasOp4 = (Button) findViewById(R.id.btnMoirasOp4);

        mediaPlayer = MediaPlayer.create(this, R.raw.pantano);
        mediaPlayer.start();

        btnMoirasOp4.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirPantanoOp4();
            }
        });

        btnMoirasOp3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirPantanoOp3();
            }
        });
    }

    private void abrirPantanoOp3() {
        mediaPlayer.stop();
        Intent iPantanto3 = new Intent(this, Pantano3Activity.class);
        startActivity(iPantanto3);
    }

    private void abrirPantanoOp4() {
        mediaPlayer.stop();
        Intent iPantano4 = new Intent(this, MoirasLutaActivity.class);
        startActivity(iPantano4);
    }
}
