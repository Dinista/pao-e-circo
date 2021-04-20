import React, { useCallback, useRef } from "react";
import ConteinerRelatorioUsuarios from "../../components/ConteinerRelatorioUsuarios";
import Header from "../../components/Header";
import RelatorioUsuariosCard from "../../components/RelatorioUsuariosCard";
import Tabs from "../../components/Tabs";

const RelatorioUsuarioCadastrados: React.FC = () => {

    return (
        <>
            <Header />

            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <div style={{
                    width: 1000,
                    border: '1px solid #f0f0f0'
                }}>
                    <h1>Relatório de Propagandas:</h1>
                    <ConteinerRelatorioUsuarios
                    numeroClientes = {876}
                    numeroOnline = {62}
                    />
                    <Tabs disableDefaultWidth>

                        <div label="Dia" >
                        <div style={{ margin: 16 }}>
                        <RelatorioUsuariosCard
                        data = "20/04/2021"
                        dia = "Terça-Feira"
                        nAcessos = {5}
                            
                        />
                        <RelatorioUsuariosCard
                        data = "19/04/2021"
                        dia = "Segunda-Feira"
                        nAcessos = {3}
                            
                        />
                        <RelatorioUsuariosCard
                        data = "18/04/2021"
                        dia = "Domingo"
                        nAcessos = {1}
                            
                        />
                        <RelatorioUsuariosCard
                        data = "17/04/2021"
                        dia = "Sabado"
                        nAcessos = {0}
                            
                        />
                    </div>
                            
                        </div>
                        <div label="Semana">

                        </div>
                        <div label="Mes">

                        </div>
                    </Tabs>
                </div>
            </div>
        </>
    );
};

//styles

export default RelatorioUsuarioCadastrados;