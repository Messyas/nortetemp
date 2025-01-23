"use client";

import {
  ArrowRightIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

import { useFormStatus } from "react-dom";
import { Button } from "../button";
import { handleSendEmailVerificationCode } from "@/lib/cognitoActions";
import { useActionState } from "react";

export default function SendVerificationCode() {
  const [response, dispatch] = useActionState(handleSendEmailVerificationCode, {
    message: "",
    errorMessage: "",
  });
  const { pending } = useFormStatus();
  return (
    <>
      <Button
        className="mt-4 w-full"
        aria-disabled={pending}
        formAction={dispatch}
      >
        Reenviar código de verificação{" "}
        <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </Button>
      <div className="flex h-8 items-end space-x-1">
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {response?.errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{response.errorMessage}</p>
            </>
          )}
          {response?.message && (
            <p className="text-sm text-green-500">{response.message}</p>
          )}
        </div>
      </div>
    </>
  );
}