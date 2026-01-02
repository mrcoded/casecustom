"use server";

import bcrypt from "bcrypt";
import { db } from "@/config/db";

import { RegisterAuthFormValues } from "@/types/auth";

export async function registerUserFn(
  formData: RegisterAuthFormValues
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

    //Encrypt password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 16);

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
