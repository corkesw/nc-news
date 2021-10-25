import axios from 'axios'

const newsApi = axios.create({
    baseURL: "https://backend-pro-news.herokuapp.com/api"
})

export const getTopics = async () => {
    const {data} = await newsApi.get("/topics")
    return data.topics
    }

export const getArticles = async ({topic, sortBy, order, page}) => {
    const sort_by = sortBy
    const p = page
    const {data} = await newsApi.get('/articles', {params:{topic, sort_by, order, p}})
    return {articles: data.articles, total_count: data.total_count}
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
    return(data.comments)
}

export const postComments = async (newComment, user, article_id) => {
    
    const reqbody = {
        username: user,
        body: newComment
    }

    await newsApi.post(`/articles/${article_id}/comments`, reqbody)
}

export const getUsers = async (user) => {
    const {data} = await newsApi.get(`users`)
    const userArray = data.users.map((user) => {return user.username})
    return userArray.includes(user)
}

export const deleteComment = async (comment_id) => {
    await newsApi.delete(`/comments/${comment_id}`)
}

export const postArticle = async (author, topic, title, body) => {
    topic = topic.toLowerCase()
    const reqbody = {
        author,
        topic,
        title,
        body
    }

    console.log(reqbody)
    const article = await newsApi.post(`/articles`, reqbody)
    console.log(article)

}