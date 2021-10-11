import React, {useRef, useState} from 'react';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css';

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
  });

  const font = dynamic(() => import("suneditor/src/plugins"), {
    ssr: false,
  });


function TextEditor() {
  const editor = useRef();
  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
};
    const [content, setContent] = useState('');
    const handleClick = () => setContent(editor.current.getContents());

    return ( 
    <div> 
    <div dangerouslySetInnerHTML={{__html: content}} />
    <SunEditor getSunEditorInstance={getSunEditorInstance} defaultValue={content}  lang="es"
    setOptions={{
        height: 500,
        buttonList: [
          [
            "formatBlock",
            "font",
            "fontSize",
            "fontColor",
            "align",
            "paragraphStyle",
            "blockquote"
          ],
          [
            "bold",
            "underline",
            "italic",
            "strike",
            "subscript",
            "superscript"
          ],
          ["removeFormat"],
          ["outdent", "indent"],
          ["table", "list"],
          ["link", "image", "video"]
        ]
      }}/>
<button onClick={handleClick}>Guardar</button>
    </div>
    )

}

export default TextEditor;