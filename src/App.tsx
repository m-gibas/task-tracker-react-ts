import { useState } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'


function App() {

  const [tasks, setTasks] = useState( [ {
      id: 1,
      text: "Doctors Appointment",
      day: "Feb 5th at 2:30pm",
      reminder: true
  },
  {
      id: 2,
      text: "Meeting at School",
      day: "Feb 6th at 1:30pm",
      reminder: true
  },
  {
      id: 3,
      text: "Food Shopping",
      day: "Feb 4th at 3:30pm",
      reminder: false
  }] )


  // Delete Task
  const deleteTask = (id: number): void => {
    setTasks(tasks.filter((task) => task.id !== id) )
  }

  // Switch Reminder
  const switchReminder = (id: number): void => {
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task))
  }



  return (
    <div className="container">
      <Header title = "Task Tracker" />
      { tasks.length !== 0 ? 
      <Tasks tasks={tasks} onDelete={deleteTask} onDblClick={switchReminder} />
      : "You have nothing to do!" }
    </div>
  );
}

export default App;
