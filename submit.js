var config = {
    apiKey: "AIzaSyAZHCLuovX2oNhccuxjetkHNgAcrWcZLGo",
    authDomain: "dhisna-ac7e0.firebaseapp.com",
    databaseURL: "https://dhisna-ac7e0.firebaseio.com",
    projectId: "dhisna-ac7e0",
    storageBucket: "dhisna-ac7e0.appspot.com",
    messagingSenderId: "1079389260336"
};
firebase.initializeApp(config);



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

    c1number = document.getElementById("crd2number");
    c1number = c1number.value;

    c2number = document.getElementById("crd2number");
    c2number = c2number.value;

    c2number = document.getElementById("crd2number");
    c2number = c2number.value;

    f1 = document.getElementById("image").files[0];
    f2 = document.getElementById("c1image").files[0];
    f3 = document.getElementById("c2image").files[0];

    f1name = f1.name.split(".")[1];
    f2name = f2.name.split(".")[1];
    f3name = f3.name.split(".")[1];

    firebase.database().ref('events/'+branch+"/" + nam1).set({

        caption: caption,
        description:desc,
        rules: rules,
        location: loc,


    }, function (error) {
        if (error) {
            alert("omg you fucked up one of the most basic tasks in human history")
            // The write failed...
        } else {
            firebase.database().ref('events/'+branch+"/"  + nam1+"/coordinators/"+c1n).set({
                number:c1number
            });
            firebase.database().ref('events/'+branch+"/"  + nam1+"/coordinators/"+c2n).set({
                number:c2number
            });

            firebase.storage().ref('events/'+branch+"/" +nam1+'/event.'+f1name).put(f1).then(function (snapshot) {
                console.log("uploaded")
            });

            firebase.storage().ref('events/'+branch+"/" +nam1+'/cr1.'+f2name).put(f2).then(function (snapshot) {
                console.log("uploaded")
            });
            firebase.storage().ref('events/'+branch+"/" +nam1+'/crd2.'+f3name).put(f3).then(function (snapshot) {
                console.log("uploaded");
                alert("done ")
            });
            // Data saved successfully!

        }

    });

}