import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const plusIcon = (
    <svg className="bi bi-caret-up" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M3.204 11L8 5.519 12.796 11H3.204zm-.753-.659l4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z"/>
    </svg>
);
const minusIcon = (
    <svg className="bi bi-caret-down" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M3.204 5L8 10.481 12.796 5H3.204zm-.753.659l4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
    </svg>
);

const editIcon = (<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
  <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
</svg>);

function EditTask(props) {
    const task = props.task;
    const [name, setName] = useState(task.name);
    let [priorityId, setPriorityId] = useState(task.priorityId);
    const [showEditModal, setShowEditModal] = useState(false);
    const [isActiveButtonTaskEdit, setIsActiveButtonTaskEdit] = useState(task.name.length > 4);
    const priorityString = props.priorities.find(el => el.id === priorityId).priority;

    const handleShowEditModal = () => {
        setShowEditModal(true);
    }

    const handleCloseEditModal = () => {
        setName(task.name);
        setPriorityId(task.priorityId);
        setIsActiveButtonTaskEdit(task.name.length > 3);
        setShowEditModal(false);
    }

    const onTaskChange = (e) => {
        setIsActiveButtonTaskEdit(e.target.value.length > 3);
        setName(e.target.value);
    }

    const increasePriority = (e) => {
        e.preventDefault();
        setPriorityId(--priorityId);
    }

    const decreasePriority = (e) => {
        e.preventDefault();
        setPriorityId(++priorityId);
    }

    const editTask = () => {
        const updatedTask = {...task, name: name, priorityId: priorityId};
        props.updateTask(updatedTask);
        setShowEditModal(false);
    }

    const stylePlus = {
        pointerEvents: priorityId > 1 ? '' : 'none',
        cursor: priorityId > 1 ? '' : 'not-allowed',
        opacity: priorityId > 1 ? 1 : 0.2
    }
    const styleDash = {
        pointerEvents: priorityId < 3 ? '' : 'none',
        cursor: priorityId < 3 ? '' : 'not-allowed',
        opacity: priorityId < 3 ? 1 : 0.2
    }

    return (
        <div>
            <button type="button"
                    className="btn btn-sm float-right" onClick={handleShowEditModal}>{editIcon}                    </button>
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex ml-auto">
                        <div className="card-text p-2">
                            <a className="ml-1" href="#"  onClick={decreasePriority} style={styleDash}>{minusIcon}</a>
                            {priorityString === 'High Priority' &&
                            <span className="badge badge-danger">{priorityString}</span>
                            }
                            {priorityString === 'Medium Priority' &&
                            <span className="badge badge-warning">{priorityString}</span>
                            }
                            {priorityString === 'Low Priority' &&
                            <span className="badge badge-success">{priorityString}</span>
                            }
                            <a className="ml-1" href="#" onClick={increasePriority} style={stylePlus}>{plusIcon}</a>
                        </div>
                    </div>
                    <div className="d-flex pt-1">
                        <div className="input-group">
                                <textarea className="md-textarea form-control"
                                          rows="3"
                                          value={name}
                                          onChange={onTaskChange}
                                          placeholder="Describe your task"
                                />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={editTask} disabled={!isActiveButtonTaskEdit}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
export default EditTask;
