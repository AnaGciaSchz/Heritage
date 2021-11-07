import React from "react";
import Files from "react";
const FileUpload = () => {

  /**
   *     onSuccess={this.handleSuccess}
    onError={this.handleErrors}
   */
  return (
    <Files
    multiple={false} maxSize="2mb" multipleMaxSize="10mb" accept={["image/png","image/jpg","image/jpeg"]}
>
    {({ browseFiles, getDropZoneProps }) => {
        return (
            <div>
                <label>Drag and drop files.</label>
                <div
                    {...getDropZoneProps({
                        style: {
                            width: 600,
                            minHeight: 200,
                            border: "2px lightgray dashed"
                        }
                    })}
                >
                    <ol>
                        {this.state.files.map(file => (
                            <li key={file.name}>{file.name}</li>
                        ))}
                        {this.state.errors.map(error => (
                            <li key={error.id}>
                                {error.file ? (
                                    <span>
                                        {error.file.name} - {error.type}
                                    </span>
                                ) : (
                                    error.type
                                )}
                            </li>
                        ))}
                    </ol>
                </div>
                <div>
                    Dragging not convenient? Click{" "}
                    <button onClick={browseFiles}>here</button> to select files.
                </div>
            </div>
        );
    }}
</Files>
  )
}

export default FileUpload;