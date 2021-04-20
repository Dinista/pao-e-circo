import React, { useCallback, useRef } from "react";

interface DadosAnuncio {
    dia:string, data:string, nAcessos:number
}

const RelatorioPropagandaCard: React.FC<DadosAnuncio> = ({ dia, data, nAcessos }) => {

    return (
        <div className="container p-3 my-3 border bg-light-gray" id="anuncio1">
            <div style={{
                display: 'flex',
            }}>
                <div className="media-body">
                    <h3 className="mt-0"><i className="fas fa-box"></i> {dia} <b></b></h3>
                    <form className="form-inline">
                        <div className="form-group mb-2">
                            <i className="fas fa-bullhorn"></i> <b> data: </b> {data} </div>
                        <div className="form-group mx-sm-3 mb-2">
                            <i className="fas fa-tag"></i> <b>Nº Acessos: </b> {nAcessos}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

//styles

export default RelatorioPropagandaCard;