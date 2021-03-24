import CopyrightBar from "./CopyrightBar";
import { FaInstagram, FaEnvelope, FaTwitter, FaFacebook } from "react-icons/fa";
import { useGetSocialsQuery } from "../../generated/graphql";
import "../../css/footer.scss";

const Footer = () => {
    const { data } = useGetSocialsQuery({
        variables: {
            component: "footer",
        },
    });

    return (
        <span>
            <footer
                className="noselect"
                style={{
                    backgroundColor: "#0a0a0a",
                    width: "100%",
                    height: "280px",
                }}
            >
                <div className="container">
                    <div
                        className="row"
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <div className="col s12 l6 hide-on-small-only ">
                            <div className="footer-logo">
                                <h1>Cant</h1>
                                <h1>Relate</h1>
                                <h1>.JP</h1>
                            </div>
                        </div>

                        <div className="col s12 l4 ">
                            <ul id="footer-info">
                                <li>
                                    <a
                                        href="#/shipping_policy"
                                        className="white-text"
                                    >
                                        <h4 style={{ fontWeight: 600 }}>
                                            Shipping Policy
                                        </h4>
                                    </a>
                                </li>
                                <li>
                                    <a href="#/contact" className="white-text">
                                        <h4
                                            style={{
                                                marginTop: "0px",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Contact Us
                                        </h4>
                                    </a>
                                </li>
                                <li>
                                    <a href="#/FAQ" className="white-text">
                                        <h4
                                            style={{
                                                marginTop: "0px",
                                                fontWeight: 600,
                                            }}
                                        >
                                            FAQ
                                        </h4>
                                    </a>
                                </li>
                                <li>
                                    {!!data && data.getSocials ? (
                                        <>
                                            {data.getSocials.map((_val, i) => {
                                                if (
                                                    data.getSocials[i].display
                                                ) {
                                                    return (
                                                        <a
                                                            id="social-link"
                                                            key={i}
                                                            href={
                                                                data.getSocials[
                                                                    i
                                                                ].social_url
                                                            }
                                                            style={{
                                                                width: "30px",
                                                                height: "30px",
                                                                marginRight:
                                                                    "7px",
                                                            }}
                                                        >
                                                            <SocialIcon
                                                                social_logo={
                                                                    data
                                                                        .getSocials[
                                                                        i
                                                                    ]
                                                                        .social_logo
                                                                }
                                                            />
                                                        </a>
                                                    );
                                                } else {
                                                    return null;
                                                }
                                            })}
                                        </>
                                    ) : (
                                        <>
                                            <a
                                                id="social-link"
                                                href="https://www.instagram.com/cantrelate.jp/"
                                            >
                                                <FaInstagram
                                                    style={{
                                                        width: "30px",
                                                        height: "30px",
                                                        marginRight: "7px",
                                                    }}
                                                />
                                            </a>
                                            <a
                                                id="social-link"
                                                href="mailto:cantrelatejp@gmail.com"
                                            >
                                                <FaEnvelope
                                                    style={{
                                                        width: "30px",
                                                        height: "30px",
                                                    }}
                                                />
                                            </a>
                                        </>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
            <CopyrightBar />
        </span>
    );
};

export default Footer;

const SocialIcon: React.FC<{ social_logo: string }> = ({ social_logo }) => {
    switch (social_logo) {
        case "I": {
            return (
                <FaInstagram
                    style={{
                        height: 30,
                        width: 30,
                    }}
                />
            );
        }

        case "E": {
            return (
                <FaEnvelope
                    style={{
                        height: 30,
                        width: 30,
                    }}
                />
            );
        }
        case "T": {
            return (
                <FaTwitter
                    style={{
                        height: 30,
                        width: 30,
                    }}
                />
            );
        }
        case "F": {
            return (
                <FaFacebook
                    style={{
                        height: 30,
                        width: 30,
                    }}
                />
            );
        }

        default: {
            return <>ERROR</>;
        }
    }
};
