const ListService = async (Request, DataModel, SearchArray) => {
    try {
        // Get parameters from the request
        let pageNo = Number(Request.params.pageNo) || 1;
        let perPage = Number(Request.params.perPage) || 10;
        let searchValue = Request.params.searchKeyword || "0";

        let skipRow = (pageNo - 1) * perPage;

        let data;

        // Construct the search query based on searchValue
        let SearchQuery = searchValue !== "0" ? {
            $or: SearchArray, // apply search filters from SearchArray if searchValue is not "0"
            Approval: true     // Ensure that only students with 'Approval' set to true are included
        } : { Approval: true };  // Apply the Approval: true filter if searchValue is "0"

        // Aggregate query
        data = await DataModel.aggregate([
            { $match: SearchQuery },  // Apply search query and the Approval filter
            {
                $facet: {
                    Total: [{ $count: "count" }],  // Get the total count of matched documents
                    Rows: [
                        { $sort: { createdDate: -1 } },  // Sort by createdDate in descending order (newest first)
                        { $skip: skipRow },            // Skip rows for pagination
                        { $limit: perPage }            // Limit results per page
                    ],
                }
            }
        ]);

        // Format the response
        const formattedData = {
            total: data[0]?.Total[0]?.count || 0,  // Get the total count of documents
            rows: data[0]?.Rows || [],             // Get the rows (documents) for the current page
            totalPages: Math.ceil((data[0]?.Total[0]?.count || 0) / perPage),  // Calculate total pages
            currentPage: pageNo                   // Current page number
        };

        return { status: "success", data: formattedData };
    } catch (error) {
        console.error("ListService Error:", error);
        return { status: "fail", data: error.message };
    }
};

module.exports = ListService;
