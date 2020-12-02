let cards = document.querySelectorAll('.card_inner');
let firstClick = false;
let counter = 0;
let cardPair = [];
let endcount = 0;


let flips = 0;
var v, see, filtered;
var mesg, snapVal;

const modal = document.querySelector('#my-modal');
const closeBtn = document.querySelector('.close');
const bt1 = document.querySelector('#yes');
const bt2 = document.querySelector('#no');
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);
bt1.addEventListener('click', refresh);
bt2.addEventListener('click', back);
const quit = document.querySelector('#finish');
quit.addEventListener('click', signout)
var name, userid;


firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
       userid =String(user.uid);
       console.log(userid);
       const database = firebase.database().ref("register/" + userid);

database.on("value", snapshot => {
	snapVal = snapshot.val();
      console.log(snapVal);
}); 
}
 });


//see = localStorage.getItem("userID");
//filtered=see.replace(/[^a-zA-Z0-9-. ]/g, "");
//filtered = filtered.replace("gmail.com", "");
//console.log(see);





cards.forEach((card) => {
	card.state = 'unclicked'
}); 

shuffle();

for (let i = 0; i < cards.length; i++) {
	cards[i].addEventListener('click', () => {
			if (!firstClick) {time();}
			firstClick=true;

			if (cards[i].state == 'unclicked') {
				cards[i].style.transform = 'rotateY(180deg)'
				cards[i].state = 'clicked';
				counter++;
				
	 			
				cardPair.push(cards[i]);
				check();
				
			}

			else if (cards[i].state == 'clicked') {
				cards[i].style.transform = 'rotateY(0deg)'
				cards[i].state = 'unclicked'
				counter--;
				cardPair = [];

			}
	});
}


function check(){
	 if (counter==2) {
	 	if (cardPair[0].querySelector('img').src == cardPair[1].querySelector('img').src) {
	 				endcount++;
	 				flips++;

	 				console.log(endcount)

					if(endcount==10){
							openModal();
							document.querySelector('#msg').innerHTML="Good memory pal! want to play more?";
							
							
			//sec = 0;
			//min = 0;
						}
						
						
						
							//document.location.reload(true);
			//sec = 0;
			//min = 0;
						
						
						
					
			v=flips.toString();
				//console.log(typeof v);
			const database = firebase.database().ref("register/" + userid);
			database.set({
			score: v,
			name: snapVal.name
				});
			document.querySelector('#score').innerHTML=flips;
	 			matched();
	 	}
	 	else{
	 		unmatched(cardPair[0], cardPair[1]); 
	 	}
	 }
}

function matched(){
	cardPair[0].state = 'blocked';
	cardPair[1].state = 'blocked';
	counter = 0;
	cardPair = [];

}


function unmatched(x,y){
	setTimeout(() => {
		x.style.transform = 'rotateY(0deg)'
		y.style.transform = 'rotateY(0deg)'
	}, 750);

	cardPair[0].state = 'unclicked';
	cardPair[1].state = 'unclicked';
	counter = 0;
	cardPair = []
}

function time(){
	let sec = 60;
	let min = 2;
	let SS;
	let MM;
	var t = setInterval(() => {
		sec--;
		if (sec==0 ) {sec=60;
			min--;
		}
		sec<10?SS=`0${sec}`:SS=`${sec}`;
		min<10?MM=`0${min}`:MM=`${min}`;
		//SS=`${sec}`;
		//MM=`${min}`;

		console.log(`${MM}:${SS}` == '00:00');
		if (`${MM}:${SS}` == '00:01') {
			openModal();
			document.querySelector('#msg').innerHTML="Time Up! Hardluck! want to play more?";
			
			clearInterval(t);
			

			//document.location.reload(true);

		}

		if (endcount==10) {
			clearInterval(t);
		}

		document.querySelector('#Time').innerHTML = `${MM}:${SS}` 		
	}, 1000);
}




function shuffle(){
	let images = document.querySelectorAll('img');
	let srcs = ['chris1.jpg','chris1.jpg','chris2.jpg','chris2.jpg','chris3.jpg','chris3.jpg','chris4.jpg','chris4.jpg','chris5.jpg','chris5.jpg','chris6.jpg','chris6.jpg','chris7.jpg','chris7.jpg','chris8.jpg','chris8.jpg','chris9.jpg','chris9.jpg','chris10.jpg','chris10.jpg'];

	for(let i=srcs.length-1; i>0; i--){
		let j = Math.floor(Math.random() * i);
		let temp = srcs[i];
		srcs[i] = srcs[j];
		srcs[j] = temp;
	}

	for (let i = 0; i < images.length; i++) {
		images[i].src = srcs[i]; 
	}
}

// Open
function openModal() {
  modal.style.display = 'block';
}

//function message(mesg){
	
//}

// Close
function closeModal() {
  modal.style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

function refresh(){
	document.location.reload(true);
}


function back(){
	window.location="index.html";
	//setInterval(() => {

		//},1000)
	
}

function signout(){
	firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        firebase.auth().signOut().then(function() {
  // Sign-out successful.

  console.log('User Logged Out!');
  return window.location = "index.html";
}).catch(function(error) {
  // An error happened.
  console.log(error);
});
    }});
    
}
/*if (endcount==10) {
	alert("Good one!!");
			//sec = 0;
			//min = 0;
	document.location.reload(true);

}*/

