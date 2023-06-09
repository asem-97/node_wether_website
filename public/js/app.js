const inputLocation=document.querySelector('input')
const wetherForm = document.querySelector('form');

const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
messageOne.textContent=''
wetherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location =inputLocation.value
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    fetch(`http://127.0.0.1:3000/weather?address=${location}`, { mode: 'same-origin'}).then((response)=>{
        return response.json()
    })
    .then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
        }else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
        }
    })

})