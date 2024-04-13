package br.edu.qi.appthewitcher;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageButton;

public class MainActivity extends AppCompatActivity {

    ImageButton btnJogar;
    MediaPlayer mediaPlayer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        getSupportActionBar().hide();

        btnJogar = (ImageButton) findViewById(R.id.btnJogar);

        mediaPlayer = MediaPlayer.create(this, R.raw.abertura);
        mediaPlayer.start();

        btnJogar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirPrimeiraEtapa();
            }
        });
    }

    private void abrirPrimeiraEtapa() {
        mediaPlayer.stop();
        Intent iPrimeiraEtapa = new Intent(this, PrimeiraEtapaActivity.class);
        startActivity(iPrimeiraEtapa);
    }
}
