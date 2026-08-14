package br.edu.qi.appthewitcher;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MoirasEGeraltActivity extends AppCompatActivity {

    MediaPlayer mediaPlayer;
    Button btnMoirasComGeralt;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_moiras_egeralt);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        getSupportActionBar().hide();

        btnMoirasComGeralt = (Button) findViewById(R.id.btnMoirasComGeralt);

        mediaPlayer = MediaPlayer.create(this, R.raw.pantano);
        mediaPlayer.start();

        btnMoirasComGeralt.setOnClickListener(new View.OnClickListener() {
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
