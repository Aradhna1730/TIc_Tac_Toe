let PlayerText = document.getElementById('PlayerText')
let RestartBtn = document.getElementById('Restartbtn')
let boxes = Array.from(document.getElementsByClassName('box'))

let WinnerIndicator = getComputedStyle(document.body).getPropertyValue('--WinningBlocks')

// console.log(boxes)
const X_Text = 'X'
const O_Text = 'O'
let CurrentPlayer = X_Text
let spaces = Array(9).fill(null)

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e){
    const id = e.target.id

    if(!spaces[id])
    {
        spaces[id] = CurrentPlayer
        e.target.innerText = CurrentPlayer

        if(PlayerHasWon() != false)
        {
            PlayerText.innerHTML = `${CurrentPlayer} has Won!!`

            let winningBlocks = PlayerHasWon()

            winningBlocks.map( box => boxes[box].style.backgroundColor = WinnerIndicator)
            return
        }

        CurrentPlayer = CurrentPlayer == X_Text ? O_Text : X_Text
    }
}

RestartBtn.addEventListener('click' , restart)

function restart()
{
    spaces.fill(null)

    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor = ''
    })

    PlayerText.innerHTML = 'TIc Tac Toe'

    CurrentPlayer = X_Text
}

const WinningCombos =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function PlayerHasWon()
{
    for (const condition of WinningCombos) {
        let [a,b,c] = condition

        if(spaces[a] && (spaces[a] == spaces[b]) && (spaces[a] == spaces[c]))
        {
            return [a,b,c]
        }
    }
    return false
}

startGame()