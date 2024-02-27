import { DbCrud } from "../classes/DbCrud"
import type { PostType, DeleteType, GetType } from "../interfaces/calltypes"
import type { GeneralResponse } from "../interfaces/dbresponses"

export default defineEventHandler(async (e) => {
    let response: GeneralResponse = {
        err: false,
        msg: ""
    }
    try {
        const CallType = e.method
        switch (CallType) {
            case "POST":
                const bodyPost = await readBody(e)
                const objectJsonPost: PostType = JSON.parse(bodyPost)
                const dbPost = new DbCrud(objectJsonPost.query)
                response = await dbPost.Create(objectJsonPost.object)
                break;
            case "GET":
                const objectJsonGet: GetType = getQuery(e)
                const dbRead = new DbCrud(objectJsonGet.query)
                if(objectJsonGet.type === "all"){
                    response = await dbRead.ReadAll()
                }else if(objectJsonGet.type === "one"){
                    response = await dbRead.ReadOne(objectJsonGet.index as string)
                }
                break;
            case "DELETE":
                const bodyDelete = await readBody(e)
                const objectJsonDelete: DeleteType = JSON.parse(bodyDelete)
                const dbDelete = new DbCrud(objectJsonDelete.query)
                response = await dbDelete.Delete(objectJsonDelete.index)
                break;
            default:
                break;
        }

        return response
    } catch (error) {
        response.err = true
        response.msg = "Script error happen"
        response.msgObject = error
        return response
    }
})