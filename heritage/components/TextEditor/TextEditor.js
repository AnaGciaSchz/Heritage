import React, {useRef, useState, useEffect} from 'react';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css';
import { useIntl } from "react-intl"
import { fetchWrapper } from '../../pages/api/handlers/fetchWrapper';
import { useRouter } from "next/router"

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
  });


  export default function TextEditor() {
  const {formatMessage} = useIntl();
  const f = id => formatMessage({ id })

  const router = useRouter();

  const [content, setContent] = useState('');
  const [sunEditor, setSunEditor] = useState(null);

  var dataMap = new Map();

  const editor = useRef();
  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
};

    const handleClick = () => {setContent(editor.current.getContents());save()};

    const getText = async (event) => {
        try {
            dataMap.set("locale", router.locale);
          const response = await fetchWrapper.post("http://localhost:3000/api/history/getInfo", Array.from(dataMap.entries()));
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
        setSunEditor(null)
        setSunEditor(    <SunEditor getSunEditorInstance={getSunEditorInstance} defaultValue={content}  lang= {f("local")}
        setOptions={{
            height: 500,
            buttonList: [
              ["undo","redo"],
              ['font', 'fontSize', 'formatBlock'],
              ['blockquote',"paragraphStyle"],
                ['bold', 'underline', 'italic', 
                'strike', 'subscript', 'superscript'],
                ['fontColor', 'hiliteColor', 'textStyle'],
              ["removeFormat"],
              ["outdent", "indent"],
              ['align', 'horizontalRule', 'list', 'lineHeight'],
              ['table', 'link', 'image', 'video', 'audio'],
              ['fullScreen', 'showBlocks', 'codeView']
            ]
          }}/>)
    }

    const save = async () => {
      try {
        dataMap.set("data",editor.current.getContents());
        dataMap.set("locale",router.locale);
      const response = await fetchWrapper.post("http://localhost:3000/api/history/saveInfo", Array.from(dataMap.entries()));
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

    }

    useEffect(() => {
      createText();
    }, [router.locale]);
    return ( 
    <div> 
    {sunEditor}
<button onClick={handleClick}>{f("Guardar")}</button>
    </div>
    )

}