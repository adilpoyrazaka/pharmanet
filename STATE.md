# STATE.md

> **Son güncelleme:** 2026-08-14
> Bu dosya kısa kalır (≈40 satır). Her oturumda **baştan yazılır**, eklenmez.
> Sadece "şu an neredeyiz" bilgisi. Gerekçeler `decisions.md`'de, plan `PROJECT.md`'de.

## Faz
Faz 0 — Zemin. Henüz kod yazılmadı.

## Tamamlanan
- `PROJECT.md` 1–17, `decisions.md` D1–D48, repo `adilpoyrazaka/pharmanet`.
- Pilot bölge sayıları alındı (183, 2026-08-12 snapshot'ı).
- **2026-08-13 denetimi:** 25 bulgu. Kapatılanlar D35, D3, D41, D42, D43, D44.
- **2026-08-14 / 1:** bulgu (4), (10), (11) kapatıldı; §14 baştan yazıldı; D45
  eklendi; D18, D20, D43 yerinde güncellendi.
- **2026-08-14 / 2:** marka adı **MEDPUSULA** kilitlendi (D46). TÜRKPATENT
  taraması: sınıf 35 ve 44 temiz, 09/42'de canlı PUSULA kayıtları. `.com`,
  `.com.tr` ve `@medpusula` alındı — **D31'in saati başladı.** A4.4/A4.5 kayda
  girdi. Bulgu (28), (30) kapandı.
- **2026-08-14 / 3:** **girişli portal sürekli kaynak olmaktan çıkarıldı**
  (D12, D20 yerinde güncellendi): kişisel kimlik verisi ve erişim bağımlılığı.
  Portal artık yalnızca bir defalık bölge eşlemesi. Süreklilik odanın kamuya
  açık üye listesinden. D47 (satır indirgeme) ve D48 (`mahalle → bölge`)
  eklendi. Bulgu (13), (18), (21), (22), (26), (27) kapandı.

## Şu an devam eden
- **K1 bootstrap** — portaldan eczane → bölge eşlemesinin kopyalanması. Portal
  girişi yapıldı; dışa aktarım yok, bölge bölge kopyalanıp CSV'ye düzenlenecek.
- `research/R1…R7` tur 1 çıktısı bekleniyor.

## Sıradaki adımlar
1. K1 bootstrap: sütun başlıkları + örnek satırlar → şema kesinleştirme.
   Ham yapıştırma metninin saklanma biçimi burada netleşir.
2. **A4.4** — portalın kullanım şartları. Otomasyon sorusu düştü; kalan soru
   girişli portaldan alınan verinin ticari üründe kullanılabilirliği.
3. Bulgu (29): `confidence` saklanan sütun mu, `GENERATED` mı, view alanı mı.
4. Bulgu (12) — saha formu: takip etiketi, `verification_method`,
   `interviewed_at` ↔ `verified_at`. K2 öncesi kilit.
5. Araştırma brief'i tur 2 revizyonu (D19, D37, D38). Uyarı: odanın sitesindeki
   "Anlaşmalı Kurumlar" bölümü bizim kurum verimiz değil, odanın üye indirimleri.
6. `architecture.md` — Claude Code + Fable.
7. Tek kurum için uçtan uca dikey dilim.

## Bloke olanlar
- **Reklam eşiği (A2)** → araç sayfalarının trafik verisi olmadan belirlenemez.

## Açık kararlar
- **A2** Reklam eşiği — trafik bekliyor; eşik oran değil mutlak taban + oran.
- **A4** Mevzuat ve tescil teyitleri (A4.1–A4.5), hepsi Poi'de. A4.1, A4.4 ve
  A4.5 aynı avukat görüşmesinde sorulur.
- A1, A3, A5 KAPANDI.

## Sonraki oturuma devreden bulgular
Ağır: (5) Faz 1 öldürme kriteri 1 ölçülemez, "5 eczane" kaynaksız ·
(7) R2 çıktısının alıcısı yok · (12) saha formunda takip etiketi ve
`verification_method` yok · (14) Places koordinatı + MapLibre/ToS.
Orta: (8) D36–D38 kelime çelişkisi · (9) A4.1'in L1 blokaj iddiası şişkin ·
(16) §13 v1 ile §16 araçları uzlaşmıyor · (29) `confidence` §6.3'te zorunlu
alan, D8'de türev.
Hijyen: (19) durum kodları, gövdelerdeki tarihçe ve D33'teki çift yazılmış cümle.