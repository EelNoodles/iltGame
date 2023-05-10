// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, set, update, get, child, query, orderByChild  } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3yiDXSFZFovIurCOpkpcBnWhjkatMGh0",
  authDomain: "nutnbingo.firebaseapp.com",
  databaseURL: "https://nutnbingo-default-rtdb.firebaseio.com",
  projectId: "nutnbingo",
  storageBucket: "nutnbingo.appspot.com",
  messagingSenderId: "172701986732",
  appId: "1:172701986732:web:86db8160540bfa6ebe9409",
  measurementId: "G-WXLJWTRH1V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const dbRef = ref(getDatabase());

$(".info_btn").click(function (e) { 
    get(child(dbRef, 'RegistrationGroup')).then((snapshot) => {
        if (snapshot.exists()) {
            var signedUp = false;
            for (const [RegistrationGroup, RegValue] of Object.entries(snapshot.val())) {
                for (const [key, value] of Object.entries(RegValue)) {
                    if($("#userEmail").val() === value["email"] && $("#userStuNumber").val().toUpperCase() == value["stunumber"]){
                        signedUp = true;
                        $(".userInfo").toggleClass("active");
                        $("#statesInfo").html("")
                        $(".statesContent").css("display", "block");
                        $(".signUpinfo").toggleClass("active");
                        var paidInfo = "";
                        var team_member = "";
                        switch (value["paid"]){
                            case "none":
                                paidInfo = "尚未定價，請稍後再嘗試。";
                                break;
                            case "free":
                                paidInfo = "達到免費報名條件，無須繳費。（已經完成報名）";
                                break;
                            case "paid_50":
                                paidInfo = "需繳費 50元 即可完成報名。<a href='https://reurl.cc/Dm0qAN'>（點擊查看繳費方式）";
                                break;
                            case "paid_100":
                                paidInfo = "需繳費 100元 即可完成報名。<a href='https://reurl.cc/Dm0qAN'>（點擊查看繳費方式）";
                                break;
                            case "paid":
                                paidInfo = "收到您的繳費資料，已經完成報名，祝您比賽順利！";
                                break;
                            default:
                                break;
                        }
                        let teamId = value["id"];
                        if(teamId.includes("Lol") || teamId.includes("Aov") || teamId.includes("test")){
                            team_member = value["member"].split(",")
                        }else{
                            team_member = [value["member"]+"（無成員資料，為單人賽）"]
                        }
                        signUpinfoGernerate(value, paidInfo, team_member);
                    }
                }
              }
              if(!signedUp){
                $("#statesInfo").html("該電子郵件／學號並未報名。")
              }
        } else {
            $("#statesInfo").html("系統錯誤。")
        }
        }).catch((error) => {
        console.error(error);
     });

});

function getMemberData(data) {  
    var member_list = ""
    data.forEach(element => {
        member_list += "<li class='member'>\n" + element + "</li>"
    })
    return member_list;
}

function getMemberTableData(data) {  
    var member_list = ""
    data.forEach(element => {
        member_list += element + "<br>";
    })
    return member_list;
}

function signUpinfoGernerate(data, paid_info, team_member){ 
    var list_content = "<li><span>隊伍編號：</span>" + data["id"] + "</li>" +
                        "<li><span>電子郵件：</span></li>" + "<ul>" + data['email'] + "</ul>" +
                        "<li><span>報名人系級：</span>" + data["grade"] + "</li>" +
                        "<li><span>報名人姓名：</span>" + data["name"] + "</li>" +
                        "<li><span>報名人學號：</span>" + data["stunumber"] + "</li>" +
                        "<li><span>隊伍／個人名稱：</span></li>" + "<ul>" +  data["teamname"] + "</ul>" +
                        "<li><span>隊伍成員：</span>" + "</li>" +
                        "<ol>" + getMemberData(team_member) + "</ol>" + 
                        "<li><span>報名費用／報名狀態：</span></li>" +
                        "<ol class='paid_info'>" + paid_info +"</ol>";
    $(".signUpinfo").html(list_content);
}

toggleRule("Aov");
$(".Aov_rule").click(function (e) { 
    $(".Aov_rule").addClass("active");
    $(".Lol_rule").removeClass("active"); 
    $(".Mj_rule").removeClass("active"); 
    toggleRule("Aov");
});

$(".Lol_rule").click(function (e) { 
    $(".Aov_rule").removeClass("active");
    $(".Lol_rule").addClass("active"); 
    $(".Mj_rule").removeClass("active"); 
    toggleRule("Lol");
});

$(".Mj_rule").click(function (e) { 
    $(".Aov_rule").removeClass("active");
    $(".Lol_rule").removeClass("active"); 
    $(".Mj_rule").addClass("active"); 
    toggleRule("Mj");
});

