
"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState, createContext } from "react";

// Create context
export const UserDetailContext = createContext(null);

export default function Provider({ children }) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    if (user) {
      CreateNewUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const CreateNewUser = async () => {
    try {
      const result = await axios.post("/api/user", {
        name: user?.fullName ?? "Anonymous",
        email: user?.primaryEmailAddress?.emailAddress ?? "",
      });

      console.log("✅ User saved:", result.data);
      setUserDetail(result.data);
    } catch (error) {
      console.error(
        "❌ Error creating user:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  );
}
