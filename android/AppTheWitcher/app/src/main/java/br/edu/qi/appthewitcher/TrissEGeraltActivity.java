package br.edu.qi.appthewitcher;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class TrissEGeraltActivity extends AppCompatActivity {

    MediaPlayer mediaPlayer;
    Button btnTrissOp3, btnTrissOp4;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_triss_egeralt);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        getSupportActionBar().hide();

        btnTrissOp3 = (Button) findViewById(R.id.btnTrissOp5);
        btnTrissOp4 = (Button) findViewById(R.id.btnTrissOp6);

        mediaPlayer = MediaPlayer.create(this, R.raw.triss);
        mediaPlayer.start();

        btnTrissOp3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirTrissSemGeralt();
            }
        });

        btnTrissOp4.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirTrisEGeraltJuntos();
            }
        });
    }

    private void abrirTrissSemGeralt() {
        mediaPlayer.stop();
        Intent iTrissSemGeralt = new Intent(this, TrissSemGeraltActivity.class);
        startActivity(iTrissSemGeralt);
    }

    private void abrirTrisEGeraltJuntos() {
        mediaPlayer.stop();
        Intent iTrisEGeraltJuntos = new Intent(this, TrissEGeraltJuntosActivity.class);
        startActivity(iTrisEGeraltJuntos);
    }
}
