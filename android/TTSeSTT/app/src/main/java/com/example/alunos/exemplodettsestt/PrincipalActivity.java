package com.example.alunos.exemplodettsestt;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class PrincipalActivity extends AppCompatActivity {

    Button btnIrTTS, btnIrSTT;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_principal);
        btnIrTTS = (Button) findViewById(R.id.btnIrTTS);
        btnIrTTS.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                abrirTTS();
            }
        });

        btnIrSTT = (Button) findViewById(R.id.btnIrSTT);
        btnIrSTT.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                abrirSTT();
            }
        });
    }

    public void abrirTTS(){
        Intent iTTS = new Intent(this, TextToSpeechActivity.class);
        startActivity(iTTS);
    }

    public void abrirSTT(){
        Intent iSTT = new Intent(this, SpeechToTextActivity.class);
        startActivity(iSTT);
    }
}
