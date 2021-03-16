import { useGetUsersOrdersQuery } from "../generated/graphql";
import { useLocation } from "react-router-dom";
// import anime from "animejs";
import { Sorting } from "../Sorting";

interface UserOrders {
    products: [
        {
            product_id: number;
            name: string;
            desc: string;
            price: number;
            stock: number;
            exp_date?: string;
            quantityOrdered: number;
            productSubtotal: number;
            images: [
                {
                    img_id: number;
                    img_url: string;
                    index: number;
                }
            ];
        }
    ];
    shipping: string;
    order_total: number;
    order_id: number;
    tracking_num?: string;
    coupon: string;
    discount: string;
    date_of_purchase: string;
}

const calcSubtotals = (products: any[]) => {
    let Subtotal: any = 0,
        sTotal: any = 100;

    for (let i = 0; i < products.length; i++) {
        Subtotal += products[i].productSubtotal!;
        sTotal += products[i].quantityOrdered * 50;
    }

    let productsSubtotal = Number(Subtotal / 100).toFixed(2);

    if (sTotal > 500) {
        sTotal = 500;
    }

    let shippingTotal = Number(sTotal / 100).toFixed(2);

    return { productsSubtotal, shippingTotal };
};

const showDetails = (i, tmp) => {
    // if (document.getElementById(`card-header-${i}`)!.clientHeight > 50)
    if (
        !document
            .getElementById(`order-details-row-${i}`)!
            .classList.contains("hide")
    ) {
        document
            .getElementById(`order-details-row-${i}`)!
            .classList.add("hide");

        // anime({
        //     targets: `.card-header-${i}`,
        //     height: "48.5px",
        //     easing: "linear",
        //     duration: 400,
        //     complete: () => {
        //         setTimeout(() => {
        //             document.getElementById(
        //                 "details-span"
        //             )!.style.pointerEvents = "auto";
        //         }, 50);
        //     },
        // });
    } else {
        const { productsSubtotal, shippingTotal } = calcSubtotals(
            tmp[i].products
        );

        document.getElementById(
            `subtotal-${i}`
        )!.innerHTML = `$${productsSubtotal}`;

        document.getElementById(`tax-${i}`)!.innerHTML = `$${Number(
            Number(productsSubtotal) * 0.095
        ).toFixed(2)}`;

        document.getElementById(
            `shippingTotal-${i}`
        )!.innerHTML = `$${shippingTotal}`;

        document
            .getElementById(`order-details-row-${i}`)!
            .classList.remove("hide");

        // anime({
        //     targets: `.card-header-${i}`,
        //     height: "215px",
        //     easing: "linear",
        //     duration: 350,
        //     complete: () => {
        //         document
        //             .getElementById(`order-details-row-${i}`)!
        //             .classList.remove("hide");

        //         anime({
        //             targets: `.order-details-${i} .el`,
        //             opacity: [0, 1],
        //             delay: anime.stagger(50),
        //             complete: () => {
        //                 setTimeout(() => {
        //                     document.getElementById(
        //                         "details-span"
        //                     )!.style.pointerEvents = "auto";
        //                 }, 15);
        //             },
        //         });
        //     },
        // });
    }
};

