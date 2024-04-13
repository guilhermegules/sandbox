package br.edu.qi.appthewitcher;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class GeraltEnfrentaMoirasActivity extends AppCompatActivity {

    MediaPlayer mediaPlayer;
    Button btnEnfrentaMoiras;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_geralt_enfrenta_moiras);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        getSupportActionBar().hide();

        btnEnfrentaMoiras = (Button) findViewById(R.id.btnEnfrentaMoiras);

        mediaPlayer = MediaPlayer.create(this, R.raw.pantano);
        mediaPlayer.start();

        btnEnfrentaMoiras.setOnClickListener(new View.OnClickListener() {
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
