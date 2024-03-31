var currentUser;               //points to the document of the user who is logged in
function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            // console.log(user.uid, " uid")
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    console.log(userDoc.data());
                    //get the data fields of the user
                    let userFirstName = userDoc.data().first_name;
                    let userLastName = userDoc.data().last_name;
                    localStorage.setItem("first_name", userFirstName);
                    localStorage.setItem("last_name", userLastName);
                    
                    //if the data fields are not empty, then write them in to the form.
                    if (userFirstName != null) {
                        document.getElementById("firstNameInput").value = userFirstName;
                    }
                    if (userLastName != null) {
                        document.getElementById("lastNameInput").value = userLastName;
                    }
                    // if (userEmail != null) {
                    //     document.getElementById("emailInput").value = userEmail;
                    // }
                })
        } else {
            // No user is signed in.
            window.location.href = "./index.html"
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
    //a) get user entered values
    userName = document.getElementById('firstNameInput').value;      
    userLast = document.getElementById('lastNameInput').value;     
    // userEmail = document.getElementById('emailInput').value; 
    console.log(userName, userLast, "Data for save user info")

    //enter code here
    // currentUser = db.collection("users").doc(user.uid)

    
    //b) update user's document in Firestore
    currentUser.update({
        first_name: userName,
        last_name: userLast
    })
    .then(() => {
        console.log("Document successfully updated!");
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your information has been updated",
            showConfirmButton: false,
            timer: 1500
          });
    })

    

    //c) disable edit 
    document.getElementById('personalInfoFields').disabled = true;
}
