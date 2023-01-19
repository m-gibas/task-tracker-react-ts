export interface ButtonProps {
    color?: string
    text: string
    onClick?: () => void
}

const Button = ({ color = "", text, onClick }: ButtonProps) => {

  return (
    <button onClick={onClick} style={{ backgroundColor: color }} className="btn">
        {text}
    </button>
  )
}

export default Button