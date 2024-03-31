firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const id = user.uid;
        db.collection("users").doc(id).get()
            .then(doc => {
                portfolios = doc.data().portfolios;
                if (portfolios.length == 0) {
                    let pg = document.getElementById('portfolio-display');
                    pg.innerHTML = "<p>Seems like you don't have a porfolio yet </p>"
                } else {
                    let pg = document.getElementById('portfolio-display');
                    let str = "<p>your portfolios are: "
                    portfolios.forEach(element => {
                        str += (element.portfolioName + " ");
                    });
                    str += "</p>";
                    pg.innerHTML = str;
                }
            })
    }

    createPortfolio = () => {
        let name = document.getElementById("portfolioName").value;
        if (name != '') {
            db.collection("users")
                .doc(user.uid)
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        const portfolios = doc.data().portfolios || [];
                        portfolios.push({ portfolioName: name, assets: [] });

                        db.collection("users")
                            .doc(user.uid)
                            .update({ portfolios: portfolios })
                            .then(() => {
                                console.log("Portfolio created successfully.");
                                location.reload();
                            })
                            .catch((error) => {
                                console.error("Error updating document:", error);
                            });
                    } else {
                        console.error("User document does not exist.");
                    }
            }).catch((error) => {
                console.error("Error getting document:", error);
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
            // alert("Enter the name!");
        }
    }
    loadPortfolios = () => {
        db.collection("users").doc(user.uid).get()
            .then(dt => {
                portfolios = dt.data().portfolios
                let str = ''
                portfolios.forEach(portfolio => {
                    let name = portfolio.portfolioName;
                    // str+= `<a href='' class="dropItem">${name}</a>`
                    str += `<a href="javascript:void(0);" id="portfolioSelection" class="dropItem" onclick="assignPortfolio()">${name}</a>`
                })
                document.querySelector(".load-here").innerHTML = str;
            })
    }

    loadPortfoliosAssets = () => {
        let currentUser = db.collection("users").doc(user.uid);
        // var assetTicker;
        // var url = `https://real-time-quotes1.p.rapidapi.com/api/v1/realtime/crypto?source=${assetTicker}&target=USD`;
        var url = `https://real-time-quotes1.p.rapidapi.com/api/v1/realtime/crypto?source=BTC&target=USD`;
        const options = {
            method: 'GET',
            mode:'cors',
            headers: {
                'X-RapidAPI-Key': 'dd54c567bdmshbc2da4da544ff1bp1ffc40jsn2708e9551e62',
                'X-RapidAPI-Host': 'real-time-quotes1.p.rapidapi.com',
                'content-type': 'application/json'
                
            }
        };
        fetch(url, options)
            .then(response => console.log(response))
            .catch(err => console.error(err))

        currentUser
            .get()
            .then((doc) => {
                var portList = doc.data().portfolios;
                var assetList;
                for (let i = 0; i < portList.length; i++) {
                    if(portList[i].portfolioName == localStorage.getItem("current_portfolio")){
                        // console.log(JSON.stringify(portList[i]) + " each asset")
                        assetList = portList[i].assets;
                    }
                }

                let str = `<div class="card" id="display-card"> 
                `
                assetList.forEach(asset => {

                    str += `<div class="card-content">
                    <img src="./img/star-svgrepo-com.svg" alt="star">
                    <div class="stock-name">
                        <span>name</span>
                        <h3>${asset.assetName}</h3>
                    </div>
                    <div class="stock-name">
                        <span>entry price</span>
                        <h3>${asset.assetEntryPrice}</h3>
                    </div>
                    <div class="stock-name">
                        <span>current price</span>
                        <h3>$170.55</h3>
                    </div>
                    <div class="stock-name">
                        <span>qty</span>
                        <h3>${asset.assetQty}</h3>
                    </div>
                    <div class="stock-name">
                        <span>ROI</span>
                        <h3>-</h3>
                    </div>
                </div>`

            });
            str += `</div>`;
            document.getElementById("assets-examples").innerHTML = str;
            })
            .catch((error) => {
                console.log(error)
            })
    }

    assignPortfolio = () => {
        localStorage.removeItem("current_portfolio");
        let currentPortfolio = document.getElementById("portfolioSelection").innerHTML;
        alert(currentPortfolio);
        localStorage.setItem("current_portfolio", currentPortfolio);
        
        document.getElementById('portfolio-display').style.display = "none";
        document.getElementById('current-portfolio').innerHTML = `<h3> ${localStorage.getItem("current_portfolio")} </h3>`;
        
        loadPortfoliosAssets();

    }

    updatePortfolio = () => {
        console.log("updatePortfolio")
        const addAssetForm = document.getElementById("addAssetForm");
        addAssetForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const assetName = addAssetForm["assetInput"].value;
            const assetQty = addAssetForm["quantity-popup-input"].value;
            const assetBuyPrice = addAssetForm["price-popup-input"].value;
            const assetBuyDate = addAssetForm["dateAddAsset"].value;

            // calculate total price in the pop up modal
            const assetTotalPrice = +assetQty * +assetBuyPrice;

            // replace value in the pop modal total price
            document.getElementById("total-popup-input").innerHTML = assetTotalPrice;

            let currentUser = db.collection("users").doc(user.uid);
            // let currentUser = db.collection("users");
            // let currentUserPort = db.collection("users").doc(user.uid).portfolios();
            const newAsset = {
                assetName,
                assetQty,
                assetEntryPrice: assetBuyPrice,
                assetBuyDate: assetBuyDate,
            }

            currentUser
                .get()
                .then((doc) => {
                    if(doc.exists) {
                        var portList = doc.data().portfolios
                        for (let i = 0; i < portList.length; i++) {
                            if(portList[i].portfolioName == localStorage.getItem("current_portfolio")){
                                portList[i].assets.push(newAsset);
                            }
                            
                        }
                        console.log(JSON.stringify(portList) + " updated portfolios");

                        currentUser
                            .update({
                                portfolios: portList
                            })
                            .then(() => {
                                console.log("Portfolios updated successfully")
                                location.reload();
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    }
                })
                .catch(error => console.log(error))


        })
    }

    loadPortfolios();

});

