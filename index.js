

let mysteryCharacter = {}
const questions = []
let categories = []
// Get the modal
var modal = document.getElementById("myModal");



// Get the <span> element that closes the modal
var btn = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal and load characters
window.addEventListener('load', () => {

    const charsURL = "https://swgw.herokuapp.com/characters"
    const questURL = "https://swgw.herokuapp.com/questions"
    
    function fetchAll(){
        fetch(charsURL)
        .then(resp => resp.json())
        .then(megaList => load(megaList))
    }  
    function fetchAllQuestions(){
        fetch(questURL)
        .then(resp => resp.json())
        .then(allQuestions => {
            for(let quest of allQuestions){
                questions.push(quest)
            }
        })
    }  
    
    function load(megaList){
        let CHARDISPLAY1 = megaList.slice(0,20)
        CHARDISPLAY1.id = 1
        let CHARDISPLAY2 = megaList.slice(21,41)
        CHARDISPLAY2.id = 2
        let CHARDISPLAY3 = megaList.slice(42,62)
        CHARDISPLAY3.id = 3
        let CHARDISPLAY4 = megaList.slice(63,81)
        CHARDISPLAY4.id = 4
        optionsArray = [CHARDISPLAY1, CHARDISPLAY2, CHARDISPLAY3, CHARDISPLAY4]
        displayCharOptions(CHARDISPLAY1, optionsArray)
        seedCategories(CHARDISPLAY1)
    }
    fetchAll()
    fetchAllQuestions()
    
    modal.style.display = "block";
})

// When the user clicks on <span> (x), close the modal
btn.onclick = function() {
  modal.style.display = "none";
  
}


//on first dom interaction - play music
const audio = document.querySelector("#play")
window.addEventListener("click", ()=>{
    audio.play()
    audio.volume = 0.2
    modal.style.display = "none";
})



let $CHARS = []


const pre = document.querySelector('#pre-session')
const main = document.querySelector("#session-main")
main.style.display = "none"



function seedCategories(CHARDISPLAY1){
    let seederQs = CHARDISPLAY1[0].questions
    for(let q of seederQs){
        categories.push(q.category)
    }
}

const removeDuplicateCats = (categories) => {
    const flag = [];
    const unique = [];
    categories.forEach(elem => {
        if(!flag[elem.name]){
            flag[elem.name] = true;
            unique.push(elem);
        }
    })
    return unique;
}

// pre-game character selection display

const outerImagesDiv = document.querySelector(".outer-images")
function displayCharOptions(charList, optionsArray){
    let imagesDiv = document.createElement("div")
    let buttonDiv = document.createElement('div')
    let first = document.createElement('button')
    let second = document.createElement('button')
    let third = document.createElement('button')
    let fourth = document.createElement('button')
    outerImagesDiv.appendChild(imagesDiv)
    first.addEventListener('click', ()=> {
    outerImagesDiv.removeChild(imagesDiv)
    displayCharOptions(optionsArray[0], optionsArray)}) 
    second.addEventListener('click', ()=> {
    outerImagesDiv.removeChild(imagesDiv)
    displayCharOptions(optionsArray[1], optionsArray)}) 
    third.addEventListener('click', ()=> {
    outerImagesDiv.removeChild(imagesDiv)
    displayCharOptions(optionsArray[2], optionsArray)}) 
    fourth.addEventListener('click', ()=> {
    outerImagesDiv.removeChild(imagesDiv)
    displayCharOptions(optionsArray[3], optionsArray)}) 

    buttonDiv.id = "charOptionsSelect"
    imagesDiv.className = "images"
    first.className = "charSelectButtons" 
    second.className = "charSelectButtons"
    third.className = "charSelectButtons"
    fourth.className = "charSelectButtons"

    first.innerText = "Page 1"
    second.innerText = "Page 2"
    third.innerText = "Page 3"
    fourth.innerText = "Page 4"

    for(const char of charList){
        let charCard = document.createElement('div')
        charCard.id = char.id
            charCard.className = "charSelectCard"
            let cname = document.createElement('p')
            cname.textContent = char.name
            let pic = document.createElement('img')
            pic.src = `public/${char.image}`
            pic.addEventListener('click', ()=> {
                chooseCharacters(char)
            })    
            charCard.append(cname, pic)
            imagesDiv.appendChild(charCard)
        }
    buttonDiv.append(first, second, third, fourth)
    imagesDiv.append(buttonDiv)
}

