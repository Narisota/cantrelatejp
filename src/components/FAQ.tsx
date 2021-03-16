import "../css/faq.scss";

const FAQ = () => {
    var eyeColors = [
        "rgb(36, 146, 242)",
        "rgb(154, 24, 213)",
        "#ff0000",
        "#000",
    ];
    let eyeColor = eyeColors[Math.floor(Math.random() * eyeColors.length)];
    return (
        <>
            <div
                className="row"
                style={{ display: "flex", justifyContent: "center" }}
            >
                <h1>FAQ</h1>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="faq-wrapper">
                    <div
                        style={{
                            width: "100%",
                            borderBottom: " 4px solid #ff0000",
                        }}
                    ></div>

                    <h3 style={{ fontWeight: 550 }}>Late Orders</h3>
                    <p className="flow-text" style={{ marginLeft: "32px" }}>
                        - Please be patient as the pandemic has slowed down mail
                        times.
                    </p>
                    <div className="divider"></div>
                    <h3 style={{ fontWeight: 550 }}>Lost or Damaged Items</h3>
                    <p className="flow-text" style={{ marginLeft: "32px" }}>
                        <strong style={{ color: "#ff0000" }}>-</strong> Please{" "}
                        <a href="#/contact"> contact us </a> about any lost or
                        damaged items, and attach your order number.
                    </p>

                    <p className="flow-text" style={{ marginLeft: "32px" }}>
                        -{" "}
                        <strong style={{ fontWeight: 550 }}>
                            CantRelate.JP
                        </strong>{" "}
                        is not responsible for lost or damaged items but will
                        replace when possible.
                    </p>

                    <div className="divider"></div>

                    <h3 style={{ fontWeight: 550 }}>
                        Incorrect Shipping Address
                    </h3>

                    <p className="flow-text" style={{ marginLeft: "32px" }}>
                        - Please double-check your orders before you place them.
                    </p>

                    <p className="flow-text" style={{ marginLeft: "32px" }}>
                        <strong style={{ color: "#ff0000" }}>-</strong> If wrong
                        address is inputted,{" "}
                        <strong style={{ fontWeight: 550 }}>
                            please
                            <a href="#/contact"> contact us</a> as soon as
                            possible
                        </strong>
                        . We will do our best to update your order.
                    </p>

                    <p className="flow-text" style={{ marginLeft: "32px" }}>
                        - However{" "}
                        <strong style={{ fontWeight: 550 }}>
                            CantRelate.JP
                        </strong>{" "}
                        is not responsible for the user's error, and we will not
                        replace the order if it has been shipped.
                    </p>

                    <div className="divider"></div>

                    <h3 style={{ fontWeight: 550 }}>
                        Thank you for checking out Can't Relate.JP!
                    </h3>

                    <p
                        className="flow-text"
                        style={{
                            fontWeight: 525,
                            marginLeft: "32px",
                        }}
                    >
                        <strong style={{ color: "#ff0000" }}>-</strong> Happy
                        Shopping! ٩(
                        <strong style={{ color: eyeColor }}>◕</strong>‿
                        <strong style={{ color: eyeColor }}>◕</strong>
                        ｡)۶
                    </p>
                </div>
            </div>
        </>
    );
};

export default FAQ;
