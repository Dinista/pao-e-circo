import React, { useCallback, useRef } from "react";

interface DadosPropaganda {
    cliques: number, vizu: number, rendimento: number
}

const ConteinerRelatorioPropagandas: React.FC<DadosPropaganda> = ({ cliques, vizu, rendimento }) => {

    return (
            <div style = {{
                display:"flex",
                justifyContent:"space-around",
                width:400
                
            }} >
                <div >
                    <label> Vizualizações:</label>
                    <br />{vizu}
                </div>
                <div >
                    <label> Cliques:</label>
                    <br />{cliques}
                </div>
                <div >
                    <label> Rendimento:</label>
                    <br />
                    <label> R$ {rendimento}</label>
                </div>
            </div>
    );
};

//styles

export default ConteinerRelatorioPropagandas;