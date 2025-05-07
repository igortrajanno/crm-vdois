
import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const nomesEtapas = {
  "✅ Ganho": "Ganho",
  "❌ Perdido": "Perdido"
};

export default function KanbanBoard({ leads, setLeads, onSelectLead, etapas }) {
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === draggableId ? { ...lead, etapa: destination.droppableId } : lead
      )
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto">
        {Array.isArray(etapas) && etapas.length > 0 ? (
          etapas.map((etapa) => (
            <Droppable key={etapa} droppableId={etapa}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`min-w-[280px] p-4 rounded shadow border ${etapa.includes("Ganho")
                    ? "bg-green-50 border-green-500"
                    : etapa.includes("Perdido")
                    ? "bg-red-50 border-red-500"
                    : "bg-gray-100"}`}
                >
                  <h3 className="text-lg font-semibold mb-2">{nomesEtapas[etapa] || etapa}</h3>
                  {Array.isArray(leads) &&
                    leads
                      .filter((l) => l.etapa === etapa)
                      .map((lead, index) => (
                        <Draggable key={lead.id} draggableId={lead.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-2 p-2 bg-white rounded shadow cursor-pointer"
                              onClick={() => onSelectLead(lead)}
                            >
                              <div className="text-sm font-medium">{lead.nome}</div>
                              <div className="text-xs text-gray-600">{lead.cargo}</div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))
        ) : (
          <div className="text-gray-500">Nenhuma etapa configurada no funil selecionado.</div>
        )}
      </div>
    </DragDropContext>
  );
}
