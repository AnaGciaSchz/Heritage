import { fetchWrapper } from '../pages/api/handlers/fetchWrapper';

export const cardService = {
    getCardInfo
};

import getConfig from 'next/config';


function getCardInfo(dataMap) {
    
    const { publicRuntimeConfig } = getConfig();
    const baseUrl = `${publicRuntimeConfig.apiUrl}`;

    var response = fetchWrapper.post(`${baseUrl}/card/getCard`, Array.from(dataMap.entries()));
    return response;
}