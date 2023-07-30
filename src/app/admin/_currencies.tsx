import { useAuthContext } from "@/context/AuthContext";
import { getUserCurrencies, postUserCurrencies } from "@/firebase/store/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CheckCurrency from "./_checkCurrency";
import { Currency } from "../types";

export default ({ currencies }: { currencies: Currency[] }) => {
  const { user } = useAuthContext();

  const { data: userCurrencies = [] } = useQuery({
    queryKey: ["userCurrencies"],
    queryFn: () => getUserCurrencies(user!.uid),
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newCurrencies: Currency[]) =>
      postUserCurrencies(newCurrencies, user!.uid),
    mutationKey: [user!.uid],
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["userCurrencies"] });
    },
  });
  const onchangeSelectedCurrencies = ({ id, name }: Currency) => {
    const newCurrencies = !userCurrencies.some((c: Currency) => c.id === id)
      ? [
          ...userCurrencies,
          {
            id,
            name,
          },
        ]
      : userCurrencies.filter((c) => c.id !== id);
    newCurrencies.length < 4 && mutation.mutate(newCurrencies);
  };

  return (
    <ul className="columns-3">
      {currencies.map((currency: Currency) => (
        <CheckCurrency
          onchangeSelectedCurrencies={onchangeSelectedCurrencies}
          key={currency.id}
          currency={{
            ...currency,
            selected: userCurrencies.some(
              (c: Currency) => c.id === currency.id
            ),
          }}
        />
      ))}
    </ul>
  );
};
