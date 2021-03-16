import { useGoogleLogin } from "react-google-login";
import { setAccessToken } from "../../accessToken";
import { checkAuth } from "../../CheckAuth";
import { useLoginMutation } from "../../generated/graphql";
import "../../css/navbar.scss";
import { useEffect } from "react";
import M from "materialize-css";
import AnnouncementBar from "./AnnouncementBar";
import Logo from "./Logo";

const Navbar = () => {
    useEffect(() => {
        var elems = document.querySelectorAll(".sidenav");
        M.Sidenav.init(elems);
    });
    const [login] = useLoginMutation();

    const handler = async res => {
        let response = await login({
            variables: {
                user_id: res.googleId,
                email: res.profileObj.email,
            },
        });

        setAccessToken(response.data?.login.accessToken!);
        localStorage.setItem("iru5", response.data?.login.refreshToken!);
        window.location.reload();
    };

    const { signIn } = useGoogleLogin({
        clientId:
            "767129492168-gloagc4m640fgeegm6if58heehkpup7d.apps.googleusercontent.com",
        onSuccess: handler,
    });

    const logout = () => {
        localStorage.setItem("iru5", "");
        setAccessToken("");
        window.location.reload();
    };

    return (
        <>
            <header style={{ position: "sticky", top: 0, zIndex: 997 }}>
                <AnnouncementBar />
                <div
                    style={{ zIndex: 4, position: "relative" }}
                    className="noselect"
                >
                    <nav style={{ backgroundColor: "#0a0a0a" }}>
                        <div className="nav-wrapper">
                            <Logo />

                            <a
                                href="#/"
                                data-target="mobile-demo"
                                className="sidenav-trigger left"
                            >
                                <i className="material-icons noselect">menu</i>
                            </a>

                            <ul
                                id="nav"
                                className="center"
                                style={{
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    position: "absolute",
                                }}
                            >
                                {/* <li>
                                    <a href="#/home">HOME</a>
                                </li> */}
                                <li>
                                    <a href="#/products">PRODUCTS</a>
                                </li>

                                <li>
                                    {checkAuth() ? (
                                        <a href="#/my-orders">MY ORDERS</a>
                                    ) : (
                                        // eslint-disable-next-line
                                        <a
                                            onClick={async () => {
                                                await signIn();
                                            }}
                                        >
                                            MY ORDERS
                                        </a>
                                    )}
                                </li>

                                <li>
                                    <a href="#/my-cart">CART</a>
                                </li>
                            </ul>
                            {checkAuth() ? (
                                <i
                                    id="desktop-logout"
                                    className="material-icons right noselect"
                                    style={{ marginRight: "15%" }}
                                    onClick={() => logout()}
                                >
                                    exit_to_app
                                </i>
                            ) : (
                                <></>
                            )}
                            <a
                                href="#/my-cart"
                                className="right white-text"
                                style={{ color: "#000", marginRight: "18px" }}
                            >
                                <i className="material-icons" id="mobile-cart">
                                    shopping_cart
                                </i>
                            </a>
                        </div>
                    </nav>
                </div>
            </header>
            <ul
                className="sidenav"
                id="mobile-demo"
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.95)",
                    paddingTop: "42px",
                }}
            >
                <li>
                    <a
                        style={{ color: "#fff", textAlign: "center" }}
                        href="#/products"
                    >
                        Products
                    </a>
                </li>
                <li>
                    {checkAuth() ? (
                        <a
                            style={{ color: "#fff", textAlign: "center" }}
                            href="#/my-orders"
                        >
                            My Orders
                        </a>
                    ) : (
                        // eslint-disable-next-line
                        <a
                            style={{ color: "#fff", textAlign: "center" }}
                            onClick={() => {
                                signIn();
                            }}
                        >
                            My Orders
                        </a>
                    )}
                </li>

                <li>
                    {checkAuth() ? (
                        <a
                            href="#/"
                            style={{ color: "#fff", textAlign: "center" }}
                            onClick={() => logout()}
                        >
                            Logout
                        </a>
                    ) : (
                        <></>
                    )}
                </li>
            </ul>
        </>
    );
};

export default Navbar;
