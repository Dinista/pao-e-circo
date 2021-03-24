import PropagandaRepository from "../repositórios/PropagandaRepository";

describe("Propaganda controller", () => {
  it("Deve ser capaz de criar uma propaganda", async () => {
    const propagandaRepository = new PropagandaRepository();

    const User = await propagandaRepository.create({
      imageName: "fotinhazika",
      dataExpiracao: "12/05/2023",
      empresaContratante: "Eu memo pq sou patrão",
    });
    expect(User).toHaveProperty("id");
  });

  it("Não deve ser capaz de criar duas propagandas com a mesma imagem", async () => {
    const propagandaRepository = new PropagandaRepository();

    await propagandaRepository.create({
      imageName: "fotinhazika",
      dataExpiracao: "12/05/2023",
      empresaContratante: "Eu memo pq sou patrão",
    });

    expect(
      propagandaRepository.create({
        imageName: "fotinhazika",
        dataExpiracao: "12/05/2023",
        empresaContratante: "Eu memo pq sou patrão",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("Deve ser capaz de encontrar todas as propagandas", async () => {
    const propagandaRepository = new PropagandaRepository();

    await propagandaRepository.create({
      id: "1",
      imageName: "fotinhazika",
      dataExpiracao: "12/05/2023",
      empresaContratante: "Eu memo pq sou patrão",
    });

    await propagandaRepository.create({
      id: "2",
      imageName: "fotinhazika2",
      dataExpiracao: "12/05/2023",
      empresaContratante: "Eu memo pq sou patrão",
    });

    await propagandaRepository.create({
      id: "3",
      imageName: "fotinhazika3",
      dataExpiracao: "12/05/2023",
      empresaContratante: "Eu memo pq sou patrão",
    });

    expect(propagandaRepository.findAll()).toEqual([
      {
        dataExpiracao: "12/05/2023",
        empresaContratante: "Eu memo pq sou patrão",
        id: "1",
        imageName: "fotinhazika",
      },
      {
        dataExpiracao: "12/05/2023",
        empresaContratante: "Eu memo pq sou patrão",
        id: "2",
        imageName: "fotinhazika2",
      },
      {
        dataExpiracao: "12/05/2023",
        empresaContratante: "Eu memo pq sou patrão",
        id: "3",
        imageName: "fotinhazika3",
      },
    ]);
  });

  it("Deve atualizar a empresa da propaganda selecionada", async () => {
    const propagandaRepository = new PropagandaRepository();
    const propaganda = await propagandaRepository.create({
      id: "1",
      imageName: "fotinhazika",
      dataExpiracao: "12/05/2023",
      empresaContratante: "Eu memo pq sou patrão",
    });

    expect(
      propagandaRepository.updateEmpresa(
        propaganda.id,
        "tchurusbengo tchurusbago"
      )
    ).toBe("tchurusbengo tchurusbago");
  });

  it("Deve atualizar a data da propaganda selecionada", async () => {
    const propagandaRepository = new PropagandaRepository();
    const propaganda = await propagandaRepository.create({
      id: "1",
      imageName: "fotinhazika",
      dataExpiracao: "12/05/2023",
      empresaContratante: "Eu memo pq sou patrão",
    });

    expect(propagandaRepository.updateData(propaganda.id, "14/05/2022")).toBe(
      "14/05/2022"
    );
  });

  it("Deve atualizar a imagem da propaganda selecionada", async () => {
    const propagandaRepository = new PropagandaRepository();
    const propaganda = await propagandaRepository.create({
      id: "1",
      imageName: "fotinhazika",
      dataExpiracao: "12/05/2023",
      empresaContratante: "Eu memo pq sou patrão",
    });

    expect(
      propagandaRepository.updateImagem(propaganda.id, "pelepelado.jpeg")
    ).toBe("pelepelado.jpeg");
  });
});
