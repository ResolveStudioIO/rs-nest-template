export interface ExampleOutputUser {
    id: number;
    name: string | null;
    email: string;
}

export interface ExampleOutputType {
    users: ExampleOutputUser[];
}
