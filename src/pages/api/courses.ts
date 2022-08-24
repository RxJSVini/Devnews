import { NextApiRequest, NextApiResponse} from "next";

export default function courses(request:NextApiRequest, response:NextApiResponse){
    const courses = [
        {id:1, name:'Next.js com typescript'},
        {id:2, name:'React.js com typescript'},
    ]
    return response.json(courses);
}