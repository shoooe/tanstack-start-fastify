import { useMutation } from "@tanstack/react-query";
import { someMutation } from "~/functions/some-mutation";

export const useSomeMutation = () => {
  const { mutateAsync, isPending, data } = useMutation({
    mutationFn: someMutation,
  });

  const run = (name: string) => mutateAsync({ data: { name } });
  return [run, { isLoading: isPending, data }] as const;
};
