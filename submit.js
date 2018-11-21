var config = {
    apiKey: "AIzaSyAZHCLuovX2oNhccuxjetkHNgAcrWcZLGo",
    authDomain: "dhisna-ac7e0.firebaseapp.com",
    databaseURL: "https://dhisna-ac7e0.firebaseio.com",
    projectId: "dhisna-ac7e0",
    storageBucket: "dhisna-ac7e0.appspot.com",
    messagingSenderId: "1079389260336"
};
firebase.initializeApp(config);

function getevents() {
    branch = document.getElementById("branch");
    branch = branch.value;
    sel = document.getElementById("event");
    sel.innerHTML = '<option value="">select...</option>';
    firebase.database().ref('/events/' + branch).once('value').then(function(snapshot) {
        console.log(snapshot.val());
        snapshot.forEach(function (child) {
            console.log(child.val());
            sel = document.getElementById("event");
            sel.innerHTML += '<option value='+child.key+">"+child.key+"</option>"



        })
        // ...
    });
    
}

function putevent() {
    branch = document.getElementById("branch");
    branch = branch.value;

    event = document.getElementById("event");
    event = event.value;

    if (event == ""){
        return
    }

    firebase.database().ref('/events/' + branch+'/'+event).once('value').then(function(snapshot) {

        eve = snapshot.val();
        nam1 = document.getElementById("name");
        nam1.value = event;


        caption = document.getElementById("caption");
        caption.value = eve.caption;

        desc = document.getElementById("description");
        desc.value = eve.description;

        rules = document.getElementById("rules");
        rules.value = eve.rules;

        loc = document.getElementById("location");
        loc.value = eve.location;

        c1n = document.getElementById("crd1name");
        c1n.value = eve.coordinators.crd1.name;

        c1number = document.getElementById("crd1number");
        c1number.value =  eve.coordinators.crd2.number;

        c2n = document.getElementById("crd2name");
        c2n.value = eve.coordinators.crd2.name;

        c2number = document.getElementById("crd2number");
        c2number.value =  eve.coordinators.crd2.number;




    });
}
function writedata() {

    branch = document.getElementById("branch");
    branch = branch.value;
    nam1 = document.getElementById("name");
    nam1 = nam1.value;


    caption = document.getElementById("caption");
    caption = caption.value;
    desc = document.getElementById("description");
    desc = desc.value;

    rules = document.getElementById("rules");
    rules = rules.value;

    loc = document.getElementById("location");
    loc = loc.value;


    c1n = document.getElementById("crd1name");
    c1n = c1n.value;

    c2n = document.getElementById("crd2name");
    c2n = c2n.value;

    c1number = document.getElementById("crd1number");
    c1number = c1number.value;

    c2number = document.getElementById("crd2number");
    c2number = c2number.value;


    f1 = document.getElementById("image").files[0];
    f2 = document.getElementById("c1image").files[0];
    f3 = document.getElementById("c2image").files[0];

    if (f1!=undefined) {
        f1name = f1.name.split(".")[1];
    }
    if (f2!=undefined) {
        f2name = f2.name.split(".")[1];
    }
    if (f3!=undefined) {
        f3name = f3.name.split(".")[1];
    }

    firebase.database().ref('events/'+branch+"/" + nam1).update({

        caption: caption,
        description:desc,
        rules: rules,
        location: loc,


    }, function (error) {
        if (error) {
            alert("omg you fucked up one of the most basic tasks in human history")
            // The write failed...
        } else {
            firebase.database().ref('events/'+branch+"/"  + nam1+"/coordinators/crd1").update({
                name:c1n,
                number:c1number
            });
            firebase.database().ref('events/'+branch+"/"  + nam1+"/coordinators/crd2").update({
                name:c2n,
                number:c2number
            });
            if (f1!=undefined) {
                firebase.storage().ref('events/' + branch + "/" + nam1 + '/event.' + f1name).put(f1).then(function (snapshot) {
                    console.log("uploaded")
                });
            }
            if (f2!=undefined) {
                firebase.storage().ref('events/' + branch + "/" + nam1 + '/cr1.' + f2name).put(f2).then(function (snapshot) {
                    console.log("uploaded")
                });
            }
            if (f3!=undefined) {
                firebase.storage().ref('events/' + branch + "/" + nam1 + '/crd2.' + f3name).put(f3).then(function (snapshot) {
                    console.log("uploaded");

                });
            }
            alert("done ")
            // Data saved successfully!

        }

    });

}

