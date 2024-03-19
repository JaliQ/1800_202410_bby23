function sayHello() {
}
//sayHello();

// modal for the profile popup window
const modal = document.querySelector('#profile-pop-up');
const openModal = document.querySelector('#open-popup-profile');
const closeModal = document.querySelector('#close-popup-profile');

openModal.addEventListener('click', () => {
    modal.showModal();
})

closeModal.addEventListener('click', function () {
    modal.close();
})

// modal to add a stock to your portfolio
const modal1 = document.querySelector('#add-stock-popup');
const openModalAddStock = document.querySelector('#add-stock');
const closeModalAddStock = document.querySelector('#close-addStock-popup');

openModalAddStock.addEventListener('click', function () {
    modal1.showModal();
})

closeModalAddStock.addEventListener('click', function () {
    modal1.close();
})

redir = () => {
    window.location.href = "./index.html";
}

function calculate() {
    // Get the values of the input fields
    var input1 = document.getElementById('quantity-popup-input').value;
    var input2 = document.getElementById('price-popup-input').value;

    // Convert the input values to numbers and calculate the result
    var result = parseInt(input1) * parseInt(input2);

    // Display the result
    document.getElementById('total-popup-input').value = result;
}

function clearOther(clickedRadio) {
    var otherRadioId = clickedRadio.id === 'radio-stock' ? 'radio-crypto' : 'radio-stock';
    var otherRadio = document.getElementById(otherRadioId);
    otherRadio.checked = false;
}


