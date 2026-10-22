import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Mail,
  MessageCircle,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SkyBackground } from "@/components/SkyBackground";
import { ProjectTile } from "@/components/ProjectTile";
import { LandingStrip } from "@/components/LandingStrip";
import { FaqList } from "@/components/FaqList";
import { InquiryForm, InquiryLink } from "@/components/ServiceInquiry";
import { projects } from "@/data/projects";
import {
  packages,
  steps,
  faqs,
  serviceContact,
  clientTestimonials,
} from "@/data/services";
import { Testimonials } from "@/components/Testimonials";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "รับทำเว็บไซต์ Landing page และระบบภายใน — windyoncloud",
  description:
    "รับทำ Landing page เว็บไซต์ธุรกิจ และระบบภายในอย่างระบบคลังสินค้า ระบบจองคิว โดย Intouch Charoenphon นักพัฒนา Full-stack ที่มีพื้นฐานงาน logistics และ IT infrastructure",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "รับทำเว็บไซต์และระบบ — windyoncloud",
    description: "Landing page · เว็บไซต์ธุรกิจ · ระบบภายใน · ดูแลรายเดือน",
    locale: "th_TH",
    url: "/services",
    // this openGraph object replaces the root one, so point at the site share image explicitly
    images: ["/opengraph-image"],
  },
};

const label =
  "font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground";

const pill =
  "inline-flex items-center gap-2 rounded-full border px-6 py-3 text-xs font-medium tracking-wide transition-colors";

/** Section heading for this page: Thai has no italic serif, so the accent is colour only. */
function Heading({
  eyebrow,
  title,
  accent,
}: {
  eyebrow: string;
  title: string;
  accent: string;
}) {
  return (
    <div className="reveal mb-10 border-b pb-5 md:mb-14">
      <p className={label}>{eyebrow}</p>
      <h2 className="mt-4 font-display text-3xl font-extralight leading-tight tracking-tight md:text-5xl">
        <span className="text-sky">
          {title} <span className="accent font-light">{accent}</span>
        </span>
      </h2>
    </div>
  );
}

