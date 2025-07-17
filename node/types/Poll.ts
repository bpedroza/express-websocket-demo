export type Poll = {
    id: number;
    question: string;
    options: string[];
    answers: {option: string, count: number}[];
}