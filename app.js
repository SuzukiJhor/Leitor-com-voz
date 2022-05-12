const main = document.querySelector('main');
const buttonInsertText = document.querySelector('.btn-toggle');
const divTextBox = document.querySelector('.text-box');
const closeDivTextBox = document.querySelector('.close')
const selectElement = document.querySelector('select')
const buttonReadText = document.querySelector('#read')
const textArea = document.querySelector('textarea')

const humanExpressions = [
    { img: './img/drink.jpg', text: 'Estou com sede' },
    { img: './img/food.jpg', text: 'Estou com fome' },
    { img: './img/tired.jpg', text: 'Estou cansado' },
    { img: './img/hurt.jpg', text: 'Estou machucado' },
    { img: './img/happy.jpg', text: 'Estou feliz' },
    { img: './img/angry.jpg', text: 'Estou com raiva' },
    { img: './img/sad.jpg', text: 'Estou triste' },
    { img: './img/scared.jpg', text: 'Estou assustado' },
    { img: './img/outside.jpg', text: 'Quero ir lá fora' },
    { img: './img/home.jpg', text: 'Quero ir pra casa' },
    { img: './img/school.jpg', text: 'Quero ir para escola' },
    { img: './img/grandma.jpg', text: 'Quero ver a vovó' }
]

const utterance = new SpeechSynthesisUtterance()

const setTextMessage = text => {
    utterance.text = text;
}

const speakText = () => {
    speechSynthesis.speak(utterance)
}

const setVoice = (event) => {
    const selectedVoice = voices.find(voice => voice.name === event.target.value)
    utterance.voice = selectedVoice
}

const addExpressionBoxesIntoDom = () => {
    main.innerHTML = humanExpressions.map(({ img, text }) =>
        `<div class='expression-box' >
    <img src="${img}" alt="${text}" data-js='${text}'>
       <p class = "info" data-js='${text}'>${text}</p>
    </div>
    `).join('')
}

addExpressionBoxesIntoDom()

const addStyleIntoDom = (dataValue) => {
    const div = document.querySelector(`.expression-box`)
    div.classList.add('active')
    setTimeout(() => {
        div.classList.remove('active')
    }, 1000)
}

main.addEventListener('click', event => {

    const clickedElement = event.target
    const clickedElementText = clickedElement.dataset.js
    const target = ['img', 'p'].some(elementName =>
        clickedElement.tagName.toLowerCase() === elementName.toLowerCase())

    if (target) {
        setTextMessage(clickedElementText)
        speakText()
        addStyleIntoDom(clickedElementText)
    }
})

const insertOptionElementIntoDOM = voices => {
    selectElement.innerHTML = voices.reduce((accumulator, { name, lang }) => {
        accumulator += `<option value='${name}'>${lang} | ${name}</option>`
        return accumulator
    }, '')
}

const setUtteranceVoice = voice => {
    utterance.voice = voice;
    const voiceOptionElement = selectElement
        .querySelector(`[value="${voice.name}"]`)
    voiceOptionElement.selected = true
}

const setPTBRVoices = voices => {
    const googleVoice = voices.find(voice =>
        voice.name === 'Google português do Brasil')
    const microsoftVoice = voices.find(voice =>
        voice.name === 'Microsoft Maria - Portuguese (Brazil)')

    if (googleVoice) {
        setUtteranceVoice(googleVoice)
    } else if (microsoftVoice) {
        setUtteranceVoice(microsoftVoice)
    }
}

let voices = []

speechSynthesis.addEventListener('voiceschanged', () => {
    voices = speechSynthesis.getVoices()

    insertOptionElementIntoDOM(voices)
    setPTBRVoices(voices)
})

buttonInsertText.addEventListener('click', () => {
    divTextBox.classList.add('show');
})

closeDivTextBox.addEventListener('click', () => {
    divTextBox.classList.remove('show')
})

selectElement.addEventListener('change', setVoice)

buttonReadText.addEventListener('click', () => {
    setTextMessage(textArea.value)
    speakText()
})

// voices.forEach(({ name, lang }) => {
//     const option = document.createElement('option')

//     option.value = name

//     if (googleVoice && option.value === googleVoice.name) {
//         utterance.voice = googleVoice
//         option.selected = true;
//     } else if (microsoftVoice && option.value === microsoftVoice.name) {
//         utterance.voice = microsoftVoice
//         option.selected = true;
//     };

//     option.textContent = `${lang}|${name}`
//     selectElement.appendChild(option)
// })

// -------------------------------------------------------------------------------

// const createExpressionBox = ({ img, text }) => {
//     const div = document.createElement('div');

//     div.classList.add('expression-box');
//     div.innerHTML = `
//         <img src="${img}" alt="${text}">
//         <p class = "info">${text}</p>
//     `
//     div.addEventListener('click', () => {
//         setTextMessage(text)
//         speakText()

//         div.classList.add('active')
//         setTimeout(() => {
//             div.classList.remove('active')
//         }, 1000)

//     })

//     main.appendChild(div)
// }

// humanExpressions.forEach(createExpressionBox)