function chooseCharacters(char){
        if($CHARS.length < 16 && $CHARS.indexOf(char) === -1 ){
            $CHARS.push(char)
            fillCharacter(char)
        }     
        console.log($CHARS)
    }
    
  
    for(let elem of $CHARS){
        if(elem.id == thingy.id){
            $CHARS.splice($CHARS.indexOf(elem), 1)
        }
    }
    
    const beginButtonArea = document.createElement('div')
    const outerBeginMenu = document.querySelector('.outer-begin-menu')
    const beginMenu = document.createElement('div')
    const beginButton = document.createElement('button')
    
    outerBeginMenu.appendChild(beginMenu)
    beginButtonArea.appendChild(beginButton)
    outerBeginMenu.appendChild(beginButtonArea)
    beginButton.style.display = 'none'
    
    beginButton.innerText = "BEGIN"
    beginMenu.className = "begin-menu-panel"
    beginButtonArea.className = "charOptionsSelect begin"
    
    beginButton.addEventListener('click', () =>{
            pre.style.display = "none"
            main.style.display = "flex"
            fillCharacterTray()
        })

    function fillCharacter(char){
        let charCard2 = document.createElement('div')
        let cname = document.createElement('p')
        let pic = document.createElement('img')

        charCard2.addEventListener('click', (e)=> {
            removeCharacter(e)
        })
        
        charCard2.id = char.id
        pic.id = char.id
        charCard2.className = "charSelectCard"
        cname.textContent = char.name
        pic.src = `public/${char.image}`
        pic.className = "charSelectPic"

        charCard2.append(cname, pic)
        beginMenu.appendChild(charCard2)
        if($CHARS.length === 16){
            beginButton.style.display = "block"
            } 
        }

    function removeCharacter(e){
        let thingy = e.target
        if(thingy.className == "charSelectCard"){
            thingy.remove()
        } else {
            thingy.parentNode.remove()
            }
        for(let elem of $CHARS){
            if(elem.id == thingy.id){
                $CHARS.splice($CHARS.indexOf(elem), 1)
            }
        }
        };
    

// post character select aka session mode

const innerCharTray = document.querySelector('.inner-character-display-panel')

const outerLeft = document.querySelector('.outer-left-div')
const outerRight = document.querySelector('.outer-right-div')
const innerLeft = document.querySelector('.inner-left-div')
const innerRight = document.querySelector('.inner-right-div')

const outerCharTray = document.querySelector('.outer-character-display-panel')



let uniqCats =[
    {
        "id": 1,
        "name": "Name",
        "created_at": "2021-03-06T04:25:59.646Z",
        "updated_at": "2021-03-06T04:25:59.646Z"
    },
    {
        "id": 2,
        "name": "Gender",
        "created_at": "2021-03-06T04:25:59.656Z",
        "updated_at": "2021-03-06T04:25:59.656Z"
    },
    {
        "id": 3,
        "name": "Skin tone",
        "created_at": "2021-03-06T04:25:59.660Z",
        "updated_at": "2021-03-06T04:25:59.660Z"
    },
    {
        "id": 5,
        "name": "Eye color",
        "created_at": "2021-03-06T04:25:59.675Z",
        "updated_at": "2021-03-06T04:25:59.675Z"
    },
    {
        "id": 6,
        "name": "Hair color",
        "created_at": "2021-03-06T04:25:59.677Z",
        "updated_at": "2021-03-06T04:25:59.677Z"
    },
    {
        "id": 8,
        "name": "Home world",
        "created_at": "2021-03-06T04:25:59.681Z",
        "updated_at": "2021-03-06T04:25:59.681Z"
    },
    {
        "id": 9,
        "name": "Species",
        "created_at": "2021-03-06T04:25:59.683Z",
        "updated_at": "2021-03-06T04:25:59.683Z"
    },
    {
        "id": 7,
        "name": "Mass",
        "created_at": "2021-03-06T04:25:59.679Z",
        "updated_at": "2021-03-06T04:25:59.679Z"
    },
    {
        "id": 10,
        "name": "Birth year",
        "created_at": "2021-03-06T04:25:59.685Z",
        "updated_at": "2021-03-06T04:25:59.685Z"
    },
    {
        "id": 4,
        "name": "Height",
        "created_at": "2021-03-06T04:25:59.663Z",
        "updated_at": "2021-03-06T04:25:59.663Z"
    }
]



