export const validateService = {
    checkEmpty,
    checkValidPromotion,
    checkLength,
    checkValidPasswords,
    checkRepeatedUsername,
    checkSecurePassword
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

function checkValidPasswords (pass1, pass2){
    return !checkEmpty(pass1) && !checkEmpty(pass2) && pass1 == pass2;
}

function checkRepeatedUsername(admins, username){
    var i = 0;
    for(i;i<admins.length;i++){
        var adminUsername = admins[i].username;
        if(adminUsername == username){
            return true;
        }
    }

    return false;
}

function checkSecurePassword(password){
    return /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(password)
}