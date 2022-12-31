import React from "react";

export default class CloudinaryUploadWidget extends React.Component {
  componentDidMount() {
    const cloudName = "dycfbgkdn"; // replace with your own cloud name
    const uploadPreset = "rlsqicpk"; // replace with your own upload preset
    const { setUrlImg } = this.props;
    //   https://cloudinary.com/documentation/upload_widget_reference
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,/* 
        maxImageWidth: 100,
        maxImageHeight: 100, */
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          setUrlImg(result.info.secure_url);
          /* document
            .getElementById("uploadedimage")
            .setAttribute("src", result.info.secure_url); */
        }
      }
    );
    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  }

  render() {
    return (
      <button id="upload_widget" className="cloudinary-button">
        Subir Imagen
      </button>
    );
  }
}
