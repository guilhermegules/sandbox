package br.edu.qi.appcalculadora3;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    EditText edtValor1, edtValor2;
    Button somar,subtrair,multiplicar,dividir;
    TextView txtresultado;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        edtValor1 = (EditText) findViewById(R.id.edtValor1);
        edtValor2 = (EditText) findViewById(R.id.edtValor2);
        somar = (Button) findViewById(R.id.btnSomar);
        subtrair = (Button) findViewById(R.id.btnSubtrair);
        multiplicar = (Button) findViewById(R.id.btnMultiplicar);
        dividir = (Button) findViewById(R.id.btnDividir);
        txtresultado = (TextView) findViewById(R.id.txtResultado);

        somar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                calcular(1);
            }
        });

        subtrair.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                calcular(2);
            }
        });

        multiplicar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                calcular(3);
            }
        });

        dividir.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                calcular(4);
            }
        });
    }

    private void calcular(int operacao) {
        //VALORES DO PARÂMETRO OPERAÇÃO
        //1 - somar
        //2 - subtrair
        //3 - Multiplicar
        //4 - Dividir
        double v1 = 0;
        double v2 = 0;
        double resultado = 0;
        try {
            v1 = Double.parseDouble(edtValor1.getText().toString());
            v2 = Double.parseDouble(edtValor2.getText().toString());

            if(operacao == 1) resultado = v1 + v2;
            else if(operacao == 2) resultado = v1 - v2;
            else if(operacao == 3) resultado = v1 * v2;
            txtresultado.setText(resultado + "");

            if(operacao == 4) {
                if(v2 != 0) {
                    resultado = v1 / v2;
                    txtresultado.setText(resultado + "");
                } else {
                    txtresultado.setText("Não dividir por 0");
                }
            }

        } catch (Exception exception) {
            txtresultado.setText("Erro! Verifique os valores.");
        }
    }
}
