package br.edu.qi.appthewitcher;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class EncerramentoActivity extends AppCompatActivity {

    Button btnJogarNovamente;
    MediaPlayer mediaPlayer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_encerramento);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        getSupportActionBar().hide();

        btnJogarNovamente = (Button) findViewById(R.id.btnJogarNovamente);

        mediaPlayer = MediaPlayer.create(this, R.raw.encerramento);
        mediaPlayer.start();

        btnJogarNovamente.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                voltarParaMain();
            }
        });
    }


    public void voltarParaMain() {
        mediaPlayer.stop();
        Intent iVoltar = new Intent(this, MainActivity.class);
        startActivity(iVoltar);
    }
}
