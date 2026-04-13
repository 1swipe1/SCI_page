import { useRef, useState } from 'react';

const FileDropZone = ({ file, onFileChange, placeholder = '파일을 선택하세요' }) => {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) onFileChange(dropped);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  return (
    <div>
      <div
        onClick={() => inputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`flex flex-col items-center justify-center gap-2 px-4 py-6 border-2 border-dashed rounded-xl cursor-pointer transition-colors
          ${dragging
            ? 'border-black bg-gray-100'
            : 'border-gray-300 hover:border-gray-500 hover:bg-gray-50'
          }`}
      >
        <svg className={`w-8 h-8 transition-colors ${dragging ? 'text-black' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        {file ? (
          <span className="text-sm font-medium text-gray-800 truncate max-w-full px-2">{file.name}</span>
        ) : (
          <>
            <span className="text-sm text-gray-500">
              {dragging ? '여기에 놓으세요' : '파일을 드래그하거나 클릭해서 선택하세요'}
            </span>
            {placeholder !== '파일을 선택하세요' && (
              <span className="text-xs text-gray-400 truncate max-w-full px-2">{placeholder}</span>
            )}
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={(e) => onFileChange(e.target.files[0] || null)}
        />
      </div>
      {file && (
        <button
          type="button"
          onClick={() => onFileChange(null)}
          className="mt-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors"
        >
          첨부 취소
        </button>
      )}
    </div>
  );
};

export default FileDropZone;
