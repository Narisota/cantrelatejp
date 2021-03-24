import {
    useGetProductsQuery,
    useGetSectionsQuery,
} from "../../generated/graphql";
import "../../css/products.scss";
import { useEffect } from "react";
import anime from "animejs";

const GetSections = () => {
    const { data, loading } = useGetSectionsQuery();
    let sdata = data,
        sloading = loading;
    return { sdata, sloading };
};

const Products = () => {
    const { data, loading } = useGetProductsQuery();
    const { sdata, sloading } = GetSections();

    useEffect(() => {
        if (!loading && !sloading) {
            if (!!document.getElementById("products-grid")) {
                document
                    .getElementById("products-grid")!
                    .classList.remove("hide");
            }
            anime({
                duration: function (_t, i) {
                    return 900 + i * 75;
                },
                targets: ".products-grid .card-content",
                easing: "easeOutExpo",
                // delay: function (t, i) {
                //     return i * 50;
                // },
                opacity: { value: [0, 1], easing: "linear" },
                scale: [0, 1],
                delay: anime.stagger(150, { start: 100 }),
            });
            anime({
                duration: function (_t, i) {
                    return 900 + i * 75;
                },
                targets: ".products-grid .card",
                easing: "easeOutExpo",
                // delay: function (t, i) {
                //     return i * 50;
                // },
                opacity: { value: [0, 1], easing: "linear" },
                scale: [0, 1],
                delay: anime.stagger(150, { start: 100 }),
            });
        }
    });

    if (loading || sloading) {
        return <></>;
    }

    return (
        <div className="container" style={{ width: "80%" }}>
            {!!sdata && sdata.getSections.length !== 0 ? (
                <>
                    <h1
                        className="center-align"
                        style={{
                            marginTop: "60px",
                            marginBottom: "60px",
                            fontWeight: 600,
                        }}
                    >
                        Sections
                    </h1>

                    <div className="sections-grid">
                        {sdata.getSections.map((_val, i) => {
                            let section = sdata.getSections[i];
                            return (
                                <div
                                    className="card z-depth-0 black-text"
                                    style={{
                                        margin: "0px 8px 32px 8px",
                                    }}
                                    key={i}
                                >
                                    <a
                                        className="black-text"
                                        href={`#/view-section:${section.section_id}`}
                                    >
                                        <div className="container">
                                            <div className="card-image">
                                                <img
                                                    src={section.thumbnail}
                                                    alt={section.name}
                                                />
                                            </div>
                                        </div>

                                        <div className="card-content">
                                            <span className="card-title">
                                                <h5 className="center-align">
                                                    {section.name}
                                                </h5>
                                            </span>
                                            <span
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                }}
                                            ></span>
                                        </div>
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                </>
            ) : null}

            {!!data ? (
                <>
                    <h1
                        className="center-align"
                        style={{
                            marginTop: "60px",
                            marginBottom: "60px",
                            fontWeight: 600,
                        }}
                    >
                        Products
                    </h1>

                    <div id="products-grid" className="products-grid hide">
                        {data?.getProducts.map((_val, i) => {
                            let product: any = data.getProducts[i];
                            return (
                                <div className="card z-depth-0 " key={i}>
                                    <a
                                        className="black-text"
                                        href={`#/product-details:${product.product_id}`}
                                    >
                                        <div className="container">
                                            <div className="card-image">
                                                <img
                                                    src={
                                                        !product.images[0] ||
                                                        !product.images[0]
                                                            .img_url
                                                            ? "https://materializecss.com/images/sample-1.jpg"
                                                            : product.images[0]
                                                                  .img_url
                                                    }
                                                    alt={product.name}
                                                />
                                            </div>
                                        </div>

                                        <div className="card-content">
                                            <span className="card-title">
                                                <h5 className="center-align">
                                                    {product.name}
                                                </h5>
                                            </span>
                                            <span
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <p
                                                    className="product-price"
                                                    style={{ fontSize: "16px" }}
                                                >
                                                    $
                                                    {Number(
                                                        product.price / 100
                                                    ).toFixed(2)}
                                                </p>
                                            </span>
                                        </div>
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default Products;
