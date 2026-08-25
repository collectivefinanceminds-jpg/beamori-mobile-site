import type { ReactNode } from "react";

export function Field({
  label,
  name,
  type,
  autoComplete,
  required,
  minLength,
  defaultValue,
  onChange,
}: {
  label: string;
  name: string;
  type: string;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted">{label}</span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
        defaultValue={defaultValue}
        onChange={onChange}
        className="rounded-btn bg-ivory px-4 py-2.5 text-sm text-ink outline-none placeholder:text-muted"
      />
    </label>
  );
}

export function StatusText({
  tone,
  children,
}: {
  tone: "error" | "success";
  children: ReactNode;
}) {
  return (
    <p className={`text-sm ${tone === "error" ? "text-red-600" : "text-forest"}`}>
      {children}
    </p>
  );
}

export function SubmitButton({
  pending,
  disabled,
  children,
}: {
  pending: boolean;
  disabled?: boolean;
  children: ReactNode;
}) {
  const isDisabled = pending || Boolean(disabled);
  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={`rounded-btn w-full py-3 text-sm font-semibold transition-colors ${
        isDisabled
          ? "cursor-not-allowed bg-hairline text-muted"
          : "bg-forest text-white"
      }`}
    >
      {pending ? "Please wait…" : children}
    </button>
  );
}
