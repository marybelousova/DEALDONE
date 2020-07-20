import React from 'react';
import {Draggable} from 'react-beautiful-dnd';

function TaskCard(props) {

    const getItemStyle = (isDragging, draggableStyle) => ({
        background: isDragging ? "lightgrey" : "",
        ...draggableStyle
    });
    
    return (
        <Draggable draggableId={props.task.id.toString()} index={props.index}>
        {
            (provided, snapshot)  => (
            <div className="card shadow bg-white rounded mb-2"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
        )}
        > 
            <div className="card-body">
                <span className="card-text">          
                <div className="card-header">{props.task.name}</div>
                </span>
            </div>
    </div>
    )}
    </Draggable>
);
}

export default TaskCard;
