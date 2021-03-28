let gridBlocks = document.querySelectorAll('.grid-block')
let currentPlayer = 'player1'
let playerNumbers = []
let message = undefined;
let isThereWinner = false


function playClickAudio(){
    var audio = document.querySelector('#audio');
    audio.play();
}

function playWinnerAudio(){
    var audio2 = document.querySelector('#audio2')
    audio2.play()
}

gridBlocks.forEach(block => {
    block.addEventListener('mouseover', showPlayerIcon)
})

gridBlocks.forEach(block => {
    block.addEventListener('mouseout', HidePlayerIcon)
})

gridBlocks.forEach(block => {
    block.addEventListener('click', setPlayerPosition)
})


function showPlayerIcon(event){
     
    if(currentPlayer === 'player1'){
        event.target.textContent = "X"
        event.target.style.color = 'darkgrey'

    }else if(currentPlayer === 'player2'){
        event.target.textContent = "O"
        event.target.style.color = 'darkgrey'
    }

}

function HidePlayerIcon(event){
    event.target.textContent = ''
}

function setPlayerPosition(event){

    playClickAudio()

    if(currentPlayer === 'player1'){
        event.target.textContent = "X"
        event.target.setAttribute('data-player-number', '1')
        currentPlayer = 'player2'
        event.target.style.color = 'black'
        event.target.removeEventListener('mouseout', HidePlayerIcon)
        event.target.removeEventListener('mouseover', showPlayerIcon)
        event.target.removeEventListener('click', setPlayerPosition)
    }else if( currentPlayer === 'player2'){
        event.target.textContent = "O"
        event.target.setAttribute('data-player-number', '2')
        currentPlayer = 'player1'
        event.target.style.color = 'black'
        event.target.removeEventListener('mouseout', HidePlayerIcon)
        event.target.removeEventListener('mouseover', showPlayerIcon)
        event.target.removeEventListener('click', setPlayerPosition)
    }
    playerNumbers = []

    setTimeout(winner, 500)
    

}




// Check for which player wins

function winner(){

    gridBlocks.forEach(block => {
        var x = new Number(block.getAttribute('data-player-number')).valueOf()
        playerNumbers.push(x)
    })

    var winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]


    for(let i = 0; i < winningCombinations.length; i++){

        if( playerNumbers[ winningCombinations[i][0] ]  == 1 &&
            playerNumbers[ winningCombinations[i][1] ] == 1 &&
            playerNumbers[ winningCombinations[i][2] ] == 1
             ){
                
            gridBlocks[winningCombinations[i][0]].style.backgroundColor = 'lime'
            gridBlocks[winningCombinations[i][1]].style.backgroundColor = 'lime'
            gridBlocks[winningCombinations[i][2]].style.backgroundColor = 'lime'

            gridBlocks[winningCombinations[i][0]].style.color = 'white'
            gridBlocks[winningCombinations[i][1]].style.color = 'white'
            gridBlocks[winningCombinations[i][2]].style.color = 'white'
           

            playWinnerAudio()
            
            gridBlocks.forEach(block => {
                block.removeEventListener('click', setPlayerPosition)
            })

            isThereWinner = true

            setTimeout(() => {
                message = 'The Winner Is Player One!'
            showWinner(message)

            
            }, 2000)

            break
            

        }else if(
            playerNumbers[ winningCombinations[i][0] ]  == 2 &&
            playerNumbers[ winningCombinations[i][1] ] == 2 &&
            playerNumbers[ winningCombinations[i][2] ] == 2
        ){

            gridBlocks[winningCombinations[i][0]].style.backgroundColor = 'lime'
            gridBlocks[winningCombinations[i][1]].style.backgroundColor = 'lime'
            gridBlocks[winningCombinations[i][2]].style.backgroundColor = 'lime'

            gridBlocks[winningCombinations[i][0]].style.color = 'white'
            gridBlocks[winningCombinations[i][1]].style.color = 'white'
            gridBlocks[winningCombinations[i][2]].style.color = 'white'


            playWinnerAudio()

            gridBlocks.forEach(block => {
                block.removeEventListener('click', setPlayerPosition)
            })

            isThereWinner = true
            setTimeout(() => {
                message = 'The Winner Is Player Two!'
                showWinner(message)
                
            }, 2000)
            break
            
        }
            
    }


    var player1Items = playerNumbers.filter( (element) => {
        return (element == 1 )
    } )

    var player2Items = playerNumbers.filter( (element) => {
        return (element == 2 )
    } )

    // console.log(player1Items)
    // console.log(player2Items)

    if( player1Items.length == 5 && player2Items.length == 4 && message == undefined){

        if( isThereWinner == false){
            setTimeout(() => {
                message = "There Is No Winner, It's A Draw!"
            showWinner(message)
            }, 1000) 
        }
    }

    console.log(isThereWinner)

    // console.log(playerNumbers)
    
}


function showWinner(message){

    var winnerMessage = document.querySelector('#winner-message')
    var overlay = document.querySelector('#overlay')

    winnerMessage.textContent = message;
    overlay.style.display = 'flex'
}

function restartGame(){
    location.reload()
}