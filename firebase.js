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
                        signUpinfoGernerate(value);
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

function signUpinfoGernerate(data){
    var list_content = "<li><span style='color: #ff4d30; font-weight: bold;'>電子郵件：</span>" + data['email'] + "</li>" +
                        "<li><span style='color: #ff4d30; font-weight: bold;'>報名人系級：</span>" + data["grade"] + "</li>" +
                        "<li><span style='color: #ff4d30; font-weight: bold;'>報名人姓名：</span>" + data["name"] + "</li>" +
                        "<li><span style='color: #ff4d30; font-weight: bold;'>報名人學號：</span>" + data["stunumber"];
    $(".signUpinfo").html(list_content);
    console.log(list_content)
}