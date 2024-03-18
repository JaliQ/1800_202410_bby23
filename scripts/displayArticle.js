function displayArticlesDynamically(collection) {
    let cardTemplate = document.getElementById("articleTemplate"); 

    db.collection(collection).get()
        .then(allArticles => {
            allArticles.forEach(doc => {
                var id = doc.id;
                var title = doc.data().title;
                let newcard = cardTemplate.content.cloneNode(true);         
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('a').href = "eachArticle.html?docID="+id;
                document.getElementById('articles').appendChild(newcard);
            })
        })
}

displayArticlesDynamically("artcls");

