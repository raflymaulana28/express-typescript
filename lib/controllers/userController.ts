import { Request, Response } from "express";
import {
  insufficientParameters,
  mongoError,
  successResponse,
  failureResponse,
} from "../modules/common/service";
import { IUser } from "../modules/users/model";
import UserService from "../modules/users/service";
import e = require("express");

export class UserController {
  private user_service: UserService = new UserService();
  public create_user(req: Request, res: Response) {
    const { name, last_name, email, phone_number, gender }=req.body
    if (
     name &&
     name.first_name &&
     name.middle_name &&
     name.last_name &&
     email &&
     phone_number &&
     gender
    ) {
      const user_params: IUser = {
        name: {
          first_name: name.first_name,
          middle_name: name.middle_name,
          last_name: name.last_name,
        },
        email: email,
        phone_number: phone_number,
        gender: gender,
        modification_notes: [
          {
            modified_on: new Date(Date.now()),
            modified_by: null,
            modified_note: "New User Created!",
          },
        ],
      };
      this.user_service.creatUser(user_params, (err: any) => {
        if (err) {
          mongoError(err, res);
        } else {
          successResponse("Update user successfull", null, res);
        }
      });
    } else {
      insufficientParameters(res);
    }
  }
  public get_user(req: Request, res: Response) {
    if (req.params.id) {
      const user_filter = { _id: req.params.id };
      this.user_service.filterUser(
        user_filter,
        (err: any, user_data: IUser) => {
          if (err) {
            mongoError(err, res);
          } else {
            successResponse("Get user successfull", user_data, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }
  public update_user(req: Request, res: Response) {
    if (
      (req.params.id && req.body.name) ||
      req.body.name.first_name ||
      req.body.name.middle_name ||
      req.body.name.last_name ||
      req.body.email ||
      req.body.phone_number ||
      req.body.gender
    ) {
      const user_filter = { _id: req.params.id };
      this.user_service.filterUser(
        user_filter,
        (err: any, user_data: IUser) => {
          if (err) {
            mongoError(err, res);
          } else if (user_data) {
            user_data.modification_notes.push({
              modified_on: new Date(Date.now()),
              modified_by: null,
              modified_note: "User data updated",
            });
            const user_params: IUser = {
              _id: req.params.id,
              name: req.body.name
                ? {
                    first_name: req.body.name.first_name
                      ? req.body.name.first_name
                      : user_data.name.first_name,
                    middle_name: req.body.name.first_name
                      ? req.body.name.middle_name
                      : user_data.name.middle_name,
                    last_name: req.body.name.first_name
                      ? req.body.name.last_name
                      : user_data.name.last_name,
                  }
                : user_data.name,
              email: req.body.email ? req.body.email : user_data.email,
              phone_number: req.body.phone_number
                ? req.body.phone_number
                : user_data.phone_number,
              gender: req.body.gender ? req.body.gender : user_data.gender,
              is_deleted: req.body.is_deleted
                ? req.body.is_deleted
                : user_data.is_deleted,
              modification_notes: user_data.modification_notes,
            };
            this.user_service.updateUser(user_params, (err: any) => {
              if (err) {
                mongoError(err, res);
              } else {
                successResponse("update user successfull", null, res);
              }
            });
          } else {
            failureResponse("invalid user", null, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }
  public delete_user(req: Request, res: Response) {
    if (req.params.id) {
      this.user_service.deleteUser(
        req.params.id,
        (err: any, delete_details) => {
          if (err) {
            mongoError(err, res);
          } else if (delete_details.deletedCount !== 0) {
            successResponse("delete user successfull", null, res);
          } else {
            failureResponse("invalid user", null, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }
}
