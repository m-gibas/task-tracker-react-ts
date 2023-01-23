import { useEffect, useReducer, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'
import Tile from './calculator_components/Tile'
import OperationTile from './calculator_components/OperationTile'

export interface ArrTasksProps {
  id: number
  text: string
  day: string
  reminder: boolean
}


// Calculator Functionality

export type ACTIONTYPE = 
  | { type: "add-digit"; payload: number | '.' }
  | { type: "delete-digit"; payload: undefined }
  | { type: "clear-all"; payload: undefined }
  | { type: "choose-operation"; payload: string }
  | { type: "calculation"; payload: undefined };

function reducer(state: any, {type, payload}: ACTIONTYPE) {
  switch (type) {
    case "add-digit":
      if(state.currentInput) {
        if(state.overwrite) {
          return {
            ...state,
            currentInput: payload,
            overwrite: false
          }
        }
        if(payload === 0 && state.currentInput === '0') return state 
        if(payload === '.' && state.currentInput.includes('.')) return state 
        if(payload !== '.' && payload !== 0 && state.currentInput.length === 1 && state.currentInput === '0') state.currentInput = ''
        if(payload === '.'  && state.currentInput.length === 0 ) state.currentInput = '0'
      }
      return { 
        ...state, 
        // currentInput: `${state.currentInput || ''}${payload}`};
        currentInput: (state.currentInput || '') + payload };
    case "delete-digit":
      if(state.currentInput == null) return state
      if(state.overwrite) return { 
        ...state,
        overwrite: false,
        currentInput: null
      }
      if(state.currentInput.length === 1) {
        return {
          ...state,
          currentInput: null
        }
      }
      return { ...state,
      currentInput: state.currentInput.slice(0, -1) 
    };
    case "clear-all":
      if(!state.currentInput && !state.previousInput) return state
      return { };
    case "choose-operation":
      if(state.currentInput == null && state.previousInput == null) return state
      if(state.currentInput == null ) {
        return {
          ...state,
          operationSign: payload,
        }
      }
      if(state.previousInput == null) {
        return {
          ...state, 
          operationSign: payload,
          previousInput: state.currentInput,
          currentInput: null
        }
      }
      return {
        ...state,
        previousInput: calculate(state),
        operationSign: payload,
        currentInput: null
      }
    case "calculation":
      if(state.operationSign == null || state.currentInput == null || state.previousInput == null) return state
      return { ...state,
      previousInput: null,
      operationSign: null,
      overwrite: true,
      currentInput: calculate(state) };
    default:
      throw new Error();
  }
}

function calculate({ currentInput, previousInput, operationSign }: any) {
  const previous = parseFloat(previousInput)
  const current = parseFloat(currentInput)
  if(isNaN(previous) || isNaN(current)) return ''
  let value = 0
  switch (operationSign) {
    case '+': 
      value = previous + current
      break
    case '-': 
      value = previous - current
      break
    case '÷': 
      value = previous / current
      break
    case '×': 
      value = previous * current
      break
  }
  return value.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat('nb-NO', {
  maximumFractionDigits: 0,
} )

function formatOperand(operand: any) {
  if(operand == null) return
  const [integer, decimal] = operand.split('.')
  if(decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}


// Main
function App() {
  const [showAddButton, setShowAddButton] = useState(false)

  const [tasks, setTasks] = useState([] as ArrTasksProps[])

  const [{ currentInput, previousInput, operationSign }, dispatch] = useReducer(reducer, {})


  useEffect(() => {
    const getTasks = async () => {
      const dbTasks = await fetchTasks()
      setTasks(dbTasks)
    }
    getTasks()
  }, [])

    const fetchTask = async (id: number) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data: ArrTasksProps = await res.json()
  
      return data
    }

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data: ArrTasksProps[] = await res.json()

    return data
  }

  const addTask = async ( task: {text: string, day: string, reminder: boolean} )  => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST', 
      headers: {'Content-type': 'application/json'}, 
      body: JSON.stringify(task)
    })

    const data: ArrTasksProps = await res.json()
    setTasks([...tasks, data])
  }

  const deleteTask = async (id: number): Promise<void> => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})

    setTasks(tasks.filter((task) => task.id !== id) )
  }

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
      <Routes>
        <Route path='/' element={
          <div className="container">
            <div className='calculator'>
              <div className='output'>
                <div className='previous-output'>{formatOperand(previousInput)} {operationSign}</div>
                <div className='current-output'>{formatOperand(currentInput)}</div>
              </div>
              <button className='buttons double' onClick={() => dispatch({ type: 'clear-all', payload: undefined })} >C</button>
              <button className='buttons double' onClick={() => dispatch({ type: 'delete-digit', payload: undefined })} >DEL</button>
              <Tile value={7} dispatch={dispatch} />
              <Tile value={8} dispatch={dispatch} />
              <Tile value={9} dispatch={dispatch} />
              <OperationTile value='÷' dispatch={dispatch} />
              <Tile value={4} dispatch={dispatch} />
              <Tile value={5} dispatch={dispatch} />
              <Tile value={6} dispatch={dispatch} />
              <OperationTile value='×' dispatch={dispatch} />
              <Tile value={1} dispatch={dispatch} />
              <Tile value={2} dispatch={dispatch} />
              <Tile value={3} dispatch={dispatch} />
              <OperationTile value='+' dispatch={dispatch} />
              <Tile value={'.'} dispatch={dispatch} />
              <Tile value={0} dispatch={dispatch} />
              <button className='buttons' onClick={() => dispatch({ type: 'calculation', payload: undefined })} >=</button>
              <OperationTile value='-' dispatch={dispatch} />
            </div>
          </div>
        } />
    </Routes>

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
