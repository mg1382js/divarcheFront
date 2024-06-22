let token = localStorage.getItem('token')
const aInput = document.getElementById('input')
const aProfile = document.getElementById('profile')
const aExit = document.getElementById('exit')
const modalCity = document.getElementById('modalCity')
const btnSwichToAddProduct = document.getElementById('navbarAddProduct')

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

async function putData(url = "") {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
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

async function getData2(url = "", data = {}) {
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
        data: JSON.stringify(data)
    });
    return response.json(); // parses JSON response into native JavaScript objects
}


const category = document.getElementById('category')

async function categoryShow() {
    const response = await getData('http://localhost:3030/products/category')
    const data = await getData("http://localhost:3030/products/categories")
    const categories = data.data;
    for (let i = 0; i < response.data.length; i++) {
        const parentLi = document.createElement('li')
        const newA = document.createElement('a')
        parentLi.classList = "list-group-item"
        parentLi.id = response.data[i].category_id
        newA.innerHTML = response.data[i].category_name
        newA.classList = 'link-underline-light link-dark text-primary'
        parentLi.append(newA)
        category.append(parentLi)
        for (let j = 0; j < categories.length; j++) {
            if (parentLi.id == categories[j].category_id) {
                const newli = document.createElement("li");
                const newA = document.createElement("a");
                newli.id = categories[j].categories_id;
                newli.classList = 'list-group-item'
                newA.innerText = categories[j].categories_name;
                newA.classList = "link-underline-light link-dark text-danger";
                newA.addEventListener('click', async () => {
                    const response = await getData2('http://localhost:3030/products/products/categories',{
                        "categories_id": "4"
                    })
                    console.log(response)
                    // < div class= "col-md-3 border bclassName-light-subtle mb-3 mx-2 w-25 p-3" >
                //         < div class= "row" >
                    //         < div class= "col mx-2" >
                //         < h5 > سامسونگ < /h5>
                //     <p>نو</p>
                //     <p>45000</p>
                //     <p></p>
                // </div>
                //
                //     <div class="col">
                //         className <img src="image/phone1.jpg" class="w-100">
                //         className</div>
                //
                // </div>
                // </div>

                })
                newli.append(newA);
                parentLi.append(newli);
            }

        }
    }


}

async function cityShow() {

    const response = await getData('http://localhost:3030/products/cities')
    for (let i = 0; i < response.data.length; i++) {
        const newLi = document.createElement('li')
        const newA = document.createElement('a')
        newA.classList = 'link-underline-light link-dark'
        newA.innerHTML = response.data[i].city_name
        newA.id = response.data[i].city_id
        newA.addEventListener('click', async () => {
            const response = await getData2('http://localhost:3030/products/products/categories',
            {
                "city_id": "3"
            })
            console.log(response)
        })
        newLi.classList = 'list-group-item'
        newLi.append(newA)
        modalCity.append(newLi)
    }
}

async function profilehandler() {
    if (token) {
        aInput.classList.add('d-none')
        aProfile.classList.remove('d-none')
        aExit.classList.remove('d-none')
        aExit.addEventListener('click', async () => {
            const response = await putData('http://localhost:3030/user/logout')
            alert(response.data.fa)
            localStorage.removeItem('token')
        })
    } else {
        aInput.classList.remove('d-none')
        aProfile.classList.add('d-none')
        aExit.classList.add('d-none')
    }
}

async function addProduct() {
    if (token) {
        btnSwichToAddProduct.addEventListener('click', () => {
            window.location.href = 'http://localhost/divarcheFront/pages/user/profile/'
        })
    } else {
        btnSwichToAddProduct.addEventListener('click', () => {
            window.location.href = 'http://localhost/divarcheFront/pages/user/login/'
        })
    }

}

addProduct()
categoryShow()
cityShow()
profilehandler()

