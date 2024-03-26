(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
console.log("in list.js")
const fs = require("fs");
let assetsJson = fs.readFileSync("data/teams.html", "utf8");
let parsedData = JSON.parse(assetsJson);
console.log(parsedData);
        let str = "";
        // for (let i = 0; i < parsedData.length; i++) {
        //     str += `<div class='card_teamList'>
        //         <div class="teamImg">
        //         <img src="${parsedData[i].image}" alt="Lamar Jackson" width="300">
        //         </div>
        //         <div class="containerTeamList">
        //             <span><b>Name: ${parsedData[i].name}</b></span>
        //             <p>Record: ${parsedData[i].record}</p>
        //             <p>City: ${parsedData[i].city}</p>
        //             <p>Stadium: ${parsedData[i].stadium}</p>
        //         </div>
        //         </div>`
        //     console.log(parsedData[i]);
        // }
        // str += "</div>";
        // document.getElementById("assets-examples").innerHTML = str;
},{"fs":2}],2:[function(require,module,exports){

},{}]},{},[1]);
