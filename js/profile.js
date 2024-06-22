let token = localStorage.getItem('token')

async function getData(url = "") {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "include", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json"
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "include", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json"
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        data: JSON.stringify(data)
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

async function showInfo() {
    const response = await getData('http://localhost:3030/user/getInfo')
    if (token) {
        const profileFullName = document.getElementById('profileFullName')
        const profileUserName = document.getElementById('profileUserName')
        const profilePhoneNumber = document.getElementById('profilePhoneNumber')
        profileFullName.innerHTML = response.data[0].full_name
        profileUserName.innerHTML = response.data[0].username
        profilePhoneNumber.innerHTML = response.data[0].phone_number
        const btnAddProduct = document.getElementById('create')
        btnAddProduct.addEventListener('click',async ()=>{
            const title = document.getElementById('title')
            const description = document.getElementById('description')
            const price = document.getElementById('price')
            const address = document.getElementById('address')
            const status = document.getElementById('status')
            const formFileMultiple = document.getElementById('formFileMultiple')
            const categoryChoose = document.getElementById('categoryChoose')
            let imagePath=formFileMultiple.value.split('\\')
            // const responseProduct=await postData('http://localhost:3030/products/product', {
            //     "title": title.value,
            //     "description": description.value,
            //     "price": price.value,
            //     "address": address.value,
            //     "status": status.value,
            //     "data": {},
            //     "pathImages": imagePath[imagePath.length-1],
            //     "categories_id": categoryChoose.value
            // })
            // alert(JSON.stringify(responseProduct))

            console.log(categoryChoose.value)
        })

    }
}

showInfo()