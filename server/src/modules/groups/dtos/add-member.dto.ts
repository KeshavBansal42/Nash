import {z} from "zod";

export const AddOrRemoveMemberSchema = z.object({
    username: z.string(),
});

export type AddOrRemoveMemberRequestDTO = z.infer<typeof AddOrRemoveMemberSchema>;