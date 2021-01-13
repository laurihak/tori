import "./InputFile.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import productService from "../../services/productService";

const InputFile = () => {
  const [file, setFile] = useState();
  const { id } = useParams();

  const [images, setImages] = useState([]);

  const urlToImages = `${process.env.REACT_APP_API_URL}/products/${id}/images`;

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };
  const fileFromServer = require("../AddProduct/images/test.jpeg").default;

  console.log("file in change inputfile", file);
  console.log("file in change but from server", fileFromServer);

  const uploadPhoto = async (event) => {
    if (!file) {
      return;
    }
    try {
      productService.insertImage(id, file);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    const getImage = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/products/${id}/images`
        );
        if (!response || !response.data.length === 0) return;
        setImages(response.data);
      } catch (e) {
        console.log(e.message);
      }
    };
    getImage();
  }, [id]);

  console.log("images now ", images);
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
            Choose file
          </label>
          <input
            accept="image/jpeg"
            id="upload"
            type="file"
            name="file"
            onChange={(event) => handleChange(event)}
          />
        </div>
        <label
          className="Upload-photo-button"
          onClick={uploadPhoto}
          accept="image/jpeg"
          name="file"
        >
          Upload
        </label>
        <div style={{ marginTop: "15px" }}>
          File name: {!file ? "not found" : file.name}
        </div>
      </div>
    </div>
  );
};

export default InputFile;
