"use client";

import React, { use, useCallback, useEffect, useState } from "react";
import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";
import type { FileWithPath } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { generateReactHelpers, useDropzone } from "@uploadthing/react/hooks";
import {
  SuccessToast,
  ErrorToast,
  LoadingToast,
  DissmissToast,
  InfoToast,
} from "@/components/Toast/toast";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();
import { UAParser } from "ua-parser-js";

export default function ItemssPage() {
  const parser = new UAParser();

  const { type, vendor } = parser.getDevice(); // { model: '', type: '', vendor: '' }
  const { name } = parser.getBrowser(); //{ name: '', version: '' }
  const { name: osName, version } = parser.getOS(); //{ name: '', version: '' }

  const deviceName = type ? vendor : name;
  const deviceType = type ? false : true;
  const Device = type ? vendor : `${deviceName} - ${osName} ${version}`;

  console.log(deviceName);
  console.log(deviceType);
  console.log(Device);

  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      alert("uploaded successfully!");
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },
    onUploadBegin: () => {
      alert("upload has begun");
    },
  });

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <>
      <PageWrapper>
        <div className="relative">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div>
              {files.length > 0 && (
                <button onClick={() => startUpload(files)}>
                  Upload {files.length} files
                </button>
              )}
            </div>
            Drop files here!
          </div>

          <button onClick={() => LoadingToast("Loading..")}>Toast</button>
          <button
            onClick={() => {
              DissmissToast();
              SuccessToast("success");
            }}
          >
            Dissmiss
          </button>
        </div>
      </PageWrapper>
    </>
  );
}
