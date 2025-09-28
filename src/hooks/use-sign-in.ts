import { useMutation } from "@tanstack/react-query";
import { signIn } from "~/utils/post";

export const useSignIn = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: signIn,
  });

  const run = () => mutateAsync({});
  return [run, { isLoading: isPending }] as const;
};
