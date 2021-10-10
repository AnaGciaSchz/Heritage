import React, {useRef, useState} from 'react';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
  });
  const {buttonList} = dynamic(() => import("suneditor-react"), {
    ssr: false,
  });

function HistoriaEII() {
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
        buttonList: buttonList // Or Array of button list, eg. [['font', 'align'], ['image']]
        // plugins: [font] set plugins, all plugins are set by default
        // Other option
}}/>
<button onClick={handleClick}>Guardar</button>
    </div>
    )

}

export default HistoriaEII;