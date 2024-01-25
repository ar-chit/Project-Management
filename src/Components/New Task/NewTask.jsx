import { useState, useRef } from "react"
import Modal from "../Modal/Modal";
export default function NewTask({ onAdd }) {

    const modal = useRef();
    const [enteredTask, setEnteredTask] = useState('');

    function handleChange(event) {
        setEnteredTask(event.target.value);
    }

    function handleClick() {
        if (enteredTask.trim() !== '') {
            onAdd(enteredTask);
            setEnteredTask('');
        } else {
            modal.current.open();
        }
    }

    return (
        <div className="flex items-center gap-4 ">
            <input type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200" value={enteredTask} onChange={handleChange}/>
            <button className="text-stone-700 hover:text-stone-950" onClick={handleClick}>Add Task</button>
            <Modal ref={modal} buttonCaption="Close">
                <h2 className="text-xl font-bold text-stone-500 my-4">Invalid Input</h2>
                <p className="text-stone-600 mb-4 ">Task cannot be empty</p>
                <p className="text-stone-600 mb-4 ">Please make sure that you provide a valid value for the task.</p>
            </Modal>
        </div>
    )
}