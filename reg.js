var nam, id;


var modal = document.getElementById('id01');
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

function valid_reg() {
        var name = document.forms["RegForm"]["username"];
        var email = document.forms["RegForm"]["email"];
        var password = document.forms["RegForm"]["psw"];
        var cnf = document.forms["RegForm"]["psw_repeat"];
        var letters = /^[A-Za-z]+$/;
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (name.value == "") {
            window.alert("Please enter your name.");
            name.focus();
            return false;
        }

         if(!(name.value.match(letters))) {
            alert('Username must have alphabet characters only');
            name.focus();
            return false;
        }

        if (email.value == "") {
            window.alert("Please enter your email.");
            email.focus();
            return false;
        }

        if(!(email.value.match(mailformat))) {
            alert("You have entered an invalid email address!");
            email.focus();
            return false;
        }

        if (password.value == "") {
            window.alert("Please enter your password.");
            password.focus();
            return false;
        }

        if (password.value.length < 8) {
            window.alert("Password size should be 8 minimum.");
            password.focus();
            return false;
        }

        if (cnf.value != password.value) {
            window.alert("Password should be same.");
            cnf.focus();
            return false;
        }




    }

// Initialize Firebase(2)
var firebaseConfig = {
    apiKey: "AIzaSyAwv9W0rhdWPl5RxRJLSvUTa2Mczt31zf8",
    authDomain: "register-5d2dc.firebaseapp.com",
    databaseURL: "https://register-5d2dc.firebaseio.com",
    projectId: "register-5d2dc",
    storageBucket: "register-5d2dc.appspot.com",
    messagingSenderId: "96588430685",
    appId: "1:96588430685:web:518cbff58205dc490e3cb4",
    measurementId: "G-FQTTHNJ50R"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
 let formMessage = firebase.database().ref('register');
function register_user(){
//Reference for form collection(3)


//listen for submit event//(1)
document
  .getElementById('RegForm1')
  .addEventListener('submit', formSubmit);
}//Submit form(1.2)
function formSubmit(e) {
  
  e.preventDefault();
  // Get Values from the DOM
  var name = document.forms["RegForm"]["username"]; 
  var email = document.forms["RegForm"]["email"];  
  var password = document.forms["RegForm"]["psw"]; 
  var cnf = document.forms["RegForm"]["psw_repeat"]; 
  var score = 0;
  firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
  .then(function(user) {
    
   

// ------------------------------------//
    var userId;
   //Check if signed in
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        userId = String(user.uid);
        console.log(userId);
        sendMessage(userId, name.value, score);
    }});
    
    return window.location = 'index.html';
    // Signed in 
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert(errorMessage);
    window.location.reload(true);

    // ..
  });

}

//Send Message to Firebase(4)

function sendMessage(userId,name, score) {
  const formMessage1 = formMessage.child(userId);
  
  formMessage1.set({
    name: name,
    score: score
  });
  window.alert("register");
}

function valid_log() {

        var email = document.forms["Logpage"]["email"];
        var password = document.forms["Logpage"]["psw"];


        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


        if (email.value == "") {
            window.alert("Please enter your email.");
            email.focus();
            return false;
        }

        if(!(email.value.match(mailformat))) {
            alert("You have entered an invalid email address!");
            email.focus();
            return false;
        }

        if (password.value == "") {
            window.alert("Please enter your password.");
            password.focus();
            return false;
        }

        if (password.value.length < 8) {
            window.alert("Password size should be 8 minimum.");
            password.focus();
            return false;
        }
    }
function login_user(){
    document
  .getElementById('Log')
  .addEventListener('submit', login_submit);
  //var user1 = firebase.auth().currentUser;
//console.log(user1.uid);
//id = user1.uid;
//localStorage.setItem("userID", id);



}
function login_submit(e){
  e.preventDefault();
  var email = document.forms["Logpage"]["email"];
  var password = document.forms["Logpage"]["psw"];
  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
  .then(function(user){
    window.alert("Login successfully");// Signed in
    return window.location="card.html"
    // Signed in
    // ...
  })
  .catch(function(error){
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert(errorMessage);
    window.location.reload(true);
  });


}


function signout(){
    firebase.auth().signOut().then(function() {
  // Sign-out successful.
  console.log('User Logged Out!');
  return window.location = "index.html";
}).catch(function(error) {
  // An error happened.
  console.log(error);
});
}