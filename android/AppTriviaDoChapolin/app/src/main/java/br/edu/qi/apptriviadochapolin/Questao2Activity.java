package br.edu.qi.apptriviadochapolin;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class Questao2Activity extends AppCompatActivity {

    Button btnQ2Op1, btnQ2Op2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_questao2);

        btnQ2Op1 = (Button) findViewById(R.id.btnQ2Op1);
        btnQ2Op2 = (Button) findViewById(R.id.btnQ2Op2);

        btnQ2Op1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirPerdeu();
            }
        });

        btnQ2Op2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirQuestao3();
            }
        });
    }

    private void abrirPerdeu() {
        Intent iPerdeu = new Intent(this, PerdeuActivity.class);
        startActivity(iPerdeu);
    }

    private void abrirQuestao3() {
        Intent iQuestao3 = new Intent(this, Questao3Activity.class);
        startActivity(iQuestao3);
    }
}
