let nav_btn = document.querySelectorAll(".nav_text");
isMainPage = true;
nav_btn.forEach(element => {
    element.addEventListener("click", ()=>{
        $(".nav").toggleClass("active");
        $(".menu_area").toggleClass("active");
        if(isMainPage && element.id != "mainPage"){
            $(".content_area").toggleClass("active");
            $(".title_area").toggleClass("active");
            isMainPage = false;
            togglePage(element.id);
        }else if(element.id == "mainPage" && !isMainPage){
            $(".content_area").toggleClass("active");
            $(".title_area").toggleClass("active");
            isMainPage = true;
        }
    });
}); 

$(".menu_area").click(function (e) { 
    $(".nav").toggleClass("active");
    $(".menu_area").toggleClass("active"); 
});

function togglePage(param) {

}