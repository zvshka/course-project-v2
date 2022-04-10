import {Stage} from "@components/Content/Stage";
import {closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {Draggable} from "@components/Layout/Draggable";

const Stages = ({stages, stagesHandlers, draggable}) => {

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event) {
        const {active, over} = event;
        const oldIndex = stages.indexOf(stages.find(item => item.id === active.id));
        const newIndex = stages.indexOf(stages.find(item => item.id === over.id));
        if (active.id !== over.id) {
            stagesHandlers.reorder({from: oldIndex, to: newIndex})
        }
    }

    return <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
    >
        <SortableContext
            items={stages}
            strategy={verticalListSortingStrategy}
        >
            {stages.map((stage) => {
                if (draggable) {
                    return <Draggable key={stage.id} id={stage.id}>
                        <Stage stage={stage} draggable={draggable}/>
                    </Draggable>
                } else {
                    return <Stage key={stage.id} stage={stage} draggable={draggable}/>
                }
            })}
        </SortableContext>
    </DndContext>
}

export default Stages