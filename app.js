console.log('READY')




const containerWidth = $('#container').width();
var shield = 0; // shows if sheild is in use or not 

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
		// press spacebar to defelect arrow back toward shooter 
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
		this.health = health;
		this.damage = damage;
		this.top = top;
		this.left= left;
		

	}
}
	// attack(Player){
	// 	if(Math.random() > .70){
	// 		Player.health = Player.health - this.damage
	// 	}
	// 	if (Player.health > 0){
	// 		Player.defend(this)
	// 	}

const shooterOne = new Shooter (
	25, // Health
	5, // damage
	$('#shooter').offset().top, //top position
	$('#shooter').offset().left //current position 
);



var playerLoc=document.getElementById('player');
//var shooter = document.getElementById('shooter');
var container=document.getElementById('container'); 




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
    	// alert(Math.floor(Math.random() * (7 - 0) + 1));
    }
    if (e.keyCode == 32){
    	// playerDeflect();
    	if(shield == 0){
    		shield = 12; 
    		$('#player').css('border-top', '4px solid gray')
    	}
    	
    }
	$('#player').css('left', playerOne.left); 
}

document.onkeydown = anim;


function animateShooter() {

	if($('#shooter').position().left == 0 ){
		$( "#shooter" ).animate({
	 		left: $('#container').width()- $('#shooter').width()
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
	var bulletNumber = 1;

	var gameOn = setInterval(function(){
		
		if(shield > 0 ){
			shield--; 
			$('#shieldTimer span').html(shield)
			if(shield == 6){
				$('#player').css('border-width', '0px')
			}
		}

		var random = Math.floor(Math.random() * (4 - 0) + 1);
		// alert(random);
		if( parseInt(random) == 2){
			// if Math.random hits 2 a bullet will be shot to players location 
			var bullet = '<div class="bullet' + bulletNumber + ' " style="left:' + $('#shooter').offset().left + 'px "></div>'
			// giving each bullet its individual id 
			$('#shooter').after(bullet)
			
			// console.log('before ' + bulletNumber)
			
			$('.bullet' + bulletNumber).animate({
				top: $('#container').height()- $('.bullet' + bulletNumber).height() -$('#player').height(),
				left: playerOne.left + $('#player').width()/2 

			}, 3000, "linear", function(){
				// when bullet hits ground
				var left = playerOne.left;
				var right = left + $('#player').width();
				

				if($(this).offset().left > left && $(this).offset().left < right){ // bullet hit player
					if(shield < 6){
						var health = $('#health span').text()
						$('#health span').html(parseInt(health)-5)
						
						if(health == 5){
							$('.game-over-lose').show();

							clearInterval(gameOn);
						}
					} else { 
						console.log('shield up')
						var bullet = '<div class="bulletDeflected' + bulletNumber + '" style="top:' + $(this).offset().top + 'px ; left:' + $(this).offset().left + 'px "></div>'
						$('#container').append(bullet)

						$('.bulletDeflected' + bulletNumber).animate({
							top: $('#shooter').offset().top,
							left: Math.floor(Math.random() * (containerWidth - 0) + 1)

							}, 3000, function(){ // after animation when bullet deflected reaches the top of container 
								
								
								
								var right = $('#shooter').offset().left + $('#shooter').width()+60;

								if($(this).offset().left > ($('#shooter').offset().left -60) && $(this).offset().left < right ) { // bullet hit shooter
									$('.game-over-win').show();
									clearInterval(gameOn);

								}
								$(this).remove();
							});
					}
				}
				
				$(this).remove();
				// console.log('after ' + bulletNumber);

			})

				// alert(playerOne.top);
			bulletNumber++; 
			// console.log('shooting');
		}
		

	}, 500);



}


function playerDeflect(){
	 
var bulletNumber = 1; 
var bullet = '<div class="bullet' + bulletNumber + ' " style="left:' + playerOne.left + 'px "></div>'

	
const bullets = $('.bullet') 

$('.bullet').each((bullets) => {})
for(let i =0; i < bullets.length; i++){
	console.log(bullets[i]);
	bullets[i].position();

	if(playerOne.left == bullets[i].position())
			$(bullets[i]).animate({

			})

	}
  }






$(document).ready(function(){
	animateShooter();
	startShooting();
	playerDeflect();
});	





















