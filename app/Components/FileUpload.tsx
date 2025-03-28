"use client";

import { IKUpload } from 'imagekitio-next';
import { IKUploadResponse } from 'imagekitio-next/dist/types/components/IKUpload/props';
import { useState } from 'react';


export default function FileUpload({ onSuccess }: { onSuccess: (response: IKUploadResponse) => void }) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onError = (err: { message: string }) => {
        setError(err.message);
        setUploading(false);
    };

    const onUpload = (err: { message: string }) => {
        setUploading(false);
        setError(null);
    }

    const handleSucess = (response: IKUploadResponse) => {
        setUploading(false);
        setError(null);
        onSuccess(response);
    }

    const handleStartUpload = () => {
        setUploading(true);
        setError(null);
    }

    return (
        <div className="space-x-2">
            <IKUpload
                fileName='produt-1.png'
                onError={onError}
                onSuccess={handleSucess}
                onUploadStart={handleStartUpload}
                validateFile={(file: File) => {
                    const validTypes = ["image/png", "image/jpeg", "image/webp"];
                    if (!validTypes.includes(file.type)) setError("Invalid File Type: " + file.type);

                    if (file.size > 5 * 1024 * 1024) setError("File Size is too large.");

                    return true;
                }}
            />

            {uploading && <p className='text-sm text-gray-500'>Uploading ... </p>}

            {error && <p className='text-sm text-red-500'>{error}</p>}
        </div>
    )
}