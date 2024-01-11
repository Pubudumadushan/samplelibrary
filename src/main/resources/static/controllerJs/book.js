window.addEventListener("load",()=>{

    //calling ajax function to get the database responce

    bookTypes = ajaxGetRequest("/booktype/all");
    authors = ajaxGetRequest("/author/all");

    //calling fillselect function
    fillDataintoSelectFromDatabase(selectBookType,"Select the book type",bookTypes,'name')
    fillDataintoSelectFromDatabase(selectBookAuthor,"Select the Authors",authors,'name')

    //new book object
    book = {};

    btnBookAdd.addEventListener("click",()=>{

        console.log(book);

         //calling the bookSubmit Function
         bookSubmit();

    });

    btnBookReset.addEventListener("click",()=>{


        book = {};

        bookInputs = document.querySelectorAll('.bookInputs');
        bookInputs.forEach(input=>{
            input.style = '';
            input.value = '';

        });
        //reset dynamic select
        bookTypes = ajaxGetRequest("/booktype/all");
        authors = ajaxGetRequest("/author/all");
        fillDataintoSelectFromDatabase(selectBookType,"Select the book type",bookTypes,'name')
        fillDataintoSelectFromDatabase(selectBookAuthor,"Select the Authors",authors,'name')


    });






    const bookSubmit = ()=>{

        //errors check (binding)
        returnErrors = checkBookErrors();
        if(returnErrors==''){

            //user confirmation
            conifrmResult = confirm("You are About to add a new record \nAre You Sure ? \n[Book Name : "+book.name+"]");
            if(conifrmResult){

                //pass data to backend
                let postServerResponse;
                $.ajax("/book", {
                    type: "POST",
                    async: false,
                    contentType: "application/json",
                    data: JSON.stringify(book),
                    success: function (data) {
                        console.log("success " + data);
                        postServerResponse = data;
                    },
                    error: function (resOb) {
                        console.log("Error " + resOb);
                        postServerResponse = resOb;
                    }
                });

                if(postServerResponse === "Ok"){
                    alert("Book Added!");

                    btnBookReset.click();
                    
                }else{
                    alert("Error: "+postServerResponse);
                }

            }
            else{
                alert("Operation Cancelled by the User !");
            }
        }
        else{
            //check book have errors
            //display them to the user
            alert(returnErrors);
        }




    }

    

    refereshBookTable();


    
});


const refereshBookTable =()=>{

     //table JS
     books = ajaxGetRequest("/book/all");
     console.log(books);
 
     displayPropertyList = [
         {property:'name',datatype:'text'},
         {property:'edition',datatype:'text'},
         {property:'isbn',datatype:'text'},
         {property:'language',datatype:'text'},
         {property:getBookTypeName,datatype:'function'},
         {property:getAuhtorName,datatype:'function'},
         {property:getAvailiabilty,datatype:'function'},
     ];
 
     fillDataIntoTable(tblBook,books,displayPropertyList,editFunction,printFunction,deleteFunction);

}


const getAvailiabilty=(ob)=>{

    if(ob.delete){

        return "✅"
    }else{

        return "❌";
    }


}


const getBookTypeName =(ob)=>{

    return ob.booktype_id.name;
    console.log("Display Book Type");
}

const getAuhtorName = (ob)=>{

    return ob.author_id.name;
    console.log("Display Author Name")
}



const editFunction = (ob)=>{

    btnBookUpdate.disabled = false;

    //create two objects to compare
    oldBook = JSON.parse(JSON.stringify(ob));
    book = JSON.parse(JSON.stringify(ob));

    //refill data to form
    txtBookName.value = ob.name;
    txtEdition.value = ob.edition;
    txtIsbn.value = ob.isbn;
    selectBookLang.value = ob.language;

    fillDataintoSelectFromDatabase(selectBookType,"Select book type",bookTypes,"name",ob.booktype_id.name);
    fillDataintoSelectFromDatabase(selectBookAuthor,"Select Author",authors,"name",ob.author_id.name);
}


