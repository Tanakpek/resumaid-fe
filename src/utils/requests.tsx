import axios, { AxiosResponse } from 'axios';
import { BACKEND_URL } from './config';
import { AchivevementFormValues, Application, ApplicationObject, CertFormValues, EducationFormValues, LanguageFormValues, NestedApplicationRun, ProfileFormValues, ProjectFormValues, SkillFormValues, VolunteerFormValues, WorkFormValues } from './applicaid-ts-utils/cv_form_types';
import { TransformedCV } from './codes';

const axiosInstance = axios.create({
    baseURL: BACKEND_URL,

});

axiosInstance.interceptors.request.use(
    config => {
        // Get the token from the cookie
        const token = document.cookie.split(';').reduce((acc, cookie) => {
            const [key, value] = cookie.split('=');
            if (key.trim() === 'token') {
                return value;
            }
            return acc;
        });
        config.withCredentials = true;
        // If the token exists, add it to the Authorization header
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    response => {
        // If the response is successful, just return the response
        return response;
    },
    error => {
        // If the response has an error status code
        if (error.response && error.response.status === 401) {
            // Redirect to the login page
            window.location.href = '/auth';
        }
        // Return any error which is not due to authentication
        return Promise.reject(error);
    }
);
/**
 * 
 * @returns {Promise<AxiosResponse>}
 */
export const getCV = async () => {
    return await axiosInstance.get('/users/cv');
}
/**
 * 
 * @returns {Promise<AxiosRespons<string>>}
 */
export const cvURL = async () => {
    return await axiosInstance.post('/users/cv_url');
}
/**
 * 
 * @returns {Promise<AxiosResponse>}
 */
export const startScratchCV = async () => {
    return await axiosInstance.post('/users/cv_scratch');
}
/**
 * 
 * @param {string}  revalidate
 * @returns {Promise<AxiosResponse>}
 */
export const getProfile = async (revalidate: string) => {
    return await axiosInstance.get('/users/profile' , {
        params: revalidate ? {
            stripe_session_id: revalidate
        } : {}
    });
}
/**
 * 
 * @param {ProfileFormValues}  data 
 * @returns {Promise<AxiosResponse>}
 */
export const postDetails = async (data: ProfileFormValues) => {
    return await axiosInstance.post('/users/details', data);
}
/**
 * 
 * @param {EducationFormValues}  data 
 * @returns {Promise<AxiosResponse>}
 */
export const postEducation = async (data: EducationFormValues) => {
    return await axiosInstance.post('/users/cv/education', data);
}
/**
 * 
 * @param {string}  id 
 * @returns {Promise<AxiosResponse>}
 */
export const deleteEducation = async (id: string) => {
    return await axiosInstance.delete(`/users/cv/education/${id}`);
}
/**
 * 
 * @param {WorkFormValues}  data 
 * @returns {Promise<AxiosResponse>}
 */
export const postWork = async (data: WorkFormValues) => {
    return await axiosInstance.post('/users/cv/work', data);
}
/**
 * 
 * @param {stirng}  id 
 * @returns {Promise<AxiosResponse>}
 */
export const deleteWork = async (id: string) => {
    return await axiosInstance.delete(`/users/cv/work/${id}`);
}
/**
 * 
 * @param {ProjectFormValues}  data 
 * @returns {Promise<AxiosResponse>}
 */
export const postProjects = async (data: ProjectFormValues) => {
    return await axiosInstance.post('/users/cv/projects', data);
}
/**
 * 
 * @param {string}  id
 * @returns {Promise<AxiosResponse>}
 */
export const deleteProject = async (id: string) => {
    return await axiosInstance.delete(`/users/cv/projects/${id}`);
}
/**
 * 
 * @param {SkillFormValues}  data 
 * @returns {Promise<AxiosResponse>}
 */
export const postSkills = async (data: SkillFormValues) => {
    return await axiosInstance.post('/users/cv/skills', data);
}
/**
 * 
 * @param {CertFormValues}  data 
 * @returns {Promise<AxiosResponse>}
 */
export const postCertifications = async (data: CertFormValues) => {
    return await axiosInstance.post('/users/cv/certifications', data);
}

/**
 * 
 * @param {AchivevementFormValues}  data 
 * @returns {Promise<AxiosResponse>}
 */

export const postAchievements = async (data: AchivevementFormValues) => {
    return await axiosInstance.post('/users/cv/achievements', data);
}
/**
 * 
 * @param {LanguageFormValues}  data 
 * @returns {Promise<AxiosResponse>}
 */
export const postLanguages = async (data: LanguageFormValues) => {
    return await axiosInstance.post('/users/cv/languages', data);
}
/**
 * 
 * @param {VolunteerFormValues} data 
 * @returns {Promise<AxiosResponse>}
 */
export const postVolunteer = async (data: VolunteerFormValues) => {
    return await axiosInstance.post('/users/cv/volunteer', data);
}
/**
 * 
 * @param {string} id 
 * @returns {Promise<AxiosResponse>}
 */
export const deleteVolunteer = async (id: string)  : Promise<AxiosResponse>=> {
    return await axiosInstance.delete(`/users/cv/volunteer/${id}`);
}
/**
    * 
    * @param {string} priceId 
    * @returns {Promise<AxiosResponse>}
    */
export const createCheckoutSession = async (priceId: string) => {
    return await axiosInstance.post('/billing/create-checkout-session', {priceId});
}
/**
 * 
 * @returns {Promise<AxiosResponse>}
 */
export const getBillingConfig = async () => {
    return await axiosInstance.get('/billing/config');
}
/**
* 
* @returns {Promise<AxiosResponse>}
*/
export const getSubscriptionPrices = async () => {
    return await axiosInstance.get('/billing/subscription-prices');
}
/**
 * 
 * @returns {Promise<AxiosResponse>}
 */
export const getBillingId = async () => {
    return await axiosInstance.get('/billing/id');
}
/** 
    * @param {string} ts - timestamp
    * @param {{company?: string, job_board?: string, job_title?:string, order?: 'asc' | 'desc'}} filters - filters
    * @returns {Promise<AxiosResponse<Application[]>>}
*/
export const getApplications = async (filters: { company?: string, job_board?: string, job_title?: string, order?: 'asc' | 'desc' }, ts: string = new Date().toISOString()) => {
    const params = { ts, ...filters };
    return await axiosInstance.get('/applications', {
        params: params
    }) as AxiosResponse<ApplicationObject[]>;
}
/**
 * 
 * @param {string} id
 * @param {string} status
 * @returns {Promise<AxiosResponse>}
 *  */
export const putApplicationStatus = async (id: string, status: string) => {
    return await axiosInstance.put(`/applications/${id}`, { status });
}

/**
 * 
 * @param {string} id
 * @returns {Promise<AxiosResponse>}
 * */
export const deleteApplication = async (id: string) => {
    return await axiosInstance.delete(`/applications/${id}`);
}
/**
 *  @param {string} id
 *  @param {string} ts
 * @returns {Promise<AxiosResponse<NestedApplicationRun[]>>}
 */
export const getRuns = async (id: string, ts: string) : Promise<AxiosResponse<{ts: string, runs: NestedApplicationRun[]}>> => {
    return await axiosInstance.get(`/applications/${id}/runs`, {
        params: { ts }
    });
}


export const getWordDocument = async (appId: string, runId) => {
    return await axiosInstance.post(`/applications/${appId}/runs/${runId}/word`, {},{
        headers: {
             'Content-Type': 'application/json;charset=UTF-8' ,
        }
    });
}