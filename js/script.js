const showProductDescription = document.getElementById('showProductDescription')
const homePage = document.getElementById('homePage')
const productPage = document.getElementById('productPage')

showProductDescription.addEventListener('click', () => {
    homePage.classList = 'd-none'
    productPage.classList = 'd-block'
})