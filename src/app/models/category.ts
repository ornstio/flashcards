import { FlashCard } from "./flashcard";

export class Category {
    constructor(title: string, createdBy: string, createdOn: number, flashCards: Array<FlashCard>){
        this.title = title;
        this.createdBy = createdBy;
        this.createdOn = createdOn;
        this.flashCards = flashCards;
    }

    title: string;
    createdBy: string;
    createdOn: number;
    $user_id: string;
    flashCards: Array<FlashCard>;
    $key: string;

    private createdOnDate() { return new Date(this.createdOn) }
}
