import Button from '@/components/Button'
import { RoomSelection } from '@/services/game.types'

type Props = {
  player: number
  selections?: RoomSelection[]
  onClick: (num: string) => void
}

const nums = Array.from({ length: 9 })
  .map((_, num) => num + 1)
  .map(num => num.toString())

function Board({ player, selections = [], onClick }: Props) {
  const even = player === 1

  return (
    <section className="relative bg-gray w-[300px]">
      <div className="grid grid-cols-3">
        {nums.map(num => {
          const selectedIndex = selections.findIndex(
            a => a.content === num.toString(),
          )

          if (selectedIndex >= 0) {
            return (
              <Button key={num} even={even} selected>
                {num}
              </Button>
            )
          }

          return (
            <Button key={num} even={even} onClick={() => onClick(num)}>
              {num}
            </Button>
          )
        })}
      </div>

      <div className="pointer-events-none top-0 left-0 absolute z-0 w-[300px] h-[300px]">
        <div className="h-1 w-full bg-black absolute top-[100px]"></div>
        <div className="h-1 w-full bg-black absolute top-[200px]"></div>
        <div className="h-full w-1 bg-black absolute left-[100px]"></div>
        <div className="h-full w-1 bg-black absolute left-[200px]"></div>
      </div>
    </section>
  )
}

export default Board
