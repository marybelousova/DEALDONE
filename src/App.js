import React, {useState} from 'react';
import CreateTaskForm from "./CreateTaskForm";
import Column from "./Column";
import {v4 as uuidv4} from 'uuid';
import { DragDropContext } from 'react-beautiful-dnd';

const statuses = [
    {id: 1, tasks: [], queue: 1, name: 'To Do'},
    {id: 2, tasks: [], queue: 2, name: 'In Progress'},
    {id: 3, tasks: [], queue: 3, name: 'Review'},
    {id: 4, tasks: [], queue: 4, name: 'Done'}
]

const priorities = [
    {id: 1, priority: 'High Priority'},
    {id: 2, priority: 'Medium Priority'},
    {id: 3, priority: 'Low Priority'}
]

const initTasks = [
    {id: uuidv4(), name: 'Workshop Linked Lists', priorityId: 3, statusId: 1},
    {id: uuidv4(), name: 'Async Testing', priorityId: 3, statusId: 2},
    {id: uuidv4(), name: 'Checkpoint Express.js', priorityId: 3, statusId: 4},
    {id: uuidv4(), name: 'Binary Search Trees', priorityId: 3, statusId: 4},
    {id: uuidv4(), name: 'Magic methods Sequlize', priorityId: 2, statusId: 2},
    {id: uuidv4(), name: 'Workshop OAuth', priorityId: 1, statusId: 4},
    {id: uuidv4(), name: 'Algoritms', priorityId: 2, statusId: 2},
    {id: uuidv4(), name: 'Checkpoint Redux', priorityId: 1, statusId: 3},
    {id: uuidv4(), name: 'React Hooks', priorityId: 2, statusId: 3}, 
    {id: uuidv4(), name: 'Heroku Deployment', priorityId: 1, statusId: 1}
];


statuses.map(status =>
    initTasks.map(task => {
        if(task.statusId === status.id){
            status.tasks.push(task);
        }
    })
);

function App() {
    const [data, setData] = useState(statuses);

    const onDragEnd = (result) => {
        const {source, destination} = result;

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const [removed] = data[source.droppableId - 1].tasks.splice(source.index, 1);
            data[source.droppableId - 1].tasks.splice(destination.index, 0, removed);
        } else {
            const [removed] = data[source.droppableId - 1].tasks.splice(source.index, 1);
            data[destination.droppableId - 1].tasks.splice(destination.index, 0, removed);
            data.map((el, idx) =>
                el.tasks.map(task =>
                    task.id === removed.id ? task.statusId = idx + 1 : ''
                )
            );
        }
        setData(data);
    }


    return (
        <div>
            <div className="container">
                <h2>DEALDONE</h2>
                <CreateTaskForm data={data}
                />
                <div className="row">
                <DragDropContext onDragEnd={onDragEnd}>
                    {
                        data
                            .sort((a, b) => { return a.queue - b.queue} )
                            .map(el =>
                                <Column key={el.id}
                                              status={el}
                                              statuses={statuses}
                                />
                            )
                    }
                </DragDropContext>
                </div>
            </div>
        </div>
    );
}

export default App;
