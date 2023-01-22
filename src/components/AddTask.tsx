import { useState } from "react";

export interface addProps {
    onClick: (task: any) => void
}

const AddTask = ({ onClick }: addProps) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e: any) => {
        e.preventDefault()

        if(!text) {
            alert('Please add a task')
            return
        }

        onClick({ text, day, reminder })

        setText('')
        setDay('')
        setReminder(false)
    }

  return (
    <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
            <label>Task</label>
            <input type="Reminder" placeholder="Task Description" value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div className="form-control">
            <label>Day and Time</label>
            <input type="text" placeholder="Add Day and Time" value={day} onChange={(e) => setDay(e.target.value)} />
        </div>
        
        <div className="form-control form-control-check">
            <label>Set Reminder</label>
            <input type="checkbox" checked={reminder}  onChange={(e) => setReminder(e.currentTarget.checked)} />
        </div>
        
        <input className="btn btn-block" type='submit' value='Save Task' />
    </form>
  )
}

export default AddTask