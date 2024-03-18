function displayArticle() {
    let params = new URL( window.location.href ); //get URL of search bar
    let ID = params.searchParams.get( "docID" ); //get value for key "id"
    console.log( ID );

    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection( "artcls" )
        .doc( ID )
        .get()
        .then( doc => {
            content = doc.data().content;
            // only populate title, and image
            document.getElementById('learn-content').innerHTML = content;
        } );
}

displayArticle()
