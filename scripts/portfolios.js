
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
                    str += `<a href="javascript:void(0);" id="portfolioSelection" class="dropItem" onclick="assignPortfolio('${name}')">${name}</a>`
                })
                document.querySelector(".load-here").innerHTML = str;
            })
    }

    loadPortfoliosAssets = () => {
        // console.log(user.uid + " <<<<")
        let currentUser = db.collection("users").doc(user.uid);
        // if (document.getElementById('assets-examples') !== "") {
        //     document.getElementById('assets-examples').innerHTML = ""
        // }
        // document.getElementById('assets-examples').innerHTML = ""
        currentUser
            .onSnapshot((doc) => {
                var portList = doc.data().portfolios;
                var assetList;
                for (let i = 0; i < portList.length; i++) {
                    if (portList[i].portfolioName == localStorage.getItem("current_portfolio")) {
                        // console.log(JSON.stringify(portList[i]) + " each asset")
                        assetList = portList[i].assets;
                    }
                }
                let assetNames = [];
                assetList.forEach(asset => {
                    assetNames.push(asset.assetName)
                })
                let params = ""
                assetNames.forEach(name => {
                    params += `${name},`
                })
                params = params.slice(0, -1);
                fetch(`https://comp1800project.pythonanywhere.com/prices?symbol=${params}`)
                    .then(res => res.json())
                    .then(prices => {
                        const cardArea = document.getElementById("assets-examples");
                        console.log(prices)
                        assetList.forEach(asset => {
                            let name = asset.assetName;
                            let qty = asset.assetQty;
                            let entry = asset.assetEntryPrice;
                            // console.log(prices.name, name)
                            let str = `<div class="card" id="display-card"> `
                            str += `<div class="card-content">
                    <img src="./img/star-svgrepo-com.svg" alt="star">
                    <div class="stock-name">
                        <span>name</span>
                        <h3>${name}</h3>
                    </div>
                    <div class="stock-name">
                        <span>entry price</span>
                        <h3>${entry}</h3>
                    </div>
                    <div class="stock-name">
                        <span>current price</span>
                        <h3>${prices[name].toFixed(2)}</h3>
                    </div>
                    <div class="stock-name">
                        <span>qty</span>
                        <h3>${qty}</h3>
                    </div>
                    <div class="stock-name">
                        <span>ROI</span>
                        <h3>${(((qty * prices[name] - entry * qty) / (qty * entry)) * 100).toFixed(2)}%</h3>
                    </div>
                </div>`
                            str += `</div>`;
                            cardArea.innerHTML += str;
                        });

                    })
            })
            
    }

    assignPortfolio = (portfolioName) => {
        localStorage.removeItem("current_portfolio");
        removeAssetList();
        const modal = ` <div class="card" id="add-stock"> <div class="card-content" id="add-stock" onclick="document.querySelector('#add-stock-popup').showModal()"> <h1 id="plusTag">+</h1> </div> </div>`
        inputEl.addEventListener("input", onCryptoInputChange);
        // alert(portfolioName);
        localStorage.setItem("current_portfolio", portfolioName);

        document.getElementById('portfolio-display').style.display = "none";
        document.getElementById('current-portfolio').innerHTML = `<h3> ${localStorage.getItem("current_portfolio")} </h3>` + modal;
        const modal1 = document.querySelector('#add-stock-popup');
        const openModalAddStock = document.getElementById('#add-stock');
        const closeModalAddStock = document.querySelector('#close-addStock-popup');
        closeModalAddStock.addEventListener('click', function () {
            modal1.close();
            document.getElementById("assetInput").value = "";
            document.getElementById("radio-stock").checked = false;
            document.getElementById("radio-crypto").checked = false;
            document.getElementById("quantity-popup-input").value = "";
            document.getElementById("price-popup-input").value = "";
            document.getElementById("dateAddAsset").value = "";
            document.getElementById("total-popup-input").value = "";

        })

        loadPortfoliosAssets();

    }

    document.getElementById("addAssetForm")["radio-crypto"].addEventListener("change", (e) =>{
        const addAssetForm = document.getElementById("addAssetForm");
            addAssetForm["assetInput"].disabled = false;
            addAssetForm["quantity-popup-input"].disabled = false;
            addAssetForm["quantity-popup-input"].step = 0.0000001;
            addAssetForm["price-popup-input"].disabled = false;
    });

    document.getElementById("addAssetForm")["radio-stock"].addEventListener("change", (e) => {
        const addAssetForm = document.getElementById("addAssetForm");
            addAssetForm["assetInput"].disabled = false;
            addAssetForm["quantity-popup-input"].disabled = false;
            addAssetForm["quantity-popup-input"].step = 1;
            addAssetForm["price-popup-input"].disabled = false;
    })

    updatePortfolio = () => {
        // console.log("updatePortfolio")
        const addAssetForm = document.getElementById("addAssetForm");
        addAssetForm.addEventListener("submit", (e) => {
            e.preventDefault();
            let crypto = addAssetForm["radio-crypto"];
            //if user adds crypto
            if (crypto.checked && addAssetForm["assetInput"].disabled == true) {
                const assetName = addAssetForm["assetInput"].value;
                const assetQty = addAssetForm["quantity-popup-input"].value;
                const assetBuyPrice = addAssetForm["price-popup-input"].value;
                const assetType = "crypto";
                // calculate total price in the pop up modal
                const assetTotalPrice = +assetQty * +assetBuyPrice;
                // replace value in the pop modal total price
                document.getElementById("total-popup-input").innerHTML = assetTotalPrice;
                if (assetQty > 0 && assetBuyPrice > 0) {
                    let currentUser = db.collection("users").doc(user.uid);
                    const newAsset = {
                        assetName,
                        assetQty,
                        assetEntryPrice: assetBuyPrice,
                        assetType,
                    }

                    currentUser
                        .get()
                        .then((doc) => {
                            if (doc.exists) {
                                var portList = doc.data().portfolios
                                for (let i = 0; i < portList.length; i++) {
                                    if (portList[i].portfolioName == localStorage.getItem("current_portfolio")) {
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
                                        document.querySelector('#add-stock-popup').close()
                                        removeAssetList()
                                        loadPortfoliosAssets();
                                        // location.reload();

                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    })
                            }
                        })
                        .catch(error => console.log(error))
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Invalid Input",
                        text: "Make sure you entered all the information correctly",
                    });
                }
            }
        })
    }

    loadPortfolios();

});