const UsersOrders = () => {
    const location: any = useLocation();

    const { sortByProp } = Sorting();

    if (!!location.state) {
        if (location.state.reload) {
            window.location.reload();
        }
    }

    const { data, loading, error } = useGetUsersOrdersQuery();

    if (loading) {
        return <></>;
    }

    if (error) {
        return <></>;
    }

    if (!data) {
        //redirect
        return <></>;
    }

    console.log("data :>> ", data);

    let sortedOrders: [UserOrders] = sortByProp(
        data.getUsersOrders,
        "order_id",
        true
    );

    return (
        <>
            {!!sortedOrders ? (
                <>
                    <div className="container" style={{ minHeight: "70vh" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <h3>Your Purchases</h3>
                        </div>
                        <>
                            {sortedOrders.map((_val, i) => {
                                let amountOff = Number(
                                    (sortedOrders[i].order_total *
                                        Number(
                                            "0." + sortedOrders[i].discount
                                        )) /
                                        100
                                ).toFixed(2);

                                let str, dateOfPurchase;
                                if (sortedOrders[i].date_of_purchase) {
                                    str = sortedOrders[
                                        i
                                    ].date_of_purchase.split(" ");
                                    dateOfPurchase = `${str[0]} ${str[1]} ${str[2]} ${str[3]}`;
                                }

                                let shipping = JSON.parse(
                                    sortedOrders[i].shipping
                                );
                                return (
                                    <div className="row z-depth-1" key={i}>
                                        <div
                                            className="col s12"
                                            style={{ padding: "0px" }}
                                        >
                                            <div
                                                className={`card-header card-header-${i} row`}
                                                id={`card-header-${i}`}
                                                style={{
                                                    borderLeft:
                                                        "5px solid #ff0000",
                                                    paddingTop: "13px",
                                                    paddingBottom: "13px",
                                                    paddingRight: "25px",
                                                    paddingLeft: "20px",
                                                    margin: "0px",
                                                    zIndex: 4,
                                                    position: "relative",
                                                }}
                                            >
                                                <span className="col s7 m4">
                                                    <span
                                                        style={{
                                                            color: "#1d252c",
                                                            paddingRight:
                                                                "1rem",
                                                            fontWeight: 700,
                                                        }}
                                                    >
                                                        Order ID
                                                    </span>
                                                    <span>
                                                        CR-
                                                        {
                                                            sortedOrders[i]
                                                                .order_id
                                                        }
                                                    </span>
                                                </span>

                                                <span className="hide-on-med-and-down col l3">
                                                    {sortedOrders[i]
                                                        .date_of_purchase ? (
                                                        <span>
                                                            {dateOfPurchase}
                                                        </span>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </span>

                                                <span className="bold col s5 m4">
                                                    <span>
                                                        <span className="hide-on-small-only left">
                                                            $
                                                            {Number(
                                                                sortedOrders[i]
                                                                    .order_total /
                                                                    100
                                                            ).toFixed(2)}{" "}
                                                            {sortedOrders[i]
                                                                .discount ? (
                                                                <span className="hide-on-med-and-down">
                                                                    (
                                                                    <span
                                                                        style={{
                                                                            color:
                                                                                "rgb(255, 0, 0)",
                                                                        }}
                                                                    >
                                                                        -$
                                                                        {
                                                                            amountOff
                                                                        }
                                                                    </span>
                                                                    )
                                                                </span>
                                                            ) : (
                                                                <></>
                                                            )}
                                                        </span>
                                                        <span
                                                            id="details-span"
                                                            className="noselect right"
                                                            onClick={() => {
                                                                // document.getElementById(
                                                                //     "details-span"
                                                                // )!.style.pointerEvents =
                                                                //     "none";
                                                                showDetails(
                                                                    i,
                                                                    sortedOrders
                                                                );
                                                            }}
                                                        >
                                                            Details
                                                        </span>
                                                    </span>
                                                </span>

                                                <div
                                                    className="row hide"
                                                    id={`order-details-row-${i}`}
                                                    style={{
                                                        marginTop: "32px",
                                                    }}
                                                >
                                                    <div className="col s12 m5">
                                                        <span
                                                            className={`order-details-${i}`}
                                                        >
                                                            <span className="el">
                                                                <span className="left">
                                                                    Subtotal
                                                                </span>
                                                                <span
                                                                    className="right semi-bold"
                                                                    id={`subtotal-${i}`}
                                                                ></span>
                                                            </span>

                                                            <br />

                                                            <span className="el">
                                                                <span className="left">
                                                                    Tax
                                                                </span>
                                                                <span
                                                                    className="right semi-bold"
                                                                    id={`tax-${i}`}
                                                                ></span>
                                                            </span>

                                                            <br />

                                                            <span className="el">
                                                                <span className="left">
                                                                    Shipping
                                                                </span>
                                                                <span
                                                                    className="right semi-bold"
                                                                    id={`shippingTotal-${i}`}
                                                                ></span>
                                                            </span>

                                                            <>
                                                                {!sortedOrders[
                                                                    i
                                                                ].coupon ? (
                                                                    <></>
                                                                ) : (
                                                                    <span className="el">
                                                                        <br />
                                                                        <div
                                                                            className="divider"
                                                                            style={{
                                                                                marginTop:
                                                                                    "4px",
                                                                                marginBottom:
                                                                                    "4px",
                                                                            }}
                                                                        ></div>
                                                                        <span className="left">
                                                                            Coupon(
                                                                            {
                                                                                sortedOrders[
                                                                                    i
                                                                                ]
                                                                                    .coupon
                                                                            }
                                                                            )
                                                                        </span>
                                                                        <span className="right">
                                                                            {
                                                                                sortedOrders[
                                                                                    i
                                                                                ]
                                                                                    .discount
                                                                            }
                                                                            % (
                                                                            <span className="red-text bold">
                                                                                -$
                                                                                {
                                                                                    amountOff
                                                                                }
                                                                            </span>
                                                                            )
                                                                        </span>
                                                                    </span>
                                                                )}
                                                            </>

                                                            <br />

                                                            <span className="el">
                                                                <div
                                                                    className="divider"
                                                                    style={{
                                                                        marginTop:
                                                                            "4px",
                                                                        marginBottom:
                                                                            "4px",
                                                                    }}
                                                                ></div>
                                                                <span className="left">
                                                                    Order Total
                                                                </span>
                                                                <span className="right bold">
                                                                    $
                                                                    {Number(
                                                                        sortedOrders[
                                                                            i
                                                                        ]
                                                                            .order_total /
                                                                            100
                                                                    ).toFixed(
                                                                        2
                                                                    )}
                                                                </span>
                                                            </span>
                                                        </span>
                                                    </div>

                                                    <div className="col s12 m5 offset-m2">
                                                        <span
                                                            className={`shipping-details-${i}`}
                                                        >
                                                            <div
                                                                style={{
                                                                    width:
                                                                        "100%",
                                                                    borderLeft:
                                                                        " 4px solid black",
                                                                    paddingLeft:
                                                                        "15px",
                                                                }}
                                                            >
                                                                <p className="bold">
                                                                    {!shipping ? (
                                                                        <></>
                                                                    ) : (
                                                                        <>
                                                                            {
                                                                                shipping.name
                                                                            }
                                                                            <br />
                                                                            {
                                                                                shipping.line1
                                                                            }
                                                                            <br />
                                                                            {
                                                                                shipping.city
                                                                            }
                                                                            ,{" "}
                                                                            {
                                                                                shipping.state
                                                                            }{" "}
                                                                            {
                                                                                shipping.postal_code
                                                                            }
                                                                            <br />
                                                                            {
                                                                                shipping.country
                                                                            }
                                                                        </>
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="divider"></div>

                                            <div
                                                className="card-body"
                                                style={{
                                                    backgroundColor: "white",
                                                    zIndex: 2,
                                                    position: "relative",
                                                }}
                                            >
                                                {sortedOrders[i].products.map(
                                                    (_val, j) => {
                                                        return (
                                                            <div
                                                                className="row"
                                                                key={j}
                                                            >
                                                                <div className="col s12 m4">
                                                                    <img
                                                                        alt="product"
                                                                        style={{
                                                                            width:
                                                                                "100%",
                                                                        }}
                                                                        src={
                                                                            sortedOrders[
                                                                                i
                                                                            ]
                                                                                .products[
                                                                                j
                                                                            ]
                                                                                .images[0]
                                                                                .img_url
                                                                        }
                                                                    />
                                                                </div>
                                                                <div
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        flexDirection:
                                                                            "column",
                                                                        justifyContent:
                                                                            "space-between",
                                                                        height:
                                                                            "100%",
                                                                        paddingLeft: 0,
                                                                    }}
                                                                    className="col m2 offset-m1 hide-on-small-only"
                                                                >
                                                                    <p
                                                                        className="flow-text"
                                                                        style={{
                                                                            fontSize:
                                                                                "16px",
                                                                            fontWeight:
                                                                                "bold",
                                                                        }}
                                                                    >
                                                                        {
                                                                            sortedOrders[
                                                                                i
                                                                            ]
                                                                                .products[
                                                                                j
                                                                            ]
                                                                                .name
                                                                        }
                                                                    </p>
                                                                    <p className="hide-on-small-only">
                                                                        Qty:{" "}
                                                                        {
                                                                            sortedOrders[
                                                                                i
                                                                            ]
                                                                                .products[
                                                                                j
                                                                            ]
                                                                                .quantityOrdered
                                                                        }{" "}
                                                                        ($
                                                                        {Number(
                                                                            sortedOrders[
                                                                                i
                                                                            ]
                                                                                .products[
                                                                                j
                                                                            ]
                                                                                .productSubtotal /
                                                                                100
                                                                        ).toFixed(
                                                                            2
                                                                        )}
                                                                        )
                                                                    </p>
                                                                </div>

                                                                <div
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        justifyContent:
                                                                            "center",
                                                                    }}
                                                                    className="col s12 hide-on-med-and-up"
                                                                >
                                                                    <p
                                                                        className="flow-text"
                                                                        style={{
                                                                            fontSize:
                                                                                "16px",
                                                                            fontWeight:
                                                                                "bold",
                                                                        }}
                                                                    >
                                                                        {
                                                                            sortedOrders[
                                                                                i
                                                                            ]
                                                                                .products[
                                                                                j
                                                                            ]
                                                                                .name
                                                                        }
                                                                    </p>
                                                                </div>

                                                                {j === 0 ? (
                                                                    <>
                                                                        <div className="col offset-m1 m3 hide-on-small-only">
                                                                            {!sortedOrders[
                                                                                i
                                                                            ]
                                                                                .tracking_num ? (
                                                                                <>
                                                                                    <p
                                                                                        style={{
                                                                                            fontWeight: 700,
                                                                                        }}
                                                                                    >
                                                                                        Order
                                                                                        is
                                                                                        being
                                                                                        proccessed
                                                                                    </p>
                                                                                    <div
                                                                                        style={{
                                                                                            width:
                                                                                                "100%",
                                                                                            borderBottom:
                                                                                                " 4px solid #ff0000",
                                                                                        }}
                                                                                    ></div>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <p
                                                                                        style={{
                                                                                            fontWeight: 700,
                                                                                        }}
                                                                                    >
                                                                                        Shipped{" "}
                                                                                        =&gt;{" "}
                                                                                        <a
                                                                                            href={`https://www.google.com/search?q=${sortedOrders[i].tracking_num}`}
                                                                                        >
                                                                                            {
                                                                                                sortedOrders[
                                                                                                    i
                                                                                                ]
                                                                                                    .tracking_num
                                                                                            }
                                                                                        </a>
                                                                                    </p>
                                                                                    <div
                                                                                        style={{
                                                                                            width:
                                                                                                "100%",
                                                                                            borderBottom:
                                                                                                " 4px solid green",
                                                                                        }}
                                                                                    ></div>
                                                                                </>
                                                                            )}
                                                                        </div>

                                                                        <div
                                                                            className="col s12 hide-on-med-and-up"
                                                                            style={{}}
                                                                        >
                                                                            {!sortedOrders[
                                                                                i
                                                                            ]
                                                                                .tracking_num ? (
                                                                                <>
                                                                                    <p
                                                                                        style={{
                                                                                            fontWeight: 700,
                                                                                            display:
                                                                                                "flex",
                                                                                            justifyContent:
                                                                                                "center",
                                                                                            marginBottom:
                                                                                                "32px",
                                                                                        }}
                                                                                    >
                                                                                        <span
                                                                                            style={{
                                                                                                borderLeft:
                                                                                                    " 4px solid #ff0000",
                                                                                                paddingLeft:
                                                                                                    "10px",
                                                                                            }}
                                                                                        >
                                                                                            Order
                                                                                            is
                                                                                            being
                                                                                            proccessed
                                                                                        </span>
                                                                                    </p>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <p
                                                                                        style={{
                                                                                            fontWeight: 700,
                                                                                            display:
                                                                                                "flex",
                                                                                            justifyContent:
                                                                                                "center",
                                                                                            marginBottom:
                                                                                                "32px",
                                                                                        }}
                                                                                    >
                                                                                        <span
                                                                                            style={{
                                                                                                borderLeft:
                                                                                                    " 4px solid #008000",
                                                                                                paddingLeft:
                                                                                                    "10px",
                                                                                            }}
                                                                                        >
                                                                                            Shipped{" "}
                                                                                            =&gt;{" "}
                                                                                            <a
                                                                                                href={`https://www.google.com/search?q=${sortedOrders[i].tracking_num}`}
                                                                                            >
                                                                                                {
                                                                                                    sortedOrders[
                                                                                                        i
                                                                                                    ]
                                                                                                        .tracking_num
                                                                                                }
                                                                                            </a>
                                                                                        </span>
                                                                                    </p>
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    </>
                                                                ) : null}
                                                                {sortedOrders[i]
                                                                    .products
                                                                    .length >
                                                                    1 &&
                                                                sortedOrders[i]
                                                                    .products
                                                                    .length -
                                                                    1 !==
                                                                    j ? (
                                                                    <div
                                                                        className="divider hide-on-med-and-up"
                                                                        style={{
                                                                            marginLeft:
                                                                                "10%",
                                                                            width:
                                                                                "80%",
                                                                        }}
                                                                    ></div>
                                                                ) : (
                                                                    <></>
                                                                )}
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    </div>
                </>
            ) : (
                <>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <h1>You haven't ordered anything yet</h1>
                    </div>
                </>
            )}
        </>
    );
};

export default UsersOrders;
