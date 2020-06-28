import React from 'react';
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTask";
import {Draggable} from 'react-beautiful-dnd';
import Task from "./Task.css"

function TaskCard(props) {

    const priorityString = props.priorities.find(el => el.id === props.task.priorityId).priority;
    let priorityBorderClasses ='border-left';
    if (priorityString === 'High Priority' ) {
        priorityBorderClasses += ' border-danger';
    } else if (priorityString === 'Medium Priority') {
        priorityBorderClasses += ' border-warning';
    } else
        priorityBorderClasses += ' border-success';


    const getItemStyle = (isDragging, draggableStyle) => ({
        // change background colour if dragging
        background: isDragging ? "lightgrey" : "",
        // styles we need to apply on draggables
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
            <div className={priorityBorderClasses}>
                <div className="card-body">
                    <span className="card-text">
                                    {priorityString === 'High Priority' &&
                                        <span className="badge badge-danger">{priorityString}</span>
                                    }
                                    {priorityString === 'Medium Priority' &&
                                        <span className="badge badge-warning">{priorityString}</span>
                                    }
                                    {priorityString === 'Low Priority' &&
                                        <span className="badge badge-success">{priorityString}</span>
                                    }
              
                    <div className="card-header">{props.task.name}</div>
                                </span>
                    <EditTask task={props.task}
                                priorities={props.priorities}
                                updateTask={props.updateTask}
                            />

                    <DeleteTask task={props.task}
                                deleteTask={props.deleteTask}
                            />
                </div>
            </div>
        </div>
        )}
        </Draggable>
    );
}

export default TaskCard;
