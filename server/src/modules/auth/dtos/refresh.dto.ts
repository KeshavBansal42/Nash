import z from "zod";

export const refreshSchema = z.object({
  refresh_token: z.base64(),
});

export type RefreshRequestDTO = z.infer<typeof refreshSchema>;
