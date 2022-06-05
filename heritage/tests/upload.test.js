import {uploadToElastic} from "../pages/api/card/uploadInfo"

jest.mock('next/config', () => () => ({
    serverRuntimeConfig: {
        secret: "19Heritage+PetraCraft82*"
    },
    publicRuntimeConfig: {
        apiUrl:'http://localhost:3000/api' 
    },
  }));

describe("Test the upload card functionality", () => {
    test("whenTheCardDoesNotHaveName_ItRetursn400error", async () => {
        var dataMap = new Map();

        dataMap.set("index", "");
        dataMap.set("promotion", "");
        dataMap.get("registry", "");
        dataMap.get("timestamp", "");
        dataMap.get("shortDescription", "");
        dataMap.get("longDescription", "");
        dataMap.get("archievements", "");
        dataMap.get("check", "");
        dataMap.get("image", "");

        const response = await uploadToElastic(dataMap);
        console.log(response)
        expect(response.result == 'error').toBeTruthy();
        expect(response.message == 'The card lacks important data: Name, Promotion, short description, long sescription, archievements or image.').toBeTruthy();
    });
});

/**
 * "name": dataMap.get("name"),
  "promotion": dataMap.get("promotion"),
  "registry": dataMap.get("registry"),
  "timestamp": dataMap.get("timestamp"),
  "shortDescription": dataMap.get("shortDescription"),
  "longDescription": dataMap.get("longDescription"),
  "professionalArchievements": dataMap.get("archievements"),
  "Red1": dataMap.has("social1Text") ? dataMap.get("social1Text") : "",
  "Red1Link": dataMap.has("social1") ? dataMap.get("social1") : "",
  "Red2": dataMap.has("social2Text") ? dataMap.get("social2Text") : "",
  "Red2Link": dataMap.has("social2") ? dataMap.get("social2") : "",
  "Red3": dataMap.has("social3Text") ? dataMap.get("social3Text") : "",
  "Red3Link": dataMap.has("social3") ? dataMap.get("social3") : "",
  "AppearsInAnotherCategory": dataMap.get("check"),
  "image": dataMap.get("image")
 */