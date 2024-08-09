
export interface ITopSectionForm {
    title: string,
    description: string,
    row: {
        question: string,
        answer: string
    }[]
}
export interface IBottomSectionForm {
    title: string,
    description: string,
    greenButton: string,
    whiteButton: string

}

export interface IForm {
    topSection: ITopSectionForm,
    bottomSection: IBottomSectionForm
}