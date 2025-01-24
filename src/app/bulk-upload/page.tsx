'use client'
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const BulkUpload = () => {
  const [fileData, setFileData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle file drop
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const fileExtension = file.name.split(".").pop();
      if (fileExtension === "csv") {
        parseCSV(file);
      } else if (fileExtension === "json") {
        parseJSON(file);
      } else {
        setErrorMessage("Invalid file type. Please upload a CSV or JSON file.");
      }
    }
  };

  // Parse CSV file
  const parseCSV = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      const lines = text.split("\n");
      const header = lines[0].split(",");
      
      const data = lines.slice(1).map((line) => {
        const values = line.split(",");
        const obj: any = {};  // Use 'any' for simplicity
        header.forEach((key, index) => {
          obj[key.trim()] = values[index]?.trim();
        });
        return obj;
      });

      setFileData(data);
    };
    reader.readAsText(file);
  };

  // Parse JSON file
  const parseJSON = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsedData = JSON.parse(reader.result as string);
        setFileData(parsedData); // Save JSON data in the state
      } catch {
        setErrorMessage("Invalid JSON file format.");
      }
    };
    reader.readAsText(file);
  };

  // Handle file submission
  const handleUpload = () => {
    if (!fileData) {
      setErrorMessage("Please upload a valid file.");
      return;
    }
    console.log("Uploading data:", fileData);
  };

  // Set up the drop zone
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.csv, .json', // Accept CSV and JSON files
    multiple: false,
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Bulk Upload</h2>
      <p className="text-center text-gray-600 mb-8">Upload product data in bulk using CSV or JSON files.</p>

      <div {...getRootProps()} className="bg-white border-dashed border-4 border-gray-300 p-8 text-center rounded-lg">
        <input {...getInputProps()} />
        <p className="text-lg text-gray-700">Drag & Drop CSV or JSON file here or click to select</p>
      </div>

      {errorMessage && <div className="mt-4 text-red-500 text-center">{errorMessage}</div>}

      {fileData && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">File Preview</h3>
          <pre className="bg-white p-4 rounded-lg shadow-lg">{JSON.stringify(fileData, null, 2)}</pre>
        </div>
      )}

      <div className="mt-8 text-center">
        <button onClick={handleUpload} className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-200">
          Upload Data
        </button>
      </div>
    </div>
  );
};

export default BulkUpload;


