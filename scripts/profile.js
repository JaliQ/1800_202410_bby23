var currentUser;              //points to the document of the user who is logged in

function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    let userName = userDoc.data().name;
                    let userLastName = userDoc.data().first_name;
                    let userEmail = userDoc.data().last_name;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("firstNameInput").value = userName;
                    }
                    if (userLastName != null) {
                        document.getElementById("lastNameInput").value = userSchool;
                    }
                    if (userEmail != null) {
                        document.getElementById("emailInput").value = userEmail;
                    }
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

//call the function to run it 
populateUserInfo();

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    //enter code here
    const db = firebase.firestore();
    currentUser = db.collection("users").doc(user.uid)

    //a) get user entered values
    userName = document.getElementById('firstNameInput').value;       //get the value of the field with id="nameInput"
    userLastName = document.getElementById('lastNameInput').value;     //get the value of the field with id="schoolInput"
    userEmail = document.getElementById('emailInput').value;       //get the value of the field with id="cityInput"


    console.log(userName, userLastName, userEmail, "<<<<<<<<,")
    //b) update user's document in Firestore
    currentUser.update({
        first_name: userName,
        last_name: userLastName,
        email: userEmail
    })
        .then(() => {
            console.log("Document successfully updated!");
        })

    //c) disable edit 
    document.getElementById('personalInfoFields').disabled = true;
}