package br.edu.qi.apptriviadochapolin;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class Questao3Activity extends AppCompatActivity {

    Button btnQ3Op1, btnQ3Op2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_questao3);

        btnQ3Op1 = (Button) findViewById(R.id.btnQ3Op1);
        btnQ3Op2 = (Button) findViewById(R.id.btnQ3Op2);

        btnQ3Op1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirVenceu();
            }
        });

        btnQ3Op2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirPerdeu();
            }
        });
    }

    private void abrirVenceu() {
        Intent iVenceu = new Intent(this, VenceuActivity.class);
        startActivity(iVenceu);
    }

    private void abrirPerdeu() {
        Intent iPerdeu = new Intent(this, PerdeuActivity.class);
    }
}
