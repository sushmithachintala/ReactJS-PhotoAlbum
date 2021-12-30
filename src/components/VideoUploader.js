import React, { useState } from "react";

import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const S3_BUCKET = "videoupload.io";
const REGION = "eu-central-1";
const ACCESS_KEY = "AKIAWOUEGOWTD7EWWW6A";
const SECRET_ACCESS_KEY = "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";

const VideoUploader = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (file) => {
    setUploading(true);
    const target = { Bucket: S3_BUCKET, Key: file.name, Body: file };
    try {
      const parallelUploads3 = new Upload({
        client: new S3Client({
          region: REGION,
          credentials: {
            accessKeyId: ACCESS_KEY,
            secretAccessKey: SECRET_ACCESS_KEY,
          },
        }),
        leavePartsOnError: false, // optional manually handle dropped parts
        params: target,
      });

      parallelUploads3.on("httpUploadProgress", (progress) => {
        console.log(progress);
      });

      await parallelUploads3.done();
      setUploading(false);
      setUploaded(true);
      // alert("File Uploaded!");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      style={{
        width: "50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        marginTop: "10%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div>Video Upload</div>
      {/* <input type="file" onChange={handleFileInput} /> */}
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Control type="file" onChange={handleFileInput} />
      </Form.Group>
      <Button onClick={() => handleUpload(selectedFile)} disabled={uploading}>
        {uploading ? "Upload in progress..." : "Upload to S3"}
      </Button>
      <div style={{ marginTop: "50px" }}>
        {uploaded && (
          <Alert variant="success">{` ${selectedFile.name} uploaded to S3!`}</Alert>
        )}
      </div>
    </div>
  );
};

export default VideoUploader;
