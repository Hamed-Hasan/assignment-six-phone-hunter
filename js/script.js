// Start Js 

// Input Field Search 
const searchPhone = () => {
    const inputField = document.getElementById('input-field')
    const searchText = inputField.value
    inputField.value = '';
    // Get Api 
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
}

// display data 

const displayPhone = phones => {
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
    const loadMore = document.getElementById('loadMore')
     const loadDiv = document.createElement('div')
     loadDiv.innerHTML = `
     <div class="text-center">
     <button onclick="loadBtn('${phones}')" class="btn btn-outline-primary">Load More</button>
     `
     loadMore.appendChild(loadDiv)
    
}
const loadBtn = more => {
    // more.slice(0,100)
    const url = `https://openapi.programming-hero.com/api/phones?search`
    fetch(url)
    .then(res => res.json())
    .then(data => displayMore(data.data))
    // console.log(more)
}
const displayMore = mores => {
    // const allMores = 
mores.forEach(more => {
    // console.log(more)
})
}

// phone details 
const phoneDetails = detail => {
    // console.log(detail)
    const url = `https://openapi.programming-hero.com/api/phone/${detail}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data))
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
    <li class="list-group-item list-group-item-action">Others: ${phone.others.WLAN} ${phone.others.Bluetooth} ${phone.others.GPS} ${phone.others.NFC} ${phone.others.Radio} ${phone.others.USB}</li>
  </ul>
</div>

    `

}