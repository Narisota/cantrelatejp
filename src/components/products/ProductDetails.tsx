import { Redirect } from "react-router";
import { useGetProductQuery } from "../../generated/graphql";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../redux/actions/userAction";
import { useEffect } from "react";
import anime from "animejs";

const ProductDetails = () => {
    let product_id: number;
    if (process.env.NODE_ENV === "production") {
        product_id = Number(window.location.href.split(":")[2]);
    } else {
        product_id = Number(window.location.href.split(":")[3]);
    }

    const dispatch = useDispatch();

    const { data, loading, error } = useGetProductQuery({
        variables: {
            product_id,
        },
    });

    useEffect(() => {
        var elems = document.querySelectorAll(".tooltipped");
        M.Tooltip.init(elems);
        elems = document.querySelectorAll(".carousel");
        M.Carousel.init(elems);

        if (!loading) {
            // (stock * 100)/ org_stock
            let percent = 50;
            if (!data || !data!.getProduct.org_stock) {
                percent = 100;
            } else {
                percent =
                    (data!.getProduct.stock * 100) / data!.getProduct.org_stock;

                if (percent > 100) {
                    percent = 100;
                }
            }

            anime({
                targets: ".filler",
                width: ["0%", `${percent}%`],
                easing: "easeInOutExpo",
            });

            if (!document.getElementById("product-img")) {
            } else {
                if (data?.getProduct.stock === 0) {
                    document.getElementById("product-img")!.style.opacity =
                        "0.7";
                }
            }
        }
    }, [loading, data]);

    if (loading) {
        return <></>;
    }

    if (!data || error) {
        return <Redirect to="/products" />;
    }

    let product: any = data!.getProduct;

    console.log("product :>> ", product);

    // setTimeout(() => {
    //     var instance = M.Carousel.getInstance(
    //         document.getElementById("carousel-1")!
    //     );
    //     instance.next();
    // }, 5000);
    return (
        <div>
            <h3 className="center-align">{product.name}</h3>
            <h6 className="center-align">
                ${Number(product.price / 100).toFixed(2)}{" "}
                {product.stock === 0 ? (
                    <span style={{ color: "#ff0000", fontWeight: "bold" }}>
                        SOLD OUT
                    </span>
                ) : (
                    <></>
                )}
            </h6>

            <div className="row noselect">
                <div
                    className="col s10 offset-s1 m4 offset-m2"
                    style={{ display: "flex", justifyContent: "end" }}
                >
                    {data.getProduct.images!.length > 1 ? (
                        <>
                            <div
                                id="carousel-1"
                                className="carousel carousel-slider hide-on-small-only"
                            >
                                {!data.getProduct.images ? (
                                    <></>
                                ) : (
                                    <>
                                        {data.getProduct.images.map(
                                            (_val, i) => {
                                                return (
                                                    // eslint-disable-next-line
                                                    <a
                                                        className="carousel-item noselect"
                                                        key={i}
                                                    >
                                                        <span
                                                            style={{
                                                                display:
                                                                    "inline-block",
                                                                maxHeight:
                                                                    "350px",
                                                                height: "100%",
                                                                width: "10%",
                                                            }}
                                                            onClick={() => {
                                                                var instance = M.Carousel.getInstance(
                                                                    document.getElementById(
                                                                        "carousel-1"
                                                                    )!
                                                                );
                                                                instance.prev();
                                                            }}
                                                        ></span>
                                                        <img
                                                            alt="product"
                                                            style={{
                                                                maxHeight:
                                                                    "350px",
                                                                width: "80%",
                                                            }}
                                                            src={
                                                                product.images[
                                                                    i
                                                                ].img_url || ""
                                                            }
                                                        />
                                                        <span
                                                            style={{
                                                                display:
                                                                    "inline-block",
                                                                maxHeight:
                                                                    "350px",
                                                                height: "100%",
                                                                width: "10%",
                                                            }}
                                                            onClick={() => {
                                                                var instance = M.Carousel.getInstance(
                                                                    document.getElementById(
                                                                        "carousel-1"
                                                                    )!
                                                                );
                                                                instance.next();
                                                            }}
                                                        ></span>
                                                    </a>
                                                );
                                            }
                                        )}
                                    </>
                                )}
                            </div>

                            <div
                                id="carousel-2"
                                className="carousel carousel-slider show-on-small-only hide-on-med-and-up"
                                style={{ height: "350px" }}
                            >
                                {!data.getProduct.images ? (
                                    <></>
                                ) : (
                                    <>
                                        {data.getProduct.images.map(
                                            (_val, i) => {
                                                return (
                                                    // eslint-disable-next-line
                                                    <a
                                                        className="carousel-item noselect"
                                                        key={i}
                                                        style={{
                                                            maxHeight: "250px",
                                                            minHeight: "100px",
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                display:
                                                                    "inline-block",
                                                                maxHeight:
                                                                    "250px",
                                                                height: "100%",
                                                                width: "10%",
                                                            }}
                                                            onClick={() => {
                                                                var instance = M.Carousel.getInstance(
                                                                    document.getElementById(
                                                                        "carousel-2"
                                                                    )!
                                                                );
                                                                instance.prev();
                                                            }}
                                                        ></span>
                                                        <img
                                                            alt="product"
                                                            style={{
                                                                maxHeight:
                                                                    "250px",
                                                                width: "80%",
                                                            }}
                                                            src={
                                                                product.images[
                                                                    i
                                                                ].img_url || ""
                                                            }
                                                        />
                                                        <span
                                                            style={{
                                                                display:
                                                                    "inline-block",
                                                                maxHeight:
                                                                    "250px",
                                                                height: "100%",
                                                                width: "10%",
                                                            }}
                                                            onClick={() => {
                                                                var instance = M.Carousel.getInstance(
                                                                    document.getElementById(
                                                                        "carousel-2"
                                                                    )!
                                                                );
                                                                instance.next();
                                                            }}
                                                        ></span>
                                                    </a>
                                                );
                                            }
                                        )}
                                    </>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <img
                                    id="product-img"
                                    src={product.images[0].img_url || ""}
                                    alt="product"
                                    style={{ maxWidth: "100%" }}
                                />
                            </div>
                        </>
                    )}
                </div>
                <div className="col s10 offset-s1 m3 offset-m1">
                    <div
                        style={{ marginBottom: "16px" }}
                        className="hide-on-small-only"
                    >
                        {product.desc}
                    </div>
                    <div className="centered">
                        <div
                            style={{ marginBottom: "16px", marginTop: "16px" }}
                            className="show-on-small hide-on-med-and-up"
                        >
                            {product.desc}
                        </div>
                    </div>
                    <div
                        className="divider"
                        style={{ marginBottom: "16px" }}
                    ></div>
                    {/* eslint-disable-next-line */}
                    <a
                        className="tooltipped"
                        data-position="right"
                        data-tooltip={`${product.stock} remaining`}
                    >
                        <div
                            className="hide-on-small-only"
                            style={{
                                height: "55px",
                                width: "100%",
                                border: "1px solid black",
                                marginBottom: "16px",
                            }}
                        >
                            <span
                                className="filler"
                                style={{
                                    display: "inline-block",
                                    height: "100%",
                                    backgroundColor: "#0d0303",
                                }}
                            ></span>
                        </div>
                    </a>

                    {product.stock === 0 ? (
                        <></>
                    ) : (
                        <>
                            <button
                                style={{
                                    width: "100%",
                                    backgroundColor: "#0a0a0a",
                                    color: "#fff",
                                    border: "none",
                                    height: "45px",
                                }}
                                onClick={() => {
                                    M.toast({
                                        html: "Product was added to cart",
                                    });
                                    dispatch(addProductToCart(product));
                                }}
                            >
                                Add to Cart
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
