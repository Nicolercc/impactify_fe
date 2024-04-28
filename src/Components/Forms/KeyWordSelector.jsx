import React from 'react';
import { useNews } from '../NewsApi/NewsContext'
import Select from 'react-select';

const KeywordSelector = () => {
    const { setSelectedKeyword, fetchNewsArticles } = useNews();

    const handleKeywordsChange = (selectedOption) => {
        setSelectedKeyword(selectedOption);
        fetchNewsArticles(selectedOption.value);
    };

    const keywordOptions = [
        { value: 'equality', label: 'Equality' },
        { value: 'politics', label: 'politics' },
        { value: 'global issues', label: 'global issues' },
        { value: 'lgbt rights', label: 'lgbt rights' },
        { value: 'global warming', label: 'global warming' },
        { value: 'ukraine', label: 'ukraine' },
    ];

    return (
        <Select options={keywordOptions} onChange={handleKeywordsChange} />
    );
};

export default KeywordSelector;
