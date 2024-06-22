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

        body: JSON.stringify(data) // body data type must match "Content-Type" header

    });
    return response.json(); // parses JSON response into native JavaScript objects
}

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

async function putData(url = "", data = {}) {
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

        body: JSON.stringify(data) // body data type must match "Content-Type" header

    });
    return response.json(); // parses JSON response into native JavaScript objects
}

async function switchTabLoginOrSignup() {
    const loginTab = document.getElementById('loginTab')
    const signupTab = document.getElementById('signupTab')
    const loginContent = document.getElementById('login')
    const signupContent = document.getElementById('signup')
    const btnLogin = document.getElementById('btnLogin')
    const btnSignup = document.getElementById('btnSignup')
    const selectCity =document.getElementById('selectCity')
    const response = await getData('http://localhost:3030/products/cities')
    for (let i = 0; i < response.data.length; i++) {
        const newOption = document.createElement('option')
        newOption.innerHTML=response.data[i].city_name
        newOption.value =response.data[i].city_id
        selectCity.append(newOption)
    }
    signupTab.addEventListener('click', () => {
        signupTab.classList.add('active')
        signupContent.classList.add('show')
        signupContent.classList.add('active')
        loginContent.classList.remove('show')
        loginContent.classList.remove('active')
        loginTab.classList.remove('active')

    })
    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active')
        loginContent.classList.add('active')
        loginContent.classList.add('show')
        signupContent.classList.remove('show')
        signupContent.classList.remove('active')
        signupTab.classList.remove('active')
    })
    btnLogin.addEventListener('click', async (event) => {
        event.preventDefault()
        const loginUsername = document.getElementById('loginUsername')
        const loginPassword = document.getElementById('loginPassword')
        const token = localStorage.getItem('token')
        if (!token) {
            if (loginPassword.value && loginUsername.value) {
                const response = await putData(
                    'http://localhost:3030/user/login',
                    {
                        "username": loginUsername.value,
                        "password": loginPassword.value
                    })
                alert(JSON.stringify(response.data.message.fa))
                if (response.data.message.fa === 'ورود با موفقیت انجام شد') {
                    localStorage.setItem('token', `${response.data.token}`)
                    console.log(response.data.token)
                    loginUsername.value = ''
                    loginPassword.value = ''
                    window.location.href = 'http://localhost/divarcheFront'
                }
            } else {
                if (!loginUsername.value) {
                    loginUsername.classList.add('alert')
                    loginUsername.classList.add('alert-danger')
                } else {
                    loginUsername.classList.remove('alert')
                    loginUsername.classList.remove('alert-danger')
                }
                if (!loginPassword.value) {
                    loginPassword.classList.add('alert')
                    loginPassword.classList.add('alert-danger')
                } else {
                    loginPassword.classList.remove('alert')
                    loginPassword.classList.remove('alert-danger')
                }
                alert('لطفا فیلدهایی که قرمز شده اند را پر کنید')
            }
        } else {
            alert('دسترسی رد شد')
            window.location.href = 'http://localhost/divarcheFront'
        }


    })
    btnSignup.addEventListener('click', async (event) => {
        event.preventDefault()
        const signupFullName = document.getElementById('signupFullName')
        const signupPhoneNumber = document.getElementById('signupPhoneNumber')
        const signupUsername = document.getElementById('signupUsername')
        const signupPassword = document.getElementById('signupPassword')

        if (signupFullName.value && signupPhoneNumber.value && signupUsername.value && signupPassword.value) {
            const response = await postData('http://localhost:3030/user/signup', {
                "username": signupUsername.value,
                "password": signupPassword.value,
                "phone_number": signupPhoneNumber.value,
                "city_id": selectCity.value,
                "full_name": signupFullName.value
            })
            alert(JSON.stringify(response.data.message.fa))
            if (response.data.message.fa === 'ثبت نام با موفقیت انجام شد') {
                signupFullName.value = ''
                signupUsername.value = ''
                signupPhoneNumber.value = ''
                signupPassword.value = ''
            }
        } else {
            if (!signupFullName.value) {
                signupFullName.classList.add('alert')
                signupFullName.classList.add('alert-danger')
            } else {
                signupFullName.classList.remove('alert')
                signupFullName.classList.remove('alert-danger')
            }
            if (!signupPhoneNumber.value) {
                signupPhoneNumber.classList.add('alert')
                signupPhoneNumber.classList.add('alert-danger')
            } else {
                signupPhoneNumber.classList.remove('alert')
                signupPhoneNumber.classList.remove('alert-danger')
            }
            if (!signupUsername.value) {
                signupUsername.classList.add('alert')
                signupUsername.classList.add('alert-danger')
            } else {
                signupUsername.classList.remove('alert')
                signupUsername.classList.remove('alert-danger')
            }
            if (!signupPassword.value) {
                signupPassword.classList.add('alert')
                signupPassword.classList.add('alert-danger')
            } else {
                signupPassword.classList.remove('alert')
                signupPassword.classList.remove('alert-danger')
            }
            alert('لطفا فیلدهایی که قرمز شده اند را پر کنید')
        }


    })
}


switchTabLoginOrSignup()

