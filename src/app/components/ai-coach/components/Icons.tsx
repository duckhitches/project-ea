import React from 'react';

export const MicIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
  </svg>
);

export const StopIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z" clipRule="evenodd" />
    </svg>
);


export const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

export const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

export const EyeOffIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a10.05 10.05 0 013.132-5.125m5.923-2.45A10.05 10.05 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.05 10.05 0 01-1.355 3.375m-2.28 2.28a3 3 0 11-4.242-4.242M1 1l22 22" />
    </svg>
);

export const ThumbsUpIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M7.002 8.002a1 1 0 1 0-2 0 1 1 0 0 0 2 0ZM5.002 9.414a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm.005-4.414a.5.5 0 0 1 .5-.5h2.5a.5.5 0 0 1 0 1h-2.5a.5.5 0 0 1-.5-.5Zm1.5 2.5a.5.5 0 0 1 .5-.5h4.5a.5.5 0 0 1 0 1h-4.5a.5.5 0 0 1-.5-.5Zm-2 1.5a.5.5 0 0 1 .5-.5h6.5a.5.5 0 0 1 0 1h-6.5a.5.5 0 0 1-.5-.5Zm-2.5 1.5a.5.5 0 0 1 .5-.5h2.5a.5.5 0 0 1 0 1h-2.5a.5.5 0 0 1-.5-.5Zm12.5-3.5a1 1 0 0 0-1-1h-3.5a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h.5a.5.5 0 0 0 .5-.5v-1.5a.5.5 0 0 0-.5-.5Z" />
    </svg>
);

export const ThumbsDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M7.002 12.002a1 1 0 1 0-2 0 1 1 0 0 0 2 0ZM5.002 10.586a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm.005 4.414a.5.5 0 0 1 .5.5h2.5a.5.5 0 0 1 0-1h-2.5a.5.5 0 0 1-.5.5Zm1.5-2.5a.5.5 0 0 1 .5.5h4.5a.5.5 0 0 1 0-1h-4.5a.5.5 0 0 1-.5.5Zm-2-1.5a.5.5 0 0 1 .5.5h6.5a.5.5 0 0 1 0-1h-6.5a.5.5 0 0 1-.5.5Zm-2.5-1.5a.5.5 0 0 1 .5.5h2.5a.5.5 0 0 1 0-1h-2.5a.5.5 0 0 1-.5.5Zm12.5 3.5a1 1 0 0 0-1 1h-3.5a1 1 0 0 0-1-1v-6a1 1 0 0 0 1-1h2a1 1 0 0 0 1 1v2a1 1 0 0 1 1 1h.5a.5.5 0 0 0 .5.5v1.5a.5.5 0 0 0-.5.5Z" />
    </svg>
);

export const LinkIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 0 1 5.656 0l4-4a4 4 0 0 0-5.656-5.656l-1.1 1.1" />
    </svg>
);



