import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormWrapper } from "@/design-system/molecules/FormWrapper";
import { FormInput } from "@/design-system/molecules/FormFields";

const schema = z.object({ email: z.string().email("Bad email") });
type V = z.infer<typeof schema>;

function Harness({ onSubmit }: { onSubmit: (v: V) => void }) {
  const form = useForm<V>({ resolver: zodResolver(schema), defaultValues: { email: "" } });
  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <FormInput<V> name="email" label="Email" />
      <button type="submit">Go</button>
    </FormWrapper>
  );
}

describe("FormInput + FormWrapper", () => {
  it("blocks invalid submissions and surfaces Zod errors", async () => {
    const onSubmit = vi.fn();
    render(<Harness onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "nope" } });
    fireEvent.click(screen.getByText("Go"));
    expect(await screen.findByText("Bad email")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
