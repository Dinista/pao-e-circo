import AnuncioRepository from "../repositórios/AnuncioRepository";

describe("Anuncio controller", () => {
  it("Deve ser capaz de criar um anúncio", async () => {
    const anuncioRepository = new AnuncioRepository();

    const Anuncio = await anuncioRepository.create({
      titulo: "carteira marrom linda",
      cliente: "62c79833-0265-4217-9eef-0e40a39b6c7e",
      nomeObjeto: "carteira",
      categoria: "vestuario",
      estadoConservacao: "usado",
      foto1: "https://images.vivara.com.br/Stores/Fotos/DI00003630-1.jpg",
      foto2: "https://images.vivara.com.br/Stores/Fotos/DI00003630-2.jpg",
      foto3: "https://images.vivara.com.br/Stores/Fotos/DI00003630-3.jpg",
      descricao: "Carteira boa, discreta e bonita.",
      itemDesejado: "Relógio suíço",
      valorEstimado: 300,
      destaque: false,
      destaqueExpira : "01/01/2099"
    });
    expect(Anuncio).toHaveProperty("id");
  });

  it("Deve ser capaz de encontrar um objeto a partir do nome do objeto", async () => {
    const anuncioRepository = new AnuncioRepository();

    const anuncio = await anuncioRepository.create({
      titulo: "carteira marrom linda",
      cliente: "62c79833-0265-4217-9eef-0e40a39b6c7e",
      nomeObjeto: "carteira",
      categoria: "vestuario",
      estadoConservacao: "usado",
      foto1: "https://images.vivara.com.br/Stores/Fotos/DI00003630-1.jpg",
      foto2: "https://images.vivara.com.br/Stores/Fotos/DI00003630-2.jpg",
      foto3: "https://images.vivara.com.br/Stores/Fotos/DI00003630-3.jpg",
      descricao: "Carteira boa, discreta e bonita.",
      itemDesejado: "Relógio suíço",
      valorEstimado: 300,
      destaque: false,
      destaqueExpira : "01/01/2099"
    });

    expect(anuncioRepository.findByObject(anuncio.nomeObjeto)).toBe("carteira");
  });

  it("Deve ser capaz de encontrar objetos a partir de sua categoria", async () => {
    const anuncioRepository = new AnuncioRepository();

    const anuncio = await anuncioRepository.create({
      titulo: "carteira marrom linda",
      cliente: "62c79833-0265-4217-9eef-0e40a39b6c7e",
      nomeObjeto: "carteira",
      categoria: "vestuario",
      estadoConservacao: "usado",
      foto1: "https://images.vivara.com.br/Stores/Fotos/DI00003630-1.jpg",
      foto2: "https://images.vivara.com.br/Stores/Fotos/DI00003630-2.jpg",
      foto3: "https://images.vivara.com.br/Stores/Fotos/DI00003630-3.jpg",
      descricao: "Carteira boa, discreta e bonita.",
      itemDesejado: "Relógio suíço",
      valorEstimado: 300,
      destaque: false,
      destaqueExpira : "01/01/2099"
    });

    expect(anuncioRepository.findByObject(anuncio.nomeObjeto)).toBe("carteira");
  });
});