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

export const ToolsReqPrint = () => {
  const navigate = useNavigate();
  const { solicitudes, Solicitudes, solicitud } = useRequisition();

  useEffect(() => {
    Solicitudes();
  }, []);

  const datos: Requisicion = solicitud ? solicitud : solicitudes[0];
  const fecha = new Date(datos.requestDate);
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1;
  const ano = fecha.getFullYear();
  const movida = datos.movements;

  console.log(solicitudes);

  return (
    <>
      <div className="page">
        <HeaderBG />
        <div className="principal">
          <div className="titulo">
            <h3>REQUISIÇÃO DE FERRAMENTAS</h3>
          </div>
          <div className="info">
            <div className="info-item">
              <div className="data">
                <div className="titulo_data">Data:</div>
                <div className="respuesta_data">
                  {mes > 9
                    ? `${dia} / ${mes} / ${ano}`
                    : `${dia} / 0${mes} / ${ano}`}
                </div>
              </div>
            </div>
            <div className="info-item">
              <div className="data">
                <div className="titulo_data">Nº:</div>
                <div className="respuesta_data" id="requestId">
                  {datos.requestId}
                </div>
              </div>
            </div>
            <div className="info-item">
              <div className="data">
                <div className="titulo_data">O. S.:</div>
                <div className="respuesta_data">{datos.requestTarget}</div>
              </div>
            </div>
            <div className="info-item">
              <div className="data">
                <div className="titulo_data">Solicitante:</div>
                <div className="respuesta_data">{datos.requestor}</div>
              </div>
            </div>
          </div>
          <div className="tabla">
            <div className="diagrama">
              <div className="table_head">
                <div className="seal">Lacre</div>
                <div className="tool">Descrição da Ferramenta</div>
              </div>
              {movida &&
                movida.map((item, index) => (
                  <div className="table_row" key={index}>
                    <div className="seal">{item.moveQuantity}</div>
                    <div className="tool">{item.moveElement}</div>
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
        <Button type="button" onClick={() => navigate(-1)}>
          Voltar
        </Button>
        <Button type="button" onClick={() => print()}>
          Imprimir
        </Button>
      </div>
    </>
  );
};
