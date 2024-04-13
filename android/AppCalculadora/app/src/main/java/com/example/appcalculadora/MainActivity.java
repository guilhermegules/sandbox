package com.example.appcalculadora;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    EditText valor1, valor2;
    Button btnSomar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        valor1 = (EditText)findViewById(R.id.edtValor1);
        valor2 = (EditText)findViewById(R.id.edtValor2);
        btnSomar = (Button)findViewById(R.id.btnCalcular);


    }

    public void somar(View view) {
        int v1 = Integer.parseInt(valor1.getText().toString());
        int v2 = Integer.parseInt(valor2.getText().toString());
        int resultado = v1 + v2;

        Toast.makeText(this, "A soma é: " + resultado, Toast.LENGTH_SHORT).show();
    }
}
