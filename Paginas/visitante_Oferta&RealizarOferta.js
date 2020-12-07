function alertaDenunciaRealizada() {
    alert("Denuncia realizada com sucesso!");
}

function alertaOfertaRealizada() {
    alert("Oferta realizada com sucesso!");
}

function alertaComentarioRealizado() {
    alert("Comentário realizado com sucesso!");
}

function alteraTextoDeixarSeguir(){
    if(seguindo){
        $("#escritaBotaoSeguir").text("Deixar de seguir");
    }
}

function cliqueBotaoSeguir(){
    seguindo = !seguindo;
    verificaSeguindo();
}

function verificaSeguindo(){
    if(seguindo){
        nomeBotaoSeguir = "Seguindo";
    } else {
        nomeBotaoSeguir = "Seguir anúncio";
    }
    alteraEscritaBotao();
}

function alteraEscritaBotao(){
    $("#escritaBotaoSeguir").text(nomeBotaoSeguir);
}

function deixarDeSeguir(){
    alert("tchau");
}

var nomeBotaoSeguir;
var seguindo = Boolean(false);
verificaSeguindo();