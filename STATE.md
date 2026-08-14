# STATE.md

> **Son güncelleme:** 2026-08-14
> Bu dosya kısa kalır (≈40 satır). Her oturumda **baştan yazılır**, eklenmez.
> Sadece "şu an neredeyiz" bilgisi. Gerekçeler `decisions.md`'de, plan `PROJECT.md`'de.

## Faz
Faz 0 — Zemin. Henüz kod yazılmadı.

## Tamamlanan
- `PROJECT.md` 1–17, `decisions.md` D1–D46, repo `adilpoyrazaka/pharmanet`.
- Pilot bölge sayıları alındı (183, 2026-08-12 sayımı).
- **2026-08-13 denetimi:** 25 bulgu. Kapatılanlar D35, D3, D41, D42, D43, D44.
- **2026-08-14 / 1:** bulgu (4), (10), (11) kapatıldı. `.gitignore` dolduruldu.
  §14 baştan yazıldı; D45 eklendi; D18, D20, D43 yerinde güncellendi.
- **2026-08-14 / 2:** **marka adı MEDPUSULA kilitlendi (D46).** TÜRKPATENT
  taraması yapıldı: sınıf 35 ve 44 temiz, 09/42'de canlı PUSULA kayıtları var.
  Alan adı ve sosyal medya kullanıcı adları alındı — **D31'in saati başladı.**
  A4.4 ve A4.5 karar kaydına girdi (bulgu 28 kapandı).

## Şu an devam eden
- **K1 — oda portalından kanonik kütüğün çekilmesi.** Portal girişi yapıldı.
  Portal mesai vermiyor; çalışma saati verisi D45 ile bize ait.
- `research/R1…R7` tur 1 çıktısı bekleniyor.

## Sıradaki adımlar
1. **Bulgu (30):** K1'in çekim kapsamı — tek seferde tüm İzmir mi (D20), yoksa
   önce 5 bölge mi (D43'ün sırası). Portala oturmadan önce cevaplanır.
2. **A4.4** — portal sütun başlıklarına bakarken kullanım şartlarına da bak.
   İkisi aynı oturuşta biter.
3. K1 kütüğü: sütun başlıkları + örnek satırlar → şema kesinleştirme. Dışa
   aktarım biçimi burada netleşir.
4. **Bulgu (26) ve (27):** §6.4 ve §6.6'nın D20/D18 ile hizalanması. Claude Code
   paketi bu iki bölümden okuyacak; bayat kalırsa `architecture.md` yanlış doğar.
5. Bulgu (12) — saha formu: takip etiketi, `verification_method`,
   `interviewed_at` ↔ `verified_at` ilişkisi. K2 öncesi kilit.
6. Araştırma brief'i tur 2 revizyonu (D19, D37, D38).
7. `architecture.md` — Claude Code + Fable.
8. Tek kurum için uçtan uca dikey dilim.

## Bloke olanlar
- **Reklam eşiği (A2)** → araç sayfalarının trafik verisi olmadan belirlenemez.

## Açık kararlar
- **A2** Reklam eşiği — trafik bekliyor. Envanter §16 araç sayfalarında (D28);
  eşik oran değil mutlak taban + oran olmalı.
- **A4** Mevzuat ve tescil teyitleri (A4.1–A4.5), hepsi Poi'de. A4.1 ile A4.5
  aynı avukat görüşmesinde sorulur.
- A1, A3, A5 KAPANDI.

## Sonraki oturuma devreden bulgular
Ağır: (5) Faz 1 öldürme kriteri 1 ölçülemez, "5 eczane" kaynaksız ·
(7) R2 çıktısının alıcısı yok · (12) saha formunda takip etiketi ve
`verification_method` yok · (13) K1 aylık tazeleme sahipsiz · (14) Places
koordinatı + MapLibre/ToS · (26) §6.4 hâlâ Places'e telefon/çalışma saati
yetkisi veriyor, D20 ile çelişiyor · (30) K1 çekim kapsamı D20 ile D43 arasında
iki türlü yazılı.
Orta: (8) D36–D38 kelime çelişkisi · (9) A4.1'in L1 blokaj iddiası şişkin ·
(16) §13 v1 ile §16 araçları uzlaşmıyor · (22) Claude Code paketinde §13/§14 yok ·
(27) §6.6'daki D18 özeti yıllık ve olay tetikli katmanları taşımıyor ·
(29) `confidence` §6.3'te zorunlu alan, D8'de türev — saklanan mı, generated mı.
Hijyen: (18) §12 bayat · (19) durum kodları, gövdelerdeki tarihçe ve D33'teki
çift yazılmış cümle · (21) PROJECT "tek gerçek kaynak" ile ORCHESTRATION
katmanı çelişiyor.