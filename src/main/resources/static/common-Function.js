//Create function for fill data into select element

const fillDataintoSelectFromDatabase = (feildId,message,dataList,property,selectvalue)=>{

    feildId.innerHTML = '';

    const optionMsg = document.createElement('option');
    optionMsg.innerText = message;
    optionMsg.selected = 'selected';
    optionMsg.disabled = 'disabled';
    feildId.appendChild(optionMsg);

    dataList.forEach(element => {

        const option = document.createElement('option');
        option.innerText = element[property];
        option.value = JSON.stringify(element);//joson string object ekak create karaganna

        if(selectvalue==element[property]){
        
            option.selected = "selected";
        }
        feildId.appendChild(option);

    });
}

const ajaxGetRequest = (url)=>{

    let Response;

    $.ajax(url,{

        async: false,
        type:"Get",
        contentType:"json",
        success:function (data){

            console.log(data);
            Response = data;
        },
        error:function (resOb){
            alert("erroe"+resOb);
            Response = [];
        }




    })

    return Response
}