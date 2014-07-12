var ihot_count=1;    
var count=0;
function changePhoto(imgName, dir) {
	var imgCount=4;                  
    if(imgName=="../image"){imgCount=ihot_count;}
    else{
              if (dir =="next"){
                    if(count < imgCount){count++;}
                    else if (count==imgCount){count=0;}     
                    photoObj = new Image(); 
                    photoObj.src=imgName+"/"+count+".jpg";
     document.images["photolist"].src = photoObj.src;
            }
            else if(dir == "pre"){
                              if(count==0){count=imgCount;}
                              else if(count<=imgCount){count--;}
                              
                              photoObj = new Image(); 
                              photoObj.src=imgName+"/"+count+".jpg";                  
           
     document.images["photolist"].src = photoObj.src; 
                }
}
}

setInterval(function()
{ 
    changePhoto('.', "next");
}, '2000');
var news;//json
$('body')[0].innerHTML = '';
HW = $.getJSON('news.json', function (data) {
    news = data;
});
var s;
var w;
var i;
var j;
var k;
function comment()
    {
        $.getJSON('comment.json', function (data) {
            s = data;
            addComment(s,i,k,j);
			firstpage();
			secondpage();
        });
    }
function firstpage()
{
		k = 0;
		j = 5;
		addComment(s,i,k,j);
}
function secondpage()
{
		k = 5;
		j = 0;
		addComment(s,i,k,j);
}
function addComment(s,i,k,j) {
    for (var i = k; i < j; i++) {
         document.write(s.review[i].article);
    }
}