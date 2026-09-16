import PharmacyApp from "../pharmacy-app";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  return <PharmacyApp english={lang === "en"} />;
}
