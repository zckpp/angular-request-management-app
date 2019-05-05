export interface Category {
    value: string;
    label: string;
}
export interface CategoryGroup {
    name: string;
    category: Category[];
}