package com.example.alunos.testesensores;

import android.content.Intent;
import android.hardware.Sensor;
import android.hardware.SensorManager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.method.ScrollingMovementMethod;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import org.w3c.dom.Text;

import java.util.List;

public class PrincipalActivity extends AppCompatActivity {
    TextView txtSensores;
    Button btnListar, btnAvancar;
    String descobertos;
    SensorManager managerSensores;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_principal);
        txtSensores = (TextView) findViewById(R.id.txtSensores);
        txtSensores.setMovementMethod(new ScrollingMovementMethod());

        managerSensores = (SensorManager) getSystemService(SENSOR_SERVICE);

        btnListar = (Button) findViewById(R.id.btnListar);
        btnListar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                listarSensores();
            }
        });

        btnAvancar = (Button) findViewById(R.id.btnAvancar);
        btnAvancar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                proximaJanela();
            }
        });
    }

    private void proximaJanela(){
        Intent iSensores = new Intent(this, SensoresActivity.class);
        startActivity(iSensores);
    }

    private void listarSensores() {
        List<Sensor> listaSensores = managerSensores.getSensorList(Sensor.TYPE_ALL);
        descobertos = "";
        for(int i = 0; i < listaSensores.size(); i++) {
            descobertos += listaSensores.get(i).getName() + "\n";
        }
        txtSensores.setText(descobertos);
    }
}