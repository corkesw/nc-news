import axios from 'axios'

const newsApi = axios.create({
    baseURL: "https://backend-pro-news.herokuapp.com/api"
})

export const getTopics = async () => {
    const {data} = await newsApi.get("/topics")
    return data.topics
    }

export const getArticles = async ({topic, sortBy, order}) => {
    const sort_by = sortBy
    const {data} = await newsApi.get('/articles', {params:{topic, sort_by, order}})
    return data.articles
}

export const getArticle = async (article_id) => {
    const {data} = await newsApi.get(`articles/${article_id}`)
    return data.article
}

export const incVote = async (type, id) => {
    const {data} = await newsApi.patch(`${type}/${id}`, {
        inc_votes: 1
    })
    return data
}

export const getComments = async (article_id) => {
    const {data} = await newsApi.get(`articles/${article_id}/comments`)
    console.log(data.comments)
    return(data.comments)
}

export const postComments = async (newComment, user, article_id) => {
    
    const reqbody = {
        username: user,
        body: newComment
    }
    console.log(reqbody)

    const {data} = await newsApi.post(`/articles/${article_id}/comments`, reqbody)
}