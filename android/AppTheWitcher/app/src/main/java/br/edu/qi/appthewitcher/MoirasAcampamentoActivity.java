package br.edu.qi.appthewitcher;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MoirasAcampamentoActivity extends AppCompatActivity {

    MediaPlayer mediaPlayer;
    Button btnMoirasAcampamento;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_moiras_acampamento);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        getSupportActionBar().hide();

        btnMoirasAcampamento = (Button) findViewById(R.id.btnMoirasAcampamento);

        mediaPlayer = MediaPlayer.create(this, R.raw.pantano);
        mediaPlayer.start();

        btnMoirasAcampamento.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirFinalAcampamentoFinal();
            }
        });
    }

    private void abrirFinalAcampamentoFinal() {
       mediaPlayer.stop();
       Intent iFinalAcampamento = new Intent(this, MoirasDormirFinalActivity.class);
       startActivity(iFinalAcampamento);
    }
}
