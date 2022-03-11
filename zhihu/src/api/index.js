import axios from "./http";
// 获取今日信息
 const queryNewsLatest =  () => {
    return axios.get('/api/news_latest')
}

 const queryNewsBefore =  (time) => {
    return axios.get('/api/news_before', {
        params: {
            time
        }
    })
}

 const queryNewsDetail =  (id) => {
    return axios.get('/api/news_info', {
        params: {
            id
        }
    })
}
 const queryNewsComments =  (id) => {
    return axios.get('/api/story_extra', {
        params: {
            id
        }
    })
}

export default {
    queryNewsLatest,
    queryNewsBefore,
    queryNewsDetail,
    queryNewsComments
}