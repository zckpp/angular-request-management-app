export interface Manager {
    name:  string;
    email: string;
}

let managers: Manager[] = [
    {name: "Tony DiGiorgio", email: "adigiorgio@carnegiescience.edu"},
    {name: "Shaun Beavan", email: "sbeavan@carnegiescience.edu"},
];
export { managers };