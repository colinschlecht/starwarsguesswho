// global variable for game session character collection
let $CHARS = []
$CHARS.id = 1

// on page load - call is made to db and character options are loaded
document.addEventListener("DOMContentLoaded", () => {
    
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
    }
    fetchAll()
    
})


// pre-game character selection display

function displayCharOptions(charList, optionsArray){
    let buttonDiv = document.createElement('div')
    let outerImagesDiv = document.querySelector(".outer-images")
    let imagesDiv = document.createElement("div")
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
            let cname = document.createElement('h4')
            cname.textContent = char.name
            let pic = document.createElement('img')
            pic.src = `public/${char.image}`
            pic.addEventListener('click', ()=> chooseCharacters(char))    
            charCard.append(cname, pic)
            imagesDiv.appendChild(charCard)
        }
    buttonDiv.append(first, second, third, fourth)
    imagesDiv.append(buttonDiv)
}

function chooseCharacters(char){
        if($CHARS.length < 17){
            $CHARS.push(char)
        }     
    }