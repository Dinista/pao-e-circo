import AnuncioRepository from "../repositórios/AnuncioRepository";

describe("categoria controller", () => {
  
  it("Deve ser capaz de filtrar anuncios a partir de sua categoria", async () => {
    const anuncioRepository = new AnuncioRepository();

    const anuncio = await anuncioRepository.create({
      titulo: "Celular de Alta duração",
      cliente: "62c79833-0265-4217-9eef-0e40a39b6c7e",
      nomeObjeto: "Celular Tijolão",
      categoria: "eletronico",
      estadoConservacao: "novo",
      foto1: "https://cdn.awsli.com.br/600x450/44/44273/produto/29991116/45431c264a.jpg",
      foto2: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.elo7.com.br%2Fcamiseta-lisa-100-algodao-30-1-amarela%2Fdp%2FE362FE&psig=AOvVaw0hU8krn1A2Ne7GeZmZZpl0&ust=1620214376476000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNiitIX3r_ACFQAAAAAdAAAAABAJ",
      foto3: "https://images.vivara.com.br/Stores/Fotos/DI00003630-3.jpg",
      descricao: "Camiseta amarela.",
      itemDesejado: "Travisseiros",
      valorEstimado: 50,
      destaque: false,
      destaqueExpira : "01/01/2099"
    });

    expect(anuncioRepository.findByCategoria(anuncio.categoria)).toBe("eletronico");
  });

  it("Deve ser capaz de filtrar anuncios a partir de sua categoria", async () => {
    const anuncioRepository = new AnuncioRepository();

    const anuncio = await anuncioRepository.create({
      titulo: "Barra de metal",
      cliente: "62c79833-0265-4217-9eef-0e40a39b6c7e",
      nomeObjeto: "Barra de Aço",
      categoria: "aço",
      estadoConservacao: "novo",
      foto1: "https://cdn.awsli.com.br/600x450/44/44273/produto/29991116/45431c264a.jpg",
      foto2: "https://cdn.awsli.com.br/600x450/44/44273/produto/29991116/45431c264a.jpg",
      foto3: "https://cdn.awsli.com.br/600x450/44/44273/produto/29991116/45431c264a.jpg",
      descricao: " lorem iskoqkp",
      itemDesejado: "camisetas",
      valorEstimado: 1,
      destaque: false,
      destaqueExpira : "01/01/2099"
    });

    expect(anuncioRepository.findByCategoria(anuncio.categoria)).toBe("outros");
  });

  it("Deve ser capaz de filtrar anuncios a partir de sua categoria", async () => {
    const anuncioRepository = new AnuncioRepository();

    const anuncio = await anuncioRepository.create({
      titulo: "Flauta Doce",
      cliente: "62c79833-0265-4217-9eef-0e40a39b6c7e",
      nomeObjeto: "Celular Tijolão",
      categoria: "instrumentoMusical",
      estadoConservacao: "novo",
      foto1: "https://cdn.awsli.com.br/600x450/44/44273/produto/29991116/45431c264a.jpg",
      foto2: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.elo7.com.br%2Fcamiseta-lisa-100-algodao-30-1-amarela%2Fdp%2FE362FE&psig=AOvVaw0hU8krn1A2Ne7GeZmZZpl0&ust=1620214376476000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNiitIX3r_ACFQAAAAAdAAAAABAJ",
      foto3: "https://images.vivara.com.br/Stores/Fotos/DI00003630-3.jpg",
      descricao: "Camiseta amarela.",
      itemDesejado: "Travesseiros",
      valorEstimado: 50,
      destaque: false,
      destaqueExpira : "01/01/2099"
    });

    expect(anuncioRepository.findByCategoria(anuncio.categoria)).toBe("instrumentoMusical");
  });
});