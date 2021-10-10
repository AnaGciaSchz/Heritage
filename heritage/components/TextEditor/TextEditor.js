import React, {useRef, useState} from 'react';
import dynamic from "next/dynamic";
import list from 'suneditor/src/plugins/submenu/list'
import {font, image, video, horizontalRule,fontColor,align,hiliteColor,lineHeight,link,blockquote,textStyle,table,audio,paragraphStyle,fontSize,formatBlock} from 'suneditor/src/plugins'
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
        plugins: [font, fontColor,fontSize,formatBlock,align,hiliteColor,blockquote,audio,link,textStyle,table,horizontalRule,lineHeight,paragraphStyle,video, image, list],
        buttonList: [['font','fontColor','fontSize','formatBlock','hiliteColor',
        'horizontalRule','lineHeight','paragraphStyle','table',
        'textStyle','link','audio','blockquote','align', 
        'video', 'image', 'list']]
}}/>
<button onClick={handleClick}>Guardar</button>
    </div>
    )

}

export default TextEditor;