let cnum = 0

const outerScratchPanel = document.querySelector('.outer-scratch-panel')
const outerCharTraits = document.querySelector('.outer-char-bio-panel')
const innerCharTraits = document.createElement('div')


innerCharTraits.className = "inner-char-traits-div"
outerCharTraits.appendChild(innerCharTraits)
const outerMysteryPanel = document.querySelector(".outer-mystery-panel")
const outerQP = document.querySelector(".outer-questions-panel")


let catDiv = document.querySelector('.outer-categories')

let questionUL = document.createElement('ul')
let questionLI = document.createElement('li')
questionLI.className ="question"
outerQP.appendChild(questionUL)
questionLI.innerText = "PRESS ARROW KEY TO CHANGE CATEGORY/QUESTION, ENTER TO SELECT"
questionUL.appendChild(questionLI)

let temph5 = document.createElement('h5')
temph5.innerText = "Categories"
temph5.className ="cat"
catDiv.appendChild(temph5)

function fillCharacterTray(){
    for (let char of $CHARS){
        let charContainer = document.createElement('div')
        let charCard = document.createElement('div')
        let charFront = document.createElement('div')
        let charBack = document.createElement('div')
        let cname = document.createElement('p')
        let pic2 = document.createElement("img")

        let pic = document.createElement('img')
        charContainer.className = "char_container"
        charCard.className = "char_card"
        charFront.className = "char_front"
        charBack.className = "char_back"
        charContainer.id = char.id
        cname.textContent = char.name
        pic.src = `public/${char.image}`
        pic2.src = "card_back_1.png"
        charBack.append(pic2)
        charFront.append( pic)
        charCard.append(charFront, charBack)
        charContainer.appendChild(charCard)
        outerCharTray.appendChild(charContainer)
        charContainer.addEventListener('mouseover', () =>{
            displayCharTraits(char)
        })
       
        charCard.addEventListener('click', function (){
            charCard.classList.toggle('flipped')
        })
    }
    createMysteryCharacter()
    let init = $CHARS[0]
    displayCharTraits(init)
}


function createMysteryCharacter(){
    mysteryCharacter = $CHARS[Math.floor(Math.random() * $CHARS.length)];
    generateQuestionaire()
    
    let mysteryContainer = document.createElement('div')
    let mysteryCard = document.createElement('div')
    let mysteryFront = document.createElement('div')
    let mysteryBack = document.createElement('div')
    let cname = document.createElement('p')
    let pic2 = document.createElement("img")
    let mysteryPic = document.createElement('img')
    
    
    mysteryPic.src = "card_back_1-cutout.png"
    mysteryContainer.className = "mystery_container"
    mysteryCard.className = "mystery_card"
    mysteryFront.className = "mystery_front"
    mysteryBack.className = "mystery_back"
    mysteryContainer.id = mysteryCharacter.id
    cname.textContent = mysteryCharacter.name
    pic2.src = `public/${mysteryCharacter.image}`
    
    mysteryBack.append(cname, pic2)
    mysteryFront.append(mysteryPic)
    mysteryCard.append(mysteryFront, mysteryBack)
    mysteryContainer.appendChild(mysteryCard)
    outerMysteryPanel.appendChild(mysteryContainer)
    
    mysteryCard.addEventListener('click', function (){
        mysteryCard.classList.toggle('flipped')
    })
    
    
    
}


function displayCharTraits(char){
    while (innerCharTraits.firstChild) {
        innerCharTraits.removeChild(innerCharTraits.firstChild)
    };
        let name = document.createElement('h5')
        let pic = document.createElement('img')
        let gender = document.createElement('p') 
        let species = document.createElement('p') 
        let homeworld = document.createElement('p') 
        let hair = document.createElement('p') 
        let eye = document.createElement('p') 
        let height = document.createElement('p')
        let mass = document.createElement('p') 
        let skin = document.createElement('p') 
        let birth = document.createElement('p') 

        pic.src = `public/${char.image}`
        name.textContent = `Name: ${char.name}`
        gender.textContent = `Gender: ${char.gender}`
        species.textContent = `Species: ${char.species.name}`
        homeworld.textContent = `Home: ${char.homeworld.name}`
        hair.textContent = `Hair: ${char.hair_color}`
        eye.textContent = `Eye: ${char.eye_color}`
        skin.textContent = `Complexion: ${char.skin_tone}`
        if(char.height === 0){
            height.textContent = "unknown"
        } else {
            height.textContent = `Height: ${char.height} cm`
        };
        if(char.mass === 0 ) {
            mass.textContent = "unknown"
        } else {
            mass.textContent = `Mass: ${char.mass}`
        };
        if(char.birth_year === 0){
            birth.textContent = "unknown"
        } else {
            birth.textContent = `Birth Year ${char.birth_year} (BBY)`
        };
        innerCharTraits.append(name, pic, gender, species, homeworld, hair, eye, skin, height, mass, birth);
}



