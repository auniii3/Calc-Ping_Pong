var rod1 = document.getElementById("first");
var rod2 = document.getElementById("second");
var circle = document.getElementById('ball');
var width = window.innerWidth;
var coordinate = rod1.getBoundingClientRect();
var coordinate1 = rod2.getBoundingClientRect();
var counter = coordinate.x;
var counter1 = coordinate1.x; 
var tmpCounter = coordinate.x;
var tmpCounter1 = coordinate1.x;
var isGameRunning = false;
var stylerod = circle.style;
var middlePosForRods= (window.innerWidth-200)/2;
var middlePosForCircle=(window.innerWidth-25)/2;
var rodHeight=rod1.getBoundingClientRect().height;



document.addEventListener('keypress',keyEvent);


//function for showing max-scores
function showAlert(){
    var maxScore=localStorage.getItem("maxScore");
    //checking for the first time play
    if(maxScore===null){
        alert("Welcome! First time you are playing the game, LET'S START! ");
        maxScore=0;
    }
    else{
        alert("your max score is : "+maxScore);
    }
}


//handling key presses in document
function keyEvent(event){
    
    if(event.key == 'Enter' && !isGameRunning){
        showAlert();
        isGameRunning = true;
        //for resetting the ball to center if it is not in center
        circle.style.left = 50 + "%";
        setTimeout(moveBall,200);
    }

    //Handling 'd' key press
    if(event.keyCode === 100){
        if(counter <= width - 200){
            rod1.style.left = counter + "px";
            counter += 10;
        }
    }
    if(event.keyCode === 100){
        if(counter1 <= width - 200){
            rod2.style.left = counter1 + "px";
            counter1 += 10;
        }
    }

    //Handling 'a' key press
    if(event.keyCode === 97){
        if(counter >= 8){
            rod1.style.left = counter -10 + "px";
            counter = counter - 10;
        }
    }

    if(event.keyCode === 97){
        if(counter1 >= 8){
            rod2.style.left = counter1 -10 + "px";
            counter1 = counter1 - 10;
        }
    }
}



//reset the rods after game-over
function reset(){
    isGameRunning = false;
    circle.style.alignItems = 'center';
    rod1.style.left = coordinate.left + "px";
    rod2.style.left = coordinate1.left + "px";
    counter = tmpCounter;
    counter1 = tmpCounter1;

}


//move the ball randomly
function moveBall(){
    var dirl=1;
    var dirt=1;
    var tempScore=0;
    var ballMove= setInterval(() => {
        var c = circle.getBoundingClientRect();
        var rodPos=rod1.getBoundingClientRect();
        var circleInnerHeight=(window.innerHeight-25);
        
        if(((c.x)+4)>(middlePosForCircle*2)){
            dirl=2;
        }
        if(((c.x)-4)<0){
            dirl=1;
        }
        if(((c.top)+4)>(circleInnerHeight-rodPos.height)){
            dirt=2
        }
        if(((c.top)-4)<rodHeight){
            dirt=1
        }
        if(c.x<rodPos.x+5 && ((c.top)-4)<rodHeight){
            clearInterval(ballMove);
            if(localStorage.getItem('maxScore')===null || localStorage.getItem('maxScore')<tempScore ){
                localStorage.setItem("maxScore",tempScore);
                alert("score is : "+tempScore);
                reset();
            }
            else if(localStorage.getItem('maxScore')>=tempScore){
                alert("score is : "+tempScore);
                reset();
            }
        }
        
        if(c.x<rodPos.x+5 && ((c.top)+4)>circleInnerHeight-rodPos.height){
            clearInterval(ballMove);
            if(localStorage.getItem('maxScore')===null || localStorage.getItem('maxScore')<tempScore ){
                localStorage.setItem("maxScore",tempScore);
                alert("score is 2: "+tempScore);
                reset();
            }
            else if(localStorage.getItem('maxScore')>=tempScore){
                alert("score is 2: "+tempScore);
                reset();
            }
        }
        
        
        if(c.x>rodPos.x+5 && c.x>(rodPos.x)+200 ){
            if(((c.top)+4)>circleInnerHeight-rodPos.height){
            clearInterval(ballMove);
            if(localStorage.getItem('maxScore')===null || localStorage.getItem('maxScore')<tempScore ){
                localStorage.setItem("maxScore",tempScore);
                alert("score is 3: "+tempScore);
                reset();
            }
            else if(localStorage.getItem('maxScore')>tempScore){
                alert("score is 3: "+tempScore);
                reset();
            }
            }
            
        }
        if(c.x>rodPos.x && c.x<(rodPos.x)+200 ){
            if(((c.top)+4)>circleInnerHeight){          
            tempScore+=5;
            }
        }
        if(c.x>rodPos.x+5 && c.x>(rodPos.x)+200 ){
            if(((c.top)-4)<rodHeight){
                clearInterval(ballMove);
                if(localStorage.getItem('maxScore')===null || localStorage.getItem('maxScore')<tempScore ){
                    localStorage.setItem("maxScore",tempScore);
                    alert("score is : "+tempScore);
                    reset();
                }
                else if(localStorage.getItem('maxScore')>tempScore){
                    alert("score is : "+tempScore);
                    reset();
                }
            }
            
            
        }
        if(c.x>rodPos.x && c.x<(rodPos.x)+200 ){
            if(((c.top)-4)<rodHeight){
                tempScore+=5;
            }
        }

        if(dirt==1 && dirl===1 ){
            circle.style.left=(c.x)+4+'px';
            circle.style.top=(c.top)+4+'px';
            document.body.style.backgroundColor = "pink";
        }
        else if (dirt===2 && dirl===1){
            circle.style.left=(c.x)+4+'px';
            circle.style.top=(c.top)-4+'px';
            document.body.style.backgroundColor = "green";
        }
        else if (dirt===1 && dirl===2){
            circle.style.left=(c.x)-4+'px';
            circle.style.top=(c.top)+4+'px';
            document.body.style.backgroundColor = "lightblue";
        }
        else if (dirt===2 && dirl===2){
            circle.style.left=(c.x)-4+'px';
            circle.style.top=(c.top)-4+'px';
            document.body.style.backgroundColor = "grey";
        }

        

        }, 25);
};