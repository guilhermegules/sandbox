package br.edu.qi.appthewitcher;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class CasaDeVidroActivity extends AppCompatActivity {

    Button btnQ2Op1, btnQ2Op2;
    MediaPlayer mediaPlayer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_casa_de_vidro);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        getSupportActionBar().hide();

        btnQ2Op1 = (Button) findViewById(R.id.btnCasaDeVidroPerseguir1);
        btnQ2Op2 = (Button) findViewById(R.id.btnCasaDeVidroProcurar2);

        mediaPlayer = MediaPlayer.create(this, R.raw.casadevidro);
        mediaPlayer.start();

        btnQ2Op1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirOpcao1();
            }
        });

        btnQ2Op2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirOpcaoIgnorar();
            }
        });
    }

    private void abrirOpcao1() {
        mediaPlayer.stop();
        Intent iOpcao1 = new Intent(this, CasaDeVidro2Activity.class);
        startActivity(iOpcao1);
    }

    private void abrirOpcaoIgnorar() {
        mediaPlayer.stop();
        Intent iIgnorar = new Intent(this, CasaDeVidroIgnorarActivity.class);
        startActivity(iIgnorar);
    }
}
