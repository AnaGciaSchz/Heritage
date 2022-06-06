import {isDataCorrect} from "../../pages/api/admin/login"

jest.mock('next/config', () => () => ({
    serverRuntimeConfig: {
        secret: "19Heritage+PetraCraft82*"
    },
    publicRuntimeConfig: {
        apiUrl:'http://localhost:3000/api' 
    },
  }));


describe("Test the validation of the login params", () => {
    test("whenTheRequestHasNotUsername_ItReturnsFalse", async () => {
        const response = isDataCorrect(undefined,"password");
        expect(response == false).toBeTruthy();
    });
    test("whenTheRequestHasEmptyUsername_ItReturnsFalse", async () => {
        const response = isDataCorrect("","password");
        expect(response == false).toBeTruthy();
    });
    test("whenTheRequestHasNotPassword_ItReturnsFalse", async () => {
        const response = isDataCorrect("username",undefined);
        expect(response == false).toBeTruthy();
    });
    test("whenTheRequestHasEmptyPassword_ItReturnsFalse", async () => {
        const response = isDataCorrect("username","");
        expect(response == false).toBeTruthy();
    });


});