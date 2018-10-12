export class QA {

  constructor(
    private qa_id: number,
    private prid: number,
    public date: Date,
    public description: string,
    public tic: number,
    public preceptor: number,
    public determinant: number,
    public comments: string,
    public review: number,
    public flagged: boolean,
    public rev_date: Date
  ) {  }


}
