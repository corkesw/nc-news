import axios from 'axios'

const newsApi = axios.create({
    baseURL: "https://backend-pro-news.herokuapp.com/api"
})

export const getTopics = async () => {
    const {data} = await newsApi.get("/topics")
    return data.topics
    }

export const getArticles = async (search) => {
    let searchTerm = "/articles"

    if (search) searchTerm += `?${search}`
    
    const {data} = await newsApi.get(searchTerm)
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
    return(data.comments.sort((comm1, comm2) => {
        return comm1.comment_id - comm2.comment_id
    }))
}