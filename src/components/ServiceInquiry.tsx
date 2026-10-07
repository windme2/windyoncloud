"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { budgets, packages, serviceContact } from "@/data/services";
import { cn } from "@/lib/utils";
import { getLenis } from "@/lib/lenis";

const EVENT = "service-inquiry";
const UNSURE = "ยังไม่แน่ใจ";

/**
 * A link to the inquiry form (#contact). With `pkg` it also preselects that
 * package on the form, so "สอบถามแพ็กเกจนี้" lands on a form already filled in.
 */
export function InquiryLink({
  pkg,
  className,
  children,
}: {
  pkg?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href="#contact"
      className={className}
      onClick={(e) => {
        if (pkg) window.dispatchEvent(new CustomEvent(EVENT, { detail: pkg }));
        const target = document.getElementById("contact");
        if (!target) return;
        e.preventDefault();
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(target, { offset: -72, duration: 1.4 });
        else target.scrollIntoView({ behavior: "smooth" });
      }}
    >
      {children}
    </a>
  );
}

/** Pick-one pills (radio buttons underneath, so keyboard and screen readers work). */
function Choices({
  name,
  legend,
  options,
  value,
  onChange,
}: {
  name: string;
  legend: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className={labelClass}>{legend}</legend>
      <div className="flex flex-wrap gap-2 pt-1">
        {options.map((opt) => (
          <label key={opt} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={() => onChange(opt)}
              className="peer sr-only"
            />
            <span className="inline-flex rounded-full border px-4 py-2 text-xs transition-colors duration-300 hover:border-foreground peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-primary/60">
              {opt}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

const labelClass = "text-xs text-muted-foreground";
const fieldClass =
  "rounded-none border-0 border-b bg-transparent px-0 shadow-none focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0";

const empty = { name: "", email: "", phone: "", message: "" };

/** Thai inquiry form for /services, sent through the same Formspree endpoint as the home page form. */
export function InquiryForm() {
  const [form, setForm] = useState(empty);
  const [pkg, setPkg] = useState(UNSURE);
  const [budget, setBudget] = useState(UNSURE);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // "สอบถามแพ็กเกจนี้" preselects its package
  useEffect(() => {
    const pick = (e: Event) => setPkg((e as CustomEvent<string>).detail);
    window.addEventListener(EVENT, pick);
    return () => window.removeEventListener(EVENT, pick);
  }, []);

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (!endpoint) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `[Services] ${pkg} — ${form.name}`,
          ...form,
          package: pkg,
          budget,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      setForm(empty);
      setPkg(UNSURE);
      setBudget(UNSURE);
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={submit} className="glass space-y-8 rounded-3xl p-6 md:p-10">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="inq-name" className={labelClass}>
            ชื่อ
          </label>
          <Input id="inq-name" name="name" value={form.name} onChange={change} placeholder="ชื่อของคุณ / ชื่อร้าน" required autoComplete="name" className={fieldClass} />
        </div>
        <div className="space-y-2">
          <label htmlFor="inq-email" className={labelClass}>
            อีเมล
          </label>
          <Input id="inq-email" name="email" type="email" value={form.email} onChange={change} placeholder="you@example.com" required autoComplete="email" className={fieldClass} />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="inq-phone" className={labelClass}>
          LINE ID หรือเบอร์โทร <span className="opacity-70">(ไม่บังคับ)</span>
        </label>
        <Input id="inq-phone" name="phone" value={form.phone} onChange={change} placeholder="สะดวกให้ติดต่อกลับทางไหน" autoComplete="tel" className={fieldClass} />
      </div>

      <Choices name="package" legend="แพ็กเกจที่สนใจ" options={[...packages.map((p) => p.name), UNSURE]} value={pkg} onChange={setPkg} />
      <Choices name="budget" legend="งบประมาณ (บาท)" options={budgets} value={budget} onChange={setBudget} />

      <div className="space-y-2">
        <label htmlFor="inq-message" className={labelClass}>
          รายละเอียด
        </label>
        <Textarea
          id="inq-message"
          name="message"
          value={form.message}
          onChange={change}
          placeholder="อยากทำอะไร ใช้กับธุรกิจแบบไหน มีตัวอย่างเว็บที่ชอบไหม"
          required
          className={cn(fieldClass, "min-h-32 resize-none")}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6">
        <button type="submit" disabled={status === "sending"} className="group inline-flex cursor-pointer items-center gap-5 disabled:opacity-60">
          <span className="glow-btn grid h-16 w-16 place-items-center rounded-full border border-foreground/40 transition-colors duration-300 group-hover:border-primary group-hover:text-primary-ink group-disabled:border-foreground/40 group-disabled:text-current">
            <ArrowUpRight size={20} strokeWidth={1.25} />
          </span>
          <span className={cn("text-sm font-medium", status === "sending" && "animate-pulse")}>
            {status === "sending" ? "กำลังส่ง..." : "ส่งข้อความ"}
          </span>
        </button>

        <p role="status" aria-live="polite" className="text-sm">
          {status === "success" && <span className="text-emerald-600 dark:text-emerald-300">ได้รับข้อความแล้ว จะตอบกลับภายใน 24 ชั่วโมง</span>}
          {status === "error" && (
            <span className="text-red-600 dark:text-red-300">
              ส่งไม่สำเร็จ ลองใหม่อีกครั้ง หรือส่งอีเมลมาที่{" "}
              <a href={`mailto:${serviceContact.email}`} className="underline underline-offset-4">
                {serviceContact.email}
              </a>
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
