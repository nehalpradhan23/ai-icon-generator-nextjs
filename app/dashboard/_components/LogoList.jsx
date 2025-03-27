"use client";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { db } from "@/configs/Firebase.config";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

function LogoList() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const [logoList, setLogoList] = useState([]);

  const GetUserLogo = async () => {
    const querySnapshot = await getDocs(
      collection(db, "users", userDetail?.email, "logos")
    );
    setLogoList([]);
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      setLogoList((prev) => [...prev, doc.data()]);
    });
  };

  useEffect(() => {
    userDetail && GetUserLogo();
  }, [userDetail]);

  const ViewLogo = (logoImage) => {
    const imageWindow = window.open();
    imageWindow.document.write(`<img src="${logoImage}" alt="Base64 Image" />`);
  };

  return (
    <div className="mt-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {logoList?.length > 0
          ? logoList?.map((logo, index) => (
              <div
                onClick={() => ViewLogo(logo?.image)}
                key={index}
                className="hover:scale-105 transition-all cursor-pointer"
              >
                <Image
                  src={logo?.image}
                  alt={logo?.title}
                  width={400}
                  height={200}
                  className="w-full rounded-xl"
                />
                <h2 className="text-center text-xl font-bold mt-2">
                  {logo?.title}
                </h2>
                <p className="text-sm text-gray-700 text-center">
                  {logo?.desc}
                </p>
              </div>
            ))
          : [1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="bg-slate-200 animate-pulse rounded-xl w-full h-[200px]"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default LogoList;
