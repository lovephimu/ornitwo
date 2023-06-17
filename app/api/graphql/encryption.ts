import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { z } from 'zod';
// import { createSession } from
// import { getUserWithPasswordHash, User } from
// import { secureCookieOptions } from util/cookies
import { User } from '../../../database/database';

type Error = {
  error: string;
};

export type LoginResponseBodyPost =
  | {
      user: User;
    }
  | Error;

const userSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

// mutation to send data and return created user

const passwordHash = await bcrypt.hash(result.data.password, 10);
