var len = document.title.length;
var currentMole = 0;

var MoleInterval, MoleUpInterval;
var MoleIntervalTime; 
var MoleUpIntervalTime;

//var startMole;

var Level = 1; 
 
var Score = 0; 
var MoleHits = 0; 
var combo = 0; 
var combomax = 0; 
var comboscore = 0; 
var PreMoleNum = 0; 
var MoleCount = 0; 
var teemoUp ;
var hittmscore = 2;
var levelMin=80;
var levelMax=100;
keypadCode = new Array( 450, 35, 40, 34, 37, 12, 39, 36, 38, 33 );



function init()
{
    val = document.all.startbtn.value;
    if ( val == "start!" )
        start();
    else
        stop();
}


function start()
{
    MoleCount = 0;
    PreMoleNum = 0;
    comboscore = 0;

    combo = 0;
    MoleHits = 0;
    
    MoleNumber=Level*10;
    
    alert("level "+Level+" start");
    document.all.startbtn.value = "stop!";

    str = "Level: "+Level+"\nCombo : "+ combo +"("+ combomax +")\n  Score : "+ Score;
    str += "\nHits : "+ MoleHits +" / "+ MoleCount;
    document.all.scoreboard.innerText = str;
   
    

    
    startMole = setTimeout("scrollStatus()", 1000);
    
}


function stop()
{

    clearTimeout(MoleInterval);

    MoleCount = 0;
    PreMoleNum = 0;
    comboscore = 0;
    combomax = 0;
    combo = 0;
    MoleHits = 0;
    Score = 0;

    str = "Level "+Level+"\nCombo : "+ combo +"("+ combomax +")\n  Score : "+ Score;
    str += "\nHits : "+ MoleHits +" / "+ MoleCount;
    document.all.scoreboard.innerText = str;

    document.all.startbtn.value = "start!";
}


function scrollStatus()
{
    var s1, s2, str;

    s2 = document.title.charAt(0);
    s1 = document.title.substring(1, len);
        
    document.title = s1 + s2; 
    
    currentMole = Math.floor(Math.random()*9)+1; 
    MoleUpIntervalTime = Math.floor(Math.random()*levelMax +levelMin)*10; 
    MoleIntervalTime = MoleUpIntervalTime + 100 + Math.floor(Math.random()*15)*100; 

    

    

	if(Math.floor(Math.random()*100)<=75) {teemoUp = false; MoleCount++; moleUp(); }
	else{teemoUp = true;moleUp();}
   str = "MoleCount : "+ MoleCount +"\n";   
document.all.molecnt.innerText = str;  
    if ( MoleCount != MoleNumber )
        MoleInterval = setTimeout("scrollStatus()", MoleIntervalTime);
   else if(MoleCount == MoleNumber)
  {
                 
	Level++;
	levelMax-=Level;
                 levelMin-=Level;
                 moleDown();
	start();

   }
}

function moleUp()
{
    pos = keypadCode[ currentMole ] +"c";
	if(teemoUp==true)
	{
		document.all[pos].innerHTML = "(^_^)";
	}else if(teemoUp==false)
	{
		document.all[pos].innerHTML = "(o_o)";
	}

	
    
    MoleUpInterval = setTimeout("moleDown()", MoleUpIntervalTime);
}

function moleDown()
{
    pos = keypadCode[ currentMole ] +"c";
    currentMole = 0;
    document.all[pos].innerHTML = " ";
    document.all[pos].style.color = "";
    document.all[pos].style.background = "";
}


function isHit(pos)
{
	if(teemoUp==false)
	{
        document.all[pos].innerHTML = "(>o<)";
        document.all[pos].style.color = "red";
        document.all[pos].style.background = "yellow";
		MoleHits++;
		  if ( PreMoleNum+1 == MoleCount ) 
       {
          comboscore += ++combo;
          if ( combo > combomax ) combomax = combo; 
       }
     else
        comboscore = combo = 1;

    PreMoleNum = MoleCount;
    Score += comboscore;
	}else if(teemoUp==true)
	{
		document.all[pos].innerHTML ="(X_X)";
		document.all[pos].style.color = "white";
		document.all[pos].style.background = "red";
		
		Score -=hittmscore;
		comboscore=combo=1;
		PreMoleNum--;
	}
    
    

  
    
    str ="Level "+Level+"\n Combo : "+ combo +"("+ combomax +")\n  Score : "+ Score;
    str += "\nHits : "+ MoleHits +" / "+ MoleNumber;
    document.all.scoreboard.innerText = str;

}


function hammer()
{
    var molePos = event.keyCode;

    if ( currentMole == molePos-96 && currentMole != 0 )
    {
        pos = keypadCode[ molePos-96 ] +"c";
        isHit(pos);
    }
    else if ( currentMole == findEl(molePos) ) 
    {
        pos = molePos +"c";
        isHit(pos);
    }
    
    
}


function hammer2()
{
    var molePos = event.keyCode;
    
    if ( 97 <= molePos && molePos <= 105 ) 
    {
        pos = keypadCode[ molePos-96 ];
        document.all[pos+"c"].style.color = "red";
    }
    else
    {
        if (findEl(molePos) != 10)
            document.all[molePos+"c"].style.color = "red";
    }
}


function findEl(el)
{
    ret = 10;
    for ( i=0; i<10; i++ )
        if ( keypadCode[i] == el ) ret = i;
    
    return ret;
}
        
