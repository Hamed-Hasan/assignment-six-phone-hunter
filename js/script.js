// Start Js 
const showMobile = document.getElementById('show-phone')
const details = document.getElementById('show-detail')
const loadButton = document.getElementById('loadMore')
const showLengths = document.getElementById('show-length')
const loadSpinner = document.getElementById('spinner')
const success = document.getElementById('success')
const error = document.getElementById('error')
// const load = document.getElementById('load-button')
// Input Field Search 

const searchPhone = () => {
    const inputField = document.getElementById('input-field')
    const searchText = inputField.value
    // inputField.value = ''


    if (typeof searchText !== 'number') {
        showLength.innerHTML = ''
        success.innerHTML = ''
        // loadSpinner.textContent = ''
        // inputField.value = ''

    }
    if (!isNaN(searchText) || searchText == '') {
        error.innerHTML = 'Please Search By Phone Name ✘'
        showMobile.innerHTML = ''
        loadButton.innerHTML = ''
        success.innerHTML = ''
        showLengths.innerHTML = ''
        inputField.value = ''
        toggleSpinner('none')

    } else if (searchText <= 0) {
        showMobile.innerHTML = ''
        loadButton.innerHTML = ''
        success.innerHTML = ''
        showLengths.innerHTML = ''
        toggleSpinner('none')
    } else {
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
const moreProduct = document.getElementById('load-button')
const showDetail = document.getElementById('show-detail')
const displayError = () => {
    success.innerHTML = ''
    moreProduct.style.display = 'none'
    // document.getElementById('load-button').style.display = 'none';
    showMobile.innerHTML = ''
    showLength.innerHTML = ''
    toggleSpinner('none')
}

// spinner 
toggleSpinner = displaySpinner => {
    document.getElementById('spinner').style.display = displaySpinner;
}


// display data 
const show = document.getElementById('show-phone')
const load = document.getElementById('load-button')
const showLength = document.getElementById('show-length')
const displayPhone = phones => {
    if (phones.length != 0) {

    } else {
        success.innerHTML = ''
        error.innerHTML = 'Please Search By Phone Name ✘'
        load.innerHTML = ''
        show.innerHTML = ''
        toggleSpinner('none')
        showDetail.innerHTML = ''

    }

    // phones length in output 
    showLength.innerHTML = `Total Product ${phones.length}`
    const showPhone = document.getElementById('show-phone')
    showPhone.textContent = '';
    const allPhone = phones.slice(0, 20)
    allPhone.forEach(phone => {
        const div = document.createElement('div')
        div.classList.add('col-lg-4')
        div.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                 <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.brand}</p>
            <a onclick="phoneDetails('${phone.slug}')" href="#" class="glow-on-hover">Product Details</a>
        </div>
        </div>
    </div>
     `
        showPhone.appendChild(div)

    })

    toggleSpinner('none')
    const loadMore = document.getElementById('loadMore')
    loadMore.textContent = ''
    const loadDiv = document.createElement('div')
    loadDiv.innerHTML = `
     <div class="text-center">
     <button id="load-button" onclick="loadBtn()" class=" glow-on-hover mt-4">Load More  <i class="fa-solid fa-arrow-down text-white ms-2"></i></button>
     `
    loadMore.appendChild(loadDiv)
}
const loadBtn = () => {
    const inputField = document.getElementById('input-field')
    const searchText = inputField.value
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
            <a onclick="phoneDetails('${more.slug}')" href="#" class="glow-on-hover">Product Details</a>
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
    const url = `https://openapi.programming-hero.com/api/phone/${detail}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
    toggleSpinner('block')
}

// single phone display details
const displayDetails = phone => {
    const showDetails = document.getElementById('show-detail')
    showDetails.textContent = ''
    showDetails.innerHTML = `
    <h3 class="text-white">Product Details</h3>
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