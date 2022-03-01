// Start Js 
const showMobile = document.getElementById('show-phone')
const details = document.getElementById('show-detail')
const loadButton = document.getElementById('loadMore')
const showLengths = document.getElementById('show-length')
const success = document.getElementById('success')
const error = document.getElementById('error')
// const load = document.getElementById('load-button')
// Input Field Search 


const searchPhone = () => {
    const inputField = document.getElementById('input-field')
    const searchText = inputField.value
    // inputField.value = ''
if(!isNaN(searchText) || searchText == ''){
    error.innerHTML = 'Please Search By Phone Name ✘'
    showMobile.innerHTML = ''
    loadButton.innerHTML = ''
    success.innerHTML = ''
    showLengths.innerHTML = ''
    inputField.value = ''
    
}else if(searchText <= 0){
    showMobile.innerHTML = ''
    loadButton.innerHTML = ''
    success.innerHTML = ''
    showLengths.innerHTML = ''
}else{
    // Get Api 
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
            fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
        .catch(error => displayError(error))
        error.innerHTML = ''
        details.innerHTML = ''
       success.innerHTML = `Great You Got The Phone 😎 ${searchText}`
    //    inputField.value = ''
    toggleSpinner('block')
}
}

const displayError = () =>{
    success.innerHTML = ''
    document.getElementById('load-button').style.display = 'none'
   }

// spinner 
toggleSpinner = displaySpinner =>{
    document.getElementById('spinner').style.display = displaySpinner
}


// display data 
const showLength = document.getElementById('show-length')
const displayPhone = phones => {
    showLength.innerHTML = `${phones.length}`
    const showPhone = document.getElementById('show-phone')
    showPhone.textContent = '';
    const allPhone = phones.slice(0, 20)
    allPhone.forEach(phone => {
        const div = document.createElement('div')
        div.classList.add('col-md-4')
        div.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                 <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.brand}</p>
            <a onclick="phoneDetails('${phone.slug}')" href="#" class="btn btn-primary">Phone Details</a>
        </div>
        </div>
    </div>
     `
     showPhone.appendChild(div)

    })

    toggleSpinner('none')
    // add load more button 
    const loadMore = document.getElementById('loadMore')
    loadMore.textContent = ''
    // load.innerHTML = ''
     const loadDiv = document.createElement('div')
     loadDiv.innerHTML = `
     <div class="text-center">
     <button id="load-button" onclick="loadBtn()" class="btn btn-outline-primary">Load More</button>
     `
     loadMore.appendChild(loadDiv)
}
const loadBtn = () => {
    // console.log('hello')
    const inputField = document.getElementById('input-field')
    const searchText = inputField.value
    // inputField.value = '';
    // more.slice(0,100)
    // console.log(searchText);
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayMore(data.data))
    toggleSpinner('block')
}

const displayMore = (mores) => {
const morePhone = document.getElementById('show-phone')
    const allMores = mores.slice(20, 179)
allMores.forEach(more => {
    const div = document.createElement('div')
        div.classList.add('col-md-4')
        div.innerHTML = `
        <div class="card">
            <img src="${more.image}" class="card-img-top" alt="...">
                <div class="card-body">
                 <h5 class="card-title">${more.phone_name}</h5>
                <p class="card-text">${more.brand}</p>
            <a onclick="phoneDetails('${more.slug}')" href="#" class="btn btn-primary">Phone Details</a>
        </div>
        </div>
    </div>
     `
     morePhone.appendChild(div)
})
toggleSpinner('none')
}
// end load more button 


// phone details 
const phoneDetails = detail => {
    // console.log(detail)
    const url = `https://openapi.programming-hero.com/api/phone/${detail}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data))
    toggleSpinner('block')
}

// single phone display details
const displayDetails = phone => {
    // console.log(phone.mainFeatures.sensors[0])
    console.log(phone)
    document.getElementById('show-detail').innerHTML = `
    <div class="card"">
  <img src="${phone.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${phone.name}</h5>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item list-group-item-action">Brand: ${phone.brand}</li>
    <li class="list-group-item list-group-item-action">Release Date: ${phone.releaseDate ? phone.releaseDate: 'release date note found'}</li>
    <li class="list-group-item list-group-item-action">Sensor: ${phone.mainFeatures.sensors}</li>
    <li class="list-group-item list-group-item-action">Memory: ${phone.mainFeatures.memory}</li>
    <li class="list-group-item list-group-item-action">Storage: ${phone.mainFeatures.storage}</li>
    <li class="list-group-item list-group-item-action">Display Size: ${phone.mainFeatures.displaySize}</li>
  </ul>
</div>

    `
    toggleSpinner('none')
}