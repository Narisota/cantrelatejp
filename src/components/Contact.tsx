// import { useState } from "react";
// import URI from "../URI";
import "../css/contact.scss";
import { FaInstagram, FaEnvelope } from "react-icons/fa";
// import { useGetCurrUserQuery } from "../generated/graphql";
// import axios from "axios";

const Contact = () => {
    // const { data } = useGetCurrUserQuery();
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [message, setMessage] = useState("");
    // const [orderNum, setOrderNum] = useState("");

    // const submitForm = () => {
    //     let tmp_email;
    //     if (!!data) {
    //         tmp_email = data!.getCurrUser.email;
    //     } else {
    //         tmp_email = email;
    //     }

    //     axios({
    //         method: "POST",
    //         url: `${URI}/api/contact`,
    //         data: {
    //             name,
    //             email: tmp_email,
    //             message,
    //             orderNum,
    //         },
    //     }).then((res: any) => {
    //         if (res.data === "SUCCess") {
    //             M.toast({ html: "SUCCessfully sent message." });
    //             setName("");
    //             setEmail("");
    //             setMessage("");
    //             setOrderNum("");
    //         } else {
    //             //handle failure
    //             M.toast({ html: "Failed to send message." });
    //             M.toast({ html: "Please Contact Us via Instagram or Email" });
    //         }
    //     });

    //     // fetch(`${URI}/api/contact`, {
    //     //     method: "POST",
    //     //     body: JSON.stringify({
    //     //         name,
    //     //         email: tmp_email,
    //     //         message,
    //     //         orderNum,
    //     //     }),
    //     // }).
    // };

    return (
        <div id="contact-form" className="container">
            <div
                className="row"
                style={{ display: "flex", justifyContent: "center" }}
            >
                <h1>Contact Us</h1>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "10px",
                }}
            >
                <span>
                    <a
                        href="mailto:cantrelatejp@gmail.com"
                        style={{ width: "300px" }}
                    >
                        <h6 className="bold">
                            <FaEnvelope
                                style={{ marginRight: "5px", fontSize: "20px" }}
                                className="left black-text"
                            />
                            Cantrelatejp@gmail.com
                        </h6>
                    </a>
                </span>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "10px",
                }}
            >
                <span>
                    <a href="https://www.instagram.com/cantrelate.jp/">
                        <h6 className="bold">
                            <FaInstagram
                                style={{ marginRight: "5px", fontSize: "20px" }}
                                className="left black-text"
                            />
                            @CantRelate.jp
                        </h6>
                    </a>
                </span>
            </div>

            {/* <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="w-30">
                    <div style={{ display: "flex" }}>
                        <label htmlFor="orderNum">Order Number</label>
                    </div>
                    <input
                        id="orderNum"
                        type="text"
                        className="validate browser-default"
                        value={orderNum}
                        onChange={e => setOrderNum(e.target.value)}
                    />
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="w-30">
                    <div style={{ display: "flex" }}>
                        <label htmlFor="message">Message</label>
                    </div>
                    <textarea
                        id="message"
                        className="validate browser-default"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    />
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="w-30">
                    <div style={{ display: "flex" }}>
                        <label htmlFor="name">Your Name</label>
                    </div>
                    <input
                        id="name"
                        type="text"
                        className="validate browser-default"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
            </div>

            {checkAuth() ? (
                <></>
            ) : (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="w-30">
                        <div style={{ display: "flex" }}>
                            <label className=" browser-default" htmlFor="email">
                                Your Email
                            </label>
                        </div>
                        <input
                            id="email"
                            type="text"
                            className="validate browser-default"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                </div>
            )}
            <div
                className="row"
                style={{ display: "flex", justifyContent: "center" }}
            >
                <button
                    className="btn black"
                    style={{ width: "25%", marginTop: "30px" }}
                    onClick={() => submitForm()}
                >
                    Submit
                </button>
            </div> */}
        </div>
    );
};

export default Contact;
