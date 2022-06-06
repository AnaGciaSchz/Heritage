import React from 'react';
import ReactTestUtils from 'react-dom/test-utils'; 
import { IntlProvider } from "react-intl"
import TextDisplay from "../../components/TextDisplay/TextDisplay"
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

jest.mock('next/config', () => () => ({
    serverRuntimeConfig: {
        secret: "19Heritage+PetraCraft82*"
    },
    publicRuntimeConfig: {
        apiUrl:'http://localhost:3000/api' 
    },
  }));
  

describe('TextDisplay tests', () => {
    it('whenTheElementIsDisplayed_ItHasATextContainer', () => {
        const component = ReactTestUtils.renderIntoDocument(<IntlProvider locale="es" messages={translations}><TextDisplay/></IntlProvider>);
        ReactTestUtils.findRenderedDOMComponentWithClass(component, 'sun-editor-editable');
    })
  })