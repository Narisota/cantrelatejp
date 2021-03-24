import { useEffect, useState } from "react";
import { setAccessToken } from "./accessToken";
import App from "./App";
import Preloader from "./components/Preloader";
import { GetMaintenance } from "./GetMaintenance";
import URI from "./URI";

const AppWrapper = () => {
    const maintance = GetMaintenance();
    const [pageLoader, setPageLoader] = useState(true);

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

    if (pageLoader || !maintance || maintance.getMaintenance) {
        return <Preloader />;
    } else {
        return <App />;
    }
};

export default AppWrapper;
