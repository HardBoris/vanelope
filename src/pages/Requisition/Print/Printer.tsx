import FooterBG from "../../../components/Footer";
import HeaderBG from "../../../components/Header";
import "./Print.style.css";
import {
  Requisicion,
  useRequisition,
} from "../../../context/RequisitionContext";
import { useEffect } from "react";
import { Button } from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import { Movement } from "../../../context/MoveContext";

interface PrinterProps {
  requested: Requisicion;
  movements: Movement[] | undefined;
  handlePrint: () => void;
  isPrintable: boolean;
}

export const ReqPrinter = ({
  requested,
  movements,
  handlePrint,
  isPrintable,
}: PrinterProps) => {
  const { Solicitudes, Fechador } = useRequisition();

  useEffect(() => {
    Solicitudes();
  }, []);

  const fecha = Fechador(requested.requestDate);

  return (
    <>
      <div className="page">
        <HeaderBG />
        <div className="principal">
          <div className="titulo">
            <h3>REQUISIÇÃO DE MATERIAIS</h3>
          </div>
          <div className="info">
            <div className="info-item">
              <div className="data">
                <div className="titulo_data">Data:</div>
                <div className="respuesta_data">{fecha}</div>
              </div>
            </div>
            <div className="info-item">
              <div className="data">
                <div className="titulo_data">Nº:</div>
                <div className="respuesta_data" id="requestId">
                  {requested.requestId}
                </div>
              </div>
            </div>
            <div className="info-item">
              <div className="data">
                <div className="titulo_data">O. S.:</div>
                <div className="respuesta_data">{requested.service.order}</div>
              </div>
            </div>
            <div className="info-item">
              <div className="data">
                <div className="titulo_data">Solicitante:</div>
                <div className="respuesta_data">{requested.requestor.name}</div>
              </div>
            </div>
          </div>
          <div className="tabla">
            <div className="diagrama">
              <div className="table_head">
                <div className="qtd">Qtd</div>
                <div className="units">Unidade</div>
                <div className="feedstock">Materia Prima</div>
              </div>
              {movements &&
                movements.map((item, index) => (
                  <div className="table_row" key={index}>
                    <div className="qtd">{item.moveQuantity}</div>
                    <div className="units">{item.moveUnit}</div>
                    <div className="feedstock">{item.moveElement}</div>
                  </div>
                ))}
            </div>
          </div>
          <div className="firmas">
            <div className="assinar">Recibido por:</div>
            <div className="assinar">Aprovado por:</div>
            <div className="assinar">Entregue por:</div>
          </div>
        </div>
        <FooterBG />
      </div>
      <div className="noprint">
        <div className="individual-noprint">
          <Button type="button" onClick={() => handlePrint()}>
            Voltar
          </Button>
        </div>
        <div
          className={
            isPrintable ? "individual-noprint" : "individual-noprint oculto"
          }
        >
          <Button type="button" onClick={() => window.print()}>
            Imprimir
          </Button>
        </div>
      </div>
    </>
  );
};
