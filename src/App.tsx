import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'


function App() {
  const [showAddButton, setShowAddButton] = useState(false)

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

  // Add Task
  const addTask = ( task: {text: string, day: string, reminder: boolean} )  => {
    let id = tasks.length + 1
    const newTask = { id, ...task}
    setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = (id: number): void => {
    setTasks(tasks.filter((task) => task.id !== id) )
  }

  // Switch Reminder
  const switchReminder = (id: number): void => {
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task))
  }



  return (
    <Router>
      <div className="container">
        <Header title = "Task Tracker" onAdd={() => setShowAddButton(!showAddButton)} showAddButton={showAddButton} />
        <Routes>
          <Route path='/' element={
            <>
              {showAddButton && <AddTask onAdd={addTask} />}
              { tasks.length !== 0 ? 
              <Tasks tasks={tasks} onDelete={deleteTask} onDblClick={switchReminder} />
              : "You have nothing to do!" }
            </>
          } />
          <Route path='/about' element={ <About /> } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );



}

export default App;
