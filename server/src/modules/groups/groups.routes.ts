import { Router } from "express";
import * as controller from "./groups.controller.js"
import { validate } from "../../middleware/validate.middleware.js";
import { CreateGroupSchema } from "./dtos/create-group.dto.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { AddMemberSchema } from "./dtos/add-member.dto.js";

const router = Router();

router.post('/create',authenticate,validate(CreateGroupSchema),controller.createGroup);
router.get('/:group_id',authenticate,controller.getGroupById);
router.post('/:group_id/members',authenticate,validate(AddMemberSchema),controller.addMember);

export default router;