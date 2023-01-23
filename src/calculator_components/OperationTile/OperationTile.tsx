import '../Tile/Tile.css'
import { ACTIONTYPE } from '../../App'

export interface TileProps {
  value: string 
  dispatch: React.Dispatch<ACTIONTYPE>
}

const OperationTile = ({ value, dispatch }: TileProps) => {
  return (
    <button className='buttons' onClick={() => dispatch({ type: 'choose-operation', payload: value })} >{value}</button>
  )
}

export default OperationTile;