function generateQuestionaire(){
    for(let question of mysteryCharacter.questions){
        questions.push(question)
    }
    flowQuestions()
    
}


let QLB = document.querySelector(".left")
let QRB = document.querySelector(".right")



QLB.addEventListener('click', () => {
handleCLBC()})
QRB.addEventListener('click', () =>{
handleCRBC()})


document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             
         evt.originalEvent.touches; 
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            handleCLBC()
            /* left swipe */ 
        } else {
            /* right swipe */
            handleCRBC()
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
            handleQUBC()
        } else { 
            /* down swipe */
            handleQDBC()
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};




    
window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
  
    switch (event.key) {
      case "ArrowDown": handleQDBC()
        // Do something for "down arrow" key press.
        break;
      case "ArrowUp": handleQUBC()
        // Do something for "up arrow" key press.
        break;
      case "ArrowLeft": handleCLBC()    
        // Do something for "left arrow" key press.
        break;
      case "ArrowRight": handleCRBC()
        // Do something for "right arrow" key press.
        break;
      case "Enter": handleAsk() 
      break;
      case "SpaceBar": console.log("space")
        break;
   
      default:
        return; // Quit when this doesn't handle the key event.
    }
  
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }, true);


function handleCLBC(){
    if(cnum > 0){
        cnum --
    } else {
        cnum = uniqCats.length -1
    }
    
   
    displayCategory()
}
function handleCRBC(){
    if(cnum < uniqCats.length -1){
        cnum ++
    } else {
        cnum = 0
    }
    
    displayCategory()
}


function displayCategory(){
    catDiv.querySelector('h5').remove()
    let displayedCat = document.createElement('h5')

    displayedCat.innerText = uniqCats[cnum].name
    displayedCat.className = "cat"
    catDiv.appendChild(displayedCat)
       
}
let genderQuestions = []
let specificNameQuestions = []
let speciesQuestions = []
let specificSpeciesQuestions = []
let heightQuestions = []
let hairQuestions = []
let homeworldQuestions = []
let specificHomeworldQuestions = []

let eyeQuestions = []
let skintoneQuestions = []
let massQuestions = []
let birthQuestions = []
let nameQuestions = []
function flowQuestions(){

//-----return 16 questions for name specific to your chars
for(let q of questions){
    if (q.category.id === 1){
        nameQuestions.push(q)
    }
}
for (let q of nameQuestions){
    for(let c of $CHARS){
        if(c.name === q.attribute_desc){
            specificNameQuestions.push(q)
        }
    }
}
//----------------------------------------
//------------gender questions-----------//
for(q of questions){
    if(q.category.id === 2){
        genderQuestions.push(q)
    }}
    
    //----- species questions --------//
    for(let q of questions){
        if (q.category.id === 9){
            speciesQuestions.push(q)
        }
    }
    for (let q of speciesQuestions){
        for(let c of $CHARS){
            if(c["species"]["name"] === q.attribute_desc){
                specificSpeciesQuestions.push(q)
            }
        }
    }
    //---------------height-------------------------
    for(let q of questions){
        if (q.category.id === 4){
            heightQuestions.push(q)
        }
    }
    //------------------hair questions----------------------//
    for(q of questions){
        if(q.category.id === 6){
            hairQuestions.push(q)
        }}
        //-----homeworld--------------------//
        for(let q of questions){
            if (q.category.id === 8){
                homeworldQuestions.push(q)
            }
        }
        for (let q of homeworldQuestions){
            for(let c of $CHARS){
                if(c.homeworld.name === q.attribute_desc){
                    specificHomeworldQuestions.push(q)
                }
            }
        }
        
      
//--------------------eye color--------------------
for(q of questions){
    if(q.category.id === 5){
        eyeQuestions.push(q)
}}
//----------------skin tone------------------------//
for(q of questions){
    if(q.category.id === 3){
        skintoneQuestions.push(q)
    }}
    
 //----------------mass------------------------
    for(q of questions){
        if(q.category.id === 7){
            massQuestions.push(q)
    }}
 //----------------birth------------------------
    for(q of questions){
        if(q.category.id === 10){
            birthQuestions.push(q)
    }}
 //----------------------------------------
 //----------------------------------------
// question up

}

