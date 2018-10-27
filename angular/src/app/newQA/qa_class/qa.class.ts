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

    for (let q of question_active) {
      let temp = {
        question_id: q.question_id,
        response: -1,
      }
      this.questions.push(temp);
    }
  }
}
