const CreateService= async (PostBody,DataModel) => {
    try{
        let data = await DataModel.create(PostBody)
        return {status: "success", data: data}
    }
    catch (error) {
        return {status: "fail", data: error}
    }
}
module.exports=CreateService