import React from 'react';
import {Draggable} from 'react-beautiful-dnd';

function TaskCard(props) {

    const getItemStyle = (isDragging, draggableStyle) => ({
        background: isDragging ? "#C0C0C0" : "",
        ...draggableStyle
    });
    
    return (
        <Draggable draggableId={props.task.id.toString()} index={props.index}>
        {
            (provided, snapshot)  => (
            <div className="card"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style)}>
                <div className="card-body">{props.task.name}</div>
    </div>
    )}
    </Draggable>
);
}

export default TaskCard;
