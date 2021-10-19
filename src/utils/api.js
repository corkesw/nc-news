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

export const incArticleVote = async (vote, article_id) => {
    const {data} = await newsApi.patch(`articles/${article_id}`, {
        inc_votes: 1
    })
    return data

}