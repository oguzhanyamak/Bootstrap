function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}


function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 48);
}

function getRandomSymbol(){
    const symbols = '!@£#$%&_~'
    return symbols[Math.floor(Math.random() * symbols.length)]
}

const randomFunctions = {getRandomLower,getRandomNumber,getRandomSymbol,getRandomUpper}

function generatePassword() {
    const length = 16;
    let generatedPassword='';
    for(let x =0 ; x < length;x++){
        generatedPassword += Object.values(randomFunctions)[Math.floor(Math.random() * 4)]();
    }
    return generatedPassword;
}

const spanResult = document.getElementById('result');
const generateButton = document.getElementById('generate')
const clipBoardButton = document.getElementById('clipboard')

generateButton.addEventListener('click',()=>{
    spanResult.innerText = generatePassword();
})

clipBoardButton.addEventListener('click',()=>{
    const password = spanResult.innerText;
    if(!password){
        return;
    }
    const textarea = document.createElement('textarea');
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
})