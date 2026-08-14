package br.edu.qi.apptriviadochapolin;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;

public class MainActivity extends AppCompatActivity {

    ImageButton btnJogar;
    MediaPlayer mediaPlayer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btnJogar = (ImageButton) findViewById(R.id.btnJogar);

        mediaPlayer = MediaPlayer.create(this, R.raw.abertura);
        mediaPlayer.start();

        btnJogar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirQuestao1();
            }
        });

    }
    private void abrirQuestao1() {
        mediaPlayer.stop();
        Intent iQuestao1 = new Intent(this, Questao1Activity.class);
        startActivity(iQuestao1);
    }
}
