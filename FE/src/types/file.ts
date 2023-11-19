export interface IDocument {
  id: string;
  userId: string;
  parentId: string;
  name: string;
  objectType: 0 | 1;
  canDelete: boolean;
  mPath: string;
  mimetype: string;
  format: string;
  createdAt: Date;
  updatedAt: Date;
}
