import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {Box} from "@mantine/core";

export const Draggable = ({id, children}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return <Box
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
    >
        {children}
    </Box>
}