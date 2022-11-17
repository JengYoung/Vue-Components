export interface TabInterface {
  label: string;
  value: string;
  id: string;
}

export interface ActiveTabInterface extends TabInterface {
  idx: number;
}
