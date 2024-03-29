

// modal for the profile popup window
const modal0 = document.querySelector('#profile-pop-up');
//const openModal = document.querySelector('#open-popup-profile');
// const closeModal = document.querySelector('#close-popup-profile');

function openModalProfile() {
    modal0.showModal();
}

function closeModalProfile() {
    modal0.close();
    document.getElementById('personalInfoFields').disabled = true;
}

// modal for the profile popup window
const modal2 = document.querySelector('#sendFeedback');
//const openModal = document.querySelector('#open-popup-profile');
// const closeModal = document.querySelector('#close-popup-profile');

function openModalFeedback() {
    modal2.showModal();
}

function closeModalFeeback() {
    modal2.close();
 
    
    document.querySelector('#tInput').value = "";
    document.querySelector('#desPopup').value = "";
}

function submitFeedback() {
    feedTitle = document.getElementById("tInput").value;
    feedDes = document.getElementById("desPopup").value;

    // Add the values to Firestore
    db.collection("feedback").add({
        title: feedTitle,
        description: feedDes,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        // Clear input fields after submission
        document.getElementById("tInput").value = "";
        document.getElementById("desPopup").value = "";
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Thanks for your feedback.",
            showConfirmButton: false,
            timer: 1500
          });
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

    


// modal to add a stock to your portfolio
const modal1 = document.querySelector('#add-stock-popup');
const openModalAddStock = document.querySelector('#add-stock');
const closeModalAddStock = document.querySelector('#close-addStock-popup');

openModalAddStock.addEventListener('click', function () {
    modal1.showModal();
})

closeModalAddStock.addEventListener('click', function () {
    modal1.close();
    document.getElementById("assetInput").value = "";
    document.getElementById("radio-stock").checked = false;
    document.getElementById("radio-crypto").checked = false;
    document.getElementById("quantity-popup-input").value = "";
    document.getElementById("price-popup-input").value = "";
    document.getElementById("dateAddAsset").value = "";
    document.getElementById("total-popup-input").value = "";
    
})

function redirLearn () {
    window.location.href = "./learn.html";
}

function redirHome () {
    window.location.href = "./main.html";
}

const cryptoRadio = document.getElementById('radio-crypto');
const quantityInput = document.getElementById('quantity-popup-input');
const priceInput = document.getElementById('price-popup-input');
const totalInput = document.getElementById('total-popup-input');

// Add event listener to the crypto radio button
cryptoRadio.addEventListener('change', function() {
    // Check if the crypto radio button is checked
    if (cryptoRadio.checked) {
        // Enable the quantity input field
        quantityInput.disabled = false;
    } else {
        // Disable the quantity input field
        quantityInput.disabled = true;
        // Clear the quantity input value
        quantityInput.value = '';
        // Reset the total input value
        totalInput.value = '';
    }
});

function calculate() {
    // Get the quantity and price values
    const quantity = parseFloat(quantityInput.value);
    const price = parseFloat(priceInput.value);

    // Check if the quantity and price are valid numbers
    if (!isNaN(quantity) && !isNaN(price)) {
        // Calculate the total amount
        const total = quantity * price;

        // Update the total input value
        totalInput.value = total.toFixed(2); // Display total with two decimal places
    } else {
        // Clear the total input value
        totalInput.value = '';
    }
}

function clearOther(clickedRadio) {
    var otherRadioId = clickedRadio.id === 'radio-stock' ? 'radio-crypto' : 'radio-stock';
    var otherRadio = document.getElementById(otherRadioId);
    otherRadio.checked = false;
}


