/* eslint-disable @next/next/no-img-element */
'use client';
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from '@/components/ui/shadcn-io/dropzone';
import { useState } from 'react';

interface DropzoneProps {
  onChange: (value: string) => void;
}

const DropzonePreview = ({ onChange }: DropzoneProps) => {
  const [files, setFiles] = useState<File[] | undefined>();
  const [filePreview, setFilePreview] = useState<string | undefined>();
  const [error, setError] = useState<string | null>(null);
  
  const handleDrop = (files: File[]) => {
    setError(null);
    setFiles(files);
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          setFilePreview(e.target?.result);
          onChange(e.target?.result);
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
      maxSize={1 * 1024 * 1024} // 1MB for logo
      onDrop={handleDrop}
      onError={(err: Error) => setError(err.message)}
      src={files}
      className="border-2 border-dashed bg-transparent border-white/20 hover:bg-transparent text-white hover:text-white rounded-xl p-8 text-center hover:border-white/30 transition-colors cursor-pointer"
    >
      <DropzoneEmptyState />
      <DropzoneContent>
        {error && (<p className='text-red-500'>{error}</p>)}
        {filePreview && (
          <div className="h-[120px] w-[120px] mx-auto relative rounded-lg bg-transparent">
            <img
              alt="Logo Preview"
              src={filePreview}
              className="absolute top-0 left-0 h-full w-full object-contain"
            />
          </div>
        )}
      </DropzoneContent>
    </Dropzone>
  );
};
export default DropzonePreview;
