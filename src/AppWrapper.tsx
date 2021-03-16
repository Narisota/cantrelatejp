import { useEffect, useState } from "react";
import { setAccessToken, setMainAccessToken } from "./accessToken";
import App from "./App";
import { checkMainAuth } from "./CheckAuth";
import Preloader from "./components/Preloader";
import { useMaintenanceLoginMutation } from "./generated/graphql";
import { GetMaintenance } from "./GetMaintenance";
import URI from "./URI";

const AppWrapper = () => {
    const [maintLogin] = useMaintenanceLoginMutation();
    const maintance = GetMaintenance();
    const [pageLoader, setPageLoader] = useState(true);

    // eslint-disable-next-line
    const [mainLoader, setMainLoader] = useState(false);
    useEffect(() => {
        //get new accessToken & refreshToken with fetch to URI/refresh_token
        try {
            let tmp = localStorage.getItem("iru5") as string;
            fetch(`${URI}/refresh_token`, {
                method: "POST",
                credentials: "include",
                headers: {
                    refreshToken: tmp,
                },
            }).then(async res => {
                const { accessToken, refreshToken } = await res.json();
                setAccessToken(accessToken);
                localStorage.setItem("iru5", refreshToken);
                setPageLoader(false);
            });
        } catch {
            setPageLoader(false);
        }

        try {
            // let tmp = localStorage.getItem("main_qwf") as string;
            // fetch(`${URI}/maintenance_login`, {
            //     method: "POST",
            //     credentials: "include",
            //     headers: {
            //         refreshToken: tmp,
            //     },
            // }).then(async res => {
            //     const { accessToken, refreshToken } = await res.json();
            //     setMainAccessToken(accessToken);
            //     localStorage.setItem("main_qwf", refreshToken);
            //     setMainLoader(false);
            // });
        } catch {}
    }, [setPageLoader]);

    if (pageLoader || !maintance) {
        return <Preloader />;
    } else if (maintance.getMaintenance) {
        return (
            <>
                {checkMainAuth() ? (
                    <App />
                ) : (
                    <div style={{ position: "absolute", left: "50%" }}>
                        <div
                            style={{
                                position: "relative",
                                left: "-50%",
                            }}
                        >
                            <span
                                onClick={async () => {
                                    let acc = localStorage.getItem(
                                        "access_id"
                                    ) as string;
                                    let pass = localStorage.getItem(
                                        "password"
                                    ) as string;
                                    try {
                                        const res = await maintLogin({
                                            variables: {
                                                access_id: acc,
                                                password: pass,
                                            },
                                        });

                                        if (res && res.data) {
                                            let tmp = res.data.maintenanceLogin
                                                .accessToken as any;
                                            setMainAccessToken(tmp!);
                                            localStorage.setItem(
                                                "main_qwf",
                                                res.data.maintenanceLogin
                                                    .refreshToken!
                                            );
                                            setMainLoader(true);

                                            window.location.reload();
                                        }
                                    } catch {}
                                }}
                            >
                                App is in maintenance mode. Please come back
                                later
                            </span>
                        </div>
                    </div>
                )}
            </>
        );
    } else {
        return <App />;
    }
};

export default AppWrapper;
