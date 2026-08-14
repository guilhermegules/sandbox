package br.edu.qi.appthewitcher;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class TrissEGeraltJuntosActivity extends AppCompatActivity {

    MediaPlayer mediaPlayer;
    Button btnTrissEGeraltJuntos;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_triss_egeralt_juntos);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        getSupportActionBar().hide();

        btnTrissEGeraltJuntos = (Button) findViewById(R.id.btnTrissEGeraltJuntos);

        mediaPlayer = MediaPlayer.create(this, R.raw.triss);
        mediaPlayer.start();

        btnTrissEGeraltJuntos.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirEncerramento();
            }
        });
    }
    public void abrirEncerramento() {
        mediaPlayer.stop();
        Intent iEncerramento = new Intent(this, EncerramentoActivity.class);
        startActivity(iEncerramento);
    }
}
