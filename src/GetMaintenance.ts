import { useGetMaintenanceQuery } from "./generated/graphql";

export const GetMaintenance = () => {
    const { data, loading } = useGetMaintenanceQuery();

    if (!loading && !!data) {
        let maintenance = data;
        return maintenance;
    }
};
