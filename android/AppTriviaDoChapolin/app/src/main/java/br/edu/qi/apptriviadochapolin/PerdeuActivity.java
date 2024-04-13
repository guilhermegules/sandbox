package br.edu.qi.apptriviadochapolin;

import androidx.appcompat.app.AppCompatActivity;

import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.VideoView;

public class PerdeuActivity extends AppCompatActivity {

    VideoView vdvPerdeu;
    Button btnEncerrar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_perdeu);

        vdvPerdeu = (VideoView) findViewById(R.id.vdvPerdeu);
        vdvPerdeu.setVideoURI(Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.errou));

        vdvPerdeu.start();

        btnEncerrar = (Button) findViewById(R.id.btnEncerrar);
        btnEncerrar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                finishAffinity();
            }
        });
    }

    @Override
    public void onBackPressed() {
        //nada
    }
}
