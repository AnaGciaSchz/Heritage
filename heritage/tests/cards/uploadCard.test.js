import {uploadToElastic} from "../../pages/api/card/uploadInfo"
import {getBody} from "../../pages/api/card/uploadInfo"

jest.mock('next/config', () => () => ({
    serverRuntimeConfig: {
        secret: "19Heritage+PetraCraft82*"
    },
    publicRuntimeConfig: {
        apiUrl:'http://localhost:3000/api' 
    },
  }));


describe("Test the validation of the information for creating cards", () => {
    test("whenTheCardDoesNotHaveName_ItReturnsError", async () => {
        var dataMap = new Map();

        dataMap.set("index", "student");
        dataMap.set("promotion", "2021-2022");
        dataMap.set("registry", "05-06-2022");
        dataMap.set("timestamp", "1654017183000");
        dataMap.set("shortDescription", "Descripcion corta");
        dataMap.set("longDescription", "Descripcion larga");
        dataMap.set("achievements", "Logros");
        dataMap.set("check", false);
        dataMap.get("image", "");

        const response = await uploadToElastic(dataMap);
        expect(response.result == 'error').toBeTruthy();
        expect(response.message == 'The card lacks important data: Name, Promotion, short description, long description, achievements or image.').toBeTruthy();
        
        dataMap.set("name", "");
        const response2 = await uploadToElastic(dataMap);
        expect(response2.result == 'error').toBeTruthy();
        expect(response2.message == 'The card lacks important data: Name, Promotion, short description, long description, achievements or image.').toBeTruthy();
    });

    test("whenTheCardDoesNotHaveIndex_ItReturnsError", async () => {
        var dataMap = new Map();

        dataMap.set("name", "Ana");
        dataMap.set("promotion", "2021-2022");
        dataMap.set("registry", "05-06-2022");
        dataMap.set("timestamp", "1654017183000");
        dataMap.set("shortDescription", "Descripcion corta");
        dataMap.set("longDescription", "Descripcion larga");
        dataMap.set("achievements", "Logros");
        dataMap.set("check", false);
        dataMap.get("image", "");

        const response = await uploadToElastic(dataMap);
        expect(response.result == 'error').toBeTruthy();
        expect(response.message == 'The card lacks important data: Name, Promotion, short description, long description, achievements or image.').toBeTruthy();
    
        dataMap.set("index", "");
        const response2 = await uploadToElastic(dataMap);
        expect(response2.result == 'error').toBeTruthy();
        expect(response2.message == 'The card lacks important data: Name, Promotion, short description, long description, achievements or image.').toBeTruthy();

        dataMap.set("index", "NoExiste");
        const response3 = await uploadToElastic(dataMap);
        expect(response3.result == 'error').toBeTruthy();
        expect(response3.message == 'The card lacks important data: Name, Promotion, short description, long description, achievements or image.').toBeTruthy();
    });
    test("whenTheCardDoesNotHaveValidPromotion_ItReturnsError", async () => {
        var dataMap = new Map();

        dataMap.set("index", "student");
        dataMap.set("name", "Ana");
        dataMap.set("registry", "05-06-2022");
        dataMap.set("timestamp", "1654017183000");
        dataMap.set("shortDescription", "Descripcion corta");
        dataMap.set("longDescription", "Descripcion larga");
        dataMap.set("achievements", "Logros");
        dataMap.set("check", false);
        dataMap.get("image", "");

        const response = await uploadToElastic(dataMap);
        expect(response.result == 'error').toBeTruthy();
        expect(response.message == 'The card lacks important data: Name, Promotion, short description, long description, achievements or image.').toBeTruthy();
    
        dataMap.set("promotion", "");
        const response2 = await uploadToElastic(dataMap);
        expect(response2.result == 'error').toBeTruthy();
        expect(response2.message == 'The card lacks important data: Name, Promotion, short description, long description, achievements or image.').toBeTruthy();
    
        dataMap.set("promotion", "2021/2022");
        const response3 = await uploadToElastic(dataMap);
        expect(response3.result == 'error').toBeTruthy();
        expect(response3.message == 'The card lacks important data: Name, Promotion, short description, long description, achievements or image.').toBeTruthy();
    });
    test("whenTheCardDoesNotHaveRegistry_ItReturnsError", async () => {
        var dataMap = new Map();

        dataMap.set("index", "student");
        dataMap.set("promotion", "2021-2022");
        dataMap.set("name", "Ana");
        dataMap.set("timestamp", "1654017183000");
        dataMap.set("shortDescription", "Descripcion corta");
        dataMap.set("longDescription", "Descripcion larga");
        dataMap.set("achievements", "Logros");
        dataMap.set("check", false);
        dataMap.get("image", "");

        const response = await uploadToElastic(dataMap);
        expect(response.result == 'error').toBeTruthy();
        expect(response.message == 'The card lacks important data: Name, Promotion, short description, long description, achievements or image.').toBeTruthy();
   
        dataMap.set("registry", "");
        const response2 = await uploadToElastic(dataMap);
        expect(response2.result == 'error').toBeTruthy();
        expect(response2.message == 'The card lacks important data: Name, Promotion, short description, long description, achievements or image.').toBeTruthy();
    });
    test("whenTheCardDoesNotHaveTimestamp_ItReturnsError", async () => {
        var dataMap = new Map();

        dataMap.set("index", "student");
        dataMap.set("promotion", "2021-2022");
        dataMap.set("registry", "05-06-2022");
        dataMap.set("name", "Ana");
        dataMap.set("shortDescription", "Descripcion corta");
        dataMap.set("longDescription", "Descripcion larga");
        dataMap.set("achievements", "Logros");
        dataMap.set("check", false);
        dataMap.get("image", "");

        const response = await uploadToElastic(dataMap);
        expect(response.result == 'error').toBeTruthy();
        expect(response.message == 'The card lacks important data: Name, Promotion, short description, long description, achievements or image.').toBeTruthy();
    
        dataMap.set("timestamp", "");
        const response2 = await uploadToElastic(dataMap);
        expect(response2.result == 'error').toBeTruthy();
        expect(response2.message == 'The card lacks important data: Name, Promotion, short description, long description, achievements or image.').toBeTruthy();
    });

    test("whenTheCardDoesNotHaveShortDescription_ItReturnsError", async () => {
        var dataMap = new Map();

        dataMap.set("index", "student");
        dataMap.set("promotion", "2021-2022");
        dataMap.set("registry", "05-06-2022");
        dataMap.set("timestamp", "1654017183000");
        dataMap.set("name", "Ana");
        dataMap.set("longDescription", "Descripcion larga");
        dataMap.set("achievements", "Logros");
        dataMap.set("check", false);
        dataMap.get("image", "");

        const response = await uploadToElastic(dataMap);
        expect(response.result == 'error').toBeTruthy();
        expect(response.message == 'The card lacks important data: Name, Promotion, short description, long description, achievements or image.').toBeTruthy();
    
        dataMap.set("shortDescription", "");
        const response2 = await uploadToElastic(dataMap);
        expect(response2.result == 'error').toBeTruthy();
        expect(response2.message == 'The card lacks important data: Name, Promotion, short description, long description, achievements or image.').toBeTruthy();
    });
    test("whenTheCardDoesNotHavelongDescription_ItReturnsError", async () => {
        var dataMap = new Map();

        dataMap.set("index", "student");
        dataMap.set("promotion", "2021-2022");
        dataMap.set("registry", "05-06-2022");
        dataMap.set("timestamp", "1654017183000");
        dataMap.set("shortDescription", "Descripcion corta");
        dataMap.set("name", "Ana");
        dataMap.set("achievements", "Logros");
        dataMap.set("check", false);
        dataMap.get("image", "");

        const response = await uploadToElastic(dataMap);
        expect(response.result == 'error').toBeTruthy();
        expect(response.message == 'The card lacks important data: Name, Promotion, short description, long description, achievements or image.').toBeTruthy();
    
        dataMap.set("longDescription", "");
        const response2 = await uploadToElastic(dataMap);
        expect(response2.result == 'error').toBeTruthy();
        expect(response2.message == 'The card lacks important data: Name, Promotion, short description, long description, achievements or image.').toBeTruthy();
    });
    test("whenTheCardDoesNotHaveAchievements_ItReturnsError", async () => {
        var dataMap = new Map();

        dataMap.set("index", "student");
        dataMap.set("promotion", "2021-2022");
        dataMap.set("registry", "05-06-2022");
        dataMap.set("timestamp", "1654017183000");
        dataMap.set("shortDescription", "Descripcion corta");
        dataMap.set("longDescription", "Descripcion larga");
        dataMap.set("name", "Ana");
        dataMap.set("check", false);
        dataMap.get("image", "");

        const response = await uploadToElastic(dataMap);
        expect(response.result == 'error').toBeTruthy();
        expect(response.message == 'The card lacks important data: Name, Promotion, short description, long description, achievements or image.').toBeTruthy();
   
        dataMap.set("achievements", "");
        const response2 = await uploadToElastic(dataMap);
        expect(response2.result == 'error').toBeTruthy();
        expect(response2.message == 'The card lacks important data: Name, Promotion, short description, long description, achievements or image.').toBeTruthy();
    });
    test("whenTheCardDoesNotHaveCheck_ItReturnsError", async () => {
        var dataMap = new Map();

        dataMap.set("index", "student");
        dataMap.set("promotion", "2021-2022");
        dataMap.set("registry", "05-06-2022");
        dataMap.set("timestamp", "1654017183000");
        dataMap.set("shortDescription", "Descripcion corta");
        dataMap.set("longDescription", "Descripcion larga");
        dataMap.set("achievements", "Logros");
        dataMap.set("name", "Ana");
        dataMap.get("image", "");

        const response = await uploadToElastic(dataMap);
        expect(response.result == 'error').toBeTruthy();
        expect(response.message == 'The card lacks important data: Name, Promotion, short description, long description, achievements or image.').toBeTruthy();
    
        dataMap.set("check", "");
        const response2 = await uploadToElastic(dataMap);
        expect(response2.result == 'error').toBeTruthy();
        expect(response2.message == 'The card lacks important data: Name, Promotion, short description, long description, achievements or image.').toBeTruthy();
    });

    test("whenTheCardDoesNotHaveImage_ItReturnsError", async () => {
        var dataMap = new Map();

        dataMap.set("index", "student");
        dataMap.set("promotion", "2021-2022");
        dataMap.set("registry", "05-06-2022");
        dataMap.set("timestamp", "1654017183000");
        dataMap.set("shortDescription", "Descripcion corta");
        dataMap.set("longDescription", "Descripcion larga");
        dataMap.set("achievements", "Logros");
        dataMap.set("check", false);
        dataMap.set("name", "Ana");

        const response = await uploadToElastic(dataMap);
        expect(response.result == 'error').toBeTruthy();
        expect(response.message == 'The card lacks important data: Name, Promotion, short description, long description, achievements or image.').toBeTruthy();
    
        dataMap.set("image", "");
        const response2 = await uploadToElastic(dataMap);
        expect(response2.result == 'error').toBeTruthy();
        expect(response2.message == 'The card lacks important data: Name, Promotion, short description, long description, achievements or image.').toBeTruthy();
    });

});

