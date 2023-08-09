import "./style.css";
import { useNavigate } from "react-router-dom";
import {
  Requisicion,
  useRequisition,
} from "../../../../context/RequisitionContext";
import HeaderBG from "../../../../components/Header";
import FooterBG from "../../../../components/Footer";
import { Button } from "../../../../components/Button";
import { ToolEntryMovement } from "..";

interface ToolReqProps {
  request: Requisicion;
  movida: ToolEntryMovement[];
}

export const ToolReqPrint = ({ request, movida }: ToolReqProps) => {
  const navigate = useNavigate();
  const { Fechador } = useRequisition();

  const fecha = Fechador(request.requestDate);

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
                <div className="respuesta_data">{fecha}</div>
              </div>
            </div>
            <div className="info-item">
              <div className="data">
                <div className="titulo_data">Nº:</div>
                <div className="respuesta_data" id="requestId">
                  {request.requestId}
                </div>
              </div>
            </div>
            <div className="info-item">
              <div className="data">
                <div className="titulo_data">O. S.:</div>
                <div className="respuesta_data">{request.service.order}</div>
              </div>
            </div>
            <div className="info-item">
              <div className="data">
                <div className="titulo_data">Solicitante:</div>
                <div className="respuesta_data">{request.requestor.name}</div>
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
                    <div className="seal">{item.elementCode}</div>
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
        <Button type="button" onClick={() => window.print()}>
          Imprimir
        </Button>
      </div>
    </>
  );
};
