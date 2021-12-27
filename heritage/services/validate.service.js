export const validateService = {
    checkEmpty,
    checkValidPromotion,
    checkLength
};

function checkEmpty(value) {
    if(value==null || value.replace(" ","")==""){
        return true;
    }
    return false;
}

function checkValidPromotion(promotion) {
    if(!checkEmpty(promotion) && /[0-9]+-[0-9]+/.test(promotion)){
        return true;
    }
    return false;
}

function checkLength(value, maxLength) {
    if(!checkEmpty(value) && value.length<=maxLength){
        return true;
    }
    return false;
}