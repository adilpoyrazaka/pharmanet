# STATE.md

> **Son güncelleme:** 2026-09-16
> Bu dosya kısa kalır (≈40 satır). Her oturumda **baştan yazılır**, eklenmez.
> Sadece "şu an neredeyiz" bilgisi. Gerekçeler `decisions.md`'de, plan `PROJECT.md`'de.

## Faz
Faz 0 — Zemin. Arayüz iskeleti demo veriyle çalışıyor; gerçek veri bağlı değil.

## Tamamlanan
- `PROJECT.md` 1–17, `decisions.md` D1–D52, repo `adilpoyrazaka/pharmanet`.
- Marka MEDPUSULA (D46), alan adları ve kullanıcı adları alındı; D31'in saati işliyor.
- **2026-09-16:** `scaffold/nextjs` dalı (son `a43bf24`, `main`'e birleşmedi).
  Next.js 16 + Tailwind + shadcn/Radix; prototip arayüzü taşındı ve bağlandı.
  D49 soluk rozet + Popover, D50 yürüme aralığı, D51 `/tr` `/en` yolları,
  D52 PWA (yalnızca `offline.html` önbellekte, dil başına manifest) uygulandı.

## Şu an devam eden
- **Kod:** dal üzerinde prototip kodu elle düzeltiliyor. Görünür davranışı
  değiştiren her düzeltme commit'le aynı anda `decisions.md`'ye girer (D34).
- **Veri hattı:** K1 bootstrap (portal → bölge eşlemesi, bölge bölge CSV);
  `research/R1…R7` tur 1 çıktısı bekleniyor.

## Sıradaki adımlar
1. `work/verify.mjs` — hiçbir yerde yok. Önce kapsam: D49–D52 davranışlarının
   otomatik kontrolü; elle düzeltmelerin güvenlik ağı.
2. Demo tarihleri göreli üretilir (bugünden N gün önce); yoksa D49'un karışık
   tazelik kayıtları 9 Kasım'dan itibaren kendiliğinden bozulur.
3. Prototip kodunun elle düzeltilmesi.
4. `design.md` + `architecture.md` — kod şekli oturduktan sonra.
5. Dal `main`'e birleşir.
6. K1 bootstrap → şema kesinleştirme; bulgu (12) saha formu K2 öncesi kilit.

## Açık kalemler
- Logo D46'nın "med"/"pusula" görsel kırılım şartını karşılamıyor; ad bitişik
  kalır, kırılım ve maskelenebilir ikon (güvenli alan) tasarım turunda.
- SSG sayfalarında rozet tazeliği build anında HTML'e gömülü; gerçek veride
  yeniden üretim (ISR) kararı → `architecture.md`.
- `medpusula-pilot` sitesi silinecek (arkadaşının workspace'inde).
- Telefonda D49 dokunmatik testi. Geliştirme: WSL mirrored ağ,
  `allowedDevOrigins` IP'si router adresi değişirse güncellenir.

## Açık kararlar
- **A2** Reklam eşiği — trafik bekliyor. **A4** Mevzuat ve tescil (A4.1–A4.5),
  Poi'de; A4.1, A4.4, A4.5 aynı avukat görüşmesinde. A1, A3, A5 KAPANDI.

## Sonraki oturuma devreden bulgular
Ağır: (5) Faz 1 öldürme kriteri 1 ölçülemez · (7) R2 çıktısının alıcısı yok ·
(12) saha formu · (14) Places koordinatı + MapLibre/ToS.
Orta: (8) D36–D38 kelime çelişkisi · (9) A4.1 L1 blokajı · (16) §13–§16
uzlaşmıyor · (29) `confidence` alan mı türev mi.
Hijyen: (19) durum kodları, D33'te çift cümle · `PROJECT.md`'de §12 başlığı iki kez.