$(document).ready(function(){
      $('.vote').click(vote);
});


function vote(){
    var href = $(this).attr("href");
    var rankDiv = $(this).parent().parent().find("#rank");
    $.get(href,function(data){
        console.log(data);
        if(data.code === 200){
           rankDiv.html(" "+data.rating+" ");
        }
    },'json');
    return false;
}