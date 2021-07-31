import React from "react";

const HeaderBreadcrumbContext = React.createContext({
    headerBreadcrumb: null,
    setHeaderBreadcrumb: (_: string) => {}
});
export default HeaderBreadcrumbContext;