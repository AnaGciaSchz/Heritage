import 'suneditor/dist/css/suneditor.min.css';
import{ useState, useEffect } from 'react';
import { fetchWrapper } from '../../pages/api/handlers/fetchWrapper';
import { useRouter } from "next/router"

import getConfig from 'next/config';


export default function TextDisplay() {
    const [content, setContent] = useState(null);
    const router = useRouter();
    
    const { publicRuntimeConfig } = getConfig();
    const baseUrl = `${publicRuntimeConfig.apiUrl}`;

    var dataMap = new Map();

    const getText = async (event) => {
        try {
            dataMap.set("locale", router.locale);
          const response = await fetchWrapper.post(`${baseUrl}/history/getInfo`, Array.from(dataMap.entries()));
          var json = await response.json();
          if (response.status < 200 || response.status > 299) {
            return "Error";
        }else{
            return json.message;
          }
        }
        catch (error) {
          return ""+error;
        }
      };

      const createText = async () => {
        var content = await getText();
  
        setContent(null);
        setContent(content);
    }
    
    useEffect(() => {
      createText();
    }, [router.locale]);
    return ( <div className = "sun-editor-editable" dangerouslySetInnerHTML={{__html: content}} />
    );
}