import { Request, Response } from 'express';
import RequestForQuotationController from './rfqs.controller';
export default class RequestForQuotationNewRFQHandler extends RequestForQuotationController {
  create = {
    'POST': async (req: Request, res: Response) => {
      console.log(req.body)
      console.log(req['files'])
      return res.json({ test: 'test' });
    }
  }
}