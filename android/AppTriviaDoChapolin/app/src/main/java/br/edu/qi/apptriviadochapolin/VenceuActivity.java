package br.edu.qi.apptriviadochapolin;

import androidx.appcompat.app.AppCompatActivity;

import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.VideoView;

public class VenceuActivity extends AppCompatActivity {

    VideoView vdvVenceu;
    Button btnEncerrar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_venceu);

        vdvVenceu = (VideoView) findViewById(R.id.vdvVenceu);
        vdvVenceu.setVideoURI(Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.venceu));

        vdvVenceu.start();

        btnEncerrar = (Button) findViewById(R.id.btnVenceu);
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
