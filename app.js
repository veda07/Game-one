console.log('READY')




const containerWidth = $('#container').width();
let shield = 0; // shows if sheild is in use or not 

class Player {
	constructor(health, damage, top, left){
		// Health is how many hitpoints player has 
		this.health = health;
		// damage is how much health player takes from shooter
		this.damage = damage;
		this.top = top;
		this.left = left;
	}


		// description: 'defend against enemy shooter with player sheild';
	
} 

const playerOne = new Player (
	25, // health
	5, // damage
	$('#player').offset().top, // top position
	$('#player').offset().left // current position
);
// alert($('#player').offset().left)

class Shooter {
	constructor(health, damage, top, left){
		this.health = health; // does not use the health or damage at this point in time
		this.damage = damage;
		this.top = top;
		this.left= left;
		

	}
}


const shooterOne = new Shooter (
	25, // Health
	5, // damage
	$('#shooter').offset().top, //top position
	$('#shooter').offset().left //current position 
);



let playerLoc=document.getElementById('player');
//var shooter = document.getElementById('shooter');
let container=document.getElementById('container'); 




function anim(e) {
	 // alert(e.keyCode);


	if(e.keyCode ==  39 ){
		// right key
		if(playerOne.left < $(document).width()- $('#player').width()-15){

			playerOne.left +=10;
			playerLoc.style.left = playerLoc  + 'px';
		}
    }
	if(e.keyCode == 37 ){
		// left key
		if(playerOne.left > 0){
		   playerOne.left -=10;
		   playerLoc.style.left = playerLoc + 'px';
	   }

    }
    if(e.keyCode == 76){
    	// alert($(document).width());
    	// alert(playerOne.left);
    	
    }
    if (e.keyCode == 32){
    	// playerDeflect();
    	if(shield == 0){
    		shield = 12; 
    		$('#player').css('border-top', '4px solid gray')
    		// press spacebar to defelect arrow back toward shooter
    	}
    	
    }
	$('#player').css('left', playerOne.left); 
}

document.onkeydown = anim;


function animateShooter() {

	// getting the shooter to move back and fourth across the screen as the game continues
	if($('#shooter').position().left == 0 ){ 
		$( "#shooter" ).animate({
	 		left: $('#container').width()- $('#shooter').width() // keeping the shooter within the container
		}, 6000, function(){
			animateShooter();
		})
	} else{
		$( "#shooter" ).animate({
	 		left: 0
		}, 6000, function(){
			animateShooter();
		})
	}

	
}


function startShooting(){
	let bulletNumber = 1;

	let gameOn = setInterval(function(){
		
		if(shield > 0 ){
			shield--; 
			$('#shieldTimer span').html(shield)
			if(shield == 6){
				$('#player').css('border-width', '0px')
			}
		}

		let random = Math.floor(Math.random() * (4 - 0) + 1);
		
		if( parseInt(random) == 2){
			// if Math.random hits 2 a bullet will be shot to players location 
			let bullet = '<div class="bullet' + bulletNumber + ' " style="left:' + $('#shooter').offset().left + 'px "></div>'
			// giving each bullet its individual id 
			$('#shooter').after(bullet)
			
			$('.bullet' + bulletNumber).animate({
				top: $('#container').height()- $('.bullet' + bulletNumber).height() -$('#player').height(),
				left: playerOne.left + $('#player').width()/2 

			}, 3000, "linear", function(){ // when bullet hits the gorund
				
				let left = playerOne.left;
				let right = left + $('#player').width();
				

		if($(this).offset().left > left && $(this).offset().left < right){ // bullet hit player
			if(shield < 6){
				let health = $('#health span').text()
				$('#health span').html(parseInt(health)-5)
						
			if(health == 5){
				$('.game-over-lose').show();

				clearInterval(gameOn);
			}
			} else { 
				console.log('shield up')
				let bullet = '<div class="bulletDeflected' + bulletNumber + '" style="top:' + $(this).offset().top + 'px ; left:' + $(this).offset().left + 'px "></div>'
				$('#container').append(bullet)

				$('.bulletDeflected' + bulletNumber).animate({
					top: $('#shooter').offset().top,
					// deflecting bullet at a ranomd location back to the top of the screen 
					left: Math.floor(Math.random() * (containerWidth - 0) + 1) 

				}, 3000, function(){ // after animation when bullet deflected reaches the top of container 
								
								
								
				let right = $('#shooter').offset().left + $('#shooter').width()+50;

				if($(this).offset().left > ($('#shooter').offset().left -50) && $(this).offset().left < right ) { // bullet hit shooter
					$('.game-over-win').show();
					clearInterval(gameOn);

					}
			
					$(this).remove();
		
				});
			
			}
	 
	 	  }
				
	 
	  	 $(this).remove();

  
  	  })

     bulletNumber++; 
   }
		

	}, 500);

}




$(document).ready(function(){
	animateShooter();
	startShooting();
	
});	





















