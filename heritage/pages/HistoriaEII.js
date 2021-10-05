import React, {useState} from 'react';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
  });
  const {buttonList} = dynamic(() => import("suneditor-react"), {
    ssr: false,
  });

function HistoriaEII() {
    const [content, setContent] = useState('');
    const handleChange = (content) => setContent(content);
    return ( 
    <div> 
    <div dangerouslySetInnerHTML={{__html: content}} />
    <SunEditor defaultValue={content}  onChange={handleChange} lang="es"
    setOptions={{
        buttonList: buttonList // Or Array of button list, eg. [['font', 'align'], ['image']]
        // plugins: [font] set plugins, all plugins are set by default
        // Other option
}}/>
    </div>
    )

}

export default HistoriaEII;