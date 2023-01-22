import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'
import Tile from './calculator_components/Tile'


export interface ArrTasksProps {
  id: number
  text: string
  day: string
  reminder: boolean
}

function App() {
  const [showAddButton, setShowAddButton] = useState(false)

  const [tasks, setTasks] = useState([] as ArrTasksProps[])

  useEffect(() => {
    const getTasks = async () => {
      const dbTasks = await fetchTasks()
      setTasks(dbTasks)
    }

    getTasks()
  }, [])

    // Fetch task from database
    const fetchTask = async (id: number) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data: ArrTasksProps = await res.json()
  
      return data
    }

  // Fetch tasks from database
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data: ArrTasksProps[] = await res.json()

    return data
  }

  // Add Task
  const addTask = async ( task: {text: string, day: string, reminder: boolean} )  => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST', 
      headers: {'Content-type': 'application/json'}, 
      body: JSON.stringify(task)
    })

    const data: ArrTasksProps = await res.json()
    setTasks([...tasks, data])
  }

  // Delete Task
  const deleteTask = async (id: number): Promise<void> => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})

    setTasks(tasks.filter((task) => task.id !== id) )
  }

  // Switch Reminder
  const switchReminder = async (id: number): Promise<void> => {
    const switchingTask = await fetchTask(id)
    const updatedTask = {...switchingTask, reminder: !switchingTask.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT', 
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
  }



  return (
    <Router>
      <div className="container">
        <div className='calculator'>
          <div className='output'>
          {/* <Tile value='123' />
          <Tile value='456' /> */}
            <div className='previous-output'>123</div>
            <div className='current-output'>456</div>
          </div>
          <Tile value='C' secondClass='double' />
          <Tile value='DEL' secondClass='double' />
          <Tile value='7'/>
          <Tile value='8'/>
          <Tile value='9'/>
          <Tile value='÷'/>
          <Tile value='4'/>
          <Tile value='5'/>
          <Tile value='6'/>
          <Tile value='×'/>
          <Tile value='1'/>
          <Tile value='2'/>
          <Tile value='3'/>
          <Tile value='+'/>
          <Tile value='.'/>
          <Tile value='0'/>
          <Tile value='='/>
          <Tile value='-'/>
        </div>
      </div>

      <div className="container">
        <Header title = "Task Tracker" onClick={() => setShowAddButton(!showAddButton)} showAddButton={showAddButton} />
        <Routes>
          <Route path='/' element={
            <>
              {showAddButton && <AddTask onClick={addTask} />}
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
