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

////////
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

let history = JSON.parse(localStorage.getItem("gameHistory"))
let matrix = []
let table=""
table=document.createElement("table")
let gameover=false
let seconds = 0, minutes = 0, hours = 0
let t

//-------------tábla legenerálása-------------
function generateMatrix(n, m) {
  matrix=[]
  for(let i = 0; i<n; i++) {
    const row = []
    for(let j = 0; j<m; j++) {
      row.push("")
    }
    matrix.push(row)
  }
  return matrix
}
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
      if(cell.innerHTML==7)
      {
        cell.style.backgroundColor="#ffff94"
          cell.style.color="#ffff94"
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
    
    matrix[3][3]=1
    
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
    matrix[8][2]=5
    matrix[8][4]=0

    matrix[9][8]=0

    return genTable(matrix)
}

//------tábla ellenőrzése(lámpák helye)-------
function checkTable(e){

  for(let i=0;i<matrix.length;i++)
  {
    for(let j=0;j<matrix.length;j++)
    {
      if(matrix[i][j]=="💡")
      {
        checkLights(table.rows[i].cells[j])
      }
      if(matrix[i][j]>-5 && matrix[i][j]<5){
        checkNumbers(table.rows[i].cells[j])
      }
    }
  }
}
function checkLights(e){
    let row = e.parentElement.rowIndex
    let column = e.cellIndex
    let j = column
    let vk=[]
    if(column!=matrix.length-1)
      {
        j=column+1
        while(j<matrix.length && (matrix[row][j]==="" || matrix[row][j]==6 || matrix[row][j]==7|| matrix[row][j]=="💡"))
        {
          if(matrix[row][j]=="💡")
          {
            vk.push(e)
          }
          j++
        }
      }
      if(row!=matrix.length-1)
      {
        j=row+1
        while(j<matrix.length && (matrix[j][column]==="" || matrix[j][column]==6|| matrix[j][column]==7 || matrix[j][column]=="💡"))
        {
          if(matrix[j][column]=="💡")
          {
            vk.push(e)
          }
          j++
        }
      }
      if(column!=0)
      {
        j=column-1
        while(j>-1 && (matrix[row][j]==="" || matrix[row][j]==6|| matrix[row][j]==7|| matrix[row][j]=="💡"))
        {
          if(matrix[row][j]=="💡")
          {
            vk.push(e)
          }
          j--
        }
      }
      if(row!=0)
      {
        j=row-1
        while(j>-1 && (matrix[j][column]==="" || matrix[j][column]==6|| matrix[j][column]==7 || matrix[j][column]=="💡"))
        {
          if(matrix[j][column]=="💡")
          {
            vk.push(e)
          }
          j--
        }
      }
      vk.forEach(x => {
        //x.classList.add("wrong") ///ez nem tudom muert nem jóxd
        x.style.backgroundColor="red"  
         })
      //console.log(bads)

}
function checkNumbers(e){
    let row = e.parentElement.rowIndex
    let column = e.cellIndex
    db=0

    if(column!=matrix.length-1 && matrix[row][column+1]=="💡")
    {
      db++
    }
    if(column!=0 && matrix[row][column-1]=="💡")
    {
      db++
    }
    if(row!=matrix.length-1 && matrix[row+1][column]=="💡")
    {
      db++
    }
    if(row!=0 && matrix[row-1][column]=="💡")
    {
      db++
    }
    if(db>matrix[row][column] || db<matrix[row][column])
    {
      e.style.color="red"
    }
    if(db===matrix[row][column])
    {
      e.style.color="green"
    }

}

//tábla lefrissítése ha fel/lekapcsolom a villanykörtét
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
        if(cell.innerHTML!="" && cell.innerHTML!=6 && cell.innerHTML!="💡" && cell.innerHTML!=7)
        {
          cell.style.backgroundColor="black"
          if(cell.innerHTML!="" && cell.innerHTML!=5)
          {
            cell.style.color="white"
          }
        }
        else if(cell.innerHTML==6 || cell.innerHTML==7 && cell.innerHTML!="💡" )
        {
          cell.style.backgroundColor="#ffff94"
          cell.style.color="#ffff94"
  
        }
        else if(cell.innerHTML=="💡")
        {
          cell.style.backgroundColor="#ffff94"
        }
        else if(cell.innerHTML===""){
          cell.style.background="white"
        }
        row.appendChild(cell)
      }
      jatekter.appendChild(row)
    }
    //checkTable()
  }


