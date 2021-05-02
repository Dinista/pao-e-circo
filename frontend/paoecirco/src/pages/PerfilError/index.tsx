import Header from "../../components/Header";

const PerfilError: React.FC = () => {
  return (
    <>
      <Header />
      <h1>Essa página não existe (404)</h1>
      <div>
        http://localhost:3000/perfil/<b>cliente.id</b></div>
    </>
  );
};

export default PerfilError;