import "../css/Preloader.scss";
import anime from "animejs/lib/anime.es.js";
import { useGetMaintenanceQuery } from "../generated/graphql";

// const animation2 = () => {
//     anime.timeline({ easing: "easeInOutSine", duration: 500 }).add({});
// };

const reloadAnimation = () => {
    anime({
        targets: [".reload-text"],
        opacity: [0, 0.75],
        easing: "easeInQuint",
        duration: 1000,
        delay: (_el, i) => 15 * (i + 1),
    });
};

const Preloader = () => {
    const { data, loading } = useGetMaintenanceQuery();

    setTimeout(() => {
        reloadAnimation();
    }, 5000);

    anime
        .timeline({
            easing: "easeInOutSine",
            duration: 500,
            elasticity: 400,
            loop: true,
        })
        .add({
            targets: [".circle-1", ".circle-3"],
            translateY: -24,
        })
        .add(
            {
                targets: [".circle-2", ".circle-4"],
                translateY: 24,
            },
            0
        )
        .add({
            targets: [".circle-1", ".circle-3"],
            translateX: 40,
        })
        .add(
            {
                targets: [".circle-2", ".circle-4"],
                translateX: -40,
            },
            "-= 500"
        )
        .add({
            targets: [".circle-1", ".circle-3"],
            translateY: 0,
        })
        .add(
            {
                targets: [".circle-2", ".circle-4"],
                translateY: 0,
            },
            "-= 500"
        )

        .add({
            targets: [".circle-2", ".circle-4"],
            translateY: -24,
        })
        .add(
            {
                targets: [".circle-1", ".circle-3"],
                translateY: 24,
            },
            "-= 500"
        )
        .add({
            targets: [".circle-2", ".circle-4"],
            translateX: 0,
        })
        .add(
            {
                targets: [".circle-1", ".circle-3"],
                translateX: 0,
            },
            "-= 500"
        )
        .add({
            targets: [".circle-2", ".circle-4"],
            translateY: 0,
        })
        .add(
            {
                targets: [".circle-1", ".circle-3"],
                translateY: 0,
            },
            "-= 500"
        );

    return (
        <div className="loadingWrapper">
            <div className="absolute-center">
                <div className="loader">
                    <div className="circle circle-1"></div>
                    <div className="circle circle-2"></div>
                    <div className="circle circle-3"></div>
                    <div className="circle circle-4"></div>
                </div>
            </div>
            <div className="reload-warning">
                <h4
                    className="reload-text"
                    onClick={() => window.location.reload()}
                >
                    {!data || !data.getMaintenance || loading ? (
                        <>Loading, please wait...</>
                    ) : (
                        <>App is in maintenance mode, please come back later.</>
                    )}
                </h4>
            </div>
        </div>
    );
};

export default Preloader;
