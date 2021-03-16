import { Redirect } from "react-router";
import {
    useGetSectionsProductsQuery,
    useGetSectionByIdQuery,
} from "../../generated/graphql";

const GetSection = section_id => {
    const { data, loading } = useGetSectionByIdQuery({
        variables: {
            section_id,
        },
    });

    let sdata = data,
        sloading = loading;
    return { sdata, sloading };
};

const ViewSection = () => {
    let section_id = 0;

    if (process.env.NODE_ENV === "production") {
        section_id = Number(window.location.href.split(":")[2]);
    } else {
        section_id = Number(window.location.href.split(":")[3]);
    }

    const { sdata, sloading } = GetSection(section_id);
    const { data, loading, error } = useGetSectionsProductsQuery({
        variables: {
            section_id,
        },
    });

    if (loading || sloading) {
        return <></>;
    }

    if (error || !data || !sdata) {
        return <Redirect to="/products" />;
    }

    return (
        <div className="container">
            <h1
                className="center-align"
                style={{
                    marginTop: "60px",
                    marginBottom: "60px",
                    fontWeight: 600,
                }}
            >
                {sdata.getSectionById.name}
            </h1>

            <div className="products-grid">
                {data.getSectionsProducts.map((_val, i) => {
                    let product = data.getSectionsProducts[i];
                    return (
                        <>
                            <div
                                className="card z-depth-0"
                                style={{
                                    margin: "0px 8px 32px 8px",
                                }}
                                key={i}
                            >
                                <a
                                    className="black-text"
                                    href={`#/product-details:${product.product_id}`}
                                >
                                    <div className="container">
                                        <div className="card-image">
                                            <img
                                                src={product.images![0].img_url}
                                                alt={product.name}
                                            />
                                        </div>
                                    </div>

                                    <div className="card-content">
                                        <span className="card-title">
                                            <h5 className="center-align">
                                                {product.name}
                                            </h5>
                                        </span>
                                        <span
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <p
                                                className="product-price"
                                                style={{ fontSize: "16px" }}
                                            >
                                                $
                                                {Number(
                                                    product.price / 100
                                                ).toFixed(2)}
                                            </p>
                                        </span>
                                    </div>
                                </a>
                            </div>
                        </>
                    );
                })}
            </div>
        </div>
    );
};

export default ViewSection;
