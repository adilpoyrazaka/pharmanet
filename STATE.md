# STATE.md

> **Son güncelleme:** 2026-08-13
> Bu dosya kısa kalır (≈40 satır). Her oturumda **baştan yazılır**, eklenmez.
> Sadece "şu an neredeyiz" bilgisi. Gerekçeler `decisions.md`'de, plan `PROJECT.md`'de.

## Faz
Faz 0 — Zemin. Henüz kod yazılmadı.

## Tamamlanan
- `PROJECT.md` 1–17, `decisions.md` D1–D44, repo `adilpoyrazaka/pharmanet`.
- Pilot bölge sayıları alındı (183, 2026-08-12 sayımı).
- **2026-08-13 denetimi:** dosyalar arası 25 bulgu çıkarıldı. Kapatılanlar:
  G etiketi emekliye ayrıldı (D35), harita yüzeyi düştü (D3), konum işleme
  dürüstleştirildi (D41), Faz 3'ün yanlış muhatabı ve ölçülemez kriteri (D42),
  yürütme birimi bölgeye çevrildi (D43), organik trafik ikiye ayrıldı (D44).
  D11, D21, D32, D33, D38 gövdeleri yerinde güncellendi.

## Şu an devam eden
- **K1 — oda portalından kanonik kütüğün çekilmesi.** Portal girişi yapıldı.
  CSV/Excel dışa aktarım; ham hali üretim verisidir, `research/` değildir.
- `research/R1…R7` tur 1 çıktısı bekleniyor.

## Sıradaki adımlar
1. **Alan adı** — D43/D44 ile kritik yola girdi: söylenebilir, Türkçe klavyede
   yazılabilir, aramada ayırt edilebilir. Sosyal medya adları buna bağlı.
2. `.gitignore` doldurulması — K1 ham kütüğü depoya girmeden önce (dosya boş).
3. K1 kütüğü: portal sütun başlıkları + örnek satırlar → şema kesinleştirme.
4. Araştırma brief'i tur 2 revizyonu (D19, D37, D38).
5. `architecture.md` — Claude Code + Fable.
6. Tek kurum için uçtan uca dikey dilim.

## Bloke olanlar
- **Reklam eşiği (A2)** → araç sayfalarının trafik verisi olmadan belirlenemez.

## Açık kararlar
- **A2** Reklam eşiği — trafik bekliyor. Envanter sonuç yüzeyinde değil §16
  araç sayfalarında yaşayacak (D28); eşik oran değil mutlak taban + oran olmalı.
- **A4** Mevzuat teyitleri (A4.1 reklam sınırı, A4.2 fiyat tanıtımı,
  A4.3 İYS/ticari elektronik ileti) — Poi'de.
- A1, A3, A5 KAPANDI.

## Sonraki oturuma devreden bulgular
Ağır: (4) `confidence` §6.6'da yanlış alandan türetiliyor + `sayım tarihi`
Türkçe alan adı · (5) Faz 1 öldürme kriteri 1 ölçülemez, "5 eczane" kaynaksız ·
(7) R2 çıktısının alıcısı yok · (10) `is_open` katman önceliği ters ·
(11) bölge kuralı tablosu `city + district` anahtarlı ama birim bölge (D43) ·
(12) saha formunda takip etiketi ve `verification_method` yok ·
(13) K1 aylık tazeleme sahipsiz, §8 girişli portalı kapsamıyor ·
(14) Places koordinatı + MapLibre/ToS.
Orta: (8) D36–D38 kelime çelişkisi · (9) A4.1'in L1 blokaj iddiası şişkin ·
(16) §13 v1 ile §16 araçları uzlaşmıyor · (22) Claude Code paketinde §13/§14 yok.
Hijyen: (18) §12 bayat · (19) durum kodları ve gövdelerdeki tarihçe ·
(21) PROJECT "tek gerçek kaynak" ile ORCHESTRATION katmanı çelişiyor.