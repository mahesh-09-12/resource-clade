import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useAuth } from "../context/AuthProvider";
import { IoLogOut } from "react-icons/io5";
import { useTheme } from "../context/ThemeProvider";

const UserDropdown = () => {
  const { user, logout } = useAuth();
  const { theme } = useTheme();

  return (
    <Menu as="div" className="relative text-left">
      <MenuButton className="focus:outline-none">
        <img
          src={user.picture}
          alt="User avatar"
          referrerPolicy="no-referrer"
          className="w-10 h-10 mt-1.5 rounded-full hover:scale-105 transition-transform cursor-pointer"
        />
      </MenuButton>

      <MenuItems
        className={`absolute right-0 mt-2 w-48 origin-top-right rounded-lg shadow-lg ring-1 ring-black/5 ${
          theme === "light" ? "bg-gray-300" : "bg-zinc-800"
        } z-50 focus:outline-none`}
      >
        <div
          className={`px-4 py-3 border-b ${
            theme === "light" ? "border-gray-100" : "border-zinc-700"
          }`}
        >
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs truncate">{user.email}</p>
        </div>

        <div className="p-2">
          <MenuItem>
            {({ active }) => (
              <button
                onClick={logout}
                className={`flex w-full items-center gap-2 rounded-md text-red-500 px-4 py-2 text-sm transition-colors ${
                  active
                    ? `${theme === "light" ? "bg-red-100" : "bg-red-300"}`
                    : "text-red-400"
                } cursor-pointer`}
              >
                <IoLogOut className="w-4 h-4" />
                Sign Out
              </button>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
};

export default UserDropdown;
