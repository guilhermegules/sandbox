package com.example.rodrigo.testecameramicrofone;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Matrix;
import android.media.ExifInterface;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;
import android.support.v4.content.FileProvider;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;
import android.widget.VideoView;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class VideoActivity extends AppCompatActivity {
    VideoView vdvVideo;
    String caminhoCompletoArquivo;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_video);

        vdvVideo = (VideoView) findViewById(R.id.vdvVideo);

    }

    //Gera um caminho/nome_arquivo.extensao para darmos ao vídeo que deverá ser salvo após uso da câmera
    private String getNomeArquivo() throws IOException {
        //Cria um diretório com caminho do diretório raiz do telefone no Linux concatenado com o caminho que queremos criar
        File diretorio = new File(Environment.getExternalStorageDirectory() + File.separator + "DCIM" + File.separator + "QIAPP");
        //Força a criação do diretório informado acima
        diretorio.mkdirs();
        //Pega o momento atual e cria uma string com informacoes de data e hora
        String timeStamp = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
        //Criamos um nome para o arquivo concatenando um prefixo que queremos com a String de datahora e extensão mp4
        String nomeFoto = "VID_" + timeStamp + ".mp4";
        //Criar um caminho completo com o diretório criado na primeira linha concatenado com o nome do nosso arquivo
        return diretorio + File.separator + nomeFoto;
    }

    //Método associado ao botão que dispara a abertura da câmera
    public void chamarCamera(View v){
        //Cria a intent que chama a câmera
        Intent cameraIntent = new Intent(MediaStore.ACTION_VIDEO_CAPTURE);
        cameraIntent.putExtra( MediaStore.EXTRA_FINISH_ON_COMPLETION, true);

        //Chama o método que cria um caminho/nome.extensao e com ele cria um arquivo. Esse arquivo é usado para
        //criar uma uri (caminho) que será passada por parâmetro para a intent em MediaStore.EXTRA_OUTPUT. Esse
        //EXTRA_OUTPUT diz que queremos salvar o resultado do chamado da intent em um arquivo cujo caminho passamos
        //por parâmetro. Caso aconteça um erro ao criar o arquivo, ou abrir a câmera, damos uma mensagem ao usuário
        //informando que não será possível usar o recurso
        File arqTemp = null;
        try {
            caminhoCompletoArquivo = getNomeArquivo();
            arqTemp = new File(caminhoCompletoArquivo);
            Uri uriArquivo = FileProvider.getUriForFile(this, this.getApplicationContext().getPackageName() + ".provider", arqTemp);
            cameraIntent.putExtra(MediaStore.EXTRA_OUTPUT, uriArquivo);
            startActivityForResult(cameraIntent, 1);
        } catch (Exception ex) {
            Toast.makeText(this,"Não é possível executar o recurso!\n"+ex.toString(), Toast.LENGTH_SHORT).show();
            return;
        }
    }


    //Método chamado quando a intent for encerrada (ou seja, a câmera chamada pela intent for fechada)
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        //Testa se a intent foi até o final (ou seja, câmera foi usada e o video foi salvo)
        if (requestCode == 1 && resultCode == RESULT_OK){
            //Associa o arquivo de vídeo criado ao VideoView
            Uri uri = Uri.parse(caminhoCompletoArquivo);
            vdvVideo.setVideoURI(uri);
            vdvVideo.start();
        }


    }
}
