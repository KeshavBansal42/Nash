import z from "zod";

export const logoutSchema = z.object({
  refresh_token: z.base64(),
});

export type LogoutRequestDTO = z.infer<typeof logoutSchema>;
