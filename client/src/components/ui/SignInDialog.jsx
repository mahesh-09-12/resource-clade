import React from "react";
import {
  Button,
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { useTheme } from "../context/ThemeProvider";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthProvider";
import { useModel } from "../context/ModelProvider";
import { IoClose } from "react-icons/io5";

const SignInDialog = () => {
  const { theme } = useTheme();
  const { login } = useAuth();

  const { isOpen, setIsOpen } = useModel();

  return (
    <>
      <Button
        className="rounded-lg cursor-pointer bg-cyan-500 px-4 py-2 text-xs md:text-sm text-white data-hover:bg-cyan-600 data-hover:data-active:bg-cyan-700"
        onClick={() => setIsOpen(true)}
      >
        Sign in
      </Button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/30 duration-300 ease-out data-closed:opacity-0"
        />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            transition
            className={`relative max-w-lg space-y-4 p-12 duration-300 ease-out data-closed:scale-95 data-closed:opacity-0 rounded-lg ${
              theme === "light"
                ? "text-gray-900 bg-gray-300"
                : "text-gray-200 bg-zinc-600"
            }`}
          >
            <button
              onClick={() => setIsOpen(false)}
              className={`absolute top-4 right-4 ${
                theme === "light"
                  ? "hover:text-zinc-900"
                  : "hover:text-gray-400"
              } cursor-pointer transition-all`}
              aria-label="Close"
            >
              <IoClose className="w-5 h-5" />
            </button>
            <img
              src={`${
                theme === "light"
                  ? "/resourceclade.png"
                  : "/resourceclade_dark.png"
              }`}
              alt="logo"
              className="mt-1 w-36 h-12 md:w-44 md:h-14 cursor-pointer"
            />
            <DialogTitle className="text-lg font-bold">
              Sign in to your Account
            </DialogTitle>
            <Description className="text-sm md:text-[1rem]">
              Continue with your google account
            </Description>
            <div>
              <Button
                onClick={login}
                className={`mt-4 w-full flex items-center justify-center gap-2 px-4 md:px-8 py-2 text-xs md:text-sm rounded-lg cursor-pointer ${
                  theme === "light"
                    ? "text-gray-900 bg-gray-200"
                    : "text-gray-200 bg-zinc-500"
                }`}
              >
                <FcGoogle style={{ width: "1.7rem", height: "1.7rem" }} />
                Sign in with Google
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default SignInDialog;
