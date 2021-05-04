import React, { useCallback, useRef } from "react";
import ConteinerRelatorioPropagandas from "../../components/ConteinerRelatorioPropagandas";
import Header from "../../components/Header";
import RelatorioPropagandaCard from "../../components/RelatorioPropagandaCard";
import Tabs from "../../components/Tabs";

const RelatorioPropagandas: React.FC = () => {

    return (
        <>
            <Header />

            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <div style={{
                    width: 800,
                    border: '1px solid #f0f0f0'
                }}>
                    <h1>Relatório de Propagandas:</h1>
                    <Tabs disableDefaultWidth>

                        <div label="Hoje" >
                            <ConteinerRelatorioPropagandas
                                cliques={10}
                                rendimento={10}
                                vizu={400}
                            />
                        </div>
                        <div label="Esta Semana">
                            <ConteinerRelatorioPropagandas
                                cliques={20}
                                rendimento={50}
                                vizu={800}
                            />

                        </div>
                        <div label="Este Mes">
                            <ConteinerRelatorioPropagandas
                                cliques={50}
                                rendimento={100}
                                vizu={1000}
                            />

                        </div>
                    </Tabs>
                    <h3 style={{
                        display: "flex",
                        justifyContent: "center"
                    }}>Todas as Propagandas:</h3>
                    <div style={{ margin: 16 }}>
                        <RelatorioPropagandaCard
                            cliques={762}
                            contratante="Dell"
                            dataExpiracao="12/12/2021"
                            idPropaganda=""
                            imagem="https://cdn.pixabay.com/photo/2018/08/12/19/38/notbook-3601552_1280.png"
                            nomePropaganda="Familia Inspiron"
                            rendimento={500}
                            vizualizacoes={10000}
                        />
                        <RelatorioPropagandaCard
                            cliques={62}
                            contratante="Café Rock"
                            dataExpiracao="12/12/2021"
                            idPropaganda=""
                            imagem="https://cdn.pixabay.com/photo/2019/01/02/11/13/coffee-break-3908589_1280.jpg"
                            nomePropaganda="Café Rock"
                            rendimento={87}
                            vizualizacoes={962}
                        />
                        <RelatorioPropagandaCard
                            cliques={100}
                            contratante="Josh Hich Ruan"
                            dataExpiracao="22/09/2021"
                            idPropaganda=""
                            imagem="https://opiniaobomvaleapena.com.br/imagens/moedor-de-carne-fun-kitchen-branco-com-anos-de-garantia.png"
                            nomePropaganda="Triturador de Carne"
                            rendimento={30}
                            vizualizacoes={863}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

//styles

export default RelatorioPropagandas;