package br.edu.qi.appthewitcher;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class TrissSemGeraltActivity extends AppCompatActivity {

    MediaPlayer mediaPlayer;
    Button btnTrissSemGeralt;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_triss_sem_geralt);

        btnTrissSemGeralt = (Button) findViewById(R.id.btnTrissSemGeralt);

        mediaPlayer = MediaPlayer.create(this, R.raw.triss);

        btnTrissSemGeralt.setOnClickListener(new View.OnClickListener() {
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
