console.log('Script Added to HTML!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''


    fetch('/weather?address='.concat(location)).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = 'Error: ' + data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = ('It\'s currently ' + data.temperature + '°C degrees and ' + data.summary + ' with a ' + data.rainChance + '\% chance of rain.')
            }
        })
    })
})
