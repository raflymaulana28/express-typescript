import { Response } from "express";
import { response_status_codes } from "./model";

export function successResponse(message: string, data: any, res: Response) {
  res.status(response_status_codes.success).json({
    status: "Success",
    message: message,
    data,
  });
}

export function failureResponse(message: string, data: any, res: Response) {
  res.status(response_status_codes.success).json({
    status: "Failure",
    message: message,
    data,
  });
}
export function insufficientParameters(res: Response) {
  res.status(response_status_codes.bad_request).json({
    status: "Failure",
    message: "Insufficient parameters",
    data: {},
  });
}

export function mongoError(err:any,res:Response){
  res.status(response_status_codes.internal_server_error).json({
    status:"Failure",
    message:"MongoDb Error",
    data:err
  })
}
