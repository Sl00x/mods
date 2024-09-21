"use client";
import { RiCloseCircleLine, RiFolderZipFill } from "@remixicon/react";
import { InputHTMLAttributes, useState } from "react";

interface FileUploadProps extends InputHTMLAttributes<HTMLInputElement> {
  onFileChange?: (files: FileList | null) => void;
  label: string;
  required?: boolean;
  multiple?: boolean;
  error?: string;
}

export const FileUpload = (props: FileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    if (event.dataTransfer.files) {
      const newFiles = Array.from(event.dataTransfer.files);
      if (!props.multiple && files.length > 0) {
        setFiles(newFiles);
      } else {
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      }

      props.onFileChange?.(event.dataTransfer.files);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      if (!props.multiple && files.length > 0) {
        setFiles(newFiles);
      } else {
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      }
    }
    props.onFileChange?.(event.target.files);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleFileRemove = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const formatFileSize = (size: number) => {
    if (size > 1024 * 1024) {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    } else {
      return `${(size / 1024).toFixed(2)} KB`;
    }
  };

  return (
    <div>
      <label
        htmlFor="email"
        className="block text-xs font-bold uppercase leading-6 text-gray-600"
      >
        {props.label}
        {props.required && <b className="text-primary">*</b>}
      </label>
      <div className="w-full relative">
        <div
          className={`w-full h-48 border-2 border-dashed rounded-md flex flex-col items-center justify-center transition-colors ${
            isDragOver ? "border-primary bg-gray-100" : "border-gray-300"
          }`}
          onDrop={handleFileDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <RiFolderZipFill size={64} className="text-gray-400 text-4xl" />
          <span className="text-gray-500 mt-2">
            Drag & Drop files here or click to upload
          </span>
          <input
            {...props}
            required={false}
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleFileSelect}
            multiple={props.multiple}
          />
        </div>
        {props.error && (
          <span className="text-[10px] font-semibold text-red-500 uppercase">
            {props.error}
          </span>
        )}
      </div>
      {files.length > 0 && (
        <div className="mt-4">
          <ul>
            {files.map((file) => (
              <li
                key={file.name}
                className="flex justify-between items-center py-2 px-3 bg-white shadow-md border-gray-200 border rounded-md mb-2"
              >
                <span>{file.name}</span>
                <span className="flex items-center">
                  {formatFileSize(file.size)}
                  <button
                    onClick={() => handleFileRemove(file.name)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <RiCloseCircleLine className="text-lg" />
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
