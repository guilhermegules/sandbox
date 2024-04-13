package com.example.alunos.exemplodettsestt;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class SpeechToTextActivity extends AppCompatActivity {
    EditText edtSTT;
    Button btnVoltarSTT, btnCapturar;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_speech_to_text);
        edtSTT = (EditText) findViewById(R.id.edtSTT);

        btnVoltarSTT = (Button) findViewById(R.id.btnVoltarSTT);
        btnVoltarSTT.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                abrirPrincipalSTT();
            }
        });

        btnCapturar = (Button) findViewById(R.id.btnCapturar);
        btnCapturar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

            }
        });
    }

    public void abrirPrincipalSTT(){
        Intent iPrincipal = new Intent(this, PrincipalActivity.class);
        startActivity(iPrincipal);
    }
}
