let nav_btn = document.querySelectorAll(".nav_text");
var nowPage = "mainPage";
nav_btn.forEach(element => {
    element.addEventListener("click", ()=>{
        console.log(element.id)
        if(nowPage != element.id && nowPage =="mainPage"){
            nowPage = element.id;
            $(".content_area").toggleClass("active");
            $(".title_area").toggleClass("active");
            togglePage(element.id);
        }else if(nowPage != element.id && nowPage !="mainPage"){
            if(element.id == "mainPage"){
                $(".content_area").toggleClass("active");
                $(".title_area").toggleClass("active");
            }
            nowPage = element.id;
            togglePage(element.id);
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
    switch (page){
        case "mainPage":
            $("#signUp_area").css("display", "none");
            break;
        case "gameIntro":
            $("#signUp_area").css("display", "none");
            alert("開發中，敬請期待。（目前只開放報名查詢）")
            break;
        case "gameJoin":
            $("#signUp_area").css("display", "flex");
            break;
        case "gameParticipate":
            $("#signUp_area").css("display", "none");
            alert("開發中，敬請期待。（目前只開放報名查詢）")
            break;
        case "gameSchedule":
            $("#signUp_area").css("display", "none");
            alert("開發中，敬請期待。（目前只開放報名查詢）")
            break;
        case "gameRule":
            $("#signUp_area").css("display", "none");
            alert("開發中，敬請期待。（目前只開放報名查詢）")
            break;
        case "gameRecord":
            $("#signUp_area").css("display", "none");
            alert("開發中，敬請期待。（目前只開放報名查詢）")
            break;
    }
}