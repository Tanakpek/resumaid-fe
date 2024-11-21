// import { getApplications } from "@/src/utils/requests";
// import { PaginationState } from "@tanstack/react-table";

import { ApplicationObject, NestedApplicationJob } from "@/src/utils/applicaid-ts-utils/cv_form_types";

export interface tableApplicaiton extends ApplicationObject {
    company_key: NestedApplicationJob
    job_title_key: NestedApplicationJob
}
export const multiplyKeys = (apps:ApplicationObject[]) : tableApplicaiton[] => {
    return apps.map((app) => {
        return {
            ...app,
            job: {
                ...app.job,

            },
            company_key: app.job,
            job_title_key: app.job,
        }
    })
}