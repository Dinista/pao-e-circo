import React, { useCallback, useRef } from "react";

interface DadosPropaganda {
    numeroAnuncios: number, denunciados: number, trocasConcretizadas: number, alcanceAumentado: number,
    acessosAumentado: number, acessosTelaPrincipal: number, acessosBusca: number, rendimento: number
}

const ConteinerRelatorioAnuncios: React.FC<DadosPropaganda> = ({ numeroAnuncios, denunciados, trocasConcretizadas,
    alcanceAumentado, acessosTelaPrincipal, acessosAumentado, acessosBusca, rendimento }) => {

    return (
        <div>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                width: 1000

            }} >
                <div >
                    <label> Nº de Anuncios:</label>
                    <br />{numeroAnuncios}
                </div>

                <div >
                    <label> Nº trocas concretizadas:</label>
                    <br />{trocasConcretizadas}
                </div>
                <div >
                    <label> Denunciados:</label>
                    <br />
                    <label> {denunciados}</label>
                </div>
                <div >
                    <label> Nº com alcance aumentado:</label>
                    <br />
                    <label> {alcanceAumentado}</label>
                </div>

            </div>
            <br />
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                width: 1000

            }} >
                <div >
                    <label> Nº Acessos com alcance aumentado:</label>
                    <br />
                    <label> {acessosAumentado}</label>

                </div>
                <div >
                    <label> Rendimento Total:</label>
                    <br />
                    <label> {rendimento}</label>
                </div>
                <div >
                    <label> Nº de acessos na tela principal:</label>
                    <br />
                    <label>  {acessosTelaPrincipal}</label>
                </div>
                <div >
                    <label> Nº acessos pela busca:</label>
                    <br />
                    <label>  {acessosBusca}</label>
                </div>
            </div>
        </div>
    );
};

//styles

export default ConteinerRelatorioAnuncios;