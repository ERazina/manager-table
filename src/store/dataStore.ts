import { create } from "zustand";
import axios from "axios";
import { z } from "zod";

const planFactSchema = z.object({
  income: z.number(),
  activePartners: z.number(),
});

const monthSchema = z
  .object({
    income: z.number(),
    activePartners: z.number(),
    plan: planFactSchema,
    fact: planFactSchema,
  })
  .nullable(); // потому что бывают null

const managerSchema = z.object({
  id: z.number(),
  adminId: z.number(),
  adminName: z.string(),
  year: z.number(),
  months: z.array(monthSchema),
});

const dataSchema = z.object({
  success: z.literal(true),
  data: z.object({
    total: z.array(
      z.object({
        plan: planFactSchema,
        fact: planFactSchema,
      })
    ),
    table: z.array(managerSchema),
  }),
});

export type ParsedData = z.infer<typeof dataSchema>;

type DataStore = {
  data: ParsedData | null;
  isLoading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
};

const url = "https://3snet.co/js_test/api.json";

export const dataStore = create<DataStore>((set) => ({
  data: null,
  isLoading: false,
  error: null,

  fetchData: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.get(url);
      const parsed = dataSchema.safeParse(res.data);

      if (!parsed.success) {
        console.error("Ошибка валидации:", parsed.error.format());
        throw new Error("Неверный формат данных от сервера");
      }

      set({ data: parsed.data, isLoading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Неизвестная ошибка";
      set({ error: message, isLoading: false });
    }
  },
}));
