import './Tile.css'

export interface TileProps {
  value: string
  // isDouble?: boolean
  secondClass?: string
}

const Tile = ({ value, secondClass }: TileProps) => {
  return (
    <button className={`buttons ${secondClass ? secondClass : ''}`}>{value}</button>
  )
}

export default Tile;