function handleQUBC(){
    let uniqSpeciesQuestions = [...new Set(specificSpeciesQuestions)];
    let uniqHomeWolrdQuestions = [...new Set(specificHomeworldQuestions)];
    li = document.querySelector('.question')
    let max = specificNameQuestions.length
    switch (cnum) {
        case 0:
            if (qnum < max){
                let qli = document.createElement('li')
                qli.className ="question"
                qli.id = specificNameQuestions[qnum].id
                qli.innerText = specificNameQuestions[qnum].question
              questionUL.removeChild(li)
              questionUL.appendChild(qli)
              qnum ++
          } else {
              qnum = 0
              handleQUBC()
          }
          break;
        case 1:
            max = genderQuestions.length
            if (qnum < max){
                let qli = document.createElement('li')
                qli.className ="question"
                qli.id = genderQuestions[qnum].id
                qli.innerText = genderQuestions[qnum].question
              questionUL.removeChild(li)
              questionUL.appendChild(qli)
              qnum ++
          } else {
              qnum = 0
            //   handleQUBC()
          }
          // Do something for "up arrow" key press.
          break;
        case 2:   
                max = skintoneQuestions.length
                if (qnum < max){
                    let qli = document.createElement('li')
                    qli.className ="question"
                    qli.id = skintoneQuestions[qnum].id
                    qli.innerText = skintoneQuestions[qnum].question
                questionUL.removeChild(li)
                questionUL.appendChild(qli)
                qnum ++
            } else {
                qnum = 0
                handleQUBC()
            }
          break;
        case 3:
            max = eyeQuestions.length
                if (qnum < max){
                    let qli = document.createElement('li')
                    qli.className ="question"
                    qli.id = eyeQuestions[qnum].id
                    qli.innerText = eyeQuestions[qnum].question
                questionUL.removeChild(li)
                questionUL.appendChild(qli)
                qnum ++
            } else {
                qnum = 0
                handleQUBC()
            }
            break;
            case 4:
                max = hairQuestions.length
                    if (qnum < max){
                        let qli = document.createElement('li')
                        qli.className ="question"
                        qli.id = hairQuestions[qnum].id
                        qli.innerText = hairQuestions[qnum].question
                    questionUL.removeChild(li)
                    questionUL.appendChild(qli)
                    qnum ++
                } else {
                    qnum = 0
                    handleQUBC()
            }
            // Do something for "enter" or "return" key press.
            break;
        case 5:
            max = uniqHomeWolrdQuestions.length
            if (qnum < max){
                let qli = document.createElement('li')
                qli.className ="question"
                qli.id = uniqHomeWolrdQuestions[qnum].id
                qli.innerText = uniqHomeWolrdQuestions[qnum].question
              questionUL.removeChild(li)
              questionUL.appendChild(qli)
              qnum ++
          } else {
              qnum = 0
              handleQUBC()
          }
          break;
        case 6:
            max = uniqSpeciesQuestions.length
            if (qnum < max){
                let qli = document.createElement('li')
                qli.className ="question"
                qli.id = uniqSpeciesQuestions[qnum].id
                qli.innerText = uniqSpeciesQuestions[qnum].question
              questionUL.removeChild(li)
              questionUL.appendChild(qli)
              qnum ++
          } else {
              qnum = 0
              handleQUBC()
          }
          break;
        case 7:
            max = massQuestions.length
            if (qnum < max){
                let qli = document.createElement('li')
                qli.className ="question"
                qli.id = massQuestions[qnum].id
                qli.innerText = massQuestions[qnum].question
              questionUL.removeChild(li)
              questionUL.appendChild(qli)
              qnum ++
          } else {
              qnum = 0
              handleQUBC()
          }
          break;
        case 8:
            max = birthQuestions.length
            if (qnum < max){
                let qli = document.createElement('li')
                qli.className ="question"
                qli.id = birthQuestions[qnum].id
                qli.innerText = birthQuestions[qnum].question
              questionUL.removeChild(li)
              questionUL.appendChild(qli)
              qnum ++
          } else {
              qnum = 0
              handleQUBC()
          }
          break;
        case 9:
            max = heightQuestions.length
            if (qnum < max){
                let qli = document.createElement('li')
                qli.className ="question"
                qli.id = heightQuestions[qnum].id
                qli.innerText = heightQuestions[qnum].question
              questionUL.removeChild(li)
              questionUL.appendChild(qli)
              qnum ++
          } else {
              qnum = 0
              handleQUBC()
          }
          break;
                        
          
        default:
          return; // Quit when this doesn't handle the key event.
      }

}
let qnum = 0
function handleQDBC(){
    let uniqSpeciesQuestions = [...new Set(specificSpeciesQuestions)];
let uniqHomeWolrdQuestions = [...new Set(specificHomeworldQuestions)];
    li = document.querySelector('.question')
    switch (cnum) {
        case 0:
            if (qnum > -1 && qnum < specificNameQuestions.length){
                let qli = document.createElement('li')
                qli.className ="question"
                qli.id = specificNameQuestions[qnum].id
                qli.innerText = specificNameQuestions[qnum].question
              questionUL.removeChild(li)
              questionUL.appendChild(qli)
              qnum --
          } else {
              qnum = specificNameQuestions.length -1
              handleQUBC()
          }
          break;
        case 1:
           
            if (qnum > -1 && qnum < genderQuestions.length){
                let qli = document.createElement('li')
                qli.className ="question"
                qli.id = genderQuestions[qnum].id
                qli.innerText = genderQuestions[qnum].question
              questionUL.removeChild(li)
              questionUL.appendChild(qli)
              qnum --
          } else {
              qnum = genderQuestions.length -1
              handleQUBC()
          }
          // Do something for "up arrow" key press.
          break;
        case 2:   
               
                if (qnum > -1 && qnum < skintoneQuestions){
                    let qli = document.createElement('li')
                    qli.className ="question"
                    qli.id = skintoneQuestions[qnum].id
                    qli.innerText = skintoneQuestions[qnum].question
                questionUL.removeChild(li)
                questionUL.appendChild(qli)
                qnum --
            } else {
                qnum = skintoneQuestions.length -1
                handleQUBC()
            }
          break;
        case 3:
         
                if (qnum > -1 && qnum < eyeQuestions){
                    let qli = document.createElement('li')
                    qli.className ="question"
                    qli.id = eyeQuestions[qnum].id
                    qli.innerText = eyeQuestions[qnum].question
                questionUL.removeChild(li)
                questionUL.appendChild(qli)
                qnum --
            } else {
                qnum = eyeQuestions.length -1
                handleQUBC()
            }
            break;
            case 4:
             
                    if (qnum > -1 && qnum < hairQuestions){
                        let qli = document.createElement('li')
                        qli.className ="question"
                        qli.id = hairQuestions[qnum].id
                        qli.innerText = hairQuestions[qnum].question
                    questionUL.removeChild(li)
                    questionUL.appendChild(qli)
                    qnum --
                } else {
                    qnum = hairQuestions.length -1
                    handleQUBC()
            }
            // Do something for "enter" or "return" key press.
            break;
        case 5:
            
            if (qnum > -1 && qnum < uniqHomeWolrdQuestions){
                let qli = document.createElement('li')
                qli.className ="question"
                qli.id = uniqHomeWolrdQuestions[qnum].id
                qli.innerText = uniqHomeWolrdQuestions[qnum].question
              questionUL.removeChild(li)
              questionUL.appendChild(qli)
              qnum --
          } else {
              qnum = uniqHomeWolrdQuestions.length -1
              handleQUBC()
          }
          break;
        case 6:
            if (qnum > -1 && qnum < uniqSpeciesQuestions){
                let qli = document.createElement('li')
                qli.className ="question"
                qli.id = uniqSpeciesQuestions[qnum].id
                qli.innerText = uniqSpeciesQuestions[qnum].question
              questionUL.removeChild(li)
              questionUL.appendChild(qli)
              qnum --
          } else {
              qnum = uniqSpeciesQuestions.length -1
              handleQUBC()
          }
          break;
        case 7:
            
            if (qnum > -1 && qnum < massQuestions){
                let qli = document.createElement('li')
                qli.className ="question"
                qli.id = massQuestions[qnum].id
                qli.innerText = massQuestions[qnum].question
              questionUL.removeChild(li)
              questionUL.appendChild(qli)
              qnum --
          } else {
              qnum = massQuestions.length -1
              handleQUBC()
          }
          break;
        case 8:
            if (qnum > -1 && qnum < birthQuestions){
                let qli = document.createElement('li')
                qli.className ="question"
                qli.id = birthQuestions[qnum].id
                qli.innerText = birthQuestions[qnum].question
              questionUL.removeChild(li)
              questionUL.appendChild(qli)
              qnum --
          } else {
              qnum = birthQuestions.length -1
              handleQUBC()
          }
          break;
        case 9:
            if (qnum > -1 && qnum < heightQuestions){
                let qli = document.createElement('li')
                qli.className ="question"
                qli.id = heightQuestions[qnum].id
                qli.innerText = heightQuestions[qnum].question
              questionUL.removeChild(li)
              questionUL.appendChild(qli)
              qnum --
          } else {
              qnum = heightQuestions.length -1
              handleQUBC()
          }
          break;
        default:
          return; // Quit when this doesn't handle the key event.
      }

}



