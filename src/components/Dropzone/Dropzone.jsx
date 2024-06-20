import './Dropzone.css';
import React, { useCallback, useState, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import { Image } from 'cloudinary-react';
import { ToastContext } from '../../contexts/toast.context';

const Dropzone = ({ maxFiles, onFilesChange }) => {
    const { showToast } = useContext(ToastContext);
    const [files, setFiles] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        if (files.length + acceptedFiles.length > maxFiles) {
            showToast(`You can only upload ${maxFiles} pictures.`);
            return;
        }

        const newFiles = acceptedFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        setFiles(prevFiles => {
            const updatedFiles = [...prevFiles, ...newFiles];
            onFilesChange(updatedFiles);
            return updatedFiles;
        });
    }, [maxFiles, files, onFilesChange, showToast]);

    const handleDeleteImage = (index, event) => {
        event.stopPropagation()
        setFiles(prevState => {
            const updatedFiles = prevState.filter((_, i) => i !== index);
            onFilesChange(updatedFiles);
            return updatedFiles;
        });
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: true
    });

    return (
        <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
            <ul>
                {files.map((fileWrapper, index) => (
                    <div key={index}>
                        <Image src={fileWrapper.preview} width="150" />
                        <button onClick={(event) => handleDeleteImage(index, event)}>x</button>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default Dropzone;
