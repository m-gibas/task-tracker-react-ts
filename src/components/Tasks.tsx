import Task from './Task'

export interface TasksProps {
    tasks: {
        id: number
        text: string
        day: string
        reminder: boolean
    }[]
    onDelete: (id: number) => void
}


const Tasks = ({ tasks, onDelete }: TasksProps) => {
  return (
    <>
        {tasks.map( (task) => ( 
        <Task key={task.id} task={task} onDelete={onDelete} />
        ))}
    </>
  )
}

export default Tasks