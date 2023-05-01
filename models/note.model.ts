export class Note {
    public createdAt: Date;
  
    constructor(
      public title: string,
      public importance: number,
      public dueDate: Date | string = "who knows",
      public finished: boolean,
      public description: string
    ) {
      this.createdAt = new Date();
    }
  }