function toggleRule(game) { 
    get(child(dbRef, 'Rules/' + game)).then((snapshot) => {
        var ruleArray = snapshot.val();
        for(var i = 0; i < items.length; i++){
            $(".item_" + i).html(ruleArray["rule_"+ i]);
        }
    });
}

$("#participate").click(() => {
    loadParticipate();
});

$("#schedule").click(() => {
    loadSchedule("Aov");
});

$("#record").click(() => {
    loadRecode("Aov");
});

$("#grade").click(() => {
    loadGrade("Aov");
});

async function loadParticipate(){
    await get(child(dbRef, 'RegistrationGroup')).then((snapshot) => {
        if (snapshot.exists()) {
            var tableArray = '<tr class="th_title"><th class="th_1">遊戲類型</th><th class="th_2">隊長</th><th class="th_3">隊名</th><th class="th_4">隊員</th></tr>'
            var count = 0;
            for (const [RegistrationGroup, RegValue] of Object.entries(snapshot.val())) {
                for (const [key, value] of Object.entries(RegValue)) {
                    var gameType = "";
                    if(value["id"].includes("Aov")){
                        gameType = "<td><img src='res/aov.png' class='table_img'></td>"
                    }else if(value["id"].includes("Lol")){
                        gameType = "<td><img src='res/lol.png' class='table_img'></td>"
                    }else{
                        gameType = "<td><img src='res/mj.png' class='table_img'></td>"
                    }
                    tableArray += `<tr>${gameType}<td>${value["grade"]} ／ ${value["name"]}</td><td>${value["teamname"]}</td><td><div class='part_member_list' id='part_member_list_${count}'>${getMemberTableData(value["member"].split(","))}</div><div class='member_btn' id='member_list_${count}'>查看成員</div></td></tr>`
                    count++;
                }
              }
              $(".part_table_body").html(tableArray);
        }
    });

    var allMemberBtn = document.querySelectorAll(".member_btn");
    allMemberBtn.forEach(element => {
        element.addEventListener("click", ()=>{
            $(".dialog_content").html($("#part_" + element.id).html());
            $(".part_table").addClass("active");
            $(".dialog_member").addClass("active");
        })
    })
}

$(".dialog_close").click(()=>{
    $(".part_table").removeClass("active");
    $(".dialog_member").removeClass("active");
});

$(".Aov_schedule").click(function (e) { 
    $(".Aov_schedule").addClass("active");
    $(".Lol_schedule").removeClass("active"); 
    $(".Mj_schedule").removeClass("active"); 
    $(".schedule_table_body").html("");
    loadSchedule("Aov");
});

$(".Lol_schedule").click(function (e) { 
    $(".Aov_schedule").removeClass("active");
    $(".Lol_schedule").addClass("active"); 
    $(".Mj_schedule").removeClass("active"); 
    $(".schedule_table_body").html("");
    loadSchedule("Lol");
});

$(".Mj_schedule").click(function (e) { 
    $(".Aov_schedule").removeClass("active");
    $(".Lol_schedule").removeClass("active"); 
    $(".Mj_schedule").addClass("active"); 
    $(".schedule_table_body").html("");
    loadSchedule("Mj");
});

async function loadSchedule(type){
    await get(child(dbRef, 'Schedule/' + type)).then((snapshot) => {
        if (snapshot.exists()) {
            var tableArray = '<tr class="th_title"><th class="th_1">遊戲類型</th><th class="th_2">競賽隊伍</th><th class="th_3">競賽時間</th></tr>'
            for (const [RegistrationGroup, RegValue] of Object.entries(snapshot.val())) {
                var gameType = "";
                if(type === "Aov"){
                    gameType = "<td><img src='res/aov.png' class='table_img'></td>"
                }else if(type === "Lol"){
                    gameType = "<td><img src='res/lol.png' class='table_img'></td>"
                }else{
                    gameType = "<td><img src='res/mj.png' class='table_img'></td>"
                }
                var isOver = RegValue["over"] != false ? "style='display: none'":"";
                tableArray += `<tr ${isOver}">${gameType}<td>${getTeamData(RegValue["team"])}</td><td>${gettimeFormat(RegValue["time"])}</td></tr>`
              }
              $(".schedule_table_body").html(tableArray);
        }
    });
}

$(".Aov_record").click(function (e) { 
    $(".Aov_record").addClass("active");
    $(".Lol_record").removeClass("active"); 
    $(".Mj_record").removeClass("active"); 
    $(".record_table_body").html("");
    loadRecode("Aov");
});

$(".Lol_record").click(function (e) { 
    $(".Aov_record").removeClass("active");
    $(".Lol_record").addClass("active"); 
    $(".Mj_record").removeClass("active"); 
    $(".record_table_body").html("");
    loadRecode("Lol");
});

$(".Mj_record").click(function (e) { 
    $(".Aov_record").removeClass("active");
    $(".Lol_record").removeClass("active"); 
    $(".Mj_record").addClass("active"); 
    $(".record_table_body").html("");
    loadRecode("Mj");
});


async function loadRecode(type){
    await get(child(dbRef, 'Schedule/' + type)).then((snapshot) => {
        if (snapshot.exists()) {
            var tableArray = '<tr class="th_title"><th class="th_1">遊戲類型</th><th class="th_2">競賽隊伍</th><th class="th_3">競賽時間</th></tr>'
            for (const [RegistrationGroup, RegValue] of Object.entries(snapshot.val())) {
                var gameType = "";
                if(type === "Aov"){
                    gameType = "<td><img src='res/aov.png' class='table_img'></td>"
                }else if(type === "Lol"){
                    gameType = "<td><img src='res/lol.png' class='table_img'></td>"
                }else{
                    gameType = "<td><img src='res/mj.png' class='table_img'></td>"
                }
                var isOver = RegValue["over"] != false ? "":"style='display: none'";
                tableArray += `<tr ${isOver}">${gameType}<td>${getTeamDatawithOver(type, RegValue["team"], RegValue["over"])}</td><td>${gettimeFormat(RegValue["time"])}</td></tr>`
              }
              $(".record_table_body").html(tableArray);
        }
    });
}

function getTeamData(i){
    var teamArray = i.split(",");
    var final = `${teamArray[0]}`
    for (let index = 1; index < teamArray.length; index++) {
        final += ` VS. ${teamArray[index]}`
    }
    return final;
}

function getTeamDatawithOver(type, i, over){
    console.log(over)
    var teamArray = i.split(",");
    if(type === "Mj"){
        var gradeArray = String(over).split(",")
        var final = `${teamArray[0]}<span style="font-weight:bold; color: yellow;">（${gradeArray[0]}）</span>`
        for (let index = 1; index < teamArray.length; index++) {
            final += ` VS. ${teamArray[index]}<span style="font-weight:bold; color: yellow;">（${gradeArray[index]}）</span>`
        }
    }else{
        switch(over){
            case "left":
                var final = `<span style="font-weight:bold; color: yellow;"><span class="win">（WIN）</span>${teamArray[0]}</span> VS. `;
                final += `<span style="opacity: 0.6;">${teamArray[1]}</span>`;
                break;
            case "right":
                var final = `<span style="opacity: 0.6;">${teamArray[1]}</span> VS. `;
                final += `<span style="font-weight:bold; color: yellow;">${teamArray[0]}<span class="win">（WIN）</span></span>`;
                break;
        }
    }

    return final;
}

function gettimeFormat(p) {
    var timeString = String(p);
    var time = `${timeString.slice(0, 1)} / ${timeString.slice(1, 3)}<br><span style='font-size: 1.5rem; color: grey;'">${timeString.slice(3, 5)}：${timeString.slice(5, 7)}</span>`;
    return time;
}

async function loadGrade(){
    await get(child(dbRef, 'RegistrationGroup')).then((snapshot) => {
        if (snapshot.exists()) {
            var tableArray = '<tr class="th_title"><th class="th_1">遊戲類型</th></th><th class="th_3">隊名</th><th class="th_4">目前成績</th></tr>'
            var count = 0;
            for (const [RegistrationGroup, RegValue] of Object.entries(snapshot.val())) {
                for (const [key, value] of Object.entries(RegValue)) {
                    var gameType = "";
                    var type = "Group"
                    var valueType = "winNlose"
                    if(value["id"].includes("Aov")){
                        gameType = "<td><img src='res/aov.png' class='table_img'></td>"
                    }else if(value["id"].includes("Lol")){
                        gameType = "<td><img src='res/lol.png' class='table_img'></td>"
                    }else{
                        gameType = "<td><img src='res/mj.png' class='table_img'></td>"
                        valueType = "grade"
                        type = "Mj"
                    }
                    tableArray += `<tr>${gameType}<td>${value["teamname"]}</td><td>${getGrade(value[valueType], type)}</td></tr>`
                    count++;
                }
              }
              $(".grade_table_body").html(tableArray);
        }
    });
}

function getGrade(value, type) {
    var returnString = ""
    if(type === "Mj"){
        returnString = `積分：<span style="font-weight:bold; color: yellow;">${value}</span>`
    }else{
        var a = value.split("/")
        returnString = `勝場：<span style="font-weight:bold; color: yellow;">${a[0]}</span><br>敗場：<span style="font-weight:bold; color: yellow;">${a[1]}</span>`
    }

    return returnString;
}