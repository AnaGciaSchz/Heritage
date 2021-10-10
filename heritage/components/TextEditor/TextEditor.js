import React, {useRef, useState} from 'react';
import dynamic from "next/dynamic";
import plugins from 'suneditor/src/plugins'
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
    return ( 
    <div> 
    <div dangerouslySetInnerHTML={{__html: content}} />
    <SunEditor getSunEditorInstance={getSunEditorInstance} defaultValue={content}  lang="es"
    setOptions={{
        height: 500,
        plugins: plugins,
        buttonList: [
            ['undo', 'redo'],
            ['font', 'fontSize', 'formatBlock'],
            ['blockquote'],
            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
            ['fontColor', 'hiliteColor', 'textStyle'],
            ['removeFormat'],
            ['outdent', 'indent'],
            ['align', 'horizontalRule', 'list', 'lineHeight'],
            ['table', 'link', 'image', 'video', 'audio'], 
            ['fullScreen', 'showBlocks', 'codeView']
        ]
}}/>
<button onClick={handleClick}>Guardar</button>
    </div>
    )

}

export default TextEditor;