package br.edu.qi.appthewitcher;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.os.Bundle;

import java.util.Timer;
import java.util.TimerTask;

public class VoltarParaCidadeActivity extends AppCompatActivity {

    Timer timer = new Timer();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_casa_de_vidro_voltar_para_cidade);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        getSupportActionBar().hide();

        timer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                abrirFinal();
                timer.cancel();
            }
        }, 8000, 1000);
    }

    public void abrirFinal() {
        Intent iFinal = new Intent(this, EncerramentoActivity.class);
        startActivity(iFinal);
    }
}
