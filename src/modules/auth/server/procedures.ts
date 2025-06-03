import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import z from "zod";
import { headers as getHeaders } from "next/headers";

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();

    const session = await ctx.db.auth({ headers });

    return session;
  }),
  register: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
        username: z
          .string()
          .min(3, "Username must be at least 3 characters")
          .max(63, "Username must be less than 63 characters")
          .regex(
            /^[a-z0-9] [a-z0-9] * [a-z0-9]$/,
            "Username can only contain lowercase letters, numbers and hyphens. It must start and end with a letter or number"
          )
          .refine((val) => !val.includes("--"), "Username cannot contain consecutive hyphens")
          .transform((val) => val.toLowerCase()),
        // [username].shop.com
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db.cr;
    }),
});
