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
            for (const [key, value] of Object.entries(snapshot.val())) {
                if($("#userEmail").val() == value["email"]&& $("#userStuNumber").val() == value["stunumber"]){
                    signedUp = true;
                    $(".userInfo").toggleClass("active");
                    $("#statesInfo").html("")
                    $(".statesContent").css("display", "block");
                    signUpinfoGernerate(value);
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
    var list_content = "電子郵件：" + data['email'] +
                        "報名人系級與年級" + data["grade"] +
                        "報名人姓名" + data["name"] +
                        "報名人學號" + data["stunumber"];
    $(".signUpinfo").html(list_content);
    console.log(list_content)
}