// closeModalPortfolio = () => {
//     modal3 = document.querySelector('#add-stock-popup');
//     modal3.close();
// }

const inputEl = document.getElementById("assetInput");
let cryptos = []
getCryptos()
async function getCryptos() {
    // let coins  = await fetch('../data/cryptos.json');
    let coins = await fetch('./data/cryptos.json');
    let data = await coins.json();

    cryptos = data.map((coin) => {
        return coin
    })
}



onCryptoInputChange = () => {
    removeAutocompleteDropDown();
    const value = inputEl.value.toLowerCase();
    if (value.length === 0) return;
    const filteredCoins = []
    cryptos.forEach((coin) => {
        if (coin.name.substr(0, value.length).toLowerCase() === value || coin.symbol.substr(0, value.length).toLowerCase() === value) {
            filteredCoins.push(coin.name + "(" + coin.symbol + ")")
        }
    })

    createAutocompleteDropdown(filteredCoins);
}

function createAutocompleteDropdown(list) {
    const listEl = document.createElement("ul");
    listEl.id = "autocomplete-list";
    listEl.className = "autocomplete-list";
    list.forEach((coin) => {
        const listItem = document.createElement("li");
        const coinButton = document.createElement("button");
        coinButton.addEventListener("click", onMenuButtonClick)
        coinButton.innerHTML = coin;
        listItem.appendChild(coinButton);
        listEl.appendChild(listItem)
    })
    document.querySelector(".input-addAsset-popup").appendChild(listEl)
}

function onMenuButtonClick(e) {
    e.preventDefault();
    const selected = e.target.innerHTML
    inputEl.value = selected.match(/\((.*?)\)/)[1];
    inputEl.disabled = true;

    removeAutocompleteDropDown();
}

function removeAutocompleteDropDown() {
    const listEl = document.getElementById("autocomplete-list");
    if (listEl) listEl.remove();
}

function removeAssetList() {
    document.getElementById('assets-examples').innerHTML = "";
                                        
}