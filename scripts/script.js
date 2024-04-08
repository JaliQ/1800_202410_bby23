
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
        modal2.close();
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


const modal3 = document.querySelector('#help-pop-up');
openModalHelp = () => {
    modal3.showModal();
}

closeModalHelp = () => {
    modal3.close();
}

closeModalPortfolio = () => {
    // alert("Here")
    const modalPort = document.querySelector('#add-stock-popup')
    // // document.getElementById("add-stock-popup").style.display = "none";
    modalPort.close();
}





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


// to open the drop content portfolios show when they click
function openDropPortfolios(){
    let content = document.getElementById("portfoliosDropDown")
    if (content.style.display === "none"){
        content.style.display = "block";
    } else {
        content.style.display = "none";
    }
}

// to open the drop content portfolios show when they click
function openUserOpt(){
    let content1 = document.getElementById("dropDownProfile")
    if (content1.style.display === "none"){
        content1.style.display = "block";
    } else {
        content1.style.display = "none";
    }
}


