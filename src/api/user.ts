import instance from "../utils/request";

export function apiTest() {
    return instance.request({
        method: 'POST',
        url: '/test',
        data: {
            username: 'sj',
            password: '111111'
        }
    })
}
