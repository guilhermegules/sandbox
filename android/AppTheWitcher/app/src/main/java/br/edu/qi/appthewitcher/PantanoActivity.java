package br.edu.qi.appthewitcher;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class PantanoActivity extends AppCompatActivity {

    Button btnPantanoOp1, btnPantanoOp2;
    MediaPlayer mediaPlayer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_pantano);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        getSupportActionBar().hide();

        btnPantanoOp1 = (Button) findViewById(R.id.btnMoirasOp1);
        btnPantanoOp2 = (Button) findViewById(R.id.btnMoirasOp2);

        mediaPlayer = MediaPlayer.create(this, R.raw.pantano);
        mediaPlayer.start();

        btnPantanoOp1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirPantanoOp1();
            }
        });

        btnPantanoOp2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirPantanoOp2();
            }
        });
    }

    private void abrirPantanoOp1() {
        mediaPlayer.stop();
        Intent iOp1 = new Intent(this, Pantano2Activity.class);
        startActivity(iOp1);
    }

    private void abrirPantanoOp2() {
        mediaPlayer.stop();
        Intent iOp2 = new Intent(this, MoirasAcampamentoActivity.class);
        startActivity(iOp2);
    }
}
