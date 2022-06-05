import {isLocaleCorrect} from "../../pages/api/history/getInfo"


jest.mock('next/config', () => () => ({
    serverRuntimeConfig: {
        secret: "19Heritage+PetraCraft82*"
    },
    publicRuntimeConfig: {
        apiUrl:'http://localhost:3000/api' 
    },
  }));


describe("Test the validation of the information for search cards", () => {
    test("whenTheRequesthasInvalidLocale_ItReturnsFalse", async () => {
        const response = isLocaleCorrect("ar");
        expect(response == false).toBeTruthy();
    });

    test("whenTheRequestHasEsLocale_ItReturnsTrue", async () => {
        const response = isLocaleCorrect("es");
        expect(response == true).toBeTruthy();
    });

    test("whenTheRequestHasEnLocale_ItReturnsTrue", async () => {
        const response = isLocaleCorrect("en");
        expect(response == true).toBeTruthy();
    });

    test("whenTheRequestHasAstLocale_ItReturnsTrue", async () => {
        const response = isLocaleCorrect("ast");
        expect(response == true).toBeTruthy();
    });

});