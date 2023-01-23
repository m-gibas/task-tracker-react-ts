import './Tile.css'
import { ACTIONTYPE } from '../../App'

export interface TileProps {
  value: number | '.'
  // isDouble?: boolean
  secondClass?: string
  onClick?: (e: any) => void
  dispatch: React.Dispatch<ACTIONTYPE>
}

const Tile = ({ value, secondClass, onClick, dispatch }: TileProps) => {
  return (
    // <button className={`buttons ${secondClass ? secondClass : ''}`} onClick={onClick} value={value}>{value}</button>
    <button className={`buttons ${secondClass ? secondClass : ''}`} onClick={() => dispatch({ type: 'add-digit', payload: value })} value={value}>{value}</button>
  )
}

export default Tile;
