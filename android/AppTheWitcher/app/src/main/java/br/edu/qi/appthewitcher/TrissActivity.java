package br.edu.qi.appthewitcher;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class TrissActivity extends AppCompatActivity {

    MediaPlayer mediaPlayer;
    Button btnTrissOp1, btnTrissOp2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_triss);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        getSupportActionBar().hide();

        btnTrissOp1 = (Button) findViewById(R.id.btnTrissOp1);
        btnTrissOp2 = (Button) findViewById(R.id.btnTrissOp2);

        mediaPlayer = MediaPlayer.create(this, R.raw.triss);
        mediaPlayer.start();

        btnTrissOp1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirTrissEGeralt();
            }
        });

        btnTrissOp2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirIgnorarTriss();
            }
        });
    }

    private void abrirTrissEGeralt() {
        mediaPlayer.stop();
        Intent iTrissGeralt = new Intent(this, TrissEGeraltActivity.class);
        startActivity(iTrissGeralt);
    }

    private void abrirIgnorarTriss() {
        mediaPlayer.stop();
        Intent iIgnorarTriss = new Intent(this, TrissIgnoraActivity.class);
        startActivity(iIgnorarTriss);
    }
}
