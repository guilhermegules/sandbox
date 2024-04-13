package br.edu.qi.projectmaps;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import com.google.android.gms.maps.MapView;

/**
 * @author Guilherme Gules Moreira, Maicon Rodrigues
 * @version ---
 * @data 19/08/2019
 */
public class MainActivity extends AppCompatActivity {

    Button btnMap, btnInstruction;
    SensorManager sensorManager;
    Sensor sensorAccelerometer, sensorGyroscope;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);



        btnMap = (Button) findViewById(R.id.btnMap);
        btnInstruction = (Button) findViewById(R.id.btnInstruction);
        sensorManager = (SensorManager) getSystemService(SENSOR_SERVICE);

        sensorManager.registerListener(new Accelerometer(), sensorAccelerometer, SensorManager.SENSOR_DELAY_NORMAL);
        sensorManager.registerListener(new Gyroscope(), sensorGyroscope, SensorManager.SENSOR_DELAY_NORMAL);

        btnMap.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

            }
        });

        btnInstruction.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                openInstruction();
            }
        });

        btnMap.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                openMaps();
            }
        });
    }

    /**
     * Class implements Sensor Event for the sensor accelerometer, keeping the data on the variables x, y, z
     */
    class Accelerometer implements SensorEventListener {

        @Override
        public void onSensorChanged(SensorEvent event) {
            double x = event.values[0];
            double y = event.values[1];
            double z = event.values[2];
        }

        @Override
        public void onAccuracyChanged(Sensor sensor, int accuracy) {

        }
    }

    /**
     * Class implements Sensor Event for the sensor gyroscope, keeping the data on the variables x, y, z
     */
    class Gyroscope implements SensorEventListener {

        @Override
        public void onSensorChanged(SensorEvent event) {
            double x = event.values[0];
            double y = event.values[1];
            double z = event.values[2];
        }

        @Override
        public void onAccuracyChanged(Sensor sensor, int accuracy) {

        }
    }

    /**
     * Method for open a instruction activity
     */
    private void openInstruction() {
        Intent instruction = new Intent(this, InstructionActivity.class);
        startActivity(instruction);
    }

    /**
     * Method for open GoogleMaps activityaaaa
     */
    private void openMaps() {
        Intent Maps = new Intent(this, MapsActivity.class);
        startActivity(Maps);
    }
}
