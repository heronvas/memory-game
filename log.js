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
var name;
var score;
var name_array =['name1','name2','name3','name4','name5']
var score_array =['score1','score2','score3','score4','score5']
i = 5;
getvalue();
function getvalue(){
s = firebase.database() .ref("register") ;/*.orderByChild("score") .limitToFirst(5).once("value") .then(function(snapshot){ })*/
s.orderByChild("score").limitToLast(5).on("child_added", snap => {
    //name = snap.key; // this key will output users
    console.log(name);
    u =snap.val(); // this method will return full user
    name = u.name;
    score = u.score;
    console.log(score);
    display(i,name,score);
    i = i-1;
});

if ( name_array.length != 0){
console.log(name_array);
console.log(score_array);
display();
}
}
function display(i,name,score){
	var div = document.getElementById(name_array[i-1]);
	div.innerHTML = name;
	var div = document.getElementById(score_array[i-1]);
	div.innerHTML = score;





}