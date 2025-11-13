export type TErrorSources = {
    path: string | number;
    message: string
}[]

export type TGnericErrorResponse = {
    statusCode: number;
    message: string;
    errorSources: TypeError
}