import Button from "./Button"

export interface HeaderProps {
    title: string
    color?: string
}


const Header = ({ title, color = "" }: HeaderProps) => {
  const onClick = () => {
      console.log('Dziala')
  }


  return (
    <header className="header">
       <h1 style={{color: color}}>{title}</h1> 
       <Button text="Add" color="green" onClick={onClick} />
    </header>
  )
}

export default Header