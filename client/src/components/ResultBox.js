// ResultBox.js
import React from 'react';

const ResultBox = ({ data, error }) => {
  if (error) {
    return <div className="text-red-500">{error.message}</div>;
  }

  if (data) {
    return (
        <>
            <p className="text-lg font-bold my-3">Number of Results: {data.length}</p>
            <pre className="mt-4 border border-gray-300 rounded p-4 break-words whitespace-break-spaces text-xs">
                {JSON.stringify(data, null, 2)}
            </pre>
        </>
    );
  }

  return null;
};

export default ResultBox;