/** Direct channels beside the form: LINE and Fastwork (each only when set), and email. */
function DirectChannels() {
  const links = [
    serviceContact.line && {
      href: serviceContact.line,
      icon: MessageCircle,
      label: "LINE",
      value: "แชทได้ทันที",
    },
    serviceContact.fastwork && {
      href: serviceContact.fastwork,
      icon: BriefcaseBusiness,
      label: "Fastwork",
      value: "ดูรีวิว · จ้างผ่านระบบ",
    },
    {
      href: `mailto:${serviceContact.email}?subject=${encodeURIComponent("สอบถามงาน")}`,
      icon: Mail,
      label: "Email",
      value: serviceContact.email,
    },
  ].filter(Boolean) as {
    href: string;
    icon: typeof Mail;
    label: string;
    value: string;
  }[];
  return (
    <ul className="border-t">
      {links.map(({ href, icon: Icon, label: name, value }) => (
        <li key={name} className="border-b">
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 py-4"
          >
            <span className="flex items-center gap-4">
              <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary-ink" />
              <span className={label}>{name}</span>
            </span>
            <span className="text-sm transition-transform group-hover:translate-x-1">
              {value}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function ServicesPage() {
  const samples = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <div
      lang="th"
      className={cn(
        "page-sky relative isolate flex min-h-screen flex-col font-sans text-foreground",
      )}
    >
      <SkyBackground />
      <Header />

      <main className="flex-1 pb-16 pt-32 md:pb-24 md:pt-40">
        {/* Hero */}
        <section className="container max-w-7xl">
          <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="lg:col-span-7">
              <p className="reveal font-mono text-[10px] uppercase tracking-[0.25em] text-primary-ink">
                Services
              </p>
              <h1 className="reveal mt-5 max-w-5xl font-display text-[clamp(2.6rem,8vw,6.5rem)] lg:text-[clamp(3.5rem,5.4vw,5.5rem)] font-extralight leading-[1.08] tracking-tight">
                <span className="text-sky">
                  เว็บไซต์และระบบ
                  <br />
                  ที่<span className="accent font-light">ใช้งานได้จริง</span>
                </span>
              </h1>
              <p className="reveal mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                ผมเริ่มจากงานคลังสินค้าและ IT infrastructure ก่อนมาเป็นนักพัฒนา
                จึงเข้าใจว่าระบบที่ดีต้อง
                <span className="text-foreground">ใช้ง่ายสำหรับคนหน้างาน</span> และ
                <span className="text-foreground">ไม่ล่มตอนสำคัญ</span>
              </p>

              <div className="reveal mt-10 flex flex-wrap items-center gap-3">
                <InquiryLink
                  className={cn(
                    pill,
                    "border-primary bg-primary text-primary-foreground hover:border-foreground hover:bg-foreground hover:text-background dark:hover:text-background",
                  )}
                >
                  <MessageCircle size={14} /> ปรึกษาฟรี
                </InquiryLink>
                <a
                  href="#packages"
                  className={cn(
                    pill,
                    "hover:border-foreground hover:bg-foreground hover:text-background",
                  )}
                >
                  ดูแพ็กเกจและราคา
                </a>
              </div>
            </div>

            {/* Desktop: a fan of real work beside the copy, so the hero isn't half empty */}
            <div
              aria-hidden="true"
              className="relative hidden lg:col-span-5 lg:block"
            >
              <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
                {samples.map((p, i) => (
                  <div
                    key={p.slug}
                    data-parallax={["0.04", "-0.03", "0.07"][i]}
                    className={cn(
                      "reveal absolute w-[78%]",
                      [
                        "left-0 top-[4%] -rotate-6",
                        "right-0 top-[30%] rotate-3",
                        "left-[8%] top-[58%] -rotate-2",
                      ][i],
                    )}
                    style={{ zIndex: i + 1 }}
                  >
                    <div className="glass rounded-2xl p-1.5 shadow-2xl">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                        <Image
                          src={p.image}
                          alt=""
                          fill
                          sizes="360px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ul className="reveal mt-14 grid grid-cols-1 border-y sm:grid-cols-3">
            {[
              ["ส่งมอบโค้ด 100%", "เว็บและบัญชีทั้งหมดเป็นของคุณ"],
              ["ราคาชัดตั้งแต่แรก", "ใบเสนอราคาระบุขอบเขตงานครบ"],
              ["ดูแลฟรี 30 วัน", "หลังขึ้นระบบจริง"],
            ].map(([title, note], i) => (
              <li
                key={title}
                className={cn(
                  "py-5 sm:px-6",
                  i > 0 && "border-t sm:border-l sm:border-t-0",
                  i === 0 && "sm:pl-0",
                )}
              >
                <span className="block font-display text-lg font-light">
                  {title}
                </span>
                <span className="mt-1 block text-xs text-muted-foreground">
                  {note}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Work samples: follows the hero's promise strip, so a shorter gap than between other sections */}
        <section className="pt-20 md:pt-24">
          <div className="container max-w-7xl">
            <Heading eyebrow="Work" title="ตัวอย่าง" accent="ผลงาน" />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {samples.map((p) => (
                <li key={p.slug} className="reveal">
                  <ProjectTile project={p} />
                </li>
              ))}
            </ul>
            <Link
              href="/projects"
              className="reveal mt-6 inline-flex items-center gap-2 text-xs tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              ดูผลงานทั้งหมด <ArrowUpRight size={14} />
            </Link>
          </div>
          <LandingStrip lang="th" />
        </section>

        {/* Packages */}
        <section
          id="packages"
          className="container max-w-7xl scroll-mt-24 pt-24 md:pt-36"
        >
          <Heading eyebrow="Packages" title="บริการและ" accent="ราคา" />
          <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {packages.map((pkg) => (
              <li
                key={pkg.name}
                className={cn(
                  "reveal glass relative flex flex-col rounded-3xl p-6 md:p-7",
                  pkg.popular && "ring-1 ring-primary",
                )}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[10px] font-medium tracking-wide text-primary-foreground">
                    ยอดนิยม
                  </span>
                )}
                <h3 className="font-display text-2xl font-light">{pkg.name}</h3>
                <p className="mt-2 min-h-[3rem] text-sm leading-relaxed text-muted-foreground">
                  {pkg.forWho}
                </p>

                <p className="mt-6 border-t pt-6">
                  <span className="text-xs text-muted-foreground">
                    {pkg.price ? "เริ่มต้น" : "ราคา"}
                  </span>
                  <span className="mt-1 block font-display text-3xl font-extralight tracking-tight">
                    {pkg.price ? `฿${pkg.price}` : "สอบถามราคา"}
                    {pkg.price && pkg.unit && (
                      <span className="ml-1 text-sm font-light text-muted-foreground">
                        / {pkg.unit}
                      </span>
                    )}
                  </span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    ระยะเวลา {pkg.time}
                  </span>
                </p>

                <ul className="mt-6 flex-1 space-y-3 text-sm">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check
                        size={16}
                        className="mt-0.5 shrink-0 text-primary-ink"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <InquiryLink
                  pkg={pkg.name}
                  className={cn(
                    pill,
                    "mt-8 justify-center",
                    pkg.popular
                      ? "border-primary bg-primary text-primary-foreground hover:border-foreground hover:bg-foreground hover:text-background dark:hover:text-background"
                      : "hover:border-foreground hover:bg-foreground hover:text-background",
                  )}
                >
                  สอบถามแพ็กเกจนี้ <ArrowUpRight size={14} />
                </InquiryLink>
              </li>
            ))}
          </ul>
          <p className="reveal mt-6 text-xs text-muted-foreground">
            ราคาเป็นราคาเริ่มต้น งานจริงประเมินตามขอบเขต · ยังไม่รวมค่าโดเมนและโฮสติ้ง
          </p>
        </section>

        {/* Process */}
        <section className="container max-w-7xl pt-24 md:pt-36">
          <Heading eyebrow="Process" title="ขั้นตอน" accent="การทำงาน" />
          <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="reveal border-t pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0"
              >
                <span className="font-mono text-xs tracking-[0.2em] text-primary-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-lg font-light">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Client reviews */}
        <Testimonials
          lang="th"
          items={clientTestimonials}
          heading={
            <>
              เสียงจาก<span className="accent font-light">ลูกค้า</span>
            </>
          }
        />

        {/* FAQ */}
        <section className="container max-w-4xl pt-24 md:pt-36">
          <Heading eyebrow="FAQ" title="คำถาม" accent="ที่พบบ่อย" />
          <FaqList items={faqs} />
        </section>

        {/* Inquiry form */}
        <section id="contact" className="container max-w-7xl pt-24 md:pt-36">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="reveal space-y-8 lg:col-span-5">
              <p className={label}>Let&apos;s talk</p>
              <h2 className="font-display text-3xl font-extralight leading-tight tracking-tight md:text-5xl">
                <span className="text-sky">
                  มีไอเดียอยู่แล้ว
                  <br />
                  หรือยังไม่แน่ใจ
                  <br />
                  ก็<span className="accent font-light">คุยกันก่อนได้</span>
                </span>
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                เล่าให้ฟังว่าอยากทำอะไร แล้วผมจะตอบกลับภายใน 24 ชั่วโมง
                พร้อมแนวทางและราคาคร่าวๆ ปรึกษาฟรี ไม่มีข้อผูกมัด
              </p>
              <DirectChannels />
            </div>
            <div className="reveal delay-100 lg:col-span-7">
              <InquiryForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
      <ScrollReveal />
    </div>
  );
}
