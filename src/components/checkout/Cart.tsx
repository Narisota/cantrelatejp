import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetProductsByIdsQuery } from "../../generated/graphql";
import { changeQuantityOnProduct } from "../../redux/actions/userAction";
import anime from "animejs";

const Cart = () => {
    const products = useSelector(state => state.productsInCart);
    const product_ids = [] as number[];
    for (let i = 0; i < products.length; i++) {
        let tmp = true;
        for (let j = 0; j < product_ids.length; j++) {
            if (product_ids[j] === products[i].product_id) {
                tmp = false;
            }
        }

        if (tmp) {
            product_ids.push(products[i].product_id);
        }
    }
    console.log("product_ids :>> ", product_ids);
    const products_str = JSON.stringify(product_ids);
    const { data, loading, error } = useGetProductsByIdsQuery({
        variables: {
            products_str,
        },
    });
    // const [checkout] = useCheckoutMutation();
    const dispatch = useDispatch();
    const [state, setState] = useState({
        refresh: false,
        quantities: [],
    });

    const total = useRef(0);

    useEffect(() => {
        if (!!products) {
            for (let i = 0; i < products.length; i++) {
                total.current = products[i].price * products[i].quantity;
            }
        }
    }, [products]);

    if (loading) {
        return <></>;
    }

    if (!!error) {
        return (
            <div style={{ minHeight: "70vh" }}>
                <div
                    className="row"
                    style={{ display: "flex", justifyContent: "center" }}
                >
                    <h5>Oops this is embarrasing</h5>
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="faq-wrapper">
                        <div
                            style={{
                                width: "100%",
                                borderBottom: " 4px solid #ff0000",
                            }}
                        ></div>

                        <h3 style={{ fontWeight: 550 }}>An error occured</h3>

                        <p className="flow-text" style={{ marginLeft: "32px" }}>
                            <strong style={{ color: "#ff0000" }}>-</strong>{" "}
                            Please try again later. If error persist contact us
                            via instagram or email.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div style={{ minHeight: "80vh" }}>
                <h3 className="center-align">Your Shopping Cart Is Empty!</h3>
                <a href="#/products">
                    <h6
                        className="center-align"
                        style={{ marginBottom: "16px" }}
                    >
                        Click me to start shopping
                    </h6>
                </a>
            </div>
        );
    }

    if (!!data) {
        console.log(`data`, data);
        for (let i = 0; i < products.length; i++) {
            // cart item validation
            for (let j = 0; j < data.getProductsByIds.length; j++) {
                if (
                    products[i].product_id ===
                    data.getProductsByIds[j].product_id
                ) {
                    if (!products[i].option) {
                        if (
                            products[i].quantity >
                            data.getProductsByIds[j].stock
                        ) {
                            // edit the item
                            products[i].name = data.getProductsByIds[j].name;
                            products[i].price = data.getProductsByIds[j].price;
                            products[i].quantity =
                                data.getProductsByIds[j].stock;
                            dispatch(
                                changeQuantityOnProduct(
                                    data.getProductsByIds[j].stock,
                                    i
                                )
                            );
                        }
                    } else {
                        if (
                            !!data.getProductsByIds[j] &&
                            !!data.getProductsByIds[j].options
                        ) {
                            for (
                                let ii = 0;
                                ii < data.getProductsByIds[j].options!.length;
                                ii++
                            ) {
                                if (
                                    products[i].option_id ===
                                    data.getProductsByIds[j].options![ii]
                                        .option_id
                                ) {
                                    //check stock
                                    if (
                                        products[i].quantity >
                                        data.getProductsByIds[j].options![ii]
                                            .stock
                                    ) {
                                        dispatch(
                                            changeQuantityOnProduct(
                                                data.getProductsByIds[j]
                                                    .options![ii].stock,
                                                i
                                            )
                                        );
                                    }
                                }
                            }
                        }

                        // if (products[i].quantity > data.getProducts[j].stock) {
                        //     // edit the item
                        //     products[i].name = data.getProducts[j].name;
                        //     products[i].price = data.getProducts[j].price;
                        //     products[i].quantity = data.getProducts[j].stock;
                        //     dispatch(
                        //         changeQuantityOnProduct(
                        //             data.getProducts[j].stock,
                        //             i
                        //         )
                        //     );
                        // }
                    }
                }
            }
        }
    }

    return (
        <div style={{ minHeight: "80vh" }}>
            <>
                <h3 className="center-align" style={{ fontWeight: "bold" }}>
                    Cart
                </h3>
                <h6 className="center-align" style={{ fontWeight: 600 }}>
                    {/* ${Number(total / 100).toFixed(2)} */}
                </h6>
                {products.map((_val, i) => {
                    return (
                        <div
                            id={`product-${i}`}
                            key={i}
                            className={`product-${i} product row container`}
                        >
                            <div className={` col s12 m5 l4`}>
                                <img
                                    alt="product"
                                    src={products[i].images[0].img_url}
                                    style={{ width: "100%" }}
                                />
                            </div>
                            <div className="col s12 m4">
                                <h5 className="center-align hide-on-small-only">
                                    {products[i].name}{" "}
                                    {!products[i].option ? (
                                        <></>
                                    ) : (
                                        <span className="bold">
                                            ({products[i].option})
                                        </span>
                                    )}
                                </h5>

                                <h6 className="center-align show-on-small hide-on-med-and-up">
                                    {products[i].name} ($
                                    {Number(products[i].price / 100).toFixed(2)}
                                    )
                                </h6>
                            </div>

                            <div
                                className="col s4 offset-s4 m2 l2"
                                style={{
                                    padding: "0",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <input
                                    type="text"
                                    value={
                                        state.quantities[i] ||
                                        state.quantities[i] === 0
                                            ? state.quantities[i]
                                            : products[i].quantity
                                    }
                                    minLength={0}
                                    maxLength={2}
                                    pattern="\D"
                                    onBlur={e => {
                                        dispatch(
                                            changeQuantityOnProduct(
                                                Number(e.target.value),
                                                i
                                            )
                                        );

                                        let tmp = state.quantities;
                                        tmp.splice(i, 1);

                                        if (e.target.value === "0") {
                                            anime({
                                                duration: 400,
                                                targets: `.product-${i}`,
                                                easing: "easeOutExpo",
                                                opacity: {
                                                    value: [1, 0],
                                                    easing: "linear",
                                                },
                                                complete: function () {
                                                    setState({
                                                        ...state,
                                                        quantities: tmp,
                                                        refresh: !state.refresh,
                                                    });
                                                    if (
                                                        !!document.getElementById(
                                                            `product-${i}`
                                                        )
                                                    ) {
                                                        document.getElementById(
                                                            `product-${i}`
                                                        )!.style.opacity = "1";
                                                    }
                                                },
                                            });
                                        }
                                    }}
                                    onChange={e => {
                                        let tmp: any = state.quantities;

                                        if (!e.target.value) {
                                            tmp[i] = 0;
                                            setState({
                                                ...state,
                                                quantities: tmp,
                                            });
                                        }

                                        if (e.target.value.match(/\d/g)) {
                                            //check if value is less than stock
                                            let foo = true;
                                            for (
                                                let j = 0;
                                                j <
                                                data!.getProductsByIds.length;
                                                j++
                                            ) {
                                                if (
                                                    data?.getProductsByIds[j]
                                                        .options
                                                ) {
                                                    if (
                                                        data?.getProductsByIds[
                                                            j
                                                        ].product_id ===
                                                        products[i].product_id
                                                    ) {
                                                        for (
                                                            let z = 0;
                                                            z <
                                                            data
                                                                ?.getProductsByIds[
                                                                j
                                                            ].options!.length;
                                                            z++
                                                        ) {
                                                            if (
                                                                products[i]
                                                                    .option_id ===
                                                                data
                                                                    ?.getProductsByIds[
                                                                    j
                                                                ].options![z]
                                                                    .option_id
                                                            ) {
                                                                debugger;
                                                                if (
                                                                    Number(
                                                                        e.target
                                                                            .value
                                                                    ) >
                                                                    data
                                                                        ?.getProductsByIds[
                                                                        j
                                                                    ].options![
                                                                        z
                                                                    ].stock
                                                                ) {
                                                                    foo = false;
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }

                                            if (foo) {
                                                tmp[i] = Number(e.target.value);
                                                setState({
                                                    ...state,
                                                    quantities: tmp,
                                                });
                                            }
                                        }
                                    }}
                                    style={{
                                        textAlign: "center",
                                        border: "1px solid #000",
                                        height: "56px",
                                        width: "56px",
                                    }}
                                />
                            </div>

                            <div className="col hide-on-small-only m1 l2">
                                <span></span>$
                                {Number(products[i].price / 100).toFixed(2)}
                            </div>
                        </div>
                    );
                })}
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "40px",
                    }}
                >
                    <a
                        className="btn"
                        style={{
                            marginTop: "16px",
                            width: "45%",
                            maxWidth: "380px",
                            backgroundColor: "#343145",
                        }}
                        href="#/checkout"
                    >
                        checkout
                    </a>
                </div>
            </>
        </div>
    );
};

export default Cart;
