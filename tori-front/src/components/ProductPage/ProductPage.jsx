import axios from "axios";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./ProductPage.css";
import { Link, useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import productService from "../../services/productService";

const useStyles = makeStyles({
  root: {
    display: "flex",
    width: "100%",
    height: "fit-content",
    borderColor: "grey",
    backgroundColor: "rgb(60,60,60)",
  },
});

const API_URL = process.env.API_URL || "http://localhost:4000/api";
const Product = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const classes = useStyles();
  const history = useHistory();

  const [images, setImages] = useState([]);

  console.log("API URL NOW ", API_URL);

  const onDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${product.name}?`))
      return;
    await axios.delete(`${API_URL}/products/${id}`);
    window.alert("Product deleted");
    history.push("/products");
  };

  const onEdit = async () => {
    console.log("edit clicked");
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await productService.getById(id);
        if (!response) {
          console.log("error fetching product with id");
        }
        setProduct(response);
      } catch (e) {
        console.log(e.message);
      }
    };
    getProduct();
  }, [id]);

  useEffect(() => {
    const getImages = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/products/${id}/images`
        );
        if (!response || !response.data.length === 0) return;
        setImages(response.data);
      } catch (e) {
        console.log(e.message);
      }
    };
    getImages();
  }, [id]);
  let descriptionHtml;
  if (product && product.description) {
    descriptionHtml = product.description.replace(/(?:\r\n|\r|\n)/g, "<br>");
    console.log("descriptionHtml", descriptionHtml);
  }

  console.log("product now", product);
  return (
    <div className="Container-product-page">
      {!product ? null : (
        <Card
          className={classes.root}
          variant="outlined"
          key={product.id}
          onClick={() => <Link to="/product"></Link>}
        >
          <CardContent className="Content-product-page">
            <div className="Container-productpage-photos">
              {!images ? (
                <div style={{ color: "white" }}>No images</div>
              ) : (
                images.map((img, i) => (
                  <img
                    key={i}
                    className="Media-product-page"
                    src={img}
                    alt="not found"
                  />
                ))
              )}
            </div>
            <div className="Row-product-page">
              {/* <CardMedia
                className="Media-product-page"
                image="/test.jpg"
                title="Test"
              /> */}
              <Typography gutterBottom variant="h5" component="h2">
                {product.product_name}
              </Typography>
              <Typography className="Left-info">
                Hinta: {product.price} $
              </Typography>
              <Typography className="Left-info" variant="body2" component="p">
                Paikka: {product.location}
              </Typography>
              <Typography className="Left-info" variant="body2" component="p">
                Tyyppi: {product.sell_type}
              </Typography>
              <br />
              <br />
              {/* <Typography */}
              <div
                className="Description-container-product-page"
                variant="body2"
                component="p"
              >
                {/* > */}
                <p className="Description-product-page-text">
                  Lisatietoja: <br />
                  <br />
                  {product.description}
                </p>
              </div>
              {/* </Typography> */}
              <div className="Container-product-page-buttons">
                <button className="Button-edit" onClick={onEdit}>
                  EDIT
                </button>
                <button className="Button-delete" onClick={onDelete}>
                  DELETE
                </button>
              </div>
            </div>
            <div className="Right"></div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Product;
