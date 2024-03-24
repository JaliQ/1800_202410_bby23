var currentUser;               //points to the document of the user who is logged in
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
                    let userName = userDoc.data().first_name;
                    let userLast = userDoc.data().last_name;
                    // let userEmail = userDoc.data().email;

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
            window.location.href = "../index.html"
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
    userName = document.getElementById('firstNameInput').value;      
    userLast = document.getElementById('lastNameInput').value;     
    // userEmail = document.getElementById('emailInput').value; 

    //b) update user's document in Firestore
    currentUser.update({
        first_name: userName,
        last_name: userLast
        // city: userCity
    })
    .then(() => {
        console.log("Document successfully updated!");
    })

    //c) disable edit 
    document.getElementById('personalInfoFields').disabled = true;
}