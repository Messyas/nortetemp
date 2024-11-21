import { redirect } from "next/navigation"; // Utilitário para redirecionamento de páginas.
import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  resendSignUpCode,
  autoSignIn
} from "aws-amplify/auth"; // Funções de autenticação do AWS Amplify.
import { getErrorMessage } from "@/utils/get-error-message"; // Função para lidar com mensagens de erro.

// Função para tratar cadastro de novo usuário.
export async function handleSignUp(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: String(formData.get("email")),
      password: String(formData.get("password")),
      options: {
        userAttributes: {
          email: String(formData.get("email")), // Atributo obrigatório.
          name: String(formData.get("name")),  
        },
        autoSignIn: true, // Efetua login automaticamente após cadastro.
      },
    });
  } catch (error) {
    return getErrorMessage(error); // Retorna mensagem de erro, se houver.
  }
  redirect("/auth/confirm-signup"); // Redireciona para confirmação de cadastro.
}

// Reenvia código de verificação para o e-mail do usuário.
export async function handleSendEmailVerificationCode(
  prevState: { message: string; errorMessage: string },
  formData: FormData
) {
  let currentState;
  try {
    await resendSignUpCode({
      username: String(formData.get("email")),
    });
    currentState = {
      ...prevState,
      message: "Code sent successfully",
    };
  } catch (error) {
    currentState = {
      ...prevState,
      errorMessage: getErrorMessage(error),
    };
  }
  return currentState;
}

// Confirmação de código enviado para ativar a conta do usuário.
export async function handleConfirmSignUp(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username: String(formData.get("email")),
      confirmationCode: String(formData.get("code")),
    });
    autoSignIn(); // Faz login automático após ativação.
  } catch (error) {
    return getErrorMessage(error);
  }
  redirect("/auth/login"); // Redireciona para a página de login.
}

// Gerencia o login do usuário.
export async function handleSignIn(
  prevState: string | undefined,
  formData: FormData
) {
  let redirectLink = "/dashboard"; // Destino padrão após login.
  try {
    const { isSignedIn, nextStep } = await signIn({
      username: String(formData.get("email")),
      password: String(formData.get("password")),
    });
    if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
      await resendSignUpCode({
        username: String(formData.get("email")),
      });
      redirectLink = "/auth/confirm-signup"; // Redireciona para confirmação de cadastro.
    }
  } catch (error) {
    return getErrorMessage(error);
  }
  redirect(redirectLink); // Redireciona para a página apropriada após login.
}

// Realiza logout do sistema.
export async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log(getErrorMessage(error)); // Log de erros ao fazer logout.
  }
  redirect("/auth/login"); // Redireciona para a página de login após logout.
}
