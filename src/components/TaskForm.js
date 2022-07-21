import { useState } from "react"

const TaskForm = ({ onSave }) => {
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        if(!text) {
            alert('Please add a task');
            return;
        }

        onSave({ text, day, reminder});

        setText('');
        setDay('');
        setReminder(false);
    }
  return (
    <form className='add-form' onSubmit={onSubmit}>
        <div className="form-control">
            <label>Task</label>
            <input type="text" placeholder="Add Task" 
                onChange={(e) => setText(e.target.value)}
                value={text} />
        </div>
        <div className="form-control">
            <label>Day & Time</label>
            <input type="text" placeholder="Add Day & Time"
                onChange={(e) => setDay(e.target.value)}
                value={day} />
        </div>
        <div className="form-control form-control-check">
            <label>Remider</label>
            <input type="checkbox"
                onChange={(e) => setReminder(e.currentTarget.checked)}
                checked={reminder}
                value={reminder} />
        </div>

        <input type="submit" className="btn btn-block" value="Save Task" />
    </form>
  )
}

export default TaskForm