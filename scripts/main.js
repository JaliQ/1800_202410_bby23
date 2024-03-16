export function writeUsers(email, firstName, lastName){
    // populate datain in users collection on firestore database 
    const usersRef = db.collection("users");
    usersRef.add({
        email: email,
        first_name: firstName,
        last_name: lastName
    });
    console.log("in the main js")

}