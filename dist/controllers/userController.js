"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const service_1 = require("../modules/common/service");
const service_2 = require("../modules/users/service");
class UserController {
    constructor() {
        this.user_service = new service_2.default();
    }
    create_user(req, res) {
        if (req.body.name &&
            req.body.name.first_name &&
            req.body.name.middle_name &&
            req.body.name.last_name &&
            req.body.email &&
            req.body.phone_number &&
            req.body.gender) {
            const user_params = {
                name: {
                    first_name: req.body.name.first_name,
                    middle_name: req.body.name.middle_name,
                    last_name: req.body.name.last_name,
                },
                email: req.body.email,
                phone_number: req.body.phone_number,
                gender: req.body.gender,
                modification_notes: [
                    {
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modified_note: "New User Created!",
                    },
                ],
            };
            this.user_service.creatUser(user_params, (err) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse("Update user successfull", null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    get_user(req, res) {
        if (req.params.id) {
            const user_filter = { _id: req.params.id };
            this.user_service.filterUser(user_filter, (err, user_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse("Get user successfull", user_data, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    update_user(req, res) {
        if ((req.params.id && req.body.name) ||
            req.body.name.first_name ||
            req.body.name.middle_name ||
            req.body.name.last_name ||
            req.body.email ||
            req.body.phone_number ||
            req.body.gender) {
            const user_filter = { _id: req.params.id };
            this.user_service.filterUser(user_filter, (err, user_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (user_data) {
                    user_data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modified_note: "User data updated",
                    });
                    const user_params = {
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
                    this.user_service.updateUser(user_params, (err) => {
                        if (err) {
                            service_1.mongoError(err, res);
                        }
                        else {
                            service_1.successResponse("update user successfull", null, res);
                        }
                    });
                }
                else {
                    service_1.failureResponse("invalid user", null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    delete_user(req, res) {
        if (req.params.id) {
            this.user_service.deleteUser(req.params.id, (err, delete_details) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (delete_details.deletedCount !== 0) {
                    service_1.successResponse("delete user successfull", null, res);
                }
                else {
                    service_1.failureResponse("invalid user", null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
}
exports.UserController = UserController;
