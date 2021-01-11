import React, { useState, useEffect } from "react";
import { listRelated, read } from "./apiCore";
import Layout from "./Layout";
import Card from "./Card";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  const displayRelatedProducts = () => {
    if (relatedProduct.length == 0) {
      return <div>No other related products were found</div>;
    } else {
      return relatedProduct.map((p, i) => (
        <div className="mb-3">
          <Card key={i} product={p} />
        </div>
      ));
    }
  };

  useEffect(() => {
    const productId = props.match.params.productId; // every time the comp mounts
    loadSingleProduct(productId);
  }, [props]);

  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
    >
      <div className="row">
        <div className="col-8">
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>
        <div className="col-4">
          <h4>Related Products</h4>
          {displayRelatedProducts()}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
