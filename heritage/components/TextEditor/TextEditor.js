import React, {useRef, useState} from 'react';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css';

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
  });


function TextEditor() {
  const editor = useRef();
  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
};
    const [content, setContent] = useState('');
    const handleClick = () => setContent(editor.current.getContents());
    const handleShow= () => console.log(editor.current.getContents());

    return ( 
    <div> 
    <div className = "sun-editor-editable" dangerouslySetInnerHTML={{__html: content}} />
    <SunEditor getSunEditorInstance={getSunEditorInstance} defaultValue={content}  lang="es"
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

export default TextEditor;