import "./InputFile.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import productService from "../../services/productService";
import imageService from "../../services/imageService";

const InputFile = ({ file, setFile }) => {
  const { id } = useParams();

  const [images, setImages] = useState([]);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadPhoto = async (event) => {
    if (!file) {
      return;
    }
    try {
      productService.insertImage(id, file);
    } catch (e) {
      window.alert(e.response.data.message);
    }
  };

  useEffect(() => {
    const getImage = async () => {
      try {
        const response = await imageService.getImagesWithProductId(id);
        if (!response || !response.length === 0) return;
        setImages(response);
      } catch (e) {
        window.alert(e.response.data.message);
      }
    };
    getImage();
  }, [id]);

  return (
    <div className="Container">
      <div className="Container-add-photo">
        <div className="Container-preview-photos">
          {!images
            ? null
            : images.map((img, i) => (
                <img
                  key={i}
                  className="Product-photos"
                  src={img}
                  alt="not found"
                />
              ))}
        </div>
        {!file ? null : (
          <img
            className="Photo-preview"
            src={URL.createObjectURL(file)}
            alt="not found"
          />
        )}
        <div className="button-wrap">
          <label className="Choose-file-button" htmlFor="upload">
            Valitse tiedosto
          </label>
          <input
            accept="image/jpeg"
            id="upload"
            type="file"
            name="file"
            onChange={(event) => handleChange(event)}
          />
        </div>
        {/* <label
          className="Upload-photo-button"
          onClick={uploadPhoto}
          accept="image/jpeg"
          name="file"
        >
          Upload
        </label>
        <div style={{ marginTop: "15px" }}>
          File name: {!file ? "not found" : file.name}
        </div> */}
      </div>
    </div>
  );
};

export default InputFile;
