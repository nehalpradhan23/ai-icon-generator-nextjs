"use client";
import React, { useEffect } from "react";
import Header from "./_components/Header";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

function Provider({ children }) {
  const { user } = useUser();

  useEffect(() => {
    user && CheckUserAuth();
  }, [user]);

  //ave user data
  const CheckUserAuth = async () => {
    // save user to database
    const result = await axios.post("/api/users", {
      userName: user?.fullName,
      userEmail: user?.primaryEmailAddress?.emailAddress,
    });
    console.log(result.data);
  };
  return (
    <div>
      <Header />
      <div className="px-10 lg:px-32 xl:px-48 2xl:px-56">{children}</div>
    </div>
  );
}

export default Provider;
