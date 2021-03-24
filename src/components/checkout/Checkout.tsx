import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    useCheckoutMutation,
    useGetCurrUserQuery,
    useValidateCouponMutation,
    usePaypalCheckoutMutation,
    useAddPaypalOrderMutation,
} from "../../generated/graphql";
import { CardElement } from "@stripe/react-stripe-js";
import { Redirect } from "react-router";
import { checkAuth } from "../../CheckAuth";
import { resetCart } from "../../redux/actions/userAction";
import Paid from "./Paid";

function CardSection() {
    const CARD_ELEMENT_OPTIONS: any = {
        iconStyle: "solid",
        hidePostalCode: true,
        style: {
            base: {
                iconColor: "rgb(240, 57, 122)",
                color: "rgb(240, 57, 122)",
                fontSize: "16px",
                fontFamily: '"Open Sans", sans-serif',
                fontSmoothing: "antialiased",
                "::placeholder": {
                    color: "#CFD7DF",
                },
            },

            invalid: {
                color: "#e5424d",
                ":focus": {
                    color: "#303238",
                },
            },
        },
    };

    return <CardElement options={CARD_ELEMENT_OPTIONS} />;
}

const Checkout = props => {
    const { data } = useGetCurrUserQuery();
    const [checkout] = useCheckoutMutation();
    const [validateCoupon] = useValidateCouponMutation();
    const [paypalCheckout] = usePaypalCheckoutMutation();
    const [addPaypalOrder] = useAddPaypalOrderMutation();
    const [discountPH, setDiscountPH] = useState(0);
    const products = useSelector(state => state.productsInCart);
    const dispatch = useDispatch();
    const [coupon, setCoupon] = useState("");
    const [subtotal, setSubtotal] = useState(-1);
    const [Total, setTotal] = useState(-1);
    const [shipping, setShipping] = useState(-1);
    const [billing, setBilling] = useState({
        refresh: false,
        email: "",
        name: "",
        address: {
            city: "",
            line1: "",
            zip: "",
            state: "",
            country: "",
        },
    });

    const [paidFor, setPaidFor] = useState(false);
    const [err, setError] = useState("");
    const [address, setAddress] = useState({
        city: "",
        line1: "",
        zip: "",
        state: "",
        email: "",
        name: "",
        country: "",
    });

    const paypalRef = useRef();
    const couponRef: any = useRef();
    couponRef.current = coupon;

    useEffect(() => {
        let tmp: any = paypalRef.current;
        var elems = document.querySelectorAll(".autocomplete");
        M.Autocomplete.init(elems, {
            data: {
                Alabama: null,
                Alaska: null,
                Arizona: null,
                Arkansas: null,
                California: null,
                Colorado: null,
                Connecticut: null,
                Delaware: null,
                Florida: null,
                Georgia: null,
                Hawaii: null,
                Idaho: null,
                Illinois: null,
                Indiana: null,
                Iowa: null,
                Kansas: null,
                Kentucky: null,
                Louisiana: null,
                Maine: null,
                Maryland: null,
                Massachusettes: null,
                Michigan: null,
                Minnesota: null,
                Mississippi: null,
                Missouri: null,
                Montana: null,
                Nebraska: null,
                Nevada: null,
                "New Hampshire": null,
                "New Jersey": null,
                "New Mexico": null,
                "New York": null,
                "North Carolina": null,
                "North Dakota": null,
                Ohio: null,
                Oklahoma: null,
                Oregon: null,
                Pennsylvania: null,
                "Rhode Island": null,
                "South Carolina": null,
                "South Dakota": null,
                Tennessee: null,
                Texas: null,
                Utah: null,
                Vermont: null,
                Virginia: null,
                Washington: null,
                "West Virginia": null,
                Wisconsin: null,
                Wyoming: null,
            },
        });

        let win = window as any;
        try {
            if (!!tmp && tmp.children.length === 0) {
                win.paypal
                    .Buttons({
                        createOrder: async (data, actions) => {
                            let products_str = JSON.stringify(products);

                            let price = await paypalCheckout({
                                variables: {
                                    products: products_str,
                                    coupon: couponRef.current || "NONE",
                                },
                            });

                            if (!price) {
                                return;
                            } else {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            description: "product.description",
                                            amount: {
                                                currency_code: "USD",
                                                value: Number(
                                                    Number(
                                                        price.data
                                                            ?.paypalCheckout
                                                    ) / 100
                                                ).toFixed(2),
                                            },
                                        },
                                    ],
                                });
                            }
                        },
                        onApprove: async (_ppdata, actions) => {
                            const order = await actions.order.capture();
                            console.log("order :>> ", order);
                            let products_str = JSON.stringify(products),
                                purchaseUnits_str = JSON.stringify(
                                    order.purchase_units
                                ),
                                user_id;
                            if (
                                !data ||
                                !data.getCurrUser ||
                                !data.getCurrUser.user_id
                            ) {
                                user_id =
                                    order.purchase_units[0].payee.email_address;
                            } else {
                                user_id = data!.getCurrUser!.user_id!;
                            }
                            // validate order info here paypal order here
                            addPaypalOrder({
                                variables: {
                                    coupon: couponRef.current || "NONE",
                                    products: products_str,
                                    purchase_units: purchaseUnits_str,
                                    user_id,
                                },
                            });
                            setPaidFor(true);
                        },
                        onError: async err => {
                            console.log("err :>> ", err);
                            let products_str = JSON.stringify(products);
                            var price: any = await paypalCheckout({
                                variables: {
                                    products: products_str,
                                    coupon,
                                },
                            });
                            setError(price.data.paypalCheckout);
                        },
                    })
                    .render(paypalRef.current);
            } else {
            }
        } catch {
            setError("DONT_KNOW");
        }
    }, [Total, addPaypalOrder, coupon, data, paypalCheckout, products]);

    if (!!err) {
        return (
            <div style={{ minHeight: "70vh" }}>
                <div
                    className="row"
                    style={{ display: "flex", justifyContent: "center" }}
                >
                    <h1>Oops this is embarrasing</h1>
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="faq-wrapper">
                        <div
                            style={{
                                width: "100%",
                                borderBottom: " 4px solid black",
                            }}
                        ></div>

                        <h3 style={{ fontWeight: 550 }}>
                            It looks like{" "}
                            <span style={{ color: "rgb(230, 19, 19)" }}>
                                {err}
                            </span>
                        </h3>

                        <p className="flow-text" style={{ marginLeft: "32px" }}>
                            <strong style={{ color: "#ff0000" }}>-</strong> If
                            you believe this is an error please contact us via
                            instagram or email.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (paidFor) {
        dispatch(resetCart());
        return <Paid />;
    }

    if (!products || products.length === 0) {
        return <Redirect to="/my-cart" />;
    }

    const handleSubmit = async () => {
        let payBtn = document.getElementById("stripe-pay-btn")!;
        payBtn.classList.add("disabled");
        const { stripe, elements } = props;
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        const result = await stripe.createToken(card);

        if (result.error) {
            M.toast({ html: `${result.error.message}` });
            console.log("result.error :>> ", result.error);
        } else {
            let tmp: any = address;
            tmp.email = address.email;
            let products_str = JSON.stringify(products),
                token_str = JSON.stringify(result.token),
                shipping_str = JSON.stringify(tmp);

            let user_id;
            if (!data) {
                user_id = "NONE";
            } else {
                user_id = data.getCurrUser!.user_id!;
            }

            let billing_str = "";
            if (billing.refresh) {
                billing_str = JSON.stringify(billing);
            } else {
                billing_str = "NONE";
            }

            let response = await checkout({
                variables: {
                    token: token_str,
                    user_id,
                    products: products_str,
                    shipping_info: shipping_str,
                    billing_info: billing_str,
                    coupon,
                },
            });

            if (!response!.data!.checkout) {
                M.toast({ html: "Failed to checkout" });
                M.toast({ html: "Please double check your details" });
            } else if (response!.data!.checkout) {
                setPaidFor(true);
            }
        }
        payBtn.classList.remove("disabled");
    };

    if (subtotal === -1) {
        let tmp_subtotal = 0,
            shipping_total = 100;

        for (let i = 0; i < products.length; i++) {
            let product = products[i];
            if (!product.option || product.option.length === 0) {
                tmp_subtotal += products[i].price * products[i].quantity;
            } else {
                tmp_subtotal += products[i].option_price * products[i].quantity;
            }

            shipping_total += products[i].quantity * 50;
        }

        if (shipping_total > 500) {
            shipping_total = 500;
        }

        let tax = Math.round(tmp_subtotal * 0.095);

        // shipping not added to subtotal bc it isn't rerendered if a coupon is added
        setTotal(tmp_subtotal + tax);
        setSubtotal(tmp_subtotal);
        setShipping(shipping_total);
    }

    const validateForm = () => {
        let tmp_email = address.email;
        if (checkAuth()) {
            tmp_email = "placeholder";
        }

        if (
            !address.name ||
            !tmp_email ||
            !address.line1 ||
            !address.city ||
            !address.zip ||
            !address.state ||
            billing.refresh
        ) {
            if (!tmp_email && document.getElementById("email")) {
                document.getElementById("email")!.classList.add("invalid");
            }
            if (!address.name) {
                document.getElementById("name")!.classList.add("invalid");
            }

            if (!address.line1) {
                document.getElementById("address")!.classList.add("invalid");
            }

            if (!address.city) {
                document.getElementById("city")!.classList.add("invalid");
            }

            if (!address.zip) {
                document.getElementById("zip")!.classList.add("invalid");
            }

            if (!address.state) {
                document.getElementById("state")!.classList.add("invalid");
            }

            if (billing.refresh) {
                if (
                    !billing.name ||
                    !billing.email ||
                    !billing.address.line1 ||
                    !billing.address.city ||
                    !billing.address.zip ||
                    !billing.address.state
                ) {
                    if (!billing.name) {
                        document
                            .getElementById("billing_name")!
                            .classList.add("invalid");
                    }

                    if (!billing.email) {
                        document
                            .getElementById("billing_email")!
                            .classList.add("invalid");
                    }

                    if (!billing.address.line1) {
                        document
                            .getElementById("billing_address")!
                            .classList.add("invalid");
                    }

                    if (!billing.address.city) {
                        document
                            .getElementById("billing_city")!
                            .classList.add("invalid");
                    }

                    if (!billing.address.zip) {
                        document
                            .getElementById("billing_zip")!
                            .classList.add("invalid");
                    }

                    if (!billing.address.state) {
                        document
                            .getElementById("billing_state")!
                            .classList.add("invalid");
                    }
                }
            }

            M.toast({
                html: "Please fill in the missing data",
            });
        } else {
            handleSubmit();
        }
    };

    return (
        <div className="row" style={{ height: "100%", margin: "0" }}>
            <div
                className="col s12 m6  z-depth-3 "
                style={{ minHeight: "93vh", paddingBottom: 32 }}
            >
                <div className="container" style={{ marginTop: "50px" }}>
                    <div className="row">
                        <a href="#/my-cart">
                            <svg
                                style={{ marginRight: "8px" }}
                                focusable="false"
                                width="12"
                                height="12"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M3.417 7H15a1 1 0 0 1 0 2H3.417l4.591 4.591a1 1 0 0 1-1.415 1.416l-6.3-6.3a1 1 0 0 1 0-1.414l6.3-6.3A1 1 0 0 1 8.008 2.41z"
                                    fillRule="evenodd"
                                ></path>
                            </svg>
                            <span>Back To Cart</span>
                        </a>
                    </div>
                    <div>
                        <div
                            className="ProductSummary container"
                            style={{ marginTop: "32px" }}
                        >
                            <div
                                className="ProductSummary-info"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <span
                                    style={{
                                        color: "rgba(26,26,26,.6)",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Total
                                </span>
                                <span
                                    style={{
                                        fontSize: "36px",
                                        letterSpacing: "-.03rem",
                                        color: "#303030",
                                    }}
                                >
                                    $
                                    {Number((Total + shipping) / 100).toFixed(
                                        2
                                    )}
                                    {/* ${Number(Total / 100).toFixed(2)} */}
                                </span>
                                <span
                                    style={{
                                        marginTop: "32px",
                                        marginBottom: "32px",
                                    }}
                                    id="Products-summary"
                                >
                                    {products.map((_val, i) => {
                                        return (
                                            <div
                                                key={i}
                                                className="product"
                                                style={{
                                                    marginBottom: "16px",
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                            >
                                                <div
                                                    className="product-name"
                                                    style={{
                                                        fontSize: "16px",
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {products[i].name}{" "}
                                                    {!products[i].option ? (
                                                        <></>
                                                    ) : (
                                                        <span className="bold">
                                                            (
                                                            {products[i].option}
                                                            )
                                                        </span>
                                                    )}{" "}
                                                    x{products[i].quantity}
                                                </div>
                                                <div
                                                    className="product-subtotal"
                                                    style={{ fontWeight: 390 }}
                                                >
                                                    $
                                                    {!products[i]
                                                        .option_price ? (
                                                        <span>
                                                            {Number(
                                                                (products[i]
                                                                    .price *
                                                                    products[i]
                                                                        .quantity) /
                                                                    100
                                                            ).toFixed(2)}
                                                        </span>
                                                    ) : (
                                                        <span>
                                                            {Number(
                                                                (products[i]
                                                                    .option_price *
                                                                    products[i]
                                                                        .quantity) /
                                                                    100
                                                            ).toFixed(2)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div
                                        className="subtotal"
                                        style={{
                                            paddingBottom: "16px",
                                            paddingTop: "16px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <span>Subtotal</span>
                                        <span>
                                            ${Number(subtotal / 100).toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="divider"></div>

                                    <div
                                        id="coupon-applied"
                                        style={{
                                            display: "none",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        {shipping === 0 ? (
                                            <></>
                                        ) : (
                                            <>
                                                <span>Coupon Applied</span>
                                                <span
                                                    style={{
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    -
                                                    {Number(
                                                        discountPH / 100
                                                    ).toFixed(2)}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    <div className="row" id="promocode-input">
                                        <div className="col s8">
                                            <div className="input-field">
                                                <input
                                                    id="PromoCode"
                                                    type="text"
                                                    className="validate"
                                                    value={coupon}
                                                    onChange={e => {
                                                        setCoupon(
                                                            e.target.value.toLowerCase()
                                                        );
                                                    }}
                                                />
                                                <label htmlFor="PromoCode">
                                                    Add a promotion code
                                                </label>
                                                <span
                                                    id="coupon-helper"
                                                    className="helper-text"
                                                    data-error=" "
                                                ></span>
                                            </div>
                                        </div>
                                        <div className="col s3">
                                            <button
                                                className="btn"
                                                style={{
                                                    backgroundColor: "#343145",
                                                    marginTop: "25px",
                                                    marginBottom: "15px",
                                                }}
                                                onClick={async () => {
                                                    //validate  coupon
                                                    if (coupon.length !== 0) {
                                                        let type = await validateCoupon(
                                                            {
                                                                variables: {
                                                                    coupon_name: coupon,
                                                                },
                                                            }
                                                        );
                                                        if (
                                                            type.data!
                                                                .validateCoupon ===
                                                            "INVALID"
                                                        ) {
                                                            document
                                                                .getElementById(
                                                                    "PromoCode"
                                                                )!
                                                                .classList.add(
                                                                    "invalid"
                                                                );

                                                            document.getElementById(
                                                                "coupon-helper"
                                                            )!.attributes[
                                                                "data-error"
                                                            ].nodeValue = `The coupon you entered(${coupon}) is not valid`;

                                                            setCoupon("");
                                                        } else if (
                                                            type.data!
                                                                .validateCoupon ===
                                                            "FREE_SHIPPING"
                                                        ) {
                                                            console.log(
                                                                "freesh"
                                                            );
                                                            // Handle Free Shipping here
                                                            setShipping(0);
                                                            document.getElementById(
                                                                "promocode-input"
                                                            )!.style.display =
                                                                "none";
                                                            // replace promo input and submit button with a icon that shows the coupon and discount applied
                                                            document.getElementById(
                                                                "coupon-applied"
                                                            )!.style.display =
                                                                "flex";
                                                        } else {
                                                            // amount to subtract from subtotal = subtotal * percentage
                                                            let percentage =
                                                                "0." +
                                                                type.data!
                                                                    .validateCoupon;

                                                            let discount = Math.round(
                                                                subtotal *
                                                                    Number(
                                                                        percentage
                                                                    )
                                                            );

                                                            let tmp = subtotal;
                                                            tmp -= discount;

                                                            let tax = Math.round(
                                                                tmp * 0.095
                                                            );

                                                            setTotal(tmp + tax);
                                                            setSubtotal(tmp);
                                                            setDiscountPH(
                                                                discount
                                                            );

                                                            // hide promo input and submit button
                                                            document.getElementById(
                                                                "promocode-input"
                                                            )!.style.display =
                                                                "none";
                                                            // replace promo input and submit button with a icon that shows the coupon and discount applied
                                                            document.getElementById(
                                                                "coupon-applied"
                                                            )!.style.display =
                                                                "flex";
                                                        }
                                                    }
                                                }}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>

                                    <span
                                        style={{
                                            marginTop: "8px",
                                            marginBottom: "16px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <span>Sales Tax</span>
                                        <span style={{ fontWeight: "bold" }}>
                                            $
                                            {Number(
                                                Math.round(subtotal * 0.095) /
                                                    100
                                            ).toFixed(2)}
                                        </span>
                                    </span>

                                    <span
                                        style={{
                                            marginTop: "8px",
                                            marginBottom: "16px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <span>Shipping </span>
                                        <span style={{ fontWeight: "bold" }}>
                                            ${Number(shipping / 100).toFixed(2)}
                                        </span>
                                    </span>

                                    <div className="divider"></div>

                                    <span
                                        style={{
                                            marginTop: "16px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <span>Total Due</span>
                                        <span>
                                            $
                                            {Number(
                                                (Total + shipping) / 100
                                            ).toFixed(2)}
                                        </span>
                                    </span>
                                </span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "32px",
                                }}
                            >
                                <div
                                    style={{
                                        width: "85%",
                                        maxWidth: "600px",
                                    }}
                                    ref={paypalRef as any}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col s12 m6" style={{ minHeight: "93vh" }}>
                <div className="container " style={{}}>
                    {/* <div style={{ display: "flex", justifyContent: "center" }}>
                        <h5>Or</h5>
                    </div> */}

                    <h3>Shipping Information </h3>
                    <h6>
                        <strong style={{ color: "#ff0000" }}>*</strong>(US/USD
                        ONLY) Please use Paypal for international orders
                    </h6>
                    <div className="centered">
                        <div
                            style={{
                                width: "100%",
                                marginTop: 8,
                                marginBottom: 8,
                                borderRadius: "15px",
                                borderBottom: " 4px solid rgb(64, 3, 3)",
                            }}
                        ></div>
                    </div>
                    {checkAuth() ? (
                        <></>
                    ) : (
                        <div className="input-field">
                            <input
                                id="email"
                                type="text"
                                value={address.email}
                                onChange={e =>
                                    setAddress({
                                        ...address,
                                        email: e.target.value,
                                    })
                                }
                            />
                            <label htmlFor="email">Email</label>
                            <span
                                className="helper-text"
                                data-error="Please your email"
                            ></span>
                        </div>
                    )}
                    <div className="input-field">
                        <input
                            id="name"
                            value={address.name}
                            type="text"
                            onChange={e =>
                                setAddress({
                                    ...address,
                                    name: e.target.value,
                                })
                            }
                        />
                        <label htmlFor="name">Name</label>
                        <span
                            className="helper-text"
                            data-error="Please your name"
                        ></span>
                    </div>
                    <div className="input-field">
                        <input
                            id="address"
                            value={address.line1}
                            type="text"
                            onChange={e =>
                                setAddress({
                                    ...address,
                                    line1: e.target.value,
                                })
                            }
                        />
                        <label htmlFor="address">Address</label>
                        <span
                            className="helper-text"
                            data-error="Please your address"
                        ></span>
                    </div>
                    <div className="row">
                        <div className="col s6">
                            <div className="input-field">
                                <input
                                    id="city"
                                    value={address.city}
                                    type="text"
                                    onChange={e =>
                                        setAddress({
                                            ...address,
                                            city: e.target.value,
                                        })
                                    }
                                />
                                <label htmlFor="city">City</label>
                                <span
                                    className="helper-text"
                                    data-error="Please your city"
                                ></span>
                            </div>
                        </div>
                        <div className="col s6">
                            <div className="input-field">
                                <input
                                    id="zip"
                                    value={address.zip}
                                    type="text"
                                    onChange={e =>
                                        setAddress({
                                            ...address,
                                            zip: e.target.value,
                                        })
                                    }
                                />
                                <label htmlFor="zip">Zip</label>
                                <span
                                    className="helper-text"
                                    data-error="Please your zip"
                                ></span>
                            </div>
                        </div>
                    </div>
                    <div className="input-field">
                        <input
                            id="state"
                            value={address.state}
                            className="autocomplete"
                            type="text"
                            onChange={e =>
                                setAddress({
                                    ...address,
                                    state: e.target.value,
                                })
                            }
                        />
                        <label htmlFor="state">State</label>
                        <span
                            className="helper-text"
                            data-error="Please Pick a State"
                        ></span>
                    </div>
                    <div className="divider"></div>
                    <p>
                        <label>
                            <input
                                type="checkbox"
                                id="Billing_input"
                                onClick={() => {
                                    setBilling({
                                        refresh: !billing.refresh,
                                        email: "",
                                        name: "",
                                        address: {
                                            city: "",
                                            line1: "",
                                            zip: "",
                                            state: "",
                                            country: "",
                                        },
                                    });
                                }}
                            />
                            <span>Billing is different from shipping</span>
                        </label>
                    </p>
                    {billing.refresh ? (
                        <>
                            <h2
                                style={{
                                    color: "rgba(26,26,26,.9)",
                                    fontWeight: 500,
                                    fontSize: "16px",
                                }}
                            >
                                Billing Information
                            </h2>
                            <div className="input-field">
                                <input
                                    id="billing_email"
                                    type="text"
                                    value={billing.email}
                                    onChange={e =>
                                        setBilling({
                                            ...billing,
                                            email: e.target.value,
                                        })
                                    }
                                />
                                <label htmlFor="billing_email">
                                    Billing Email
                                </label>
                                <span
                                    className="helper-text"
                                    data-error="Please enter a your email"
                                ></span>
                            </div>
                            <div className="input-field">
                                <input
                                    id="billing_name"
                                    value={billing.name}
                                    type="text"
                                    onChange={e =>
                                        setBilling({
                                            ...billing,
                                            name: e.target.value,
                                        })
                                    }
                                />
                                <label htmlFor="billing_name">Name</label>
                                <span
                                    className="helper-text"
                                    data-error="Please enter a your name"
                                ></span>
                            </div>
                            <div className="input-field">
                                <input
                                    id="billing_address"
                                    value={billing.address.line1}
                                    type="text"
                                    onChange={e =>
                                        setBilling({
                                            ...billing,
                                            address: {
                                                ...billing.address,
                                                line1: e.target.value,
                                            },
                                        })
                                    }
                                />
                                <label htmlFor="billing_address">Address</label>
                                <span
                                    className="helper-text"
                                    data-error="Please enter your address"
                                ></span>
                            </div>

                            <div className="row">
                                <div className="col s6">
                                    <div className="input-field">
                                        <input
                                            id="billing_city"
                                            value={billing.address.city}
                                            type="text"
                                            onChange={e =>
                                                setBilling({
                                                    ...billing,
                                                    address: {
                                                        ...billing.address,
                                                        city: e.target.value,
                                                    },
                                                })
                                            }
                                        />
                                        <label htmlFor="billing_city">
                                            City
                                        </label>
                                        <span
                                            className="helper-text"
                                            data-error="Please enter your city"
                                        ></span>
                                    </div>
                                </div>
                                <div className="col s6">
                                    <div className="input-field">
                                        <input
                                            id="billing_zip"
                                            value={billing.address.zip}
                                            type="text"
                                            onChange={e =>
                                                setBilling({
                                                    ...billing,
                                                    address: {
                                                        ...billing.address,
                                                        zip: e.target.value,
                                                    },
                                                })
                                            }
                                        />
                                        <label htmlFor="billing_zip">Zip</label>
                                        <span
                                            className="helper-text"
                                            data-error="Please enter your zip"
                                        ></span>
                                    </div>
                                </div>
                            </div>

                            <div className="input-field">
                                <input
                                    id="billing_state"
                                    value={billing.address.state}
                                    className="autocomplete"
                                    type="text"
                                    onChange={e =>
                                        setBilling({
                                            ...billing,
                                            address: {
                                                ...billing.address,
                                                state: e.target.value,
                                            },
                                        })
                                    }
                                />
                                <label htmlFor="billing_state">State</label>
                                <span
                                    className="helper-text"
                                    data-error="Please enter your state"
                                ></span>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                    <h2
                        style={{
                            color: "rgba(26,26,26,.9)",
                            fontWeight: 500,
                            fontSize: "16px",
                        }}
                    >
                        Payment Details
                    </h2>
                    <CardSection />
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <button
                            className="btn"
                            id="stripe-pay-btn"
                            style={{
                                marginTop: "16px",
                                marginBottom: "64px",
                                width: "380px",
                                backgroundColor: "#343145",
                            }}
                            onClick={() => {
                                validateForm();
                            }}
                        >
                            Pay ${Number((Total + shipping) / 100).toFixed(2)}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
