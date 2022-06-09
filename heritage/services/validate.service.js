export const validateService = {
    checkEmpty,
    checkValidPromotion,
    checkLength,
    checkValidPasswords,
    checkRepeatedUsername,
    checkSecurePassword,
    checkExistsBody,
    checkIsValidUploadDataMap,
    checkIsValidlocale
};

function checkEmpty(value) {
    if (value == null || value.toString().replace(" ", "") == "") {
        return true;
    }
    return false;
}

function checkExistsBody(body) {
    try {
        new Map(body)
        return true;
    } catch (err) {
        return false;
    }
}

function checkValidPromotion(promotion) {
    if (!checkEmpty(promotion) && /[0-9]+-[0-9]+/.test(promotion)) {
        return true;
    }
    return false;
}

function checkLength(value, maxLength) {
    if (!checkEmpty(value) && value.length <= maxLength) {
        return true;
    }
    return false;
}

function checkValidPasswords(pass1, pass2) {
    return !checkEmpty(pass1) && !checkEmpty(pass2) && pass1 == pass2;
}

function checkRepeatedUsername(admins, username) {
    var i = 0;
    for (i; i < admins.length; i++) {
        var adminUsername = admins[i].username;
        if (adminUsername == username) {
            return true;
        }
    }

    return false;
}

function checkSecurePassword(password) {
    return /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(password)
}

function checkIsValidUploadDataMap(dataMap) {
    var has = dataMap.has("name") && dataMap.has("promotion") && dataMap.has("registry") && dataMap.has("timestamp") && dataMap.has("shortDescription")
    && dataMap.has("longDescription") && dataMap.has("achievements") && dataMap.has("check") && dataMap.has("image")
    if(has){
        var notEmpty = !checkEmpty(dataMap.has("name")) && !checkEmpty(dataMap.has("promotion")) && !checkEmpty(dataMap.has("registry")) && !checkEmpty(dataMap.has("timestamp")) 
        && !checkEmpty(dataMap.has("shortDescription")) && !checkEmpty(dataMap.has("longDescription")) && !checkEmpty(dataMap.has("achievements")) && !checkEmpty(dataMap.has("check"))
        && !checkEmpty(dataMap.has("image"))
        if(notEmpty){
            return checkValidPromotion(dataMap.has("promotion"))
        }
        return false;
    }
    return false;
}

function checkIsValidlocale(locale) {
    return !checkEmpty(locale) && (locale == "es" || locale == "en" || locale == "ast")
}