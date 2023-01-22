import { useLocation } from "react-router-dom"
import Button from "./Button"

export interface HeaderProps {
    title: string
    color?: string
    onAdd: () => void
    showAddButton: boolean
}


const Header = ({ title, color = "" , onAdd, showAddButton}: HeaderProps) => {
  const location = useLocation()

  return (
    <header className="header">
       <h1 style={{color: color}}>{title}</h1> 
       {location.pathname === '/' && (
         <Button text={showAddButton ? "Close" : "Add"} color={showAddButton ? "red" : "green"} onClick={onAdd} />
         )}
    </header>
  )
}

export default Header