const result = document.querySelector(".result")  //lo que primero hice fue seleccionar a las etiquetas
const form = document.querySelector(".get-weather")
const nameCity = document.querySelector("#city")
const nameCountry = document.querySelector("#country")

form.addEventListener('submit' , (e) =>{
    e.preventDefault();
    if(nameCity.value === "" || nameCountry.value===""){
        showError('Ambos campos son obligatorios...')
        return
    }
    callAPI(nameCity.value , nameCountry.value)
})
function callAPI(city,country){
    const apiId='86e175f9789935bb672010c28c75ee9d'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`
    
    fetch(url)
        .then(data => {
            return data.json();

        })
        .then(dataJSON=>{
            if(dataJSON.cod === '404'){
                showError('Ciudad no encontrada')
            }else{
                clear()
                showWeather(dataJSON)
            }
            console.log(dataJSON);
        })
        .catch(err =>{
            console.log(err);
        })
}

function showWeather(data){  //En este caso fui descontracturando todo el objeto
    const {name , main:{temp,temp_min , temp_max}, weather : [arr]} = data;

    const degress = kellvinToCentigrade(temp)
    const min = kellvinToCentigrade(temp_min)
    const max = kellvinToCentigrade(temp_max)

    const content = document.createElement('div');
    content.innerHTML= `
        <h5>Clima en ${name}</h5>
            <img src="http://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
            <h2>${degress} °c </h2>
            <p>La temperatura maxima es ${max} °c</p>
            <p> La temperatura minima es ${min} °c</p>`

    result.appendChild(content)

    
}


function showError(message){  //cree el mensaje extra que se envia en caso de no cumplir con los input
    const alert = document.createElement('p')
    alert.classList.add('alert-message')
    alert.innerHTML= message
    form.appendChild(alert)
    setTimeout(()=>{
        alert.remove()
    },3000)
}

function kellvinToCentigrade(temp){
    return parseInt(temp - 273.15);
}
function clear(){
    result.innerHTML = ''
}