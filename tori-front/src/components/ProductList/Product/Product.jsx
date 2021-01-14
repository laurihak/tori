import {
  Card,
  CardMedia as img,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Product.css";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import imageService from "../../../services/imageService";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    minWidth: 350,
    flexGrow: 1,
    borderColor: "grey",
    borderWidth: "1.1px",
    borderRadius: "5px",
    margin: "10px",
    backgroundColor: "rgb(60,60,60)",
  },
});

const Product = ({ product }) => {
  const [images, setImages] = useState(null);
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    console.log("handling click");
    history.push(`/products/${product.id}`);
  };

  useEffect(() => {
    console.log("useffect in product");
    const getImages = async () => {
      try {
        const response = await imageService.getImagesWithProductId(product.id);
        if (!response || !response.length === 0) return;
        setImages(response);
      } catch (e) {
        console.log(e.message);
      }
    };
    getImages();
  }, [product]);
  // console.log("images now", images);
  return (
    <Card
      className={classes.root}
      variant="outlined"
      key={product.id}
      onClick={handleClick}
    >
      <CardContent className="Content">
        <div className="Column">
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
          {/* <Typography className="Left-info" variant="body2" component="p">
            {product.description}
          </Typography> */}
        </div>
        <div className="Right">
          {!images ? null : (
            <img
              className="Media"
              src={images[0]}
              title="not found"
              alt="not found"
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Product;
