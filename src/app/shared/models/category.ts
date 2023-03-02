export interface Category {
    id:string;
    code:string;
    title:string;
    description:string;
    createDate?: Date;
    updateDate?:Date;
    softDelete?:Date
}