const checkBookErrors = ()=>{

    let errors = '';

    if(book.name==null){
        errors = errors+"Book Name is required! \n";
    }
    if(book.edition==null){
        errors = errors+"Book Edition is required! \n";
    }
    if(book.isbn==null){
        errors = errors+"Book ISBN is required! \n";
    }
    if(book.language==null){
        errors = errors+"Book Language is required! \n";
    }
    if(book.author_id==null){
        errors = errors+"Book Author is required! \n";
    }
    if(book.booktype_id==null){
        errors = errors+"Book Type is required! \n";
    }

    return errors;

}

const checkBookFormUpdate =()=>{

    let updates = "";

    if(book.name != oldBook.name){

        updates = updates +"Book Name was changed to "+book.name;
    }
    if(book.isbn != oldBook.isbn){

        updates = updates +"Book ISBN was changed to "+book.isbn;
    }

    if(book.edition != oldBook.edition){

        updates = updates +"Book Edition was changed to "+book.edition;
    }
    if(book.language != oldBook.language){

        updates = updates +"Book Language was changed to "+book.language;
    }
    if(book.booktype_id.name != oldBook.booktype_id.name){

        updates = updates +" Book Type was changed to "+book.booktype_id.name;
    }
    if(book.author_id.name != oldBook.author_id.name){

        updates = updates +"Book Author was changed to "+book.author_id.name;
    }
}

const updateFunction = ()=>{

    console.log("Old Book =>");
    console.log(oldBook);

    console.log("Edited Book");
    console.log(book);

    returnErrorsUpdate = checkBookErrors();

    if(returnErrorsUpdate ==""){

        updates = checkBookFormUpdate();

        if(updates ==""){

            alert("No changes");
        }else{

            userConfirm = confirm("Following Changed Detected \n" +updates+"\nAre you sure to Updates ?");

            //if user press yes 

            let serverResponce = "";

            $.ajax("/book",{
                async:false,
                type :"PUT",
                contentType:"application/json",
                data:JSON.stringify(book),
                success :function(data){
                    console.log(data);
                    serverResponce = data;
                },
                error :function(resOb){

                    serverResponce = resOb;
                }

            })

            if(serverResponce == "OK"){

                alert("Update suucessfully")
            }else{

                alert("Update Failed"+serverResponce)
            }


            boo



        }

    }else{

        alert(returnErrorsUpdate);
    }



}





const deleteFunction = (ob)=>{

    userConfermation = confirm("You are about to delete dalete the record of :"+ob.name);

    if(userConfermation){


        //if user press yes 

        let serverResponce = "";

        $.ajax("/book",{
            async:false,
            type :"DELETE",
            contentType:"application/json",
            data:JSON.stringify(ob),
            success :function(data){
                console.log(data);
                serverResponce = data;
            },
            error :function(resOb){

                alert("error" + resOb)

                serverResponce = resOb;
            }

        });

        if(serverResponce == "OK"){

            alert("Deleted Successfully")
        }else{

            alert("Delete Failed"+serverResponce)
        }


        refereshBookTable();




    }else{

        alert("Oparation canselled by By user")


    }
    
}
const printFunction = (ob)=>{

   let newWindow  = window.open();

   newWindow.document.write("<head>"+
   "<link crossorigin='anonymous' href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css' integrity='sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN' rel='stylesheet'>"+
   "</head><body><table class ='table table-info table-bordered'>"+
       "<thead>"+
       "<tr>"+
            "<th>Book Name</th>"+
            "<th>Book Edition</th>"+
            "<th>Book ISBN</th>"+
            "<th>Book Language</th>"+
            "<th>Book Type</th>"+
       "</tr>"+
       "</thead>"+
       "<tbody>"+
       "<tr>"+
            "<td>"+ob.name+"</td>"+
            "<td>"+ob.edition+"</td>"+
            "<td>"+ob.isbn+"</td>"+
            "<td>"+ob.language+"</td>"+
            "<td>"+ob.booktype_id.name+"</td>"+
       "</tr>"+
       "</tbody>"+
       "</table>"+
    "</body>")


    setTimeout(function(){

        newWindow.print();
    },500)

    
    
}