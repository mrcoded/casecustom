"use server";

import argon2 from "argon2";
import { db } from "@/config/db";

import { RegisterAuthFormValues } from "@/types/auth";

export async function registerUserFn(
  formData: RegisterAuthFormValues,
): Promise<RegisterAuthFormValues> {
  //destructure data
  const { email, password, name } = formData;

  try {
    //check if user already exists in the db
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        message: "User Already exists!",
        success: false,
      };
    }

    //Encrypt password with argon2
    const hashedPassword = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16, //64mb
      timeCost: 5,
      parallelism: 1,
    });

    //Create new user
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: `Registration successful, redirecting to Login...`,
    };
  } catch (error) {
    throw new Error("Registration failed. Please try again.");
  }
}
