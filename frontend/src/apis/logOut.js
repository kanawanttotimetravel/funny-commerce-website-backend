'use server'

import {deleteSession} from "@/apis/session";
import {redirect} from "next/navigation";

export const logOut = async () => {
  await deleteSession();
  redirect('/login')
}

