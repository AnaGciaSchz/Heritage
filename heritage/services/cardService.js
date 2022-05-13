import { fetchWrapper } from '../pages/api/handlers/fetchWrapper';

export const cardService = {
    getCardInfo
};

function getCardInfo(dataMap) {
    var response = fetchWrapper.post(`${baseUrl}/api/card/getCard`, Array.from(dataMap.entries()));
    return response;
}