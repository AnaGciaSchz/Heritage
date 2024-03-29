import {searchInElastic} from "../../pages/api/card/search"

jest.mock('next/config', () => () => ({
    serverRuntimeConfig: {
        secret: "19Heritage+PetraCraft82*"
    },
    publicRuntimeConfig: {
        apiUrl:'http://localhost:3000/api' 
    },
  }));


describe("Test the validation of the information for search cards", () => {
    test("whenTheRequestDoesNotHaveIndex_ItReturnsError", async () => {
        var dataMap = new Map();
        const response = await searchInElastic(dataMap);
        expect(response.result == 'error').toBeTruthy();
        expect(response.message == "El índice no debe ser vacío").toBeTruthy();
    });

    test("whenTheRequestHasEmptyId_ItReturnsError", async () => {
        var dataMap = new Map();
        dataMap.set("index", "")
        const response = await searchInElastic(dataMap);
        expect(response.result == 'error').toBeTruthy();
        expect(response.message == "El índice no debe ser vacío").toBeTruthy();
    });
    test("whenTheRequestHasnotExistingId_ItReturnsError", async () => {
        var dataMap = new Map();
        dataMap.set("index", "NoExiste")
        const response = await searchInElastic(dataMap);
        expect(response.result == 'error').toBeTruthy();
        expect(response.message == "El índice no debe ser vacío").toBeTruthy();
    });

});