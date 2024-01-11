window.addEventListener("load",()=>{

    refreshAuthorTable();

    author = {};

    today = new Date().toISOString();
    todayYear = today.split('T')
    console.log(todayYear[0]);
    dob.max = todayYear[0]
})


refreshAuthorTable = ()=>{

    authors = ajaxGetRequest("/author/all");

    displayPropertyList = [

        {property:'name',datatype:'text'},
        {property:'address',datatype:'text'},
        {property:'contactnumber',datatype:'text'},
        {property:getEmail,datatype:'function'},
        {property:'dob',datatype:'text'}
    ];

    fillDataIntoTable(tblEmp,authors,displayPropertyList);

    dob.min = new Date();
}


const getEmail = (ob)=>{

    if(ob.email == null){

        return "Not Provided";
    }else{

        return ob.email;
    }


}


const authorSubmit =()=>{

    conifrmResult = confirm("You are About to add a new record \nAre You Sure ? \n[Author Name : "+author.name+"]");
    if(conifrmResult){

        //pass data to backend
        let postServerResponse;
        $.ajax("/author", {
            type: "POST",
            async: false,
            contentType: "application/json",
            data: JSON.stringify(author),
            success: function (data) {
                console.log("success " + data);
                postServerResponse = data;
            },
            error: function (resOb) {
                console.log("Error " + resOb);
                postServerResponse = resOb;
            }
        });

        if(postServerResponse === "OK"){
            alert("Author Added!");

            btnBookReset.click();
            
        }else{
            alert("Error: "+postServerResponse);
        }

    }
    else{
        alert("Operation Cancelled by the User !");
    }
}
