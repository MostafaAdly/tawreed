import React from 'react';

const TitleComponent = ({ title, marginBottom = "0" }: { title: string, marginBottom?: string }) => {
  return (
    <h1 className={`text-2xl font-bold text-gray-900 dark:text-white mb-${marginBottom}`}>{title}</h1>
  );
}

export default TitleComponent;