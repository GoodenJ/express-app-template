import fetch from 'cross-fetch';
import { getURI } from '../env.config.js';

describe('contractTest for authentication Url 200', () => {
    it('should find a result via fetch', () => {
        return fetch(`${getURI()}/login`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: 'admin',
                password: 'pass'
            })
        })
        .then(res => { return expect(res.status).toBe(200); })
    });
});

describe('contractTest for authentication Url 200', () => {
    it('should find a result via fetch', () => {
        return fetch(`${getURI()}/login`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: '',
                password: ''
            })
        })
            .then(res => { return expect(res.status).toBe(403); })
    });
});

describe('contractTest for authentication Url Token', () => {
    it('should find a result via fetch', () => {
        return fetch(`${getURI()}/login`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: 'admin',
                password: 'pass'
            })
        })
        .then(res => {
            if (res.status == 200) {
                return res.json().then(response => {
                    return expect(typeof response.token).toBe('string');
                } 
                )
            }
        })
    });
});