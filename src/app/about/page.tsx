import { CustomerNav } from "@/components/customer-nav";
import { Footer } from "@/components/footer";
import {
  Sparkles,
  MapPin,
  CalendarCheck,
  Heart,
  Users,
  Scissors,
  ShieldCheck,
  Clock,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Preppy",
  description:
    "Preppy is India's premium salon discovery platform. Learn how we help you find and book top-rated salons nearby in three taps.",
};

const VALUES = [
  {
    icon: MapPin,
    title: "Nearby first",
    body: "We start with your location so you see the best salons around you — not a random city-wide list.",
  },
  {
    icon: CalendarCheck,
    title: "Book in 3 taps",
    body: "Pick a service, choose a time, confirm. No phone tag, no waiting for a callback.",
  },
  {
    icon: Heart,
    title: "Real reviews",
    body: "Ratings and photos come from people who actually booked. You know what to expect before you go.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted partners",
    body: "Every salon on Preppy is reviewed before it goes live, so quality stays consistent.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Discover",
    body: "Browse nearby salons by service, rating, or distance. Save the ones you love.",
  },
  {
    step: "02",
    title: "Book",
    body: "Choose a service, staff member, and time that works. Confirm in seconds.",
  },
  {
    step: "03",
    title: "Show up preppy",
    body: "Walk in ready. After your visit, leave a review to help the next guest.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fafbfc]">
      <CustomerNav />

      <section className="relative overflow-hidden hero-mesh px-4 py-20 text-white sm:px-6 sm:py-24">
        <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-accent-400/15 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="animate-fade-up flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-accent-400" />
              About Preppy
            </span>
          </div>

          <h1 className="animate-fade-up delay-100 mt-6 max-w-3xl font-display text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
            Look good.
            <br />
            <span className="text-brand-200">Feel preppy.</span>
          </h1>

          <p className="animate-fade-up delay-200 mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            Preppy is India&apos;s premium salon discovery platform. We connect
            you with top-rated salons nearby and let you book in three taps —
            service, time, confirm.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-brand-600">Our story</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
              Booking a salon should feel as good as the appointment itself
            </h2>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-slate-600">
            <p>
              Finding a great salon used to mean asking friends, scrolling
              endlessly, then calling around to see who had a slot. We built
              Preppy to replace that friction with a clear, location-aware
              marketplace.
            </p>
            <p>
              Customers discover trusted salons near them. Salon owners get
              found by the right people and manage bookings and reviews in one
              place. Everyone spends less time coordinating — and more time
              looking good.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200/80 bg-white px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-brand-600">What we stand for</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-slate-900">
              Built around how you actually book
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, title, body }, i) => (
              <div
                key={title}
                className="animate-fade-up rounded-3xl border border-slate-200 bg-[#fafbfc] p-6"
                style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-md shadow-brand-600/20">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-slate-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-brand-600">How it works</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-slate-900">
            From search to chair in minutes
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {STEPS.map(({ step, title, body }) => (
            <div
              key={step}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <p className="font-display text-sm font-bold text-brand-600">
                {step}
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold text-slate-900">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10">
            <Users className="h-8 w-8 text-brand-600" />
            <h3 className="mt-4 font-display text-2xl font-bold text-slate-900">
              For customers
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Discover nearby salons, compare services and reviews, and book
              the slot that fits your day. Save favorites so your next visit is
              even faster.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-brand-600/25 transition hover:shadow-lg"
            >
              <Sparkles className="h-4 w-4" />
              Discover salons
            </Link>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10">
            <Scissors className="h-8 w-8 text-brand-600" />
            <h3 className="mt-4 font-display text-2xl font-bold text-slate-900">
              For salon owners
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Get discovered by customers near you. Manage services, staff,
              appointments, and reviews from one dashboard — listing is free.
            </p>
            <Link
              href="/register?role=salon"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-brand-200 bg-brand-50 px-5 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-100"
            >
              <Clock className="h-4 w-4" />
              List your salon
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-14 text-center text-white">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-600/20 to-transparent" />
          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-400">
              Ready when you are
            </p>
            <h3 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              Your next appointment is a few taps away
            </h3>
            <p className="mx-auto mt-3 max-w-md text-slate-400">
              Join Preppy to find salons near you — or grow your salon with
              customers who are already looking.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-400 px-8 py-4 font-display font-bold text-white shadow-xl shadow-brand-600/30 transition hover:brightness-110"
              >
                <Sparkles className="h-4 w-4" />
                Create a free account
              </Link>
              <Link
                href="/"
                className="inline-flex items-center rounded-2xl border border-white/20 px-8 py-4 font-display font-bold text-white transition hover:bg-white/10"
              >
                Browse salons
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
