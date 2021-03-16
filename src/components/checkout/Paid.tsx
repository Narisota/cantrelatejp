const Paid = () => {
    return (
        <div style={{ minHeight: "80vh" }}>
            <div className="centered">
                <h3>Success</h3>
            </div>

            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        width: "50%",
                        borderBottom: " 4px solid #ff0000",
                    }}
                ></div>
            </div>

            <div className="centered">
                <div className="faq-wrapper">
                    <blockquote
                        style={{
                            borderLeft: "5px solid black",
                            marginTop: "64px",
                        }}
                    >
                        <h3 style={{ fontWeight: 550 }}>
                            We Received your order.
                        </h3>

                        <p className="flow-text" style={{ marginLeft: "32px" }}>
                            <strong style={{ color: "#ff0000" }}>-</strong>{" "}
                            Please check your Paypal, Email, or the My-Orders
                            page for updates.
                        </p>
                    </blockquote>

                    <blockquote
                        style={{
                            borderLeft: "5px solid #ff0000",
                            marginTop: "64px",
                        }}
                    >
                        <h3 style={{ fontWeight: 550 }} className="noselect">
                            Thank you for shopping with Us! ٩(
                            <span style={{ color: "pink" }}>♡</span>ε
                            <span style={{ color: "pink" }}>♡</span>
                            )۶
                        </h3>
                    </blockquote>
                </div>
            </div>
        </div>
    );
};

export default Paid;
