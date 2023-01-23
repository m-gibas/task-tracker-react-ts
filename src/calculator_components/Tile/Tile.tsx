import './Tile.css'
import { ACTIONTYPE } from '../../App'

export interface TileProps {
  value: number | '.'
  dispatch: React.Dispatch<ACTIONTYPE>
}

const Tile = ({ value, dispatch }: TileProps) => {
  return (
    // <button className={`buttons ${secondClass ? secondClass : ''}`} onClick={onClick} value={value}>{value}</button>
    <button className='buttons' onClick={() => dispatch({ type: 'add-digit', payload: value })} value={value}>{value}</button>
  )
}

export default Tile;
