import bcrypt from "bcrypt";
import crypto from "crypto";
import { Document, Schema, model } from "mongoose";
import { NextFunction } from "express";
import { IUserModel } from "./user.interface";

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
    },
    lastname: {
      type: String,
    },

    password: {
      type: String,
      required: true,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    tokens: Array,
  },
  {
    // collection: "users",
    versionKey: false,
  }
).pre("save", async function (next: NextFunction): Promise<void> {
  const user: any = this; // tslint:disable-line

  if (!user.isModified("password")) {
    return next();
  }

  try {
    const salt: string = await bcrypt.genSalt(10);

    const hash: string = await bcrypt.hash(user.password, salt);

    user.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

/**
 * Method for comparing passwords
 */
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    const match: boolean = await bcrypt.compare(
      candidatePassword,
      this.password
    );

    return match;
  } catch (error) {
    return error;
  }
};

/**
 * Helper method for getting user's gravatar.
 */
UserSchema.methods.gravatar = function (size: number): string {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5: string = crypto.createHash("md5").update(this.email).digest("hex");

  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

export default model<IUserModel>("users", UserSchema);
