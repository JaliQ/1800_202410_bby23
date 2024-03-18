function sayHello() {
}
//sayHello();

// modal for the profile popup window
const modal = document.querySelector('#profile-pop-up');
const openModal = document.querySelector('#open-popup-profile');
const closeModal = document.querySelector('#close-popup-profile');

openModal.addEventListener('click', () =>{
    modal.showModal();
})

closeModal.addEventListener('click', function() {
    modal.close();
})

// modal to add a stock to your portfolio
const modal1 = document.querySelector('#add-stock-popup');
const openModalAddStock = document.querySelector('#add-stock');
const closeModalAddStock = document.querySelector('#close-addStock-popup');

openModalAddStock.addEventListener('click', function() {
    modal1.showModal();
})

closeModalAddStock.addEventListener('click', function() {
    modal1.close();
})