function handleAsk(){
    let ask = document.querySelector(".question")
    let question = questions.find(question => question.id == ask.id)
    questionControlFlow(question)
}

function questionControlFlow(question){
    let answer = false
    switch (question.category.id) {
        case 1:
          if(mysteryCharacter.name == question.attribute_desc) {
              answer = true
          }
          break;
        case 2:
            if(mysteryCharacter.gender == question.attribute_desc) {
            answer = true
        }
          break;
        case 3:
            if(mysteryCharacter.skin_tone == question.attribute_desc) {
            answer = true
        }
          break;
        case 4:
            if(question.attribute_desc === 0 && mysteryCharacter.height === 0){
                answer = true
            } else {
                if(question.attribute_desc == 100 && mysteryCharacter.height <= 100){
                    answer = true
                } else {
                    if(question.attribute_desc == 200 && mysteryCharacter.height >= 200){
                        answer = true
                    }
                }}
        break;
        case 5:
            if(mysteryCharacter.eye_color == question.attribute_desc) {
                answer = true
            }
          break;
        case 6:
            if(mysteryCharacter.hair_color == question.attribute_desc) {
                answer = true
            }
          break;
        case 7:
            if(question.attribute_desc === 0 && mysteryCharacter.mass === 0){
                answer = true
            } else {
                if(question.attribute_desc == 50 && mysteryCharacter.mass < 50){
                    answer = true
                } else {
                    if(question.attribute_desc == 75 && mysteryCharacter.mass >= 75){
                        answer = true
                    }
                }}
          break;
        case 8:
            if(mysteryCharacter.homeworld.name == question.attribute_desc) {
                answer = true
            }
          break;
        case 9:
            if(mysteryCharacter.species.name == question.attribute_desc) {
                answer = true
            }
          break;
        case 10:
            if(question.attribute_desc === 0 && mysteryCharacter.birth_year === 0){
                answer = true
            } else if(question.attribute_desc == 50 && mysteryCharacter.birth_year <= 50){
                    answer = true
            } else if(question.attribute_desc == 100 && mysteryCharacter.birth_year <= 100){
                        answer = true
                    }
                
          break;
        default:
          return; // Quit when this doesn't handle the key event.
      }
      handleAnswer(answer, question)
}

function toggleToggleToggle(char){
    char.classList.toggle('flipped')
}

function handleAnswer(answer, question){

    let mysteryCard = document.querySelector(".mystery_card")
    let charCards = document.querySelectorAll(".char_card")
    const scratchQ = document.createElement('p')
    const scratchA = document.createElement('p')
    
    scratchQ.innerText = `Q: ${question.question}`

    

    if (question.category.name == "Name" && answer == true){
        console.log("Hot diggity dog!")
        mysteryCard.classList.toggle('flipped')
        scratchA.innerText = "Hello There!"
        
    } else if(answer == true){
        scratchA.innerText = "Hello There!"
    } else {
        scratchA.innerText = "* visible confustion *"
    }

    

    outerScratchPanel.append(scratchQ, scratchA)
    console.log(question)
    console.log(answer)
    //if known eye color, reverse answer

    //for number questions, unknown is less than all. change that.
}

// if(answer === true){
//     scratchA.innerText = "Hello There!"
// } else if (answer === false && question.attribute_desc == 0) {
//     scratchA.innerText = "Hello There!"
// } else {
//     scratchA.innerText = "* visible confustion *"
// }