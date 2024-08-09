import { FC, ReactNode, useState } from 'react';

type Props = {
  options: { label: string; onClick?: () => void }[];
  head: ReactNode;
};

const Dropdown: FC<Props> = ({ head, options }) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <button
      onBlur={() => setShowOptions(false)}
      onClick={() => setShowOptions(prev => !prev)}
      className="relative"
    >
      {head}
      {showOptions && (
        <div className="absolute right-2 top-full z-10 mt-4 min-w-max rounded border-2 border-primary-dark bg-primary text-left text-primary-dark dark:text-primary dark:border-primary dark:bg-primary-dark">
          <ul className="space-y-3 p-3">
            {options.map(({ label, onClick }, i) => (
              <li key={label + i} onClick={onClick}>
                {label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </button>
  );
};

export { Dropdown };
