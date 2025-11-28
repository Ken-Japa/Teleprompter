import { memo } from 'react';
import { TextFragment } from '../../../types';

export const TextFragmentItem = memo(({ fragment }: { fragment: TextFragment }) => {
    if (fragment.type === 'normal') return <>{fragment.text}</>;
    return <span className={`rounded px-1 mx-0.5 box-decoration-clone text-tag-${fragment.type}`}>{fragment.text}</span>;
});