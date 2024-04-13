package com.example.rodrigo.testecameramicrofone;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

public class PrincipalActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_principal);
        verificarPermissoes();
    }

    private void verificarPermissoes(){
        //Verifica se alguma das permissões que necessitamos ainda não foi dada.
        //Caso isso ocorra, chama requestPermissions para solicitar as permissões
        //OBS:se requestPermission for chamada para todas as permissões, somente serão pedidas as ainda não dadas
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED
                || ActivityCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED
                || ActivityCompat.checkSelfPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED
                || ActivityCompat.checkSelfPermission(this, Manifest.permission.READ_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED){
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.RECORD_AUDIO, Manifest.permission.CAMERA, Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.READ_EXTERNAL_STORAGE}, 1);
        }
    }

    //Chama a janela de Foto
    public void abrirFoto(View v){
        Intent i = new Intent(this, FotoActivity.class);
        startActivity(i);
    }

    //Chama a janela de Video
    public void abrirVideo(View v){
        Intent i = new Intent(this, VideoActivity.class);
        startActivity(i);
    }

    //Chama a janela de Microfone
    public void abrirMicrofone(View v){
        Intent i = new Intent(this, MicrofoneActivity.class);
        startActivity(i);
    }
}
