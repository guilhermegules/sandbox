package com.example.alunos.testesensores;

import android.content.Intent;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import java.util.List;

public class SensoresActivity extends AppCompatActivity {
    TextView txtValor;
    Button btnAcelerometro, btnGiroscopio, btnLuminosidade, btnProximidade, btnMagnenometro;
    SensorManager managerSensores;
    Sensor sAcelerometro, sMagnenometro, sGiroscopio, sLuz, sProximidade;
    String textoAcelerometro, textoMagnenometro, textoGiroscopio, textoLuz, textoProximidade;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sensores);
        txtValor = (TextView) findViewById(R.id.txtValor);

        managerSensores = (SensorManager) getSystemService(SENSOR_SERVICE);

        sAcelerometro = managerSensores.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
        managerSensores.registerListener(new Acelerometro(), sAcelerometro, SensorManager.SENSOR_DELAY_NORMAL);

        btnAcelerometro = (Button) findViewById(R.id.btnAcelerometro);
        btnAcelerometro.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                txtValor.setText(textoAcelerometro);
            }
        });

        btnGiroscopio = (Button) findViewById(R.id.btnGiroscópio);
        btnGiroscopio.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

            }
        });

        btnLuminosidade = (Button) findViewById(R.id.btnLuminosidade);
        btnLuminosidade.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                txtValor.setText(textoLuz);
            }
        });

        sLuz = managerSensores.getDefaultSensor(Sensor.TYPE_LIGHT);
        managerSensores.registerListener(new Luminosidade(), sLuz, SensorManager.SENSOR_DELAY_NORMAL);

        btnProximidade = (Button) findViewById(R.id.btnProximidade);
        btnProximidade.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                txtValor.setText(textoProximidade);
            }
        });

        sProximidade = managerSensores.getDefaultSensor(Sensor.TYPE_PROXIMITY);
        managerSensores.registerListener(new Proximidade(), sProximidade, SensorManager.SENSOR_DELAY_NORMAL);

        btnMagnenometro = (Button) findViewById(R.id.btnMagnenometro);
        btnMagnenometro.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                txtValor.setText(textoMagnenometro);
            }
        });

        sMagnenometro = managerSensores.getDefaultSensor(Sensor.TYPE_GEOMAGNETIC_ROTATION_VECTOR);
        managerSensores.registerListener(new Magnenometro(), sMagnenometro, SensorManager.SENSOR_DELAY_NORMAL);

    }

    class Acelerometro implements SensorEventListener {

        @Override
        public void onSensorChanged(SensorEvent event) {
            double x = event.values[0];
            double y = event.values[1];
            double z = event.values[2];
            textoAcelerometro = "\n\n";
            textoAcelerometro += "valor de X: " + x + "\n";
            textoAcelerometro += "valor de Y: " + y + "\n";
            textoAcelerometro += "valor de Z: " + z;
        }

        @Override
        public void onAccuracyChanged(Sensor sensor, int accuracy) {

        }
    }

    class Luminosidade implements SensorEventListener {

        @Override
        public void onSensorChanged(SensorEvent event) {
            textoLuz = "\n\n";
            textoLuz = "Lux: " + event.values[0];
        }

        @Override
        public void onAccuracyChanged(Sensor sensor, int accuracy) {

        }
    }

    class Magnenometro implements SensorEventListener {

        @Override
        public void onSensorChanged(SensorEvent event) {
            double x = event.values[0];
            double y = event.values[1];
            double z = event.values[2];
            textoMagnenometro = "\n\n";
            textoMagnenometro += "valor de X: " + x + "\n";
            textoMagnenometro += "valor de Y: " + y + "\n";
            textoMagnenometro += "valor de Z: " + z;
        }

        @Override
        public void onAccuracyChanged(Sensor sensor, int accuracy) {

        }
    }

    class Proximidade implements SensorEventListener {

        @Override
        public void onSensorChanged(SensorEvent event) {
            textoProximidade = "\n\n";
            textoProximidade = "Valor de Proximidade " + event.values[0];
        }

        @Override
        public void onAccuracyChanged(Sensor sensor, int accuracy) {

        }
    }
}
