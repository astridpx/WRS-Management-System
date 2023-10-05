"use client";

import React, { use } from "react";
import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";

import { UploadButton } from "@uploadthing/react";

import { OurFileRouter } from "../api/uploadthing/core";

export default function ItemssPage() {
  return (
    <>
      <PageWrapper>
        <div className="relative">
          <UploadButton<OurFileRouter>
            endpoint="imageUploader"
            onClientUploadComplete={(res: any) => {
              // Do something with the response
              console.log("Files: ", res);
              alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
            onUploadBegin={(name: any) => {
              // Do something once upload begins
              console.log("Uploading: ", name);
            }}
          />
        </div>
      </PageWrapper>
    </>
  );
}
