const UpdateService= async (id,PostBody,DataModel) => {
    try{
        let data = await DataModel.updateOne({_id:id},PostBody);
        return {status: "success", data: data}
    }
    catch (error) {
        return {status: "fail", data: error}
    }
}
module.exports=UpdateService

