import React from 'react';
import ReactTestUtils from 'react-dom/test-utils'; 
import { IntlProvider } from "react-intl"
import Internationalizator from "../../components/Internacionalizator/Internacionalizator"
import translations from './translations.json'

jest.mock("next/router", () => ({
    useRouter() {
        return {
            route: "/",
            pathname: "",
            query: "",
            asPath: "",
            router: {locale: "es"}
        };
    },
}));
  

describe('Internationalizator tests', () => {
    it('whenTheElementIsDisplayed_ItHasATile', () => {
        const component = ReactTestUtils.renderIntoDocument(<IntlProvider locale="es" messages={translations}><Internationalizator/></IntlProvider>);
        var h2 = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'h2');
        ReactTestUtils.findRenderedDOMComponentWithClass(component, 'hidden');

      
    })

  })