'use client'
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";

// You can define a type for file data if you know the structure
type FileData = any;

const BulkUpload = () => {
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Handle file drop
  const onDrop = (acceptedFiles: File[]) => {  // <-- Typed as File array
    const file = acceptedFiles[0];
    if (file) {
      // Check if it's a valid CSV or JSON file
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
    Papa.parse(file, {
      complete: (result) => {
        console.log("CSV Data:", result);
        setFileData(result.data); // Save CSV data in the state
      },
      header: true, // If the first row contains headers
      skipEmptyLines: true,
    });
  };

  // Parse JSON file
  const parseJSON = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsedData = JSON.parse(reader.result as string);
        console.log("JSON Data:", parsedData);
        setFileData(parsedData); // Save JSON data in the state
      } catch (error) {
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
    // Send file data to the backend or handle as needed
    console.log("Uploading data:", fileData);
    // Here you would call an API to save the file data, e.g.:
    // axios.post('/api/upload', { data: fileData })
  };

  // Set up the drop zone
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".csv,.json", // Only accept CSV and JSON files
    multiple: false, // Accept only one file at a time
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Bulk Upload
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Upload product data in bulk using CSV or JSON files.
      </p>

      {/* File Drop Zone */}
      <div
        {...getRootProps()}
        className="bg-white border-dashed border-4 border-gray-300 p-8 text-center rounded-lg"
      >
        <input {...getInputProps()} />
        <p className="text-lg text-gray-700">
          Drag & Drop CSV or JSON file here or click to select
        </p>
      </div>

      {/* Display errors */}
      {errorMessage && (
        <div className="mt-4 text-red-500 text-center">{errorMessage}</div>
      )}

      {/* Display file preview */}
      {fileData && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">File Preview</h3>
          <pre className="bg-white p-4 rounded-lg shadow-lg">
            {JSON.stringify(fileData, null, 2)}
          </pre>
        </div>
      )}

      {/* Upload Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleUpload}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-200"
        >
          Upload Data
        </button>
      </div>
    </div>
  );
};

export default BulkUpload;
