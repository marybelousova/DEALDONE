import React, {useState} from 'react';
import {v4 as uuidv4} from "uuid";

function CreateTaskForm (props) {

    const data = props.data;
    const priorities = props.priorities;
    const [isOpenCreateTaskForm, setIsOpenCreateTaskForm] = useState(false);
    const [isActiveButtonTaskCreate, setIsActiveButtonTaskCreate] = useState(false);
    const [taskInput, setTaskInput] = useState('');
    const [taskPriority, setTaskPriority] = useState(3);

    const onTaskChange = (e) => {
        setIsActiveButtonTaskCreate(e.target.value.length > 2);
        setTaskInput(e.target.value);
    }

    const taskCreate = (e) => {
        e.preventDefault();
        const newTask = {
            id: uuidv4(),
            name: taskInput,
            priorityId: taskPriority,
            statusId: 1
        };
        const newData = [...data];
        newData.forEach(status => {
            if(newTask.statusId === status.id){
                status.tasks.push(newTask);
            }
        })
        props.taskCreate(newData);
        taskReset();
    }

    const taskReset = (e) => {
        setTaskInput('');
        setTaskPriority(priorities[priorities.length - 1].id);
        setIsOpenCreateTaskForm(false);
        setIsActiveButtonTaskCreate(false);
    }

    return (
        <>
            {
                !isOpenCreateTaskForm &&
                <button className="btn btn-primary" onClick={e => setIsOpenCreateTaskForm(true)}>Add task</button>
            }
            {
                isOpenCreateTaskForm &&
                <form>
                     <div className="form-row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="exampleInputEmail1">Task</label>
                        <input type="text" className="form-control" placeholder="Describe Your Task"
                               value={taskInput} onChange={onTaskChange}/>
                    </div>

                    <div className="col-md-2 mb-3">
                        <label htmlFor="taskPriority">Priority</label>
                        <select className="form-control"
                                id="taskPriority"
                                onChange={e => setTaskPriority(parseInt(e.target.value))}
                                required>
                            <option selected disabled value="">Select</option>
                            <option value="1">High </option>
                            <option value="2">Medium</option>
                            <option value="3">Low</option>
                        </select>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary m-1"
                            onClick={taskCreate}
                            disabled={!isActiveButtonTaskCreate}
                    >Submit</button>
                    <button className="btn btn-secondary" onClick={taskReset}>Cancel</button>
                </form>
            }
        </>
    );
};

export default CreateTaskForm;