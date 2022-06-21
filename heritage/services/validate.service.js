export const validateService = {
    checkEmpty,
    checkValidPromotion,
    checkLength,
    checkValidPasswords,
    checkRepeatedUsername,
    checkSecurePassword,
    checkExistsBody,
    checkIsValidUploadDataMap,
    checkIsValidlocale,
    checkNotValidIndex
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
        if (adminUsername === username) {
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
        var notEmpty = !checkEmpty(dataMap.get("name")) && !checkEmpty(dataMap.get("promotion")) && !checkEmpty(dataMap.get("registry")) && !checkEmpty(dataMap.get("timestamp")) 
        && !checkEmpty(dataMap.get("shortDescription")) && !checkEmpty(dataMap.get("longDescription")) && !checkEmpty(dataMap.get("achievements")) && !checkEmpty(dataMap.get("check"))
        && !checkEmpty(dataMap.get("image"))
        if(notEmpty){
            return checkValidPromotion(dataMap.get("promotion"))
        }
        return false;
    }
    return false;
}

function checkIsValidlocale(locale) {
    return !checkEmpty(locale) && (locale == "es" || locale == "en" || locale == "ast")
}

function checkNotValidIndex(index){
    return !(index=== "delegate-card" || index=== "professor-card" || index=== "student-card")
}