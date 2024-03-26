import fs from 'fs';
// const fs = require("fs");
let assetsJson = fs.readFileSync("data/assets.json", "utf8");
let parsedData = JSON.parse(assetsJson);
console.log(parsedData);
        let str = "";
        for (let i = 0; i < parsedData.length; i++) {
            str += `<div class='card'>
                <div class="card-content">
                <div class="card-content">
                <img src="./img/star-svgrepo-com.svg" alt="star">
                <div class="stock-name">
                    <span>name</span>
                    <h3>${parsedData[i].symbol}</h3>
                </div>
                <div class="stock-name">
                    <span>price</span>
                    <h3>${parsedData[i].price}</h3>
                </div>
                <div class="stock-name">
                    <span>change</span>
                    <h3>-</h3>
                </div>
                <div class="stock-name">
                    <span>avg</span>
                    <h3>-</h3>
                </div>
            </div>
                </div>`
            console.log(parsedData[i]);
        }
        str += "</div>";
        document.getElementById("assets-examples").innerHTML = str;