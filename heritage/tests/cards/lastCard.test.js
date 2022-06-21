import {searchLastCard} from "../../pages/api/card/lastCard"

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
        const response = await searchLastCard(undefined);
        expect(response.result == 'error').toBeTruthy();
        expect(response.message == "Index of cards must not be empty").toBeTruthy();
    });

    test("whenTheRequestHasEmptyId_ItReturnsError", async () => {
        const response = await searchLastCard("");
        expect(response.result == 'error').toBeTruthy();
        expect(response.message == "Index of cards must not be empty").toBeTruthy();
    });
    test("whenTheRequestHasnotExistingId_ItReturnsError", async () => {
        const response = await searchLastCard("NoExiste");
        expect(response.result == 'error').toBeTruthy();
        expect(response.message == "Index of cards must not be empty").toBeTruthy();
    });

});