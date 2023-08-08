import "./movements.style.css";
import { useMove } from "../../../context/MoveContext";
import { useEffect } from "react";

const Movements = () => {
  const { movimientos, MovementsList } = useMove();

  useEffect(() => {
    MovementsList();
  }, []);
  // const ListaMovimientos = movimientos.reverse();
  // console.log(movimientos);
  return (
    <>
      <h2>Movimientos</h2>
      <div className="move_head">
        <div className="fecha">id</div>
        <div className="movimiento">movimiento</div>
        <div className="elemento">elemento</div>
        <div className="elemento-tipo">Tipo de Elemento</div>
        <div className="cantidad">cantidad</div>
        <div className="unidad">unidad</div>
        {/* <div className="responsable">responsable</div> */}
      </div>
      {movimientos &&
        movimientos.map((item) => (
          <div className="move_row" key={item.moveId}>
            {/* <div className="fecha">{item.moveDate.split("T")[0]}</div> */}
            <div className="movimiento">{item.moveId}</div>
            <div className="movimiento">{item.moveType}</div>
            <div className="elemento">{item.moveElement}</div>
            <div className="elemento">{item.elementType}</div>
            <div className="cantidad">{item.moveQuantity}</div>
            <div className="unidad">{item.moveUnit}</div>
            {/* <div className="responsable">{item.moveRequestor}</div> */}
          </div>
        ))}
    </>
  );
};

export { Movements };
