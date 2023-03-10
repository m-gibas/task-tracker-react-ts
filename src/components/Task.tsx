import { FaTimes } from 'react-icons/fa'
// import { IconContext } from "react-icons";


export interface TaskProps {
    task: {
        id: number
        text: string
        day: string
        reminder: boolean
    }
    onDelete: (id: number) => void
    onDblClick: (id: number) => void
    style?: React.CSSProperties
}

const Task = ({ task, onDelete, onDblClick }: TaskProps) => {


  return (
    <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onDblClick(task.id)}>
        <h3>{task.text} 
        {/* <IconContext.Provider value={{ color: 'red', cursor: 'pointer' }} >
            <FaTimes  onClick={() => onDelete(task.id)} /> 
        </IconContext.Provider> */}
        <button className='FaTimesButton' style={{color: 'red', cursor: 'pointer'}} onClick={() => onDelete(task.id)} >
            <FaTimes />
        </button>
        </h3>
        <p>{task.day}</p>
    </div>
  )
}

export default Task