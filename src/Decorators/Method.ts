export enum Methods{
    Get='get',
    Post='post',
    Delete='delete',
    Put='put',
    Patch='patch'
}



export enum Metadatakeys {
    Path='path',
    Method='method',
    Middleware="middleware",
    Validators="validators"
}


export interface Data{
   name:string
   email:string
   iat: number,
   exp: number
}
