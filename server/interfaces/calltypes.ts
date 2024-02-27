interface PostType {
    query: string,
    object: object
}

interface DeleteType {
    query: string,
    index: string
}

interface GetType {
    type: "one" | "all"
    query: string,
    index?: string
}


export {
    PostType,
    DeleteType,
    GetType
}