import {z} from "zod";

export const AddMemberSchema = z.object({
    username: z.string(),
});

export type AddMemberRequestDTO = z.infer<typeof AddMemberSchema>;