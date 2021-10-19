import { useEffect, useState } from "react"
import { incVote } from "../utils/api"

const useVotes = (id, votesPassed) => {
    const [votes, setVotes] = useState(votesPassed)
    const [err, setErr] = useState(null)

    useEffect (()=>{
        console.log('in useVotes')
        setVotes((currVotes) => currVotes +1)
        setErr(null)
        incVote('comments', id)
        .catch((error) => {
            setVotes((currVotes) => currVotes -1)
            setErr('Something went wrong, please try again later')
        })
    }, [] )
}

export default useVotes