export interface IParentDeptResponse {
    message: string,
    result: boolean,
    data: IParentDept[],
}
export interface IParentDept {
    departmentId: number,
    departmentName: string,
    departmentLogo: string
}
export interface IChildDeptResponse {
    message: string,
    result: boolean,
    data: IChildDept[],
}
export interface IChildDept {
    childDeptId: number,
    parentDeptId: number,
    departmentName: string
}