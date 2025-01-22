"use client";
import { ExclamationCircleIcon, KeyIcon } from "@heroicons/react/24/outline";
import { handleUpdatePassword } from "@/lib/cognitoActions";
import { Button } from "../button";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

export default function UpdatePasswordForm() {
  const [status, dispatch] = useActionState(handleUpdatePassword, undefined);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Senha atual
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="current_password"
                type="password"
                name="current_password"
                placeholder="Enter current password"
                required
                minLength={6}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Nova senha
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="new_password"
                type="password"
                name="new_password"
                placeholder="Enter new password"
                required
                minLength={6}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {status === "error" && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">
                Ocorreu um erro ao atualizar a senha.
              </p>
            </>
          )}
          {status === "success" && (
            <p className="text-sm text-green-500">
              Senha atualizada com sucesso.
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <UpdateButton />
      </div>
    </form>
  );
}

function UpdateButton() {
  const { pending } = useFormStatus();

  return <Button aria-disabled={pending}>Atualizar senha</Button>;
}