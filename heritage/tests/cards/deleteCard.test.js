import {deleteCardFromElastic} from "../../pages/api/card/delete"

jest.mock('next/config', () => () => ({
    serverRuntimeConfig: {
        secret: "19Heritage+PetraCraft82*"
    },
    publicRuntimeConfig: {
        apiUrl:'http://localhost:3000/api' 
    },
  }));


describe("Test the validation of the information for delete cards", () => {
    test("whenTheRequestDoesNotHaveIndex_ItReturnsError", async () => {
        const response = await deleteCardFromElastic(undefined,"id");
        expect(response.result == 'error').toBeTruthy();
        expect(response.message == "Index and id of cards must not be empty").toBeTruthy();
    });

    test("whenTheRequestDoesNotHaveId_ItReturnsError", async () => {
        const response = await deleteCardFromElastic("index", undefined);
        expect(response.result == 'error').toBeTruthy();
        expect(response.message == "Index and id of cards must not be empty").toBeTruthy();
    });

    test("whenTheRequestHasEmptyId_ItReturnsError", async () => {
        const response = await deleteCardFromElastic("index", "");
        expect(response.result == 'error').toBeTruthy();
        expect(response.message == "Index and id of cards must not be empty").toBeTruthy();
    });

    test("whenTheRequestHasEmptyIndex_ItReturnsError", async () => {
        const response = await deleteCardFromElastic("", "id");
        expect(response.result == 'error').toBeTruthy();
        expect(response.message == "Index and id of cards must not be empty").toBeTruthy();
    });
});