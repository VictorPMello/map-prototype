"use client";

import { createProperty } from "@/app/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";

export default function PropertyForm() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const formRef = useRef<HTMLFormElement>(null);

  const mutation = useMutation({
    mutationFn: async (data: FormData) => await createProperty(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      formRef.current?.reset();
    },
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(formRef.current!);

    mutation.mutate(formData);
  };

  const handleCancel = () => {
    formRef.current?.reset();
    setOpen(false);
  };

  return (
    <>
      {/* BOTÃO ABRIR */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-5 left-5  px-4 py-2 bg-black text-white rounded-xl"
      >
        Novo Imóvel
      </button>

      {/* DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-xl  bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-6 overflow-y-auto h-full"
        >
          <h2 className="text-xl font-bold">Cadastrar Imóvel</h2>

          {/* TITLE */}
          <div>
            <label className="text-sm">Título</label>
            <input name="title" className="input" required />
          </div>

          {/* PHONE */}
          <div>
            <label className="text-sm">Telefone</label>
            <input name="phone" className="input" required />
          </div>

          {/* PRICE */}
          <div>
            <label className="text-sm">Preço</label>
            <input name="price" className="input" required />
          </div>

          {/* CONTRACT */}
          <div>
            <label className="text-sm">Contrato</label>
            <select name="contractType" className="input">
              <option value="sale">Compra</option>
              <option value="rent">Aluguel</option>
            </select>
          </div>

          {/* TYPE */}
          <div>
            <label className="text-sm">Tipo</label>
            <select name="type" className="input">
              <option value="house">Casa</option>
              <option value="apartment">Apartamento</option>
            </select>
          </div>

          {/* CONDO */}
          <div>
            <label className="text-sm">Condomínio</label>
            <input name="condoFee" className="input" />
          </div>

          {/* ADDRESS */}
          <div>
            <label className="text-sm">Endereço</label>
            <input name="address" className="input" required />
          </div>

          <div>
            <label className="text-sm">Cidade</label>
            <input name="city" className="input" />
          </div>

          <div>
            <label className="text-sm">Estado</label>
            <input name="state" className="input" />
          </div>

          <div>
            <label className="text-sm">CEP</label>
            <input name="zipCode" className="input" />
          </div>

          {/* BOTÕES */}
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="flex-1 bg-black text-white py-2 rounded-xl"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Salvando..." : "Salvar"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 border py-2 rounded-xl"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
