
export interface ITopSectionForm {
    title: string,
    subtitle: string,
    description: string,
    greenButton: string,
    feature: {
        title: string,
        description: string,
        image: FileList | string
    }[]
}

export interface IMiddleSection {
    title: string,
    description: string,
    image: FileList | string,
}
export interface IBottomSectionForm {
    title: string,
    description: string,
    greenButton: string,
    whiteButton: string

}

export interface IForm {
    topSection: ITopSectionForm,
    middleSection: IMiddleSection
    bottomSection: IBottomSectionForm
}