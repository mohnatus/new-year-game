export function Wheel() {
  const handleClick = () => {
    console.log('рандомный бонус')
  }

  return <div>MAGIC WHEEL (раз в сутки)

    <button onClick={handleClick}>Крутить колесо</button>
  </div>
}