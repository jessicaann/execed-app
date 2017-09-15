$(".nav a").each(function(index, item){
    if(location.pathname.indexOf($(item).attr('href')) != -1){
        $(".nav").find(".active").removeClass("active");
        $(item).parent().addClass("active");
    } 
});


if(location.pathname !== "/admin/signin.html" && location.pathname !== "/user/signin.html") {
    if(!localStorage.getItem('adminId') && !localStorage.getItem('userId')) location.href= BASE_URL+'/index.html';
}