//-----főmenü-------
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
      let playername=nameInput.value
      if(playername=="")
      {return}
        renderGameScreen()
        //end()
        menuDiv.style.display = "none"
    })

    historyButton.addEventListener("click", () => {
        renderHistory()
        menuDiv.style.display = "none"
    })
}


//------játéktér-------
const renderGameScreen=()=>{
    gameDiv.style.display = "flex"
    gameDiv.innerHTML = ""
    table.innerHTML=""

    //főcím hozzáadása az új oldalhoz
    const title = document.createElement("h1")
    title.innerHTML = "Kapcsold fel a lámpákat helyesen!"
    gameDiv.appendChild(title)

    let name=document.createElement("p")
    name.innerHTML="Játékos neve: " + nameInput.value
    gameDiv.appendChild(name)


    
    newGame()
    const br = document.createElement("br")
    gameDiv.appendChild(br)
    let backButton = document.createElement("button")
    backButton.innerHTML = "Vissza"
    backButton.addEventListener("click", () => {
        gameDiv.style.backgroundColor="white"
        renderMenu()
        table.innerHTML=""
        })

    let newGameButton = document.createElement("button")
    newGameButton.innerHTML="Új játék"
    newGameButton.id="restartButton"
    newGameButton.addEventListener("click", ()=>{
        gameDiv.style.backgroundColor="white"
        table.innerHTML=""
        newGame()
        renderGameScreen()
    })
    gameDiv.appendChild(backButton)
    gameDiv.appendChild(newGameButton)

  }

//------új játéktáblagenerálás----
const newGame=()=>{

    if(sizeInput.value=="könnyű")
    {
    gameDiv.appendChild(genTableEasy())
    }
    else if(sizeInput.value=="nehéz")
    {
    gameDiv.appendChild(genTableHard())
    }
    else if(sizeInput.value=="extrém")
    {
        gameDiv.appendChild(genTableTen())
    }

    delegal(gameDiv, "td", "click", (e) =>{
      
      gameController(e)
      checkTable(e)
      end()
    })
    gameover=false
}
//--------játék vége-------
const end=()=>{
  for(let i=0;i<matrix.length;i++)
  {
    for(let j=0;j<matrix.length;j++)
    {
      if(matrix[i][j]==="")
      {return}
    }
  }
  for(let i=0;i<matrix.length;i++)
  {
    for(let j=0;j<matrix.length;j++)
    {
      if(table.rows[i].cells[j].style.backgroundColor=="red")
      {
        return
      }
      if(matrix[i][j]>-1&&matrix[i][j]<5)
      {
        if(!table.rows[i].cells[j].style.backgroundColor=="green")
        {
          table.rows[i].cells[j].style.backgroundColor=="red"
          return
        }
      }
    }
  }
  gameDiv.style.backgroundColor="lightgreen"

}

