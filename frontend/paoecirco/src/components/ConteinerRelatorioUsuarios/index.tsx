import React, { useCallback, useRef } from "react";

interface DadosPropaganda {
    numeroClientes: number, numeroOnline: number
}

const ConteinerRelatorioUsuarios: React.FC<DadosPropaganda> = ({ numeroClientes, numeroOnline}) => {

    return (
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                width: 1000

            }} >
                <div >
                    <label> Nº de Clientes:</label>
                    <br />{numeroClientes}
                </div>

                <div >
                    <label> Nº Clientes Online:</label>
                    <br />{numeroOnline}
                </div>
            </div>
    );
};

//styles

export default ConteinerRelatorioUsuarios;