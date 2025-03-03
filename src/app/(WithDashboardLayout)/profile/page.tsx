"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { getMe } from "@/services/AuthService";
import { Button } from "@/components/ui/button";

interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "admin" | "landLord" | "tenant";
  isBlocked: boolean;
  image: string;
}

export default function UserProfile() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(user);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="w-24 h-24 border-2 border-gray-300">
            <AvatarImage
              src={user?.image || "/default-avatar.png"}
              alt="User Avatar"
            />
            <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-xl font-semibold mt-3">
            {user?.name}
          </CardTitle>
          <Badge
            variant={user?.isBlocked ? "destructive" : "default"}
            className="mt-2"
          >
            {user?.isBlocked ? "Blocked" : "Active"}
          </Badge>
        </CardHeader>
        <Separator />
        <CardContent className="mt-4 space-y-3 text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span>{user?.userEmail}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Phone:</span>
            <span>{user?.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Role:</span>
            <Badge variant="outline">{user?.userRole}</Badge>
          </div>
        </CardContent>

        <Separator />

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <Button className="w-full" variant="outline">
            Edit Profile
          </Button>
          <Button className="w-full" variant="default">
            Change Password
          </Button>
        </div>
      </Card>
    </div>
  );
}
