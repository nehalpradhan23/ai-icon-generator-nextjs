import { db } from "@/configs/Firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userEmail, userName } = await req.json();

  try {
    // if user already exist
    const docRef = doc(db, "users", userEmail);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return NextResponse.json(docSnap.data());
    } else {
      // insert new user
      const data = {
        name: userName,
        email: userEmail,
        credits: 5,
      };
      await setDoc(doc(db, "users", userEmail), {
        ...data,
      });
      return NextResponse.json(data);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
