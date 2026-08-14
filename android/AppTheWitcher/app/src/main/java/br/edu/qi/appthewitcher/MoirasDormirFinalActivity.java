package br.edu.qi.appthewitcher;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import java.util.Timer;

public class MoirasDormirFinalActivity extends AppCompatActivity {

    MediaPlayer mediaPlayer;
    Button btnFinalAcampamento;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_moiras_dormir_final);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        getSupportActionBar().hide();

        btnFinalAcampamento = (Button) findViewById(R.id.btnMoirasFinalDormir);

        mediaPlayer = MediaPlayer.create(this, R.raw.pantano);
        mediaPlayer.start();

        btnFinalAcampamento.setOnClickListener(new View.OnClickListener() {
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
