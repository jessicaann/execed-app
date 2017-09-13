$(".nav a").each(function(index, item){
    if(location.pathname.indexOf($(item).attr('href')) != -1){
        $(".nav").find(".active").removeClass("active");
        $(item).parent().addClass("active");
    } 
});

//if(!localStorage.getItem('adminId')) location.href= BASE_URL+'/index.html';