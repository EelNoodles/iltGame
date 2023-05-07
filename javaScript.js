let nav_btn = document.querySelectorAll(".nav_text");
var nowPage = "mainPage";
nav_btn.forEach(element => {
    element.addEventListener("click", ()=>{
        if(nowPage != element.id && nowPage =="mainPage"){
            $(".content_area").toggleClass("active");
            $(".title_area").toggleClass("active");
            $("#" + nowPage + "_area").css("display", "none");
            nowPage = element.id;
            togglePage(element.id);
        }else if(nowPage != element.id && nowPage !="mainPage"){
            if(element.id == "mainPage"){
                $(".content_area").toggleClass("active");
                $(".title_area").toggleClass("active");
            }
            $("#" + nowPage + "_area").css("display", "none");
            nowPage = element.id;
            togglePage(nowPage);
        }
        $(".nav").toggleClass("active");
        $(".menu_area").toggleClass("active"); 
    });
}); 

$(".menu_area").click(function (e) { 
    $(".nav").toggleClass("active");
    $(".menu_area").toggleClass("active"); 
});

function togglePage(page) {
    $("#" + page + "_area").css("display", "flex");
}

let items = document.querySelectorAll('.slider .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
    
    let active = 0;
    function loadShow(){
        let stt = 0;
        items[active].style.transform = 'translateX(-50%)';
        items[active].style.animation = "item_active 3s linear infinite";
        items[active].style.zIndex = 1;
        items[active].style.filter = 'none';
        items[active].style.opacity = 1;
        for(var i = active + 1; i < items.length; i++){
            stt++;
            items[i].style.transform = `translateX(${-50 + 20*stt}%) scale(${1 - 0.2*stt}) perspective(16px) rotateY(-1deg)`;
            items[i].style.animation = "none";
            items[i].style.zIndex = -stt;
            items[i].style.filter = 'blur(5px)';
            items[i].style.opacity = stt > 2 ? 0 : 0.6;
        }
        stt = 0;
        for(var i = active - 1; i >= 0; i--){
            stt++;
            items[i].style.transform = `translateX(${-50 - 20*stt}%) scale(${1 - 0.2*stt}) perspective(16px) rotateY(1deg)`;
            items[i].style.animation = "none";
            items[i].style.zIndex = -stt;
            items[i].style.filter = 'blur(5px)';
            items[i].style.opacity = stt > 2 ? 0 : 0.6;
        }
    }
    loadShow();
    next.onclick = function(){
        active = active + 1 < items.length ? active + 1 : active;
        loadShow();
    }
    prev.onclick = function(){
        active = active - 1 >= 0 ? active - 1 : active;
        loadShow();
    }