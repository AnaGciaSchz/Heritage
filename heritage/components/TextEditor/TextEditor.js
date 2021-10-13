import React, {useRef, useState} from 'react';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css';
import { useIntl } from "react-intl"

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
  });


  export default function TextEditor() {
  const {formatMessage} = useIntl();
  const f = id => formatMessage({ id })
  const editor = useRef();
  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
};
    const [content, setContent] = useState('');
    const handleClick = () => setContent(editor.current.getContents());

    return ( 
    <div> 
    <div className = "sun-editor-editable" dangerouslySetInnerHTML={{__html: content}} />
    <SunEditor getSunEditorInstance={getSunEditorInstance} defaultValue={content}  lang= {f("local")}
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
      }}/>
<button onClick={handleClick}>Añadir</button>
    </div>
    )

}