//villanykörték felrakása és leszedése
const gameController=(e)=>{
    //gameover=false
    let row = e.target.parentElement.rowIndex
    let column = e.target.cellIndex
    //felvillan a villanykörte és lekapcsolodik
    if(e.target.innerHTML=="" || e.target.innerHTML==6 || e.target.innerHTML==7)
    {
      e.target.innerHTML="💡"
      e.target.style.backgroundColor="#ffff94"
      matrix[row][column]="💡"
      let j = column
      //let i = row
      if(column!=matrix.length-1)
      {
        j=column+1
        while(j<matrix.length && (matrix[row][j]==="" || matrix[row][j]==6|| matrix[row][j]==7))
        {

          if(matrix[row][j]!="💡")
          {
            if(matrix[row][j]==6)
            {
              matrix[row][j]=7
            }
            else{

              matrix[row][j]=6
            }
          }
          j++
          refreshTable()
        }
      }
      if(row!=matrix.length-1)
      {
        j=row+1
        while(j<matrix.length && (matrix[j][column]==="" || matrix[j][column]==6|| matrix[j][column]==7))
        {
          if(matrix[j][column]!="💡")
          {
            if(matrix[j][column]==6)
            {
              matrix[j][column]=7
            }
            else{
              matrix[j][column]=6
            }
          }
          j++
          refreshTable()
        }
      }
      if(column!=0)
      {
        j=column-1
        while(j>-1 && (matrix[row][j]==="" || matrix[row][j]==6|| matrix[row][j]==7))
        {
        
          if(matrix[row][j]==6)
            {
              matrix[row][j]=7
            }
            else{

              matrix[row][j]=6
            }
          j--
          refreshTable()
        }
      }
      if(row!=0)
      {
        j=row-1
        while(j>-1 && (matrix[j][column]==="" || matrix[j][column]==6|| matrix[j][column]==7))
        {
          
            if(matrix[j][column]!="💡")
            {
              if(matrix[j][column]==6)
              {
               matrix[j][column]=7
              }
              else
              {
                matrix[j][column]=6
              }
            }
          j--
          refreshTable()
        }
      }
      //checkTable(e)
      refreshTable()
    }

    else if(e.target.innerHTML=="💡")
    {
      e.target.innerHTML=""
      matrix[row][column]=""
      e.target.style.backgroundColor="white"
      //let table=document.querySelector("table")
      if(e.target.innerHTML=="" || e.target.innerHTML==6)
      {
        let j = column
        //let i = row
        if(column!=matrix.length-1)
        {
          j=column+1
          while(j<matrix.length && (matrix[row][j]==="" || matrix[row][j]==6|| matrix[row][j]==7))
          {
            if(matrix[row][j]==7)
            {
              matrix[row][j]=6
            }
            else if(matrix[row][j]==6)
            {
              matrix[row][j]=""
            }
            j++
          }
        }
        if(row!=matrix.length-1)
        {
          j=row+1
          while(j<matrix.length && (matrix[j][column]==="" || matrix[j][column]==6|| matrix[j][column]==7))
          {
            if(matrix[j][column]==7)
            {
              matrix[j][column]=6
            }
            else if(matrix[j][column]==6)
            {
              matrix[j][column]=""
            }
            j++
          }
        }
        if(column!=0)
        {
          j=column-1
          while(j>-1 && (matrix[row][j]==="" || matrix[row][j]==6|| matrix[row][j]==7))
          {
            if(matrix[row][j]==7)
            {
              matrix[row][j]=6
            }
            else if(matrix[row][j]==6)
            {
              matrix[row][j]=""
            }
            j--
          }
        }
        if(row!=0)
        {
          j=row-1
          while(j>-1 && (matrix[j][column]==="" || matrix[j][column]==6 || matrix[j][column]==7))
          {
            if(matrix[j][column]==7)
            {
              matrix[j][column]=6
            }
            else if(matrix[j][column]==6)
            {
              matrix[j][column]=""
            }
            j--
          }
        }
      //checkTable(e)
      refreshTable()
    }    
  }
  //checkLights(e)
}

//----játék mentése-----
const renderHistory=()=>{
  historyDiv.style.display="flex";
  const historyUl= document.createElement("ul")
  if(history)
  {
    const listItem = document.createElement("li")
    listItem.innerHTML+="Név: " + nameInput.value + ", pálya: " + sizeInput.value + ", idő: ??"
    historyUl.appendChild(listItem)
    historyDiv.innerHTML=""
    historyDiv.appendChild(historyUl)
  }
  else{
    historyDiv.innerHTML=""
    historyDiv.innerHTML="Nincs még előzmény"
  }
  const backButton = document.createElement("button")
      backButton.innerHTML = "Vissza"
      backButton.addEventListener("click", () => {
        renderMenu()
      })
      historyDiv.appendChild(backButton)
}

//----main------
renderMenu()