import type { Testimonial } from "@/data/testimonials";

/**
 * /services — freelance page (Thai). Everything on the page comes from here.
 * Prices are "starting from" figures in THB; set `price` to "" to show "สอบถามราคา".
 */

export interface ServicePackage {
  name: string;
  /** Who it is for, one line. */
  forWho: string;
  /** Starting price in THB, e.g. "9,900". "" shows "สอบถามราคา". */
  price: string;
  /** Billing period shown after the price, e.g. "เดือน". */
  unit?: string;
  /** Typical delivery time. */
  time: string;
  includes: string[];
  /** Highlight one package as the most common choice. */
  popular?: boolean;
}

// Starting prices for a solo developer in Thailand (2026). Adjust to your own rates.
export const packages: ServicePackage[] = [
  {
    name: "Landing page",
    forWho: "ร้านค้า แบรนด์ หรือแคมเปญที่ต้องการหน้าเดียวสำหรับขายของหรือเก็บรายชื่อลูกค้า",
    price: "9,900",
    time: "7–10 วัน",
    includes: [
      "1 หน้า สูงสุด 6 ส่วน ออกแบบตามแบรนด์",
      "รองรับมือถือ แท็บเล็ต และคอมพิวเตอร์",
      "ปุ่ม LINE / โทร และฟอร์มติดต่อส่งเข้าอีเมล",
      "SEO พื้นฐาน + Google Analytics 4 / Meta Pixel",
      "ตั้งค่าโดเมนและขึ้นระบบให้พร้อมใช้",
      "แก้ไขได้ 2 รอบ",
    ],
  },
  {
    name: "เว็บไซต์ธุรกิจ",
    forWho: "บริษัทหรือร้านที่ต้องการเว็บหลายหน้าให้ลูกค้าเชื่อถือ และแก้เนื้อหาเองได้",
    price: "29,000",
    time: "3–5 สัปดาห์",
    includes: [
      "สูงสุด 8 หน้า เช่น หน้าแรก เกี่ยวกับเรา บริการ ผลงาน ติดต่อ",
      "ระบบหลังบ้านแก้ข้อความ รูป และบทความได้เอง",
      "SEO ทุกหน้า + ส่งเว็บเข้า Google Search Console",
      "ความเร็ว Lighthouse 90+ บนมือถือ",
      "สอนใช้งานหลังบ้าน พร้อมคู่มือ",
      "แก้ไขได้ 3 รอบ",
    ],
    popular: true,
  },
  {
    name: "ระบบภายใน / เว็บแอป",
    forWho: "งานที่ยังทำใน Excel หรือกระดาษ เช่น สต็อกสินค้า จองคิว อนุมัติเอกสาร",
    price: "69,000",
    time: "6–12 สัปดาห์",
    includes: [
      "เก็บขั้นตอนงานจริงก่อนออกแบบระบบ",
      "ล็อกอินและสิทธิ์ผู้ใช้ตามตำแหน่ง",
      "Dashboard รายงาน และ Export Excel / PDF",
      "นำเข้าข้อมูลเดิมจาก Excel",
      "ติดตั้งบน Cloud พร้อมสำรองข้อมูลอัตโนมัติ",
      "อบรมผู้ใช้งาน + ดูแลฟรี 60 วัน",
    ],
  },
  {
    name: "ดูแลรายเดือน",
    forWho: "เว็บหรือระบบที่ใช้งานอยู่แล้ว ทั้งที่ผมทำหรือคนอื่นทำ ต้องการคนดูแลต่อเนื่อง",
    price: "1,900",
    unit: "เดือน",
    time: "สัญญาขั้นต่ำ 3 เดือน",
    includes: [
      "อัปเดตความปลอดภัยและสำรองข้อมูลทุกสัปดาห์",
      "เฝ้าระวังเว็บล่ม แจ้งเตือนและแก้ไขทันที",
      "แก้เนื้อหาหรือจุดเล็กๆ รวมไม่เกิน 3 ชั่วโมง/เดือน",
      "รายงานผู้เข้าชมและความเร็วเว็บรายเดือน",
    ],
  },
];

export const steps = [
  { title: "คุยความต้องการ", text: "ฟรี ไม่มีข้อผูกมัด คุยผ่าน LINE หรือวิดีโอคอล ว่าอยากได้อะไร ใช้ทำอะไร งบประมาณเท่าไร" },
  { title: "เสนอราคาและขอบเขตงาน", text: "สรุปเป็นเอกสาร ระบุสิ่งที่ได้ ระยะเวลา และราคาชัดเจน ไม่มีค่าใช้จ่ายแอบแฝง" },
  { title: "ออกแบบ", text: "ส่งแบบหน้าตาให้ดูก่อนเริ่มเขียนโค้ด ปรับจนพอใจตามจำนวนรอบที่ตกลงกัน" },
  { title: "พัฒนาและทดสอบ", text: "อัปเดตความคืบหน้าทุกสัปดาห์ ดูเว็บจริงได้ระหว่างทำผ่านลิงก์ทดสอบ" },
  { title: "ส่งมอบและดูแลต่อ", text: "ขึ้นระบบจริง ส่งมอบโค้ดและบัญชีทั้งหมดให้เป็นของคุณ พร้อมดูแลฟรี 30 วัน" },
];

export const faqs = [
  {
    q: "ราคารวมค่าโดเมนและโฮสติ้งไหม?",
    a: "ไม่รวม แต่ผมจะช่วยจดและตั้งค่าให้ทั้งหมดในชื่อของคุณ ค่าโดเมน .com ประมาณ 400–600 บาทต่อปี ส่วนเว็บขนาดเล็กส่วนใหญ่ใช้โฮสติ้งฟรีได้ ถ้าเป็นระบบที่มีฐานข้อมูล ค่า Cloud เริ่มประมาณ 300–1,000 บาทต่อเดือน",
  },
  {
    q: "แบ่งจ่ายอย่างไร?",
    a: "มัดจำ 50% ก่อนเริ่มงาน และอีก 50% ก่อนขึ้นระบบจริง งานระบบภายในแบ่งจ่าย 3 งวดตามความคืบหน้า (40 / 30 / 30)",
  },
  {
    q: "ออกใบเสร็จหรือหัก ณ ที่จ่ายได้ไหม?",
    a: "ได้ ออกใบเสนอราคาและใบเสร็จรับเงินในนามบุคคลธรรมดาให้ทุกงาน ถ้าจ้างในนามบริษัท หัก ณ ที่จ่าย 3% ได้ตามปกติ",
  },
  {
    q: "หลังส่งมอบแล้วแก้ไขเองได้ไหม?",
    a: "ได้ เว็บที่มีระบบหลังบ้านแก้ข้อความและรูปเองได้ทันที และโค้ดทั้งหมดเป็นของคุณ จะจ้างใครดูแลต่อก็ได้",
  },
  {
    q: "ถ้าอยากได้เพิ่มจากแพ็กเกจ คิดราคาอย่างไร?",
    a: "งานเพิ่มเติม เช่น เพิ่มหน้า เพิ่มภาษา หรือเชื่อมต่อระบบอื่น จะแจ้งราคาเป็นรายการก่อนเริ่มทำทุกครั้ง ไม่มีค่าใช้จ่ายที่ไม่ได้ตกลงกันไว้",
  },
  {
    q: "รับงานต่างจังหวัดไหม?",
    a: "รับ ทำงานออนไลน์ทั้งหมด คุยงานผ่าน LINE, Google Meet หรือ Zoom ถ้าอยู่กรุงเทพฯ นัดคุยที่หน้างานได้",
  },
];

/** How clients reach you. Leave a value "" to hide that channel. */
export const serviceContact = {
  line: "", // MOCK — e.g. "https://line.me/R/ti/p/@windyoncloud"
  // Fastwork profile, e.g. "https://fastwork.co/user/windyoncloud". Empty = hidden everywhere
  // (Let's talk on /services and the footer icons).
  fastwork: "https://fastwork.com/user/windy",
  email: "intouch.crp@gmail.com",
};

/** Budget ranges offered on the inquiry form (THB). */
export const budgets = ["ต่ำกว่า 15,000", "15,000–40,000", "40,000–100,000", "มากกว่า 100,000", "ยังไม่แน่ใจ"];

// Empty = section hidden. Move entries from clientTestimonialDrafts once each client approves.
export const clientTestimonials: Testimonial[] = [];

// ───────── MOCK client reviews (Thai). Replace with real ones, and ask each client first. ─────────
export const clientTestimonialDrafts: Testimonial[] = [
  {
    quote:
      "MOCK: ส่งงานตรงเวลา อธิบายเรื่องเทคนิคให้เข้าใจง่าย Landing page โหลดเร็วมาก มีลูกค้าทักเข้ามาตั้งแต่วันแรกที่เปิดเว็บ",
    name: "คุณ MOCK A",
    role: "เจ้าของร้าน",
    company: "MOCK Coffee",
    link: "",
  },
  {
    quote:
      "MOCK: เปลี่ยนระบบสต็อกจาก Excel เป็นเว็บที่พนักงานใช้เป็นได้ในวันเดียว ตัวเลขตรงกันทุกสาขา ไม่ต้องนั่งรวมไฟล์ทุกสิ้นเดือนอีกแล้ว",
    name: "คุณ MOCK B",
    role: "ผู้จัดการฝ่ายปฏิบัติการ",
    company: "บริษัท MOCK จำกัด",
    link: "",
  },
  {
    quote:
      "MOCK: หลังส่งงานยังดูแลต่อ แจ้งปัญหาตอนไหนก็ตอบเร็ว และแก้เนื้อหาในเว็บเองได้จริงตามที่บอกไว้ตั้งแต่แรก",
    name: "คุณ MOCK C",
    role: "ผู้ก่อตั้ง",
    company: "MOCK Studio",
    link: "",
  },
];