// database look like
// users = [
//     user1:[
//         {email:
//             "harrypotter@mail.com",
//             first_name:
//             "Harry",
//             last_name:
//             "Potter"
//             portfolios: [
//                 {
//                     assets: [],
//                     portName: "first portfolio"
//                 }
//             ]
//         }
//     ]
// ]


            

// currentUser
// // .where('portfolios', 'array-contains', {portfolioName: 'First portfolio'})
// .where('portfolioName', '==', 'First portfolio')
// .get()
// .then((snapshot) => {
//     snapshot.forEach(doc => {
//         console.log(doc.data())
//     })
// })
// .catch((error) => console.log(error))
// .where('first_name', '==', "Harry")
// // .where('portfolios', 'array-contains', {'portfolioName': 'First portfolio'})
// .get()
// // .update({
// //     "portfolios": firebase.firestore.FieldValue.arrayUnion({
// //         "assets": firebase.firestore.FieldValue.arrayUnion({
// //             "name": "btc",
// //             "price": 150
// //         }),
// //         "portfolioName": "First portfolio"
// //     })
// // })
// // .collection("portfolios")
// // .where("portfolioName", "==", localStorage.getItem("current_portfolio"))
// .then((querySnapshot) => {
//     console.log(querySnapshot.docs);
//     querySnapshot.docs.map((doc) => {
//         // Access the document data
//         console.log(doc.id, " => ", doc.data());

//         // // Update the document to add the new asset to the portfolio
//         // db.collection("users").doc(doc.id).update({
//         //     "portfolios": firebase.firestore.FieldValue.arrayUnion({
//         //         "assets": newAsset,
//         //         "portName": localStorage.getItem('current_portfolio')
//         //     })
//         // })
//         // .then(() => {
//         //     console.log("Document successfully updated!");
//         // })
//         // .catch((error) => {
//         //     console.error("Error updating document: ", error);
//         // });
//     });
// })
// .catch((error) => {
//     alert(error.message);
//     console.log(error);
// })