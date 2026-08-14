package com.example.rodrigo.testecameramicrofone;

import android.content.Intent;
import android.database.Cursor;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.media.MediaRecorder;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;
import android.support.v4.content.FileProvider;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.channels.FileChannel;
import java.nio.file.Files;
import java.text.SimpleDateFormat;
import java.util.Date;

public class MicrofoneActivity extends AppCompatActivity {
    MediaPlayer mp;
    String caminhoCompletoArquivo;
//android.intent.extra.quickCapture
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_microfone);
    }

    //Gera um caminho/nome_arquivo.extensao para darmos à foto que deverá ser salva após uso da câmera
    private String getNomeArquivo() throws IOException {
        //Cria um diretório com caminho do diretório raiz do telefone no Linux concatenado com o caminho que queremos criar
        File diretorio = new File(Environment.getExternalStorageDirectory() + File.separator + "DCIM" + File.separator + "QIAPP");
        //Força a criação do diretório informado acima
        diretorio.mkdirs();
        //Pega o momento atual e cria uma string com informacoes de data e hora
        String timeStamp = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
        //Criamos um nome para o arquivo concatenando um prefixo que queremos com a String de datahora e extensão jpg
        String nomeFoto = "AUD_" + timeStamp + ".mp3";
        //Criar um caminho completo com o diretório criado na primeira linha concatenado com o nome do nosso arquivo
        return diretorio + File.separator + nomeFoto;
    }

    //Método associado ao botão que dispara a abertura da câmera
    public void chamarMicrofone(View v){
        //Cria a intent que chama a câmera
        Intent cameraIntent = new Intent(MediaStore.Audio.Media.RECORD_SOUND_ACTION);
        cameraIntent.putExtra( MediaStore.EXTRA_FINISH_ON_COMPLETION, true);

        ///Diferente dos anteriores, não criamos um uri passando por parâmetro da intent para dizer qual o nome do
        //arquivo que salvaremos com o conteúdo do resultado da captura. Ao usar captura de áudio, esse arquivo é
        //automaticamente criado no diretório do app padrão de gravação. Mesmo assim mandamos gerar o nome do arquivo
        //para que após o audio ser capturado e salvo na pasta padrão, realizarmos uma cópia do mesmo para a pasta
        //que nós queremos
        try {
            caminhoCompletoArquivo = getNomeArquivo();
            startActivityForResult(cameraIntent, 1);
        } catch (Exception ex) {
            Toast.makeText(this,"Não é possível executar o recurso!\n"+ex.toString(), Toast.LENGTH_SHORT).show();
            return;
        }
    }

    //Método auxiliar que recebe uma URI e através dela resolve e devolve o caminho completo do arquivo
    private String getCaminhoPelaUri(Uri uri) {
        Cursor cursor = getContentResolver()
                .query(uri, null, null, null, null);
        cursor.moveToFirst();
        int index = cursor.getColumnIndex(MediaStore.Audio.AudioColumns.DATA);
        return cursor.getString(index);
    }

    //Método chamado quando a intent for encerrada (ou seja, a captura de audio pela intent for fechada)
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        //Testa se a intent foi até o final (ou seja, captura de audio foi usada e arquivo foi salvo).
        //Pegamos o aqrquivo original criado (retorna em "data" pela Intent, copiamos o mesmo para
        //a pasta que queremos com o nome geado e excluímos o original para evitar replicação. Após,
        //carregamos o arquivo já copiado em um MediaPlayer para reproduzirmos o mesmo
        if (requestCode == 1 && resultCode == RESULT_OK){
            Uri uri = data.getData();
            try {
                //Chama o método que resolve o caminho completo através da uri devolvida em data
                String filePath = getCaminhoPelaUri(uri);
                //Criamos um InputStream para representar o arquivo original e um OutputStream para
                //representar o arquivo copiado. Após, copiamos bit a bit o primeiro para o segundo.
                InputStream original = new FileInputStream(filePath);
                OutputStream copia = new FileOutputStream(caminhoCompletoArquivo);
                byte[] buf = new byte[1024];
                int len;
                while ((len = original.read(buf)) > 0) {
                    copia.write(buf, 0, len);
                }
                original.close();
                copia.close();
                //Deleta o arquivo original após o mesmo já ter sido copiado
                getContentResolver().delete(uri, null, null);
                (new File(filePath)).delete();
                //Carregar o arquivo copiado em um MediaPlayer e executa
                mp = new MediaPlayer();
                mp.setDataSource(caminhoCompletoArquivo);
                mp.prepare();
                mp.start();

            } catch (IOException e) {
                throw new RuntimeException(e);
            }

        }
    }



}
