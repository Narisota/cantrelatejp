import "../css/spolicy.scss";

const ShippingPolicy = () => {
    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <h3
                    style={{
                        fontWeight: 550,
                    }}
                >
                    Shipping Policy
                </h3>
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
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="divider"></div>

                <div className="spolicy-wrapper">
                    <blockquote style={{ borderLeft: "5px solid black" }}>
                        <h3 style={{ fontWeight: 550 }}>Preorders</h3>
                        <p className="flow-text" style={{ marginLeft: "32px" }}>
                            - Please allow 2-3 weeks for orders to be processed
                            after pre-orders close.
                        </p>
                    </blockquote>
                    <div className="divider"></div>
                    <blockquote style={{ borderLeft: "5px solid black" }}>
                        <h3 style={{ fontWeight: 550 }}>
                            Apparel or other specialty items
                        </h3>
                        <p className="flow-text" style={{ marginLeft: "32px" }}>
                            - Please allow for 3-4 weeks as they are specialty
                            items
                        </p>
                    </blockquote>
                    <div className="divider"></div>
                    <blockquote style={{ borderLeft: "5px solid #ff0000" }}>
                        <h3 style={{ fontWeight: 550 }}>
                            Lost or damaged items
                        </h3>
                        <p className="flow-text" style={{ marginLeft: "32px" }}>
                            - Please contact via instagram or email.
                        </p>
                    </blockquote>
                </div>
            </div>
        </>
    );
};

export default ShippingPolicy;
