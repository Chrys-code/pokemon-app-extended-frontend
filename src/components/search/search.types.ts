export interface SearchProps {
    onCollectionChange: React.Dispatch<React.SetStateAction<boolean>>;
    isCollectionChecked: boolean;
    onSearch: (value: string | null) => void;
}
