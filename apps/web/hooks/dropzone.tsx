/* eslint-disable @next/next/no-img-element */
'use client';
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from '@/components/ui/shadcn-io/dropzone';
import { useState } from 'react';
const DropzonePreview = () => {
  const [files, setFiles] = useState<File[] | undefined>();
  const [filePreview, setFilePreview] = useState<string | undefined>();
  const handleDrop = (files: File[]) => {
    console.log(files);
    setFiles(files);
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          setFilePreview(e.target?.result);
        }
      };
      reader.readAsDataURL(files[0]!);
    }
  };
  return (
    <Dropzone
      accept={{
        'image/png': [],
        'image/jpeg': [],
        'image/svg+xml': [],
      }}
      maxSize={10 * 1024 * 1024} // 10MB
      onDrop={handleDrop}
      onError={console.error}
      src={files}
      className="border-2 border-dashed bg-transparent border-white/20 hover:bg-transparent text-white hover:text-white rounded-xl p-8 text-center hover:border-white/30 transition-colors cursor-pointer"
    >
      <DropzoneEmptyState />
      <DropzoneContent>
        {filePreview && (
          <div className="h-[102px] w-full relative">
            <img
              alt="Preview"
              src={filePreview}
              className="absolute top-0 left-0 h-full w-full object-scale-down"
            />
          </div>
        )}
      </DropzoneContent>
    </Dropzone>
  );
};
export default DropzonePreview;
