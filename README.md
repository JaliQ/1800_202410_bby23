# Project Title

## 1. Project Description
State your app in a nutshell, or one-sentence pitch. Give some elaboration on what the core features are.  
This browser based web application to ... 

## 2. Names of Contributors
List team members and/or short bio's here... 
* Hi, my name is Nickolay, looking forward to implement our project ideas into reality!
* Hi, my name is Darrel, I can't wait to make this project useful for others!!
* Hi, My name is Manases, looking forward to learn about coding.
	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* ...

## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?
Here are the steps ...
* ...
* ...
* ...

## 5. Known Bugs and Limitations
Here are some known bugs:
* ...
* ...
* ...

## 6. Features for Future
What we'd like to build in the future:
* ...
* ...
* ...
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file, this is what users see when you come to url
└── README.md

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── images                   # Folder for images
    /blah.jpg                # Acknowledge source
├── scripts                  # Folder for scripts
    /blah.js                 # 
├── styles                   # Folder for styles
    /blah.css                # 



```

## 8. in scripts folder, create firebaseAPI_BBY23.js
Copy and paste the following code in to the js file
```
//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
const firebaseConfig = {
  // bby23 configuration
  // apiKey: "AIzaSyBMKol-RIAxg5N13MteabzGFGhTL5_6uV8",
  // authDomain: "assetsclub-bby23.firebaseapp.com",
  // projectId: "assetsclub-bby23",
  // storageBucket: "assetsclub-bby23.appspot.com",
  // messagingSenderId: "599229072336",
  // appId: "1:599229072336:web:5fce050d7520a1f9f26fd5"

  // (newer version of BBY23) configuration
  apiKey: "AIzaSyDSXGI9YwHelCjlNVS_eP1bk59sOHH651U",
  authDomain: "assetsclub-bby23-f21cd.firebaseapp.com",
  projectId: "assetsclub-bby23-f21cd",
  storageBucket: "assetsclub-bby23-f21cd.appspot.com",
  messagingSenderId: "815738954492",
  appId: "1:815738954492:web:ac2058c29837748b72ed79"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth()
```


