import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {Stage} from "@components/Content/Stage";

const Stages = ({stages, stagesHandlers, draggable}) => {
    return <DragDropContext
        onDragEnd={({destination, source}) => {
            stagesHandlers.reorder({from: source.index, to: destination.index})
        }
        }>
        <Droppable droppableId="dnd-list" direction="vertical">
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    {stages.map((stage, index) => (
                        <Stage index={index} key={stage.id} stage={stage} draggable={draggable}/>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </DragDropContext>
}

export default Stages