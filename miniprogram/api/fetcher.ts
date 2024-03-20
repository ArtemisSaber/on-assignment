import { urlcat } from '../utils/util'

export const request = (
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data: any = {},
    params: any = null,
    header: any = {
        'content-type': 'application/json'
    }
) => {
    return new Promise((resolve, reject): void => {
        let requestURL = url
        if (params) {
            requestURL = urlcat(url, params)
        }
        wx.request({
            url: requestURL,
            method,
            data,
            dataType: 'json',
            header,
            success(res) {
                if (res.statusCode === 200) {
                    resolve(res.data)
                } else {
                    reject(res)
                }
            },
            fail(err) {
                reject(err)
            }
        })
    })
}
