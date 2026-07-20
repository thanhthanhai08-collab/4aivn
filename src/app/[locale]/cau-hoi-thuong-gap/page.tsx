import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AppLayout } from "@/components/layout/app-layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_COUNT = 10;

type FAQPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: FAQPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  const isEnglish = locale === "en";
  const canonical = isEnglish
    ? "https://4aivn.com/en/faq"
    : "https://4aivn.com/cau-hoi-thuong-gap";

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical,
      languages: {
        vi: "https://4aivn.com/cau-hoi-thuong-gap",
        en: "https://4aivn.com/en/faq",
        "x-default": "https://4aivn.com/cau-hoi-thuong-gap",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: canonical,
      type: "website",
    },
  };
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  const items = Array.from({ length: FAQ_COUNT }, (_, index) => ({
    question: t(`items.${index + 1}.question`),
    answer: t(`items.${index + 1}.answer`),
  }));
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <AppLayout>
      <main className="container py-10 md:py-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <header className="mx-auto mb-10 max-w-3xl text-center">
          <h1 className="font-headline text-3xl font-bold text-foreground md:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("subtitle")}
          </p>
        </header>

        <section className="mx-auto max-w-3xl border-y border-border" aria-label={t("title")}>
          <Accordion type="single" collapsible>
            {items.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index + 1}`}>
                <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pr-8 text-base leading-7 text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
    </AppLayout>
  );
}
