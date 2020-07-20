import React from 'react';
import TaskCard from "./TaskCard";
import { Droppable } from 'react-beautiful-dnd';

function Column(props) {
    const status = props.status;

    const getStatusStyle = (isDraggingOver) => ({
        background: isDraggingOver ? "#00BFFF" : '',
    });

    return (
        <Droppable droppableId={props.status.id.toString()}>
            {(provided, snapshot) => (
                <div className="col-sm-3 p-1"
                     ref={provided.innerRef}
                     style={getStatusStyle(snapshot.isDraggingOver)}
                >
                <h5 className="card-header text-center">{status.name} 
                        {status.tasks.length > 0 ? status.tasks.length : ''}</h5>
                {
                    status.tasks
                        .map((task, index) => {
                            if(task.statusId === status.id)
                                return (
                                    <TaskCard key={task.id}
                                               index={index}
                                               task={task}
                                               />
                                    );
                            })
                    }
                    {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    };
    
    export default Column;