"use client";
import Dropdown from "@/components/Form/Dropdown";
import Roles from "@/models/Roles";
import connectDB from "@/utils/connectDb";
import { useEffect, useState } from "react";
import { getRoles } from "./api";

type RolesDropdownProps = {
  errorMessage?: string;
};
const RolesDropdown = ({ errorMessage }: RolesDropdownProps) => {
  const [roles, setRoles] = useState<any[]>([]);
  useEffect(() => {
    getRoles().then((data) => {
      setRoles(data);
    });
  }, []);
  return (
    <Dropdown
      label="Role"
      name="role"
      options={roles.map((role) => ({
        value: role._id,
        label: role.name,
      }))}
      errorMessage={errorMessage}
    />
  );
};

export default RolesDropdown;
