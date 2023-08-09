import "./header.style.css";
const HeaderBG = () => {
  return (
    <>
      <div className="encabezado">
        <div className="h_derecha">
          <div className="logo">
            <img src="/aventura.png" alt="aventura logo" className="logo-img" />
          </div>
        </div>
        <div className="h_izquierda">
          <div className="rotulo">
            <p className="nominal">A. ALVES FARIAS FILHO LTDA</p>
            <p>CNPJ: 29.710.173/0001-85</p>
            <p>IE: 05.435.621-0</p>
          </div>
        </div>
      </div>
      <hr className="cabeza" />
    </>
  );
};

export default HeaderBG;
