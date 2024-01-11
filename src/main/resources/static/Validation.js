// Create text field validation function
const textFieldValidation = (textFieldId,pattern,object,property)=>{

    const textFieldValue = textFieldId.value;

    const regPattern = new RegExp(pattern);

    if(textFieldValue!==""){

        if(regPattern.test(textFieldValue)){


            //if value valid
            window[object][property] = textFieldValue;
            textFieldId.style.border = '2px solid green';

        }else{

            textFieldId.style.border = '2px solid red';
            window[object][property] = null;

        }

    }else{

        //bind null
        window[object][property] = null;
        if(textFieldId.required){

            textFieldId.style.border = '2px solid red';

        }else{

            textFieldId.style.border = '1px solid #dee2e6';
        }


    }
}


//for validating static select
const selectStaticValidator = (elementID,object,property)=>{
    if(elementID.value !== ''){
        elementID.style.border = '1px solid green';
        elementID.style.color = 'green';
        window[object][property] = elementID.value;

    }
    else{
        elementID.style.border = '1px solid red';
        elementID.style.color = 'red';
        window[object][property] = null;
    }
}


//for validating dynamic select
const selectDynamicValidator = (elementID,object,property)=>{
    if(elementID.value !== ''){
        elementID.style.border = '1px solid green';
        elementID.style.color = 'green';
        window[object][property] = JSON.parse(elementID.value);

    }
    else{
        elementID.style.border = '1px solid red';
        elementID.style.color = 'red';
        window[object][property] = null;
    }
}