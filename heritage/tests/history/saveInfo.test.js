import {isDataCorrect} from "../../pages/api/history/saveInfo"


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
        const response = isDataCorrect("ar", "data");
        expect(response == false).toBeTruthy();
    });

    test("whenTheRequestHasEsLocale_ItReturnsTrue", async () => {
        const response = isDataCorrect("es", "data");
        expect(response == true).toBeTruthy();
    });

    test("whenTheRequestHasEnLocale_ItReturnsTrue", async () => {
        const response = isDataCorrect("en", "data");
        expect(response == true).toBeTruthy();
    });

    test("whenTheRequestHasAstLocale_ItReturnsTrue", async () => {
        const response = isDataCorrect("ast", "data");
        expect(response == true).toBeTruthy();
    });

    test("whenTheRequestHasNotData_ItReturnsFalse", async () => {
        const response = isDataCorrect("ast", undefined);
        expect(response == false).toBeTruthy();
    });

    test("whenTheRequestHasEmptyData_ItReturnsFalse", async () => {
        const response = isDataCorrect("ast", "");
        expect(response == false).toBeTruthy();
    });

    test("whenTheRequestHasNotLocale_ItReturnsFalse", async () => {
        const response = isDataCorrect(undefined, "data");
        expect(response == false).toBeTruthy();
    });

    test("whenTheRequestHasEmptyLocale_ItReturnsFalse", async () => {
        const response = isDataCorrect("", "data");
        expect(response == false).toBeTruthy();
    });

});