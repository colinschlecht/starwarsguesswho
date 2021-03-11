
// Get the modal
var modal = document.getElementById("myModal");



// Get the <span> element that closes the modal
var btn = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal and load characters
window.addEventListener('load', () => {
    const charsURL = "http://localhost:3000/characters"
    
    function fetchAll(){
        fetch(charsURL)
        .then(resp => resp.json())
        .then(megaList => load(megaList))
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
    
    
    modal.style.display = "block";
})

// When the user clicks on <span> (x), close the modal
btn.onclick = function() {
  modal.style.display = "none";
  
}

var un_mute = document.getElementById('un-mute');

un_mute.onclick = function() {
   alert('toggle player here');
};

const audio = document.querySelector("#play")
window.addEventListener("click", ()=>{
    audio.play()
})


// global variable for game session character collection
let $CHARS = []


const pre = document.querySelector('#pre-session')
const main = document.querySelector("#session-main")
main.style.display = "none"



// on page load - call is made to db and character options are loaded
//temporarily moved to window load
// document.addEventListener("DOMContentLoaded", () => {
    
//     const charsURL = "http://localhost:3000/characters"
    
//     function fetchAll(){
//         fetch(charsURL)
//         .then(resp => resp.json())
//         .then(megaList => load(megaList))
//     }  
    
//     function load(megaList){
//         let CHARDISPLAY1 = megaList.slice(0,20)
//         CHARDISPLAY1.id = 1
//         let CHARDISPLAY2 = megaList.slice(21,41)
//         CHARDISPLAY2.id = 2
//         let CHARDISPLAY3 = megaList.slice(42,62)
//         CHARDISPLAY3.id = 3
//         let CHARDISPLAY4 = megaList.slice(63,81)
//         CHARDISPLAY4.id = 4
//         optionsArray = [CHARDISPLAY1, CHARDISPLAY2, CHARDISPLAY3, CHARDISPLAY4]
//         displayCharOptions(CHARDISPLAY1, optionsArray)
//         seedCategories(CHARDISPLAY1)
//     }
//     fetchAll()

    
// })

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
        if($CHARS.length < 16 ){
            $CHARS.push(char)
            fillCharacter(char)
        }     
    }
    
    
    const beginButtonArea = document.createElement('div')
    const outerBeginMenu = document.querySelector('.outer-begin-menu')
    const beginMenu = document.createElement('div')
    const beginButton = document.createElement('button')
    
    outerBeginMenu.appendChild(beginMenu)
    beginButtonArea.appendChild(beginButton)
    outerBeginMenu.appendChild(beginButtonArea)
    
    beginButton.innerText = "BEGIN"
    beginMenu.className = "begin-menu-panel"
    beginButtonArea.className = "charOptionsSelect"
    
    beginButton.addEventListener('click', () =>{
            pre.style.display = "none"
            main.style.display = "flex"
            fillCharacterTray()
        })

    function fillCharacter(char){
        let charCard2 = document.createElement('div')
        let cname = document.createElement('p')
        let pic = document.createElement('img')
        
        charCard2.id = char.id
        charCard2.className = "charSelectCard"
        cname.textContent = char.name
        pic.src = `public/${char.image}`
        charCard2.append(cname, pic)
        beginMenu.appendChild(charCard2)
        // if($CHARS.length === 16){
            // }
        }

    

// post character select aka session mode

const innerCharTray = document.querySelector('.inner-character-display-panel')

const outerLeft = document.querySelector('.outer-left-div')
const outerRight = document.querySelector('.outer-right-div')
const innerLeft = document.querySelector('.inner-left-div')
const innerRight = document.querySelector('.inner-right-div')

const outerCharTray = document.querySelector('.outer-character-display-panel')

function fillCharacterTray(){
    
    for (let char of $CHARS){
        let charCard3 = document.createElement('div')
        let cname = document.createElement('p')
        let pic = document.createElement('img')

        charCard3.id = char.id
        charCard3.className = "charSelectCard"
        cname.textContent = char.name
        pic.src = `public/${char.image}`

        charCard3.append(cname, pic)
        outerCharTray.appendChild(charCard3)
    }

}


        