// Faruqsuzay@gmail.com | +2349061345507

export interface Customer {
  id: number
  name: string
  phone: string
  email: string
  status: "active" | "lead" | "converted" | "inactive"
  tags: string[]
  lastMessage: string
  lastContacted: string
  avatar: null
  notes?: string
}

export interface Message {
  id: number
  customerId: number
  sender: "customer" | "ai" | "staff"
  text: string
  timestamp: string
  confidence?: number | null
  escalated?: boolean
}

export interface Automation {
  id: number
  name: string
  trigger: string
  action: string
  enabled: boolean
  type: string
}

export interface Payment {
  id: number
  customer: string
  amount: number
  status: "paid" | "unpaid" | "pending"
  date: string
  description: string
}

export interface TeamMember {
  id: number
  name: string
  email: string
  role: "admin" | "staff" | "sales" | "accountant"
}

export interface Business {
  name: string
  type: string
  logo: null
  timezone: string
  plan: string
  whatsappNumber: string
  aiBehavior: {
    tone: string
    autoReply: boolean
    confidenceThreshold: number
  }
}

export interface PricingTier {
  price: number
  currency: string
  features: string[]
}

export interface Stats {
  totalCustomers: number
  activeLeads: number
  dailyMessages: number
  revenue: number
  pendingPayments: number
  conversionRate: number
  avgResponseTime: string
}

export interface AppData {
  business: Business
  pricing: Record<string, PricingTier>
  stats: Stats
  customers: Customer[]
  messages: Message[]
  automations: Automation[]
  payments: Payment[]
  team: TeamMember[]
}

export const mockData: AppData = {
  business: {
    name: "Graceville International School",
    type: "school",
    logo: null,
    timezone: "Africa/Lagos",
    plan: "Business",
    whatsappNumber: "+234 800 123 4567",
    aiBehavior: {
      tone: "professional",
      autoReply: true,
      confidenceThreshold: 0.75,
    },
  },
  pricing: {
    starter: {
      price: 15000,
      currency: "₦",
      features: ["Basic CRM", "WhatsApp integration", "50 automated replies/day"],
    },
    business: {
      price: 45000,
      currency: "₦",
      features: ["AI automation", "Analytics", "Unlimited replies", "Team access"],
    },
    enterprise: {
      price: 150000,
      currency: "₦",
      features: ["Advanced AI", "Custom setup", "API access", "Dedicated support"],
    },
  },
  stats: {
    totalCustomers: 1248,
    activeLeads: 342,
    dailyMessages: 1580,
    revenue: 45000,
    pendingPayments: 12000,
    conversionRate: 23.5,
    avgResponseTime: "1.2s",
  },
  customers: [
    {
      id: 1, name: "Chidi Okonkwo", phone: "+234 802 345 6789", email: "chidi.okonkwo@gmail.com",
      status: "active", tags: ["school", "admissions", "parent"],
      lastMessage: "What is the admission fee for JSS1?",
      lastContacted: "2026-05-21T10:30:00Z", avatar: null,
      notes: "Interested in JSS1 admission for his son. Follow up with prospectus.",
    },
    {
      id: 2, name: "Amina Bello", phone: "+234 803 987 6543", email: "amina.bello@yahoo.com",
      status: "lead", tags: ["visa", "inquiry"],
      lastMessage: "Do you process UK student visas?",
      lastContacted: "2026-05-20T14:15:00Z", avatar: null,
      notes: "Asked about UK student visa. Send requirements checklist.",
    },
    {
      id: 3, name: "Emeka Okafor", phone: "+234 806 555 1212", email: "emeka@example.com",
      status: "converted", tags: ["realestate", "buyer"],
      lastMessage: "I've paid the deposit for the Lekki apartment",
      lastContacted: "2026-05-18T09:00:00Z", avatar: null,
    },
    {
      id: 4, name: "Funke Adeyemi", phone: "+234 809 111 2222", email: "funke.a@gmail.com",
      status: "inactive", tags: ["retail", "wholesale"],
      lastMessage: "Do you have size 42 in stock?",
      lastContacted: "2026-05-01T11:20:00Z", avatar: null,
    },
    {
      id: 5, name: "Dr. Adebayo Ogunlesi", phone: "+234 805 333 4444", email: "adebayo@ogunlesi.com",
      status: "active", tags: ["logistics", "fleet"],
      lastMessage: "Can you track shipment #LD-4421?",
      lastContacted: "2026-05-21T09:00:00Z", avatar: null,
    },
    {
      id: 6, name: "Ngozi Eze", phone: "+234 807 777 8888", email: "ngozi.eze@gmail.com",
      status: "lead", tags: ["freelancer", "design"],
      lastMessage: "What are your freelance package rates?",
      lastContacted: "2026-05-19T16:45:00Z", avatar: null,
    },
  ],
  messages: [
    {
      id: 1, customerId: 1, sender: "customer",
      text: "Good morning, I'd like to know the school fees for JSS1",
      timestamp: "2026-05-21T10:25:00Z",
    },
    {
      id: 2, customerId: 1, sender: "ai",
      text: "Good morning! The JSS1 tuition fee is ₦350,000 per term. Would you like me to send the full breakdown including uniform and textbook fees?",
      timestamp: "2026-05-21T10:25:30Z", confidence: 0.92, escalated: false,
    },
    {
      id: 3, customerId: 1, sender: "customer",
      text: "Yes please, and is there a sibling discount?",
      timestamp: "2026-05-21T10:27:00Z",
    },
    {
      id: 4, customerId: 1, sender: "ai",
      text: "Yes! We offer a 10% sibling discount for the second child and 15% for the third. Here is the full fee breakdown:\n• Tuition: ₦350,000\n• Uniform: ₦25,000\n• Textbooks: ₦30,000\n• Total: ₦405,000 (before discount)\n\nWould you like to schedule a tour of the school?",
      timestamp: "2026-05-21T10:27:30Z", confidence: 0.88, escalated: false,
    },
    {
      id: 5, customerId: 2, sender: "customer",
      text: "Do you process UK student visas? I need it urgently",
      timestamp: "2026-05-20T14:15:00Z",
    },
    {
      id: 6, customerId: 2, sender: "ai",
      text: "Yes, we handle UK student visas. The processing time is typically 3-5 weeks. I can connect you with our visa team for urgent cases.",
      timestamp: "2026-05-20T14:15:45Z", confidence: 0.65, escalated: true,
    },
    {
      id: 7, customerId: 2, sender: "staff",
      text: "Hi Amina, I'm Chioma from the visa team. I'll personally handle your application. When would you like to come in for the document review?",
      timestamp: "2026-05-20T14:30:00Z", confidence: null, escalated: true,
    },
    {
      id: 8, customerId: 5, sender: "customer",
      text: "Can you track shipment #LD-4421? It was supposed to arrive yesterday",
      timestamp: "2026-05-21T09:00:00Z",
    },
    {
      id: 9, customerId: 5, sender: "ai",
      text: "I've checked shipment #LD-4421. It is currently at the Lagos sorting center and is expected for delivery today by 4 PM. Would you like me to notify the recipient?",
      timestamp: "2026-05-21T09:00:45Z", confidence: 0.85, escalated: false,
    },
  ],
  automations: [
    {
      id: 1, name: "Price Inquiry Auto-Reply",
      trigger: "message contains 'price' or 'fee' or 'how much'",
      action: "Send pricing template", enabled: true, type: "auto_reply",
    },
    {
      id: 2, name: "3-Day Inactive Follow-Up",
      trigger: "customer inactive for 3 days",
      action: "Send follow-up message", enabled: true, type: "follow_up",
    },
    {
      id: 3, name: "Payment Reminder",
      trigger: "payment overdue by 7 days",
      action: "Send payment reminder + link", enabled: false, type: "scheduled",
    },
    {
      id: 4, name: "Keyword: Complaint Escalation",
      trigger: "message contains 'complaint' or 'refund'",
      action: "Escalate to human staff", enabled: true, type: "keyword",
    },
    {
      id: 5, name: "New Lead Welcome",
      trigger: "new customer created",
      action: "Send welcome message with business info", enabled: true, type: "auto_reply",
    },
  ],
  payments: [
    {
      id: 1, customer: "Chidi Okonkwo", amount: 350000, status: "unpaid",
      date: "2026-05-15", description: "JSS1 Tuition Fee - Term 1",
    },
    {
      id: 2, customer: "Emeka Okafor", amount: 2500000, status: "paid",
      date: "2026-05-10", description: "Lekki Apartment Deposit",
    },
    {
      id: 3, customer: "Blessing David", amount: 75000, status: "pending",
      date: "2026-05-19", description: "Visa Consultation Fee",
    },
    {
      id: 4, customer: "Graceville Int'l School", amount: 180000, status: "paid",
      date: "2026-05-05", description: "Monthly SaaS Subscription - Business Plan",
    },
    {
      id: 5, customer: "Chidi Okonkwo", amount: 25000, status: "unpaid",
      date: "2026-05-20", description: "School Uniform Fee",
    },
  ],
  team: [
    { id: 1, name: "You (Admin)", email: "admin@flowdesk.ai", role: "admin" },
    { id: 2, name: "Chioma Eze", email: "chioma@flowdesk.ai", role: "staff" },
    { id: 3, name: "Tunde Bakare", email: "tunde@flowdesk.ai", role: "sales" },
    { id: 4, name: "Kemi Adepoju", email: "kemi@flowdesk.ai", role: "accountant" },
  ],
}
