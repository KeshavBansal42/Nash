import {z} from "zod";
export const CreateGroupSchema = z.object({
    name: z.string(),
    description: z.string(),
});

export type CreateGroupRequestDTO = z.infer<typeof CreateGroupSchema>;