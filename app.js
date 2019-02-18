document.addEventListener("DOMContentLoaded", event => {
    var config = {
        apiKey: "AIzaSyDkaP66Dq0eVpZgkBu6FXyrjuOmV8EBGNc",
        authDomain: "show-me-the-leads.firebaseapp.com",
        databaseURL: "https://show-me-the-leads.firebaseio.com",
        projectId: "show-me-the-leads",
        storageBucket: "show-me-the-leads.appspot.com",
        messagingSenderId: "911938446399"
      };
    firebase.initializeApp(config);
    const app = firebase.app();
});
var userIp;
function getIp(callback)
{
    function response(s)
    {
        callback(window.userip);

        s.onload = s.onerror = null;
        document.body.removeChild(s);
    }

    function trigger()
    {
        window.userip = false;

        var s = document.createElement("script");
        s.async = true;
        s.onload = function() {
            response(s);
        };
        s.onerror = function() {
            response(s);
        };

        s.src = "https://l2.io/ip.js?var=userip";
        document.body.appendChild(s);
    }

    if (/^(interactive|complete)$/i.test(document.readyState)) {
        trigger();
    } else {
        document.addEventListener('DOMContentLoaded', trigger);
    }
}

getIp(function (ip) {
    userIp = ip;
});

function insertLead(){
    let lnome = document.getElementById('nome').value;
    let lsnome = document.getElementById('snome').value;
    let lemail = document.getElementById('email').value;
    let ltel = document.getElementById('tel').value;
    let lempresa = document.getElementById('empresa').value;
    let lsegmento = document.getElementById('segmento').value;
    let brtTime = new Date().toLocaleString("en-US", {timeZone: "America/Sao_Paulo"});
    brtTime = new Date(brtTime);
    stringTime = brtTime.getFullYear().toString() + "-" + ("0"+(brtTime.getMonth()+1)).slice(-2) + "-" + ("0" + brtTime.getDate()).slice(-2) + " " + ("0" + brtTime.getHours()).slice(-2) + ":" + ("0" + brtTime.getMinutes()).slice(-2) + ":" + ("0" + brtTime.getSeconds()).slice(-2);    
    if(lnome === "" || lsnome === "" || lemail === "" || ltel === "" || lempresa === "" || lsegmento === ""){
        alert("Todos os campos devem ser preenchidos!");
    }else{
        firebase.database().ref('leads/').push({nome: lnome, snome: lsnome, email: lemail, tel: ltel, empresa: lempresa, segmento: lsegmento, data: stringTime, ip: userIp}, function(error){
            if(error) alert("ERRO");
            else alert("Email cadastrado!");
        });
    }

}
