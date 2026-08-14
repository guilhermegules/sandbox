package br.edu.qi.apptriviadochapolin;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class Questao1Activity extends AppCompatActivity {

    Button btnQ1Op1, btnQ1Op2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_questao1);

        btnQ1Op1 = (Button) findViewById(R.id.btnQ1Op1);
        btnQ1Op2 = (Button) findViewById(R.id.btnQ1Op2);

        btnQ1Op1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirQuestao2();
            }
        });

        btnQ1Op2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                abrirperdeu();
            }
        });
    }

    private void abrirperdeu() {
        Intent iPerdeu = new Intent(this, PerdeuActivity.class);
        startActivity(iPerdeu);
    }

    private void abrirQuestao2() {
        Intent iQuestao2 = new Intent(this, Questao2Activity.class);
        startActivity(iQuestao2);
    }
}
