import React, { useState } from "react";
import '../../assets/css/gallery.css'
import "../../assets/css/responsive.css"
const PhotoAlbum = ({ DataList }) => {

    return (
            <div className="gallery">
                {DataList && DataList.map((gallery) => (
                    <div key={gallery._id} className="hover:shadow-lg transition-shadow duration-200 mb-4">
                        <div className="gallary_inner">
                            {/* Display the Base64 image with controlled size */}
                            <img
                                src={gallery.image} // Image URL (Base64 string)
                                alt={`Image ${gallery._id}`}
                                className="w-100 img-fluid rounded " // Control the height here
                            />
                        </div>
                    </div>
                ))}
            </div>

    );
};

export default PhotoAlbum;
