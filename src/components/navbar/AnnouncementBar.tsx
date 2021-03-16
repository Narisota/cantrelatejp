import { FaInstagram, FaEnvelope } from "react-icons/fa";
import { useGetAnnouncementsQuery } from "../../generated/graphql";
import anime from "animejs";
import { useEffect } from "react";

// const pickIntro = () => {
//     const animations = [
//         {
//             targets: ".announcement-1 .letter",
//             translateX: [40, 0],
//             translateZ: 0,
//             opacity: [0, 1],
//             easing: "easeOutExpo",
//             duration: 1200,
//             delay: (el, i) => 500 + 30 * i,
//         },
//     ]; //define animations here
//     let index = Math.floor(Math.random() * animations.length - 1 + 1);
//     return animations[index];
// };

// const pickOutro = () => {
//     const animations = [
//         {
//             targets: ".announcement-1 .letter",
//             translateY: [0, -100],
//             opacity: [1, 0],
//             easing: "easeInExpo",
//             duration: 1200,
//             delay: (el, i) => 100 + 30 * i,
//         },
//     ]; //define animations here
//     let index = Math.floor(Math.random() * animations.length - 1 + 1);
//     return animations[index];
// };

const AnnouncementBar = () => {
    const { data, loading, error } = useGetAnnouncementsQuery();

    useEffect(() => {
        // let timelines = [] as any[];

        if (!!data && !!document.getElementById(`announcement-0`)) {
            for (let i = 0; i < data.getAnnouncements.length; i++) {
                var textWrapper = document.getElementById(`announcement-${i}`);
                textWrapper!.innerHTML = textWrapper!.textContent!.replace(
                    /\S/g,
                    "<span class='letter'>$&</span>"
                );
            }

            let tl = 0;
            anime
                .timeline({
                    loop: true,
                    loopBegin: () => {
                        if (!document.getElementById(`announcement-${tl}`)) {
                            tl = 0;
                        }
                        if (document.getElementById(`announcement-${tl}`)) {
                            document.getElementById(
                                `announcement-${tl}`
                            )!.style.display = "block";
                        }
                    },
                    loopComplete: () => {
                        if (document.getElementById(`announcement-${tl}`)) {
                            document.getElementById(
                                `announcement-${tl}`
                            )!.style.display = "none";
                            tl++;
                        }
                    },
                })
                .add({
                    targets: `.announcement .letter`,
                    translateY: [100, 0],
                    translateZ: 0,
                    opacity: [0, 1],
                    easing: "easeOutExpo",
                    duration: 1400,
                    delay: (el, i) => 300 + 30 * i,
                })
                .add(
                    {
                        targets: `.announcement .letter`,
                        translateX: [0, -30],
                        opacity: [1, 0],
                        easing: "easeOutQuart",
                        duration: 1000,
                        delay: (el, i) => 100 + 30 * i,
                    },
                    "+=25000"
                );
        }
    }, [data]);

    if (loading) {
        return <></>;
    }

    if (error || !data || data.getAnnouncements.length === 0) {
        return <></>;
    }

    return (
        <div
            style={{
                width: "100%",
                backgroundColor: "rgb(13, 3, 3)",
                color: "#fff",
                zIndex: 3,
                position: "relative",
            }}
        >
            <div
                className="container"
                style={{ display: "flex", justifyContent: "space-between" }}
            >
                <span
                    className="right  noselect"
                    style={{ color: "rgb(13, 3, 3)" }}
                >
                    <FaEnvelope />
                    <FaInstagram />
                </span>

                <>
                    {data?.getAnnouncements.length === 0 ? (
                        <>Follow us on our socials</>
                    ) : (
                        <span id="announcement">
                            {data?.getAnnouncements.map((_val, i) => {
                                return (
                                    <span
                                        key={i}
                                        id={`announcement-${i}`}
                                        className="announcement "
                                    >
                                        {data.getAnnouncements[i].text}
                                    </span>
                                );
                            })}
                        </span>
                    )}
                </>

                <span className="right">
                    <a
                        href="mailto:cantrelatejp@gmail.com"
                        style={{ color: "#fff" }}
                    >
                        <FaEnvelope
                            style={{ marginRight: "5px", marginLeft: "5px" }}
                        />
                    </a>

                    <a
                        href="https://www.instagram.com/cantrelate.jp/"
                        style={{ color: "#fff" }}
                    >
                        <FaInstagram />
                    </a>
                </span>
            </div>
        </div>
    );
};

export default AnnouncementBar;
