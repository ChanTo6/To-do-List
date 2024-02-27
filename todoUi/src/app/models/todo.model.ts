export interface Todo{
  editing: boolean;
    id: string,
    description :string,
    createdDate: Date,
    isCompleted: boolean,
    completedDate: Date,
     deletedDate : Date;
     isDeleted : boolean;
     tempDescription :any;
}