export interface IFile {
    _id: string,
    length: number,
    chunkSize: number,
    uploadDate: Date,
    filename: string,
    md5: string,
    metadata: {
        userId: string,
        companyId: string,
        mimetype: string
    }
}

export interface IFolder {
    _id: string,
    title: string,
    uploadDate: Date
}