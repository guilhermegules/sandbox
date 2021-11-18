// RETORNAR CIDADE E BAIRRO
window.RTCPeerConnection = window.RTCPeerConnection ||
        window.mozRTCPeerConnection ||
        window.webkitRTCPeerConnection;

function getMyIP(cb) {
    // Calls the cb function with the local host IP address found 
    // using RTC functions. We cannot just return the IP address 
    // because the RTC functions are asynchronous.

    var pc = new RTCPeerConnection({iceServers: []}),
            noop = () => {
    };

    pc.onicecandidate = ice =>
        cb = cb((ice = ice && ice.candidate && ice.candidate.candidate)
                ? ice.match(/(\d{1,3}(\.\d{1,3}){3}|[a-f\d]{1,4}(:[a-f\d]{1,4}){7})/)[1]
                : 'unavailable') || noop;
    pc.createDataChannel("");
    pc.createOffer(pc.setLocalDescription.bind(pc), noop);
}
;


 

        url = "http://localhost/cogni/localizacao.php";
    








function carregaCidades() {


    var uf = $('#estado_id').val();

    addOptInSelect('', 'cidade_id');

    if (uf != '0')
    {

        //LoadingX();



        $.post(url, {estado: uf},
                function (data)
                {
//							LoadedX();

                    if (data.result == 'OK')
                    {
                        addOptInSelect(data.dados, 'cidade_id');
                    } else
                    {
                        alert(data.msg);
                    }
                },
                "json")

                .fail(function () {
                    alert("Erro!");
                });
    }
}

function carregaBairros() {


    var cidade = $('#cidade_id').val();



    addOptInSelect('', 'bairro_id');

    if (cidade != '0')
    {
         var   url =  "http://localhost/cogni/localizacao.php";


        $.post(url,
                {cidade: cidade, ms: new Date().getTime()},
                function (data)
                {

//							LoadedX();

                    if (data.result == 'OK')
                    {
                        addOptInSelect(data.dados, 'bairro_id');
                    } else
                    {
                        //deu erro
                        alert(data.msg);
                    }
                },
                "json")
                .fail(function () {
                    alert("Erro!");
                });
    }
}

function addOptInSelect(arrOpt, nameElem)
{
    //utiliza separadores '~#' e '|#'

    //limpa o select
    $('#' + nameElem).find('option').remove().end();

    //adiciona opcoes
    if (arrOpt != '')
    {
        var opcoes = arrOpt.split('~#');
        var arr2 = new Array();
        var i;

        for (i = 0; i < opcoes.length; i++)
        {
            arr2 = opcoes[i].split('|#');
            $('#' + nameElem).append($('<option />', {value: arr2[0], text: arr2[1]}));
        }
    }
}


function LoadingX()
{
    document.getElementById('divLoadingX_bg').style.display = 'block';
}

function LoadedX()
{
    document.getElementById('divLoadingX_bg').style.display = 'none';
}

/*
 // FUNCOES AUXILIARES
 
 function validaNumeroSimples(num, maiorZero)
 {
 if (!isNaN(num))
 {
 if (maiorZero == true)
 {
 if (num > 0)
 {
 return true;
 }
 else
 {
 return false;
 }
 }
 else
 {
 return true;
 }
 }
 else
 {
 return false;
 }
 }
 
 function maskInteger(field,event)
 {
 var ns = ((document.layers || document.getElementById) && (!document.all));
 var ie = document.all;
 var keySet = '0123456789';
 var actionSet = '0,8,13';
 var keyCode = (ie) ? window.event.keyCode : event.which;
 var key = String.fromCharCode(keyCode);
 if ((keySet.indexOf(key) == -1) && (actionSet.indexOf(keyCode) == -1) && (event.ctrlKey == false))
 {
 return false;
 }
 else
 {
 return true;
 }
 }
 */
