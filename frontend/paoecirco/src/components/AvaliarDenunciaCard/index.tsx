import React, { useCallback, useRef } from "react";

interface DadosDenuncia {
  idAnuncio: string, imagem: string, nomeAnuncio: string, descricao: string, anunciante: string,
  denunciante: string, categoria: string, numDenuncias: number
}

const AvaliarDenunciaCard: React.FC<DadosDenuncia> = ({ idAnuncio, imagem, nomeAnuncio, descricao, anunciante,
  denunciante, categoria, numDenuncias }) => {

  return (
    <div className="container p-3 my-3 border bg-light-gray" id="anuncio1">
      <div style={{
        display: 'flex',
      }}>
        <img className="align-self-center mr-3" src={imagem} width={400} style={{
        marginRight:16
      }}alt="Imagem de exemplo genérica" />
        <div className="media-body">
          <h5 className="mt-0"><i className="fas fa-box"></i> <b>Camiseta Amarela Desenho</b></h5>
          <form className="form-inline">
            <div className="form-group mb-2">
              <i className="fas fa-bullhorn"></i> <b>Numero de Denuncias: </b> 30 </div>
            <div className="form-group mx-sm-3 mb-2">
              <i className="fas fa-tag"></i> <b>Categoria da Denuncia: </b> Conteudo Improprio.
                            </div>
          </form>
          <form className="form-inline">
            <div className="form-group mb-2">
              <i className="fas fa-user"></i> <b>Anunciante: </b> Jack Roberto Silva
                            </div>
            <div className="form-group mx-sm-3 mb-2">
              <i className="fas fa-user"></i> <b> Denunciante: </b> Rack Jobs Regis
                            </div>
          </form>
          <h5 className="mt-0"><i className="fas fa-exclamation-triangle"></i> <b>Descrição da Denuncia:</b></h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at euismod ante.
          Vestibulum ullamcorper aliquet lacus vel consectetur. Proin accumsan accumsan elit sed
                            auctor.</p>
          <p className="mb-0" />
          <div className="form-group col-md-6">
            <a href="admin-Oferta&RealizarOferta.html"><button type="button" className="btn btn-primary">Visualizar</button></a>
          </div>
        </div>
      </div>
    </div>
  );
};

//styles

export default AvaliarDenunciaCard;