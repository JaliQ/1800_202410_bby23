

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const id = user.uid;
        const userName = localStorage.getItem("first_name");
        db.collection("users").doc(id).get()
            .then(doc => {
                portfolios = doc.data().portfolios;
                if (portfolios.length == 0) {
                    let pg = document.getElementById('portfolio-display');
                    pg.innerHTML = "<div id='jumbotron'><h1>Welcome to AssetClub, " + userName + "</h1><p>Empower your financial journey with our platform!  <br>Build diversified portfolios spanning stocks and cryptocurrencies, tailored to your financial goals. <br>Let's get started!</p><button class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#exampleModal'>Create portfolio</button></div>"
                } else {
                    let pg = document.getElementById('portfolio-display');
                    let str1 = "<div id='jumbotron'><h1>Welcome back to AssetClub, " + userName + "</h1><p>Discover new opportunities and optimize your financial strategy. <br>Let's make your portfolios thrive!<br><h3><img src='./img/crypto.svg' alt='star'> stands for cryptos!</h3> <h3><img id='stkimg' src='./img/stock.svg' alt='star'> stands for stocks!</h3><h3>Your portfolios: "
                    str1 += "<div id=`list-port`>"
                    portfolios.forEach(element => {
                        str1 += `<a href="javascript:void(0);" id="portfolioSelection" class="dropItem" onclick="assignPortfolio('${element.portfolioName}')">${element.portfolioName}</a>`
                        str1 += "<br/>"
                    });
                    str1 += "</div>"
                    str1 += "</h3></p></div>";
                    pg.innerHTML = str1;
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
        removeAssetList()
        let currentUser = db.collection("users").doc(user.uid);
        currentUser
            .onSnapshot((doc) => {
                var portList = doc.data().portfolios;  
                for (let i = 0; i < portList.length; i++) {
                    if (portList[i].portfolioName == localStorage.getItem("current_portfolio")) {
                        assetList = portList[i].assets;
                    }
                }
                let cryptoList = [];
                let stockList = [];
                assetList.forEach(asset => {
                    if (asset.assetType==="crypto"){
                        cryptoList.push(asset.assetName);
                    } else {
                        stockList.push(asset.assetName);
                    }
                })
                let params = ""
                cryptoList.forEach(name => {
                    params += `${name},`
                })
                params = params.slice(0, -1);
                fetch(`https://comp1800project.pythonanywhere.com/prices?symbol=${params}`)
                    .then(res => res.json())
                    .then(prices => {
                        const cardArea = document.getElementById("assets-examples");
                        assetList.forEach(asset => {
                           if (asset.assetType==="crypto") {let name = asset.assetName;
                            let qty = asset.assetQty;
                            let entry = asset.assetEntryPrice;
                            let bgStyle = (((qty * prices[name] - entry * qty) / (qty * entry)) * 100) > 0 ? '#1AF18D' : 'red';
                            // console.log(prices.name, name)
                            let str = `<div class="card" id="display-card" style="background: ${bgStyle};"> `
                            str += `<div class="card-content">
                    <img src="./img/crypto.svg" alt="star">
                    <div class="stock-name">
                        <span>Name</span>
                        <h3>${name}</h3>
                    </div>
                    <div class="stock-name">
                        <span>Entry</span>
                        <h3>${entry.toFixed(4)}</h3>
                    </div>
                    <div class="stock-name">
                        <span>Current</span>
                        <h3>${prices[name].toFixed(4)}</h3>
                    </div>
                    <div class="stock-name">
                        <span>Qty</span>
                        <h3>${qty.toFixed(4)}</h3>
                    </div>
                    <div class="stock-value">
                            <span>Total</span>
                            <h3>${(qty*prices[name]).toFixed(2)}</h3>
                        </div>
                    <div class="stock-name">
                        <span>ROI</span>
                        <h3>${(((qty * prices[name] - entry * qty) / (qty * entry)) * 100).toFixed(2)}%</h3>
                    </div>
                </div>`
                            str += `</div>`;
                            cardArea.innerHTML += str;}
                        });

                    })
                let stockParams = ""
                if (stockList.length>0){
                stockList.forEach(stock => {
                    stockParams += `${stock},`
                })
                stockParams = stockParams.slice(0, -1);
                fetch(`https://comp1800project.pythonanywhere.com/stockPrices?symbols=${stockParams}`)
                .then(res => res.json())
                .then(prices => {
                    const cardArea = document.getElementById("assets-examples");
                    assetList.forEach(asset => {                      
                        if (asset.assetType==="stock") {
                            let name = asset.assetName;
                            let qty = asset.assetQty;
                            let entry = asset.assetEntryPrice;
                            let bgStyle = (((qty * prices[name] - entry * qty) / (qty * entry)) * 100) > 0 ? '#1AF18D' : 'red';
                            // console.log(prices.name, name)
                            let str = `<div class="card" id="display-card" style="background: ${bgStyle};"> `
                            str += `<div class="card-content">
                        <img src="./img/stock.svg" alt="star">
                        <div class="stock-name">
                            <span>Name</span>
                            <h3>${name}</h3>
                        </div>
                        <div class="stock-name">
                            <span>Entry</span>
                            <h3>${entry}</h3>
                        </div>
                        <div class="stock-name">
                            <span>Current</span>
                            <h3>${prices[name].toFixed(2)}</h3>
                        </div>
                        <div class="stock-name">
                            <span>Qty</span>
                            <h3>${qty}</h3>
                        </div>
                        <div class="stock-value">
                            <span>Total</span>
                            <h3>${(qty*prices[name]).toFixed(2)}</h3>
                        </div>
                        <div class="stock-name">
                            <span>ROI</span>
                            <h3>${(((qty * prices[name] - entry * qty) / (qty * entry)) * 100).toFixed(2)}%</h3>
                        </div>
                    </div>`
                        str += `</div>`;
                        cardArea.innerHTML += str;}
                    });

                })
                }
                
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

    let isCrypto = false;

    document.getElementById("addAssetForm")["radio-crypto"].addEventListener("change", (e) => {
        const addAssetForm = document.getElementById("addAssetForm");
        addAssetForm["assetInput"].disabled = false;
        addAssetForm["quantity-popup-input"].disabled = false;
        addAssetForm["quantity-popup-input"].step = 0.0000001;
        addAssetForm["price-popup-input"].disabled = false;
        isCrypto = true
    });

    document.getElementById("addAssetForm")["radio-stock"].addEventListener("change", (e) => {
        const addAssetForm = document.getElementById("addAssetForm");
        addAssetForm["assetInput"].disabled = false;
        addAssetForm["quantity-popup-input"].disabled = false;
        addAssetForm["quantity-popup-input"].step = 1;
        addAssetForm["price-popup-input"].disabled = false;
        isCrypto = false
    })

const inputEl = document.getElementById("assetInput");
let cryptos = []
let stocks = []
getCryptos()
getStocks()
async function getCryptos() {
    // let coins  = await fetch('../data/cryptos.json');
    let coins = await fetch('./data/cryptos.json');
    let data = await coins.json();

    cryptos = data.map((coin) => {
        return coin
    })
}

async function getStocks(){
    let stucks  = await fetch('../data/stocks.json');
    let data = await stucks.json();

    stocks = data.map((stock) => {
        return stock;
    })
}



onCryptoInputChange = () => {
    removeAutocompleteDropDown();
    if (isCrypto){
        const value = inputEl.value.toLowerCase();
        if (value.length === 0) return;
        const filteredCoins = []
        cryptos.forEach((coin) => {
            if (coin.name.substr(0, value.length).toLowerCase() === value || coin.symbol.substr(0, value.length).toLowerCase() === value) {
                filteredCoins.push(coin.name + "(" + coin.symbol + ")")
            }
        })
        createAutocompleteDropdown(filteredCoins);
    } else {
        const value = inputEl.value.toLowerCase();
        if (value.length === 0) return;
        const filteredStocks = []
        stocks.forEach((stock) => {
            if (stock.name.substr(0, value.length).toLowerCase() === value || stock.symbol.substr(0, value.length).toLowerCase() === value) {
                filteredStocks.push(stock.name + "(" + stock.symbol + ")")
            }
        })
        createAutocompleteDropdown(filteredStocks);
    }
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

    updatePortfolio = () => {
        // console.log("updatePortfolio")
        const addAssetForm = document.getElementById("addAssetForm");
        addAssetForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const assetType = addAssetForm["radio-crypto"].checked ? "crypto" : "stock";
            //if user adds crypto
            if (assetType && addAssetForm["assetInput"].disabled == true) {
                const assetName = addAssetForm["assetInput"].value;
                const assetQty = addAssetForm["quantity-popup-input"].value;
                const assetBuyPrice = addAssetForm["price-popup-input"].value;
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
                                        let toParse = portList[i].assets ;
                                        let flag = true;
                                        toParse.forEach((asset, index) => {
                                            if (asset.assetName === newAsset.assetName){
                                                let price = parseFloat(asset.assetEntryPrice);
                                                let newPrice = parseFloat(newAsset.assetEntryPrice)
                                                let qty = parseFloat(asset.assetQty);
                                                let oldqty = parseFloat(newAsset.assetQty);
                                                let total = qty+oldqty ;
                                                let newEntry = (qty*price)/total+((newAsset.assetQty*newAsset.assetEntryPrice)/total);
                                                newAsset.assetQty = total;
                                                newAsset.assetEntryPrice = newEntry;
                                                toParse[index] = newAsset
                                                asset = newAsset;
                                                flag = false;
                                            }
                                        })
                                        if (flag){
                                            portList[i].assets.push(newAsset);
                                        } else{          
                                            portList[i].assets = toParse;
                                        }
                                    }

                                }
                                currentUser
                                    .update({
                                        portfolios: portList
                                    })
                                    .then(() => {
                                        console.log("Portfolios updated successfully");
                                        document.querySelector('#add-stock-popup').close();
                                        removeAssetList();
                                        resetForm();
                                        loadPortfoliosAssets();

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

const inputEl = document.getElementById("assetInput");
let cryptos = []
let stocks = []
getCryptos()
getStocks()
async function getCryptos() {
    // let coins  = await fetch('../data/cryptos.json');
    let coins = await fetch('./data/cryptos.json');
    let data = await coins.json();

    cryptos = data.map((coin) => {
        return coin
    })
}

async function getStocks() {
    let stucks = await fetch('../data/stocks.json');
    let data = await stucks.json();

    stocks = data.map((stock) => {
        return stock;
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

function resetForm() {
    document.getElementById('addAssetForm').reset();
}