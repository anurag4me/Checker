import { CustomDragDrop } from "./CustomDragDrop";
import React, { useState } from "react";

export default function DragComponent({ onChange }) {
  const [ownerLicense, setOwnerLicense] = useState([]);

  function uploadFiles(f) {
    setOwnerLicense([...ownerLicense, ...f]);
  }

  function deleteFile(indexImg) {
    const updatedList = ownerLicense.filter((ele, index) => index !== indexImg);
    setOwnerLicense(updatedList);
  }

  return (
    <div className="bg-white shadow rounded-lg w-[50%] px-5 pt-3 pb-5">
      <div className="pb-[8px] border-b border-[#e0e0e0]">
        <h2 className="text-black text-[17px] font-[600]">
          Upload your answer sheet
        </h2>
      </div>
      <CustomDragDrop
        ownerLicense={ownerLicense}
        onUpload={uploadFiles}
        onDelete={deleteFile}
        onChange={onChange}
        count={2}
        formats={["jpg", "jpeg", "png"]}
      />
    </div>
  );
}
