import React, { useCallback, useRef } from "react";

interface DadosAnuncio {
    idAnuncio: string, nomeAnuncio: string, imagem: string, trocaAceita: string, anunciante: string, rendimento: number, comprador: string,
    vizualizacoes: number, cliques: number
}

const RelatorioPropagandaCard: React.FC<DadosAnuncio> = ({ idAnuncio, nomeAnuncio, imagem, trocaAceita, anunciante
    , rendimento, comprador, vizualizacoes, cliques }) => {

    return (
        <div className="container p-3 my-3 border bg-light-gray" id="anuncio1">
            <div style={{
                display: 'flex',
            }}>
                <img className="align-self-center mr-3" src={imagem} width={300} height={200} style={{
                    marginRight: 16,
                    marginLeft: -200,
                    marginTop: 4
                }} alt="Imagem de exemplo genérica" />
                <div className="media-body">
                    <h5 className="mt-0"><i className="fas fa-box"></i> {nomeAnuncio} <b></b></h5>
                    <form className="form-inline">
                        <div className="form-group mb-2">
                            <i className="fas fa-bullhorn"></i> <b> Finalizado: </b> {trocaAceita} </div>
                        <div className="form-group mx-sm-3 mb-2">
                            <i className="fas fa-tag"></i> <b>Anunciante: </b> {anunciante}
                        </div>
                        <div className="form-group mx-sm-3 mb-2">
                            <i className="fas fa-tag"></i> <b>Comprador: </b> {comprador}
                        </div>
                    </form>
                    <form className="form-inline">
                        <div className="form-group mb-2">
                            <i className="fas fa-user"></i> <b>Cliques: </b> {cliques}
                        </div>
                        <div className="form-group mx-sm-3 mb-2">
                            <i className="fas fa-user"></i> <b> Vizualizações: </b> {vizualizacoes}
                            </div>
                        <div className="form-group mx-sm-3 mb-2">
                            <i className="fas fa-user"></i> <b> Rendimento: </b> R${rendimento}
                            </div>
                    </form>
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

export default RelatorioPropagandaCard;