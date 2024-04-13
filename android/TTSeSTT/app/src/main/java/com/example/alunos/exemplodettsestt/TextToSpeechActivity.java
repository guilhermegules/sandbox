package com.example.alunos.exemplodettsestt;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class TextToSpeechActivity extends AppCompatActivity {
    EditText edtTTS;
    Button btnNarrar, btnVoltarTTS;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_text_to_speech);
        edtTTS = (EditText) findViewById(R.id.edtTTS);

        btnVoltarTTS = (Button) findViewById(R.id.btnVoltarTTS);
        btnVoltarTTS.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                abrirPrincipalTTS();
            }
        });

        btnNarrar = (Button) findViewById(R.id.btnNarrar);
        btnNarrar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

            }
        });

    }

    public void abrirPrincipalTTS(){
        Intent iPrincipal = new Intent(this, PrincipalActivity.class);
        startActivity(iPrincipal);
    }


}