describe("Test the upload card functionality when data is correct", () => {
    test("whenTheCardDoesNotHaveTheNameOfASocialMedia_ItDoesntHaveAValueInTheCorrespondingSocialMediaFields", async () => {
        var dataMap = new Map();
        dataMap.set("index", "student");
        dataMap.set("name", "Ana")
        dataMap.set("promotion", "2021-2022");
        dataMap.set("registry", "05-06-2022");
        dataMap.set("timestamp", "1654017183000");
        dataMap.set("shortDescription", "Descripcion corta");
        dataMap.set("longDescription", "Descripcion larga");
        dataMap.set("achievements", "Logros");
        dataMap.set("check", false);
        dataMap.set("social1Text", "twitter")
        dataMap.set("image", "Image");

        const body = getBody(dataMap);
        expect(body.Red1 == "").toBeTruthy();
        expect(body.Red1Link == "").toBeTruthy();
    });
    test("whenTheCardDoesNotHaveTheLinkOfASocialMedia_ItDoesntHaveAValueInTheCorrespondingSocialMediaFields", async () => {
        var dataMap = new Map();
        dataMap.set("index", "student");
        dataMap.set("name", "Ana")
        dataMap.set("promotion", "2021-2022");
        dataMap.set("registry", "05-06-2022");
        dataMap.set("timestamp", "1654017183000");
        dataMap.set("shortDescription", "Descripcion corta");
        dataMap.set("longDescription", "Descripcion larga");
        dataMap.set("achievements", "Logros");
        dataMap.set("check", false);
        dataMap.set("social1", "https://twitter.com/computingoviedo")
        dataMap.set("image", "Image");

        const body = getBody(dataMap);
        expect(body.Red1 == "").toBeTruthy();
        expect(body.Red1Link == "").toBeTruthy();
    });

    test("whenTheCardHasValidData_ItReturnsABodyWithTheData", async () => {
        var dataMap = new Map();
        dataMap.set("index", "student");
        dataMap.set("name", "Ana")
        dataMap.set("promotion", "2021-2022");
        dataMap.set("registry", "05-06-2022");
        dataMap.set("timestamp", "1654017183000");
        dataMap.set("shortDescription", "Descripcion corta");
        dataMap.set("longDescription", "Descripcion larga");
        dataMap.set("achievements", "Logros");
        dataMap.set("check", false);
        dataMap.set("social1Text", "twitter")
        dataMap.set("social1", "https://twitter.com/computingoviedo")
        dataMap.set("social2Text", "facebook")
        dataMap.set("social2", "https://es-es.facebook.com/computingOviedo/")
        dataMap.set("social3Text", "instagram")
        dataMap.set("social3", "https://www.instagram.com/computingoviedo/?igshid=t4dg6npasb6i&hl=en")
        dataMap.set("image", "Image");

        const body = getBody(dataMap);

        expect(body.name == "Ana").toBeTruthy();
        expect(body.promotion == "2021-2022").toBeTruthy();
        expect(body.registry == "05-06-2022").toBeTruthy();
        expect(body.timestamp == "1654017183000").toBeTruthy();
        expect(body.shortDescription == "Descripcion corta").toBeTruthy();
        expect(body.longDescription == "Descripcion larga").toBeTruthy();
        expect(body.professionalAchievements == "Logros").toBeTruthy();
        expect(body.AppearsInAnotherCategory == false).toBeTruthy();
        expect(body.Red1Link == "https://twitter.com/computingoviedo").toBeTruthy();
        expect(body.Red1 == "twitter").toBeTruthy();
        expect(body.Red2Link == "https://es-es.facebook.com/computingOviedo/").toBeTruthy();
        expect(body.Red2 == "facebook").toBeTruthy();
        expect(body.Red3Link == "https://www.instagram.com/computingoviedo/?igshid=t4dg6npasb6i&hl=en").toBeTruthy();
        expect(body.Red3 == "instagram").toBeTruthy();
        expect(body.image == "Image").toBeTruthy();
    });
});