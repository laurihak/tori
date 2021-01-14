import axios from "axios";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./ProductPage.css";
import { Link, useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import productService from "../../services/productService";
import imageService from "../../services/imageService";

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
const Product = ({ user }) => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const classes = useStyles();
  const history = useHistory();

  const [images, setImages] = useState([]);

  const onDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${product.name}?`))
      return;
    await axios.delete(`${API_URL}/products/${id}`);
    window.alert("Product deleted");
    history.push("/products");
  };

  const onEdit = async () => {
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await productService.getById(id);
        if (!response) {
          window.alert("Tuotetta ei löytynyt");
        }
        setProduct(response);
      } catch (e) {
        window.alert(e.response.data.message);
      }
    };
    getProduct();
  }, [id]);

  useEffect(() => {
    const getImages = async () => {
      try {
        const response = await imageService.getImagesWithProductId(id);
        if (!response || !response.length === 0) return;
        setImages(response);
      } catch (e) {
        window.alert(e.response.data.message);
      }
    };
    getImages();
  }, [id]);

  if (!product) {
    return <div>Product not found</div>;
  } else if (!user) {
    return <div>User not found</div>;
  }
  let descriptionHtml;
  if (product.description) {
    descriptionHtml = product.description.replace(/(?:\r\n|\r|\n)/g, "<br>");
  }

  if (user && product && user.id === product.seller_id) {
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
  } else {
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
                  {/* <button className="Button-edit" onClick={onEdit}>
                    EDIT
                  </button>
                  <button className="Button-delete" onClick={onDelete}>
                    DELETE
                  </button> */}
                </div>
              </div>
              <div className="Right"></div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }
};

export default Product;
