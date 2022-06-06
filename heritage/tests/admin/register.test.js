import {checkInformation} from "../../pages/api/admin/register"

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


describe("Test the validation of the register params", () => {
    test("whenTheRequestHasNotUsername_ItReturnsError", async () => {
        var dataMap = new Map();
        dataMap.set("password", "password");
        dataMap.set("repeatPassword", "password")
        dataMap.set("name", "name");
        const response = checkInformation(admins,dataMap);
        expect(response.result == "error").toBeTruthy();
        expect(response.message == "EscribeUsername").toBeTruthy();
    });

    test("whenTheRequestHasEmptyUsername_ItReturnsError", async () => {
        var dataMap = new Map();
        dataMap.set("username", "");
        dataMap.set("password", "password");
        dataMap.set("repeatPassword", "password")
        dataMap.set("name", "name");
        const response = checkInformation(admins,dataMap);
        expect(response.result == "error").toBeTruthy();
        expect(response.message == "EscribeUsername").toBeTruthy();
    });

    test("whenTheRequestHasUsernameWithMotheThan20Letters_ItReturnsError", async () => {
        var dataMap = new Map();
        dataMap.set("username", "123456789123456789123456789");
        dataMap.set("password", "password");
        dataMap.set("repeatPassword", "password")
        dataMap.set("name", "name");
        const response = checkInformation(admins,dataMap);
        expect(response.result == "error").toBeTruthy();
        expect(response.message == "EscribeUsername").toBeTruthy();
    });

    test("whenTheRequestHasRepeatedUsername_ItReturnsError", async () => {
        var dataMap = new Map();
        dataMap.set("username", "Petra");
        dataMap.set("password", "password");
        dataMap.set("repeatPassword", "password")
        dataMap.set("name", "name");
        const response = checkInformation(admins,dataMap);
        expect(response.result == "error").toBeTruthy();
        expect(response.message == "NombreDeUsuarioEnUso").toBeTruthy();
    });
    test("whenTheRequestHasNoName_ItReturnsError", async () => {
        var dataMap = new Map();
        dataMap.set("username", "User");
        dataMap.set("password", "password");
        dataMap.set("repeatPassword", "password")
        const response = checkInformation(admins,dataMap);
        expect(response.result == "error").toBeTruthy();
        expect(response.message == "EscribeNombre").toBeTruthy();
    });

    test("whenTheRequestHasEmptyName_ItReturnsError", async () => {
        var dataMap = new Map();
        dataMap.set("username", "User");
        dataMap.set("password", "password");
        dataMap.set("repeatPassword", "password")
        dataMap.set("name", "");
        const response = checkInformation(admins,dataMap);
        expect(response.result == "error").toBeTruthy();
        expect(response.message == "EscribeNombre").toBeTruthy();
    });

    test("whenTheRequestHasNameWithMotheThan35Characters_ItReturnsError", async () => {
        var dataMap = new Map();
        dataMap.set("username", "User");
        dataMap.set("password", "password");
        dataMap.set("repeatPassword", "password")
        dataMap.set("name", "15236985478965321456985698547123659874521599");
        const response = checkInformation(admins,dataMap);
        expect(response.result == "error").toBeTruthy();
        expect(response.message == "EscribeNombre").toBeTruthy();
    });

    test("whenTheRequestHasNoPassword_ItReturnsError", async () => {
        var dataMap = new Map();
        dataMap.set("username", "User");
        dataMap.set("repeatPassword", "password")
        dataMap.set("name", "name");
        const response = checkInformation(admins,dataMap);
        expect(response.result == "error").toBeTruthy();
        expect(response.message == "EscribeContrasena").toBeTruthy();
    });

    test("whenTheRequestHasEmptyPassword_ItReturnsError", async () => {
        var dataMap = new Map();
        dataMap.set("username", "User");
        dataMap.set("name", "name");
        dataMap.set("password", "")
        dataMap.set("repeatPassword", "password")
        const response = checkInformation(admins,dataMap);
        expect(response.result == "error").toBeTruthy();
        expect(response.message == "EscribeContrasena").toBeTruthy();
    });

    test("whenTheRequestHasinsecurePassword_ItReturnsError", async () => {
        var dataMap = new Map();
        dataMap.set("username", "User");
        dataMap.set("name", "name");
        dataMap.set("password", "123")
        dataMap.set("repeatPassword", "password")
        const response = checkInformation(admins,dataMap);
        expect(response.result == "error").toBeTruthy();
        expect(response.message == "EscribeContrasena").toBeTruthy();
    });

    test("whenTheRequestHasNoRepeatedPassword_ItReturnsError", async () => {
        var dataMap = new Map();
        dataMap.set("username", "User");
        dataMap.set("name", "name");
        dataMap.set("password", "123")
        const response = checkInformation(admins,dataMap);
        expect(response.result == "error").toBeTruthy();
        expect(response.message == "EscribeContrasena").toBeTruthy();
    });

    test("whenTheRequestHasEmptyRepeatedPassword_ItReturnsError", async () => {
        var dataMap = new Map();
        dataMap.set("username", "User");
        dataMap.set("name", "name");
        dataMap.set("password", "123")
        dataMap.set("repeatPassword", "")
        const response = checkInformation(admins,dataMap);
        expect(response.result == "error").toBeTruthy();
        expect(response.message == "EscribeContrasena").toBeTruthy();
    });
    test("whenTheRequestHasPassworsThatAreNotTheSame_ItReturnsError", async () => {
        var dataMap = new Map();
        dataMap.set("username", "User");
        dataMap.set("name", "name");
        dataMap.set("password", "123")
        dataMap.set("repeatPassword", "456")
        const response = checkInformation(admins,dataMap);
        expect(response.result == "error").toBeTruthy();
        expect(response.message == "EscribeContrasena").toBeTruthy();
    });

    
});