# STATE.md

> **Son güncelleme:** 2026-09-16 (2. oturum)
> Bu dosya kısa kalır (≈40 satır). Her oturumda **baştan yazılır**, eklenmez.
> Sadece "şu an neredeyiz" bilgisi. Gerekçeler `decisions.md`'de, plan `PROJECT.md`'de.

## Faz
Faz 0 — Zemin. Arayüz iskeleti demo veriyle çalışıyor; gerçek veri bağlı değil.

## Tamamlanan
- `PROJECT.md` 1–17, `decisions.md` D1–D52, repo `adilpoyrazaka/pharmanet`, marka MEDPUSULA (D46).
- `scaffold/nextjs` dalı (`main`'e birleşmedi): Next.js 16 + Tailwind + shadcn; D49–D52 uygulandı.
- **Test ağı:** `npm test` (Vitest, 13 mantık testi) ve `npm run test:e2e`
  (Playwright, 18 sayfa testi: D41, D51, D52, service worker). İkisi yeşil. Node 22 `.nvmrc`'de.
- **2026-09-16:** D17 tazeliği İstanbul takvim günüyle sayılıyor; `/en` noindex,
  `hreflang` yok (D51); spec'siz WebMCP aracı silindi.

## Şu an devam eden
- **Kod:** dal üzerinde prototip elle düzeltiliyor. Görünür davranışı değiştiren
  her düzeltme commit'le aynı anda `decisions.md`'ye girer (D34).
- **Veri hattı:** K1 bootstrap; `research/R1…R7` tur 1 çıktısı bekleniyor.

## Sıradaki adımlar
1. Demo tarihleri göreli: kayıt `daysAgo` taşır, `verified_at` bir `now`'dan üretilir,
   sayfa build anındaki `now`'ı prop verir (hidrasyon uyuşmazlığı olmasın).
   Yaklaşım önerildi, Poi onayı bekliyor. Yapılmazsa **6 Kasım**'da D49 demosu ve 6 test bozulur.
2. `architecture.md` açılır + `AGENTS.md`'ye not: test komutları; Playwright yerelde
   `::1` kullanır (WSL mirrored ağda kapalı IPv4 port reddetmek yerine asılı kalır).
3. Prototip kodunun elle düzeltilmesi.
4. `design.md` — kod şekli oturduktan sonra.
5. Dal `main`'e birleşir → CI (GitHub Actions) iki test paketini çalıştırır.
6. K1 bootstrap → şema kesinleştirme; bulgu (12) saha formu K2 öncesi kilit.

## Açık kalemler
- Logo D46'nın "med"/"pusula" kırılım şartını karşılamıyor → tasarım turu.
- SSG rozet tazeliği build anında gömülü; gerçek veride ISR kararı → `architecture.md`.
- `medpusula-pilot` sitesi silinecek. Telefonda D49 dokunmatik testi (otomasyon dışı).
  `allowedDevOrigins` IP'si router adresi değişirse güncellenir.

## Açık kararlar
- **A2** Reklam eşiği — trafik bekliyor. **A4** Mevzuat ve tescil (A4.1–A4.5),
  Poi'de; A4.1, A4.4, A4.5 aynı avukat görüşmesinde. A1, A3, A5 KAPANDI.

## Sonraki oturuma devreden bulgular
Ağır: (5) Faz 1 öldürme kriteri 1 ölçülemez · (7) R2 çıktısının alıcısı yok ·
(12) saha formu · (14) Places koordinatı + MapLibre/ToS · (30) D49–D52 §13'e
işlenmedi, Claude Code `decisions.md`'yi görmüyor (testler kısmen kapatıyor).
Orta: (8) D36–D38 kelime çelişkisi · (9) A4.1 L1 blokajı · (16) §13–§16 uzlaşmıyor ·
(29) `confidence` alan mı türev mi · (32) A2/D30 kapanmış "madde 6" blokajına bağlı ·
(33) §9 Faz 0 "tek ilçe" → D43'e göre "tek bölge".
Hijyen: (19) durum kodları, D33'te çift cümle · §12 başlığı iki kez · (34) D50'nin
durum kodu yok · (35) D17/D52 atıf satırı, D17 yapıştırma izi, D46/D52 boş satır.
Sıradaki bulgu numarası: (37).