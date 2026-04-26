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
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={(e) => onFileChange(e.target.files[0] || null)}
      />

      {/* 모바일: 버튼형 */}
      <div
        onClick={() => inputRef.current.click()}
        className="md:hidden flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-xl cursor-pointer hover:border-gray-500 transition-colors"
      >
        <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
        </svg>
        <span className="text-[14px] text-gray-500 truncate">
          {file ? file.name : '파일 첨부하기'}
        </span>
        {file && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onFileChange(null); }}
            className="ml-auto text-xs text-gray-400 hover:text-red-500 transition-colors shrink-0"
          >
            삭제
          </button>
        )}
      </div>

      {/* 데스크탑: 드래그앤드롭 */}
      <div
        onClick={() => inputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`hidden md:flex flex-col items-center justify-center gap-2 px-4 py-6 border-2 border-dashed rounded-xl cursor-pointer transition-colors
          ${dragging ? 'border-black bg-gray-100' : 'border-gray-300 hover:border-gray-500 hover:bg-gray-50'}`}
      >
        <svg className={`w-8 h-8 transition-colors ${dragging ? 'text-black' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        {file ? (
          <span className="text-sm font-medium text-gray-800 truncate max-w-full px-2">{file.name}</span>
        ) : (
          <span className="text-sm text-gray-500">
            {dragging ? '여기에 놓으세요' : '파일을 드래그하거나 클릭해서 선택하세요'}
          </span>
        )}
      </div>
      {file && (
        <button
          type="button"
          onClick={() => onFileChange(null)}
          className="hidden md:block mt-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors"
        >
          첨부 취소
        </button>
      )}
    </div>
  );
};

export default FileDropZone;
