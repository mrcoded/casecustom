"use server";

import { db } from "@/config/db";
import { SaveCustomizeArgs } from "@/types/customize.types";

export async function saveCustomize({
  color,
  finish,
  material,
  model,
  configId,
}: SaveCustomizeArgs) {
  await db.configuration.update({
    where: { id: configId },
    data: { color, finish, material, model },
  });
}
