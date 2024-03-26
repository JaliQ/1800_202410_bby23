firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const id = user.uid;
      db.collection("users").doc(id).get()
        .then(doc =>{
            portfolios = doc.data().portfolios;
            if (portfolios.length==0){
                let pg = document.getElementById('portfolio-display');
                pg.innerHTML = "<p>Seems like you don't have a porfolio yet </p>"
            } else { 
                let pg = document.getElementById('portfolio-display');
                let str = "<p>You portfolios are: "
                portfolios.forEach(element => {
                    str+=(element.portfolioName + " ");
                });
                str+="</p>";
                pg.innerHTML=str;
            }
        })
    }

    createPortfolio = () => {
        let name = document.getElementById("portfolioName").value;
        if (name != ''){
            db.collection("users").doc(user.uid).get().then((doc) => {
                if (doc.exists) {
                    const portfolios = doc.data().portfolios || [];
                    portfolios.push({ portfolioName: name, assets: {} });
    
                    db.collection("users").doc(user.uid).update({ portfolios: portfolios }).then(() => {
                        console.log("Portfolio created successfully.");
                        location.reload();
                    }).catch((error) => {
                        console.error("Error updating document:", error);
                    });
                } else {
                    console.error("User document does not exist.");
                }
            }).catch((error) => {
                console.error("Error getting document:", error);
            });
        } else {
            alert("Enter the name!");
        }
    }
    loadPortfolios = () => {
        db.collection("users").doc(user.uid).get()
            .then(dt => {
                portfolios = dt.data().portfolios
                let str = ''
                portfolios.forEach(portfolio =>{
                    let name = portfolio.portfolioName;
                    str+= `<a href=>${name}</a>`
                })
                document.querySelector(".load-here").innerHTML = str;
            })
    }

    loadPortfolios()
  });