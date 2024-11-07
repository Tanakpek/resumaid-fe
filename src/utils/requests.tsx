import axios, { AxiosResponse } from 'axios';
import { BACKEND_URL } from './config';
import { AchivevementFormValues, CertFormValues, EducationFormValues, LanguageFormValues, ProfileFormValues, ProjectFormValues, SkillFormValues, VolunteerFormValues, WorkFormValues } from './applicaid-ts-utils/cv_form_types';
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

export const getCV = async () => {
    return await axiosInstance.get('/users/cv');
}

export const cvURL = async () => {
    return await axiosInstance.post('/users/cv_url');
}

export const startScratchCV = async () => {
    return await axiosInstance.post('/users/cv_scratch');
}
export const getProfile = async (revalidate: string) => {
    return await axiosInstance.get('/users/profile' , {
        params: revalidate ? {
            stripe_session_id: revalidate
        } : {}
    });
}

export const postDetails = async (data: ProfileFormValues) => {
    return await axiosInstance.post('/users/details', data);
}

export const postEducation = async (data: EducationFormValues) => {
    return await axiosInstance.post('/users/cv/education', data);
}

export const deleteEducation = async (id: string) => {
    return await axiosInstance.delete(`/users/cv/education/${id}`);
}

export const postWork = async (data: WorkFormValues) => {
    return await axiosInstance.post('/users/cv/work', data);
}

export const deleteWork = async (id: string) => {
    return await axiosInstance.delete(`/users/cv/work/${id}`);
}

export const postProjects = async (data: ProjectFormValues) => {
    return await axiosInstance.post('/users/cv/projects', data);
}

export const deleteProject = async (id: string) => {
    return await axiosInstance.delete(`/users/cv/projects/${id}`);
}

export const postSkills = async (data: SkillFormValues) => {
    return await axiosInstance.post('/users/cv/skills', data);
}

export const postCertifications = async (data: CertFormValues) => {
    return await axiosInstance.post('/users/cv/certifications', data);
}

export const postAchievements = async (data: AchivevementFormValues) => {
    return await axiosInstance.post('/users/cv/achievements', data);
}

export const postLanguages = async (data: LanguageFormValues) => {
    return await axiosInstance.post('/users/cv/languages', data);
}

export const postVolunteer = async (data: VolunteerFormValues) => {
    return await axiosInstance.post('/users/cv/volunteer', data);
}

export const deleteVolunteer = async (id: string)  : Promise<AxiosResponse>=> {
    return await axiosInstance.delete(`/users/cv/volunteer/${id}`);
}

export const createCheckoutSession = async (priceId: string) => {
    return await axiosInstance.post('/billing/create-checkout-session', {priceId});
}

export const getBillingConfig = async () => {
    return await axiosInstance.get('/billing/config');
}

export const getSubscriptionPrices = async () => {
    return await axiosInstance.get('/billing/subscription-prices');
}

export const getBillingId = async () => {
    return await axiosInstance.get('/billing/id');
}
