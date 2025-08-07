const PendingStudent = async (req, DataModel, SearchArray) => {
    try {
        let pageNo = Number(req.params.pageNo) || 1;
        let perPage = Number(req.params.perPage) || 10;
        let searchValue = req.params.searchKeyword || "0";

        let skipRow = (pageNo - 1) * perPage;
        let SearchQuery = searchValue !== "0" ? {
            $or: SearchArray, // Apply search filters from SearchArray if searchValue is not "0"
            Approval: false    // Ensure that only students with 'Approval' set to false are included
        } : { Approval: false };
        // Aggregate query with SearchArray and pagination
        let data = await DataModel.aggregate([
            { $match:  SearchQuery  },  // Match all conditions in SearchArray
            {
                $facet: {
                    Total: [{ $count: "count" }],  // Get total count of documents
                    Rows: [
                        { $sort: { createdDate: -1 } },  // Sort by createdDate (descending order)
                        { $skip: skipRow },             // Skip rows for pagination
                        { $limit: perPage }             // Limit to 'perPage' results
                    ],
                }
            }
        ]);

        const formattedData = {
            total: data[0]?.Total[0]?.count || 0,  // Get the total count of documents
            rows: data[0]?.Rows || [],             // Get the rows (documents) for the current page
            totalPages: Math.ceil((data[0]?.Total[0]?.count || 0) / perPage),  // Calculate total pages
            currentPage: pageNo                   // Current page number
        };

        return { status: "success", data: formattedData };
    }  catch (error) {
        console.error("ListService Error:", error);
        return { status: "fail", data: error.message };
    }
};

module.exports = PendingStudent;

