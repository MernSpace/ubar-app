const mongoose = require("mongoose");
const DetailsByIDService = async (Request, DataModel) => {
    try {
        let DetailsID = Request.params.id;

        // Safer conversion to ObjectId
        let QueryObject = {
            _id: new mongoose.Types.ObjectId(DetailsID)
        };

        let data = await DataModel.aggregate([
            {$match: QueryObject}
        ]);

        return { status: "success", data: data };
    }
    catch (error) {
        return { status: "fail", data: error };
    }
};
module.exports = DetailsByIDService;