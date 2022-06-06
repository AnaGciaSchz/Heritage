import {isDataCorrect} from "../../pages/api/admin/login"
import {isUsernameInList} from "../../pages/api/admin/login"

jest.mock('next/config', () => () => ({
    serverRuntimeConfig: {
        secret: "19Heritage+PetraCraft82*"
    },
    publicRuntimeConfig: {
        apiUrl:'http://localhost:3000/api' 
    },
  }));

  var admins = [
    {
      "id": 1,
      "username": "Petra",
      "name": "Petra",
      "password": "$2b$11$0Qrot2.d.zTWCuUeQVobNuRsE0T0mcSOE8KEJemnwMHaB/sdNFtsm",
      "created": "2022-5-25T19:16:35Z",
      "updated": "2022-5-25T19:16:35Z"
    }
  ]


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

    test("whenTheRequestHasExistingUsername_ItReturnsTrue", async () => {
        const response = isUsernameInList(admins, "Petra");
        expect(response == true).toBeTruthy();
    });


});