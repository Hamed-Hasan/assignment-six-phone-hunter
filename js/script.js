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
     `
     showPhone.appendChild(div)
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
    console.log(phone.mainFeatures.sensors[0])
}