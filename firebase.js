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

function signUpinfoGernerate(data, paid_info, team_member){ 
    var list_content = "<li><span>隊伍編號：</span>" + data["id"] + "</li>" +
                        "<li><span>電子郵件：</span>" + data['email'] + "</li>" +
                        "<li><span>報名人系級：</span>" + data["grade"] + "</li>" +
                        "<li><span>報名人姓名：</span>" + data["name"] + "</li>" +
                        "<li><span>報名人學號：</span>" + data["stunumber"] + "</li>" +
                        "<li><span>隊伍／個人名稱：</span>" + data["teamname"] + "</li>" +
                        "<li><span>隊伍成員：</span>" + "</li>" +
                        "<ol>" + getMemberData(team_member) + "</ol>" + 
                        "<li><span>報名費用／報名狀態：</span></li>" +
                        "<ol class='paid_info'>" + paid_info +"</ol>";
    $(".signUpinfo").html(list_content);
}