import axios from 'axios';

export function apiRecognize(params) {
    return new Promise((resolve, reject) => {
        axios.post(process.env.PUBLIC_URL + '/api/recognize', params, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then((resp) => {
            if (resp.status === 200) {
                try {
                    let json = JSON.parse(JSON.stringify(resp.data));
                    resolve(json);
                } catch (err) {
                    reject(err);
                }
            } else reject(resp.status)
        }, (err) => {
            reject(err);
        })
    })
}

export function apiLearn(params) {
    return new Promise((resolve, reject) => {
        axios.post(process.env.PUBLIC_URL + '/api/learn', params, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then((resp) => {
            if (resp.status === 200) {
                try {
                    let json = JSON.parse(JSON.stringify(resp.data));
                    resolve(json);
                } catch (err) {
                    reject(err);
                }
            } else reject(resp.status)
        }, (err) => {
            reject(err);
        })
    })
}
