export class QA {

  prid: number;
  date: string;
  description: string;
  determinant: number;
  tic: number;
  preceptor: number;
  noPreceptor: boolean;
  comments: string;
  flagged: boolean;
  reviewer: number;
  reviewDate: string;
  questions: Array<any>;

  constructor(question_active: any) {
    this.prid = null;
    this.date = null;
    this.description = null;
    this.determinant = null;
    this.tic = null;
    this.preceptor = null;
    this.noPreceptor = false;
    this.comments = null;
    this.flagged = null;
    this.reviewer = null;
    this.reviewDate = null;
    this.questions = [];
    for (let cat of question_active ){
      // console.log(cat);
      for (let q of cat.questions) {
        // console.log(q);
        let temp = {
          question_id: q.question_id,
          response: -1,
        }
        this.questions.push(temp);
        // console.log(this.questions);
      }
    }
  }

  public loadData(question_active: any){
    this.prid = null;
    this.date = null;
    this.description = null;
    this.determinant = null;
    this.tic = null;
    this.preceptor = null;
    this.noPreceptor = false;
    this.comments = null;
    this.flagged = null;
    this.reviewer = null;
    this.reviewDate = null;
    this.questions = [];
    for (let cat of question_active ){
      // console.log(cat);
      for (let q of cat.questions) {
        // console.log(q);
        let temp = {
          question_id: q.question_id,
          response: -1,
        }
        this.questions.push(temp);
        // console.log(this.questions);
      }
    }
  }

}
