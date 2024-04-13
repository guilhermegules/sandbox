package br.edu.qi.projectmaps;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

/**
 * @author Guilherme Gules Moreira, Maicon Rodrigues
 * @version ---
 * @data 19/08/2019
 */
public class InstructionActivity extends AppCompatActivity {

    Button btnBack;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_instruction);

        btnBack = (Button) findViewById(R.id.btnBack);

        btnBack.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                openMain();
            }
        });
    }
    private void openMain() {
        Intent iMain = new Intent(this, MainActivity.class);
        startActivity(iMain);
    }
}
