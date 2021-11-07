import { useState } from "react";

export default function SubidaDeCartas() {
    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);

    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
          const i = event.target.files[0];
    
          setImage(i);
          setCreateObjectURL(URL.createObjectURL(i));
        }
      };

    const uploadToServer = async (event) => {
        console.log("Hola")
        const body = new FormData();
        body.append("image", image);
        const response = await fetch("http://localhost:3000/api/studentCard/upload", {
          method: "POST",
          body
        });
      };
    

    return (
        <div>
      <div>
        <img src={createObjectURL} />
        <h4>Select Image</h4>
        <input type="file" name="image" onChange={uploadToClient} />
        <button
          type="submit"
          onClick={uploadToServer}
        >
          Send to server
        </button>
      </div>
    </div>
        );

}