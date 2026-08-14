# STATE.md

> **Son güncelleme:** 2026-08-14
> Bu dosya kısa kalır (≈40 satır). Her oturumda **baştan yazılır**, eklenmez.
> Sadece "şu an neredeyiz" bilgisi. Gerekçeler `decisions.md`'de, plan `PROJECT.md`'de.

## Faz
Faz 0 — Zemin. Henüz kod yazılmadı.

## Tamamlanan
- `PROJECT.md` 1–17, `decisions.md` D1–D45, repo `adilpoyrazaka/pharmanet`.
- Pilot bölge sayıları alındı (183, 2026-08-12 sayımı).
- **2026-08-13 denetimi:** 25 bulgu. Kapatılanlar D35, D3, D41, D42, D43, D44.
- **2026-08-14:** bulgu (4), (10), (11) kapatıldı. `.gitignore` dolduruldu.
  §14 baştan yazıldı; D45 eklendi; D18 (yıllık + olay tetikli), D20 (Places
  koordinatla sınırlandı), D43 (kural satırı şartı) yerinde güncellendi.

## Şu an devam eden
- **K1 — oda portalından kanonik kütüğün çekilmesi.** Portal girişi yapıldı.
  Portal mesai vermiyor; çalışma saati verisi D45 ile bize ait.
- `research/R1…R7` tur 1 çıktısı bekleniyor.

## Sıradaki adımlar
1. **Alan adı** — D43/D44 ile kritik yolda: söylenebilir, Türkçe klavyede
   yazılabilir, aramada ayırt edilebilir. Sosyal medya adları buna bağlı.
2. K1 kütüğü: portal sütun başlıkları + örnek satırlar → şema kesinleştirme.
   Dışa aktarım biçimi burada netleşir (A4.4'ün girdisi).
3. Bulgu (12) — saha formu: takip etiketi, `verification_method`,
   `interviewed_at` ↔ `verified_at` ilişkisi. K2 öncesi kilit.
4. Araştırma brief'i tur 2 revizyonu (D19, D37, D38).
5. `architecture.md` — Claude Code + Fable.
6. Tek kurum için uçtan uca dikey dilim.

## Bloke olanlar
- **Reklam eşiği (A2)** → araç sayfalarının trafik verisi olmadan belirlenemez.

## Açık kararlar
- **A2** Reklam eşiği — trafik bekliyor. Envanter §16 araç sayfalarında (D28);
  eşik oran değil mutlak taban + oran olmalı.
- **A4** Mevzuat teyitleri (A4.1 reklam sınırı, A4.2 fiyat tanıtımı,
  A4.3 İYS/ticari elektronik ileti, **A4.4 oda portalı kullanım şartları:
  otomatik giriş ve dışa aktarım ticari sisteme devredilebilir mi**) — Poi'de.
  A4.4 "hayır" ise K1 tazelemesi kalıcı olarak elle dışa aktarım + otomatik alım.
- A1, A3, A5 KAPANDI.

## Sonraki oturuma devreden bulgular
Ağır: (5) Faz 1 öldürme kriteri 1 ölçülemez, "5 eczane" kaynaksız ·
(7) R2 çıktısının alıcısı yok · (12) saha formunda takip etiketi ve
`verification_method` yok · (13) K1 aylık tazeleme sahipsiz, §8 girişli
portalı kapsamıyor · (14) Places koordinatı + MapLibre/ToS.
Orta: (8) D36–D38 kelime çelişkisi · (9) A4.1'in L1 blokaj iddiası şişkin ·
(16) §13 v1 ile §16 araçları uzlaşmıyor · (22) Claude Code paketinde §13/§14 yok.
Hijyen: (18) §12 bayat · (19) durum kodları, gövdelerdeki tarihçe ve D33'teki
çift yazılmış cümle · (21) PROJECT "tek gerçek kaynak" ile ORCHESTRATION
katmanı çelişiyor.