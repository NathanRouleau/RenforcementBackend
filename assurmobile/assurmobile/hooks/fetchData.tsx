import { storage } from '@/utils/storage';
import { router } from "expo-router";

type Headers = {
    Accept: string,
    'Content-Type': string,
    Authorization?: string,
    "ngrok-skip-browser-warning": string,
}

const BASE_URL = 'https://spectrum-eagle-underarm.ngrok-free.dev';

export default async function fetchData(path: string, method: string, body?: Object, useToken?: Boolean) {
    const token = await storage.getItem('token');
    const headers: Headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "ngrok-skip-browser-warning": "true",
    }
    if(token != undefined) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return fetch(BASE_URL + path, {
        headers,
        method,
        ...(body && method !== 'GET' 
            ? { body: JSON.stringify(body) } 
            : {})
    })
    .then(async response => {
        if(response.status === 401 || response.status === 403) {
            console.log('Error, access denied !')
            router.push({ pathname: '/login' })
        }
        return response.json();
    })
    .catch(error => {
        console.log('Error on fetch:' + error.message);
        return 'Error on fetch:' + error.message;
    })
}

