import React, { useCallback, useRef } from "react";
import ConteinerRelatorioAnuncios from "../../components/ConeteinerRelatorioAnuncios";
import Header from "../../components/Header";
import RelatorioAnunciosCard from "../../components/RelatorioAnunciosCard";
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
                    width: 1000,
                    border: '1px solid #f0f0f0'
                }}>
                    <h1>Relatório de Propagandas:</h1>
                    <Tabs disableDefaultWidth>

                        <div label="Hoje" >
                            <ConteinerRelatorioAnuncios
                            acessosAumentado = {872}
                            acessosBusca ={209}
                            acessosTelaPrincipal = {9837}
                            alcanceAumentado ={389}
                            denunciados = {398}
                            numeroAnuncios = {38}
                            rendimento ={789}
                            trocasConcretizadas ={697}
                            />
                        </div>
                        <div label="Esta Semana">
                            <ConteinerRelatorioAnuncios
                                acessosAumentado = {872}
                                acessosBusca ={209}
                                acessosTelaPrincipal = {9837}
                                alcanceAumentado ={389}
                                denunciados = {398}
                                numeroAnuncios = {38}
                                rendimento ={789}
                                trocasConcretizadas ={697}
                            />

                        </div>
                        <div label="Este Mes">
                            <ConteinerRelatorioAnuncios
                                acessosAumentado = {872}
                                acessosBusca ={209}
                                acessosTelaPrincipal = {9837}
                                alcanceAumentado ={389}
                                denunciados = {398}
                                numeroAnuncios = {38}
                                rendimento ={789}
                                trocasConcretizadas ={697}
                            />

                        </div>
                    </Tabs>
                    <h3 style={{
                        display: "flex",
                        justifyContent: "center"
                    }}>Todos os Anúncios:</h3>
                    <div style={{ margin: 16 }}>
                        <RelatorioAnunciosCard
                            anunciante = "Leoncio Jascinto Nascimento"
                            cliques = {96}
                            comprador ="Otnemicsan Otnicsa Oicnoel"
                            idAnuncio = ""
                            imagem = "https://media.istockphoto.com/photos/close-up-of-a-white-pillow-on-white-background-picture-id533989926?b=1&k=6&m=533989926&s=170667a&w=0&h=zBly2cVj7-71FRUF7wr9uu90Z-26ca3UtxGxhrwF4mM="
                            nomeAnuncio = "Travesseiro Confavel Branco"
                            rendimento = {2}
                            trocaAceita = "sim"
                            vizualizacoes = {982}
                        />
                        <RelatorioAnunciosCard
                            anunciante = "Leoncio Jascinto Nascimento"
                            cliques = {96}
                            comprador ="Otnemicsan Otnicsa Oicnoel"
                            idAnuncio = ""
                            imagem = "https://media.istockphoto.com/photos/blue-toy-car-on-an-asphalt-road-picture-id1220834501?b=1&k=6&m=1220834501&s=170667a&w=0&h=KGUMAc3FaUqbxVprzvlbQ0m-Q2XmlqFP9mS-kkkdrek="
                            nomeAnuncio = "Carrinho de Brinquedo"
                            rendimento = {2}
                            trocaAceita = "sim"
                            vizualizacoes = {982}
                        />
                        <RelatorioAnunciosCard
                            anunciante = "Leoncio Jascinto Nascimento"
                            cliques = {96}
                            comprador ="Otnemicsan Otnicsa Oicnoel"
                            idAnuncio = ""
                            imagem = ""
                            nomeAnuncio = "Travesseiro Confavel Branco"
                            rendimento = {2}
                            trocaAceita = "sim"
                            vizualizacoes = {982}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

//styles

export default RelatorioPropagandas;