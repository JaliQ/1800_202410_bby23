var currentUser;              //points to the document of the user who is logged in

function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            console.log(user.uid, " uid")
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    console.log(userDoc.data());
                    //get the data fields of the user
                    // let userFirstName = userDoc.data().first_name;
                    // let userLastName = userDoc.data().last_name;
                    // let userEmail = userDoc.data().email;

                    // console.log(userName, userLastName, userEmail, " in populate info")

                    // //if the data fields are not empty, then write them in to the form.
                    // if (userName != null) {
                    //     document.getElementById("firstNameInput").value = userName;
                    // }
                    // if (userLastName != null) {
                    //     document.getElementById("lastNameInput").value = userSchool;
                    // }
                    // if (userEmail != null) {
                    //     document.getElementById("emailInput").value = userEmail;
                    // }
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
    currentUser = db.collection("users")

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