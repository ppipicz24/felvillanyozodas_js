function delegal(szulo, gyerek, mikor, mit) {
    function esemenyKezelo(esemeny) {
      let esemenyCelja = esemeny.target
      let esemenyKezeloje = this
      let legkozelebbiKeresettElem = esemenyCelja.closest(gyerek)
  
      if (esemenyKezeloje.contains(legkozelebbiKeresettElem)) {
        mit(esemeny, legkozelebbiKeresettElem)
      }
    }
  
    szulo.addEventListener(mikor, esemenyKezelo)
}
  
function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
//////////////////
const menuDiv = document.querySelector("#menu")
const startButton = document.querySelector("#start-button")
const historyButton = document.querySelector("#history-button")
const descriptionButton = document.querySelector("#description")
const descriptonDiv = document.querySelector("#leiras")
const sizeInput = document.querySelector("#size")
const nameInput = document.querySelector("#name")
const containerDiv = document.querySelector("#container")
const historyDiv = document.querySelector("#history")
const gameDiv = document.querySelector("#game")
const minuteLabel=document.querySelector("#minutes")
const secondLabel=document.querySelector("#seconds")
  
let steps = 0
let history = JSON.parse(localStorage.getItem("gameHistory"))
let matrix = []

function generateMatrix(n, m) {
  
  for(let i = 0; i<n; i++) {
    const row = []
    for(let j = 0; j<m; j++) {
      row.push("")
    }
    matrix.push(row)
  }
  return matrix
}

let table=document.createElement("table")
//table=undefined
function genTable(matrix) {

  for(let i=0;i<matrix.length;i++)
  {
    let row = document.createElement("tr")
    for(let j=0;j<matrix.length;j++)
    {
      let cell = document.createElement("td")
      cell.innerHTML=matrix[i][j]
      if(cell.innerHTML!="")
      {
        cell.style.backgroundColor="black"
        if(cell.innerHTML!="" && cell.innerHTML!=5)
        {
          cell.style.color="white"
        }
      }
      row.appendChild(cell)
    }
    table.appendChild(row)
    table.id="jatekter"
  }
  return table
}

function genTableEasy()
{
    let matrix=generateMatrix(7,7)
    
    matrix[0][3]=1

    matrix[1][1]=0
    matrix[1][5]=2

    matrix[3][0]=5
    matrix[3][3]=5
    matrix[3][6]=5
    
    matrix[5][1]=5
    matrix[5][5]=2
    
    matrix[6][3]=3

    return genTable(matrix)

    //if()
}
function genTableHard()
{
    let matrix=generateMatrix(7,7)
    
    matrix[0][2]=0
    matrix[0][4]=5

    matrix[2][0]=5
    matrix[2][2]=5
    matrix[2][4]=3
    matrix[2][6]=5

    matrix[3][4]=1

    matrix[4][0]=2
    matrix[4][2]=5
    matrix[4][4]=5
    matrix[4][6]=5
    
    matrix[6][2]=5
    matrix[6][4]=2

    return genTable(matrix)
}

function genTableTen()
{
    let matrix=generateMatrix(10,10)
    
    matrix[0][1]=5

    matrix[1][5]=3
    matrix[1][7]=2
    matrix[1][9]=5
    
    matrix[2][1]=0
    matrix[2][2]=5
    matrix[2][7]=5

    matrix[3][4]=5

    matrix[4][1]=1
    matrix[4][4]=5
    matrix[4][5]=1
    matrix[4][6]=5

    matrix[5][3]=5
    matrix[5][4]=5
    matrix[5][5]=5
    matrix[5][8]=3

    matrix[6][5]=5
    
    matrix[7][2]=1
    matrix[7][7]=0
    matrix[7][8]=5

    matrix[8][0]=3
    matrix[8][3]=5
    matrix[8][5]=0

    matrix[9][8]=0

    return genTable(matrix)
}


let refreshTable= ()=>{
  let jatekter=document.querySelector("table")
  jatekter.innerHTML=""
  for(let i=0;i<matrix.length;i++)
  {
    let row = document.createElement("tr")
    for(let j=0;j<matrix.length;j++)
    {
      let cell = document.createElement("td")
      cell.innerHTML=matrix[i][j]
      if(cell.innerHTML!="" && cell.innerHTML!=6 && cell.innerHTML!="💡")
      {
        cell.style.backgroundColor="black"
        if(cell.innerHTML!="" && cell.innerHTML!=5)
        {
          cell.style.color="white"
        }
      }
      else if(cell.innerHTML==6 && cell.innerHTML!="💡" )
      {
        cell.style.backgroundColor="#ffff94"
        cell.style.color="#ffff94"

      }
      else if(cell.innerHTML=="💡")
      {
        cell.style.backgroundColor="#ffff94"
      }
      else{
        cell.style.background="white"
      }
      row.appendChild(cell)
    }
    jatekter.appendChild(row)

}}

const renderMenu = () => {
    gameDiv.style.display = "none"
    historyDiv.style.display = "none"
    menuDiv.style.display = "flex"
    gameDiv.innerHTML=""

    descriptionButton.addEventListener("click", (e)=>{
        let leiras=e.target.nextElementSibling
        leiras.classList.toggle("visible")
    })

    startButton.addEventListener("click", () => {
        renderGameScreen()
        //refreshTable()
        menuDiv.style.display = "none"
    })

    historyButton.addEventListener("click", () => {
        renderHistory()
        menuDiv.style.display = "none"
    })
}

const renderGameScreen=()=>{
    gameDiv.style.display = "flex"
    gameDiv.innerHTML = ""

    //főcím hozzáadása az új oldalhoz
    const title = document.createElement("h1")
    title.innerHTML = "Kapcsold fel a lámpákat helyesen!"
    gameDiv.appendChild(title)

    if(sizeInput.value=="konnyu")
    {
      gameDiv.appendChild(genTableEasy())
    }
    else if(sizeInput.value=="nehez")
    {
      gameDiv.appendChild(genTableHard())
    }
    else if(sizeInput.value=="extrem")
    {
        gameDiv.appendChild(genTableTen())
    }



    delegal(gameDiv, "td", "click", (e) => gameController(e))
    //gameDiv.appendChild(timer())
    const br = document.createElement("br")
    gameDiv.appendChild(br)
    let backButton = document.createElement("button")
    backButton.innerHTML = "Vissza"
    backButton.addEventListener("click", () => {
      //table = ""
      renderMenu()
    })

    let newGameButton = document.createElement("button")
    newGameButton.innerHTML="Új játék"
    newGameButton.id="restartButton"
    newGameButton.addEventListener("click", ()=>{
      //gameDiv.innerHTML=""
      //table=""
      restart()

    })
    gameDiv.appendChild(backButton)
    gameDiv.appendChild(newGameButton)

}
    
const gameController=(e)=>{

  let row = e.target.parentElement.rowIndex;
  let column = e.target.cellIndex;
  //felvillan a villanykörte és lekapcsolodik
  if(e.target.innerHTML=="")
  {
    e.target.innerHTML="💡"
    e.target.style.backgroundColor="#ffff94"
    matrix[row][column]="💡"
    let j = column
    //let i = row
    if(column!=matrix.length-1)
    {
      j=column+1
      while(j<matrix.length && matrix[row][j]==="")
      {
        if(matrix[row][j]!="💡")
        {
          matrix[row][j]=6
        }
        j++
      }
    }
    if(row!=matrix.length-1)
    {
      j=row+1
      while(j<matrix.length && matrix[j][column]==="")
      {
        if(matrix[j][column]!="💡")
        {
          matrix[j][column]=6
        }
        j++
      }
    }
    if(column!=0)
    {
      j=column-1
      while(j>-1 && matrix[row][j]==="")
      {
        if(matrix[row][j]!="💡")
        {
          matrix[row][j]=6
        }
        j--
      }
    }
    if(row!=0)
    {
      j=row-1
      while(j>-1 && matrix[j][column]==="")
      {
        if(matrix[j][column]!="💡")
        {
          matrix[j][column]=6
        }
        j--
      }
    }
    refreshTable()

  }
  else if(e.target.innerHTML=="💡")
  {
    e.target.innerHTML=""
    matrix[row][column]=""
    e.target.style.backgroundColor="white"
    //let table=document.querySelector("table")
    for(let i=0, row;row=table.rows[i];i++)
    {
      for(let j=0, col;col=row.cells[j];j++)
      {
        if(matrix[i][j]=="6")
        {
          matrix[i][j]=""
        }
      }
    }
    refreshTable()
    }    
}

const restart=()=>{
  renderGameScreen()
}

const timer=()=>{
  var minutesLabel = document.getElementById("minutes")
  var secondsLabel = document.getElementById("seconds")
  var totalSeconds = 0
  setInterval(setTime, 1000)
  
  function setTime() {
    ++totalSeconds
    secondsLabel.innerHTML = pad(totalSeconds % 60)
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60))
  }
  
  function pad(val) {
    var valString = val + ""
    if (valString.length < 2) {
      return "0" + valString
    } else {
      return valString
    }
  }
}
// Main
renderMenu()