# STATE.md

> **Son güncelleme:** 2026-08-12
> Bu dosya kısa kalır (≈40 satır). Her oturumda **baştan yazılır**, eklenmez.
> Uzarsa okunmaz olur ve işlevini kaybeder.
> Sadece "şu an neredeyiz" bilgisi. Gerekçeler `decisions.md`'de, plan `PROJECT.md`'de.

## Faz
Faz 0 — Zemin. Henüz kod yazılmadı.

## Tamamlanan
- `PROJECT.md` bölüm 1–17 yazıldı (strateji, mimari, veri toplama, özellik kaydı,
  ortaklık, elde tutma, sosyal medya).
- `decisions.md` — 30 kilitli karar, gerekçeleriyle (D29 şema adlandırması,
  D30 R/G numaralandırması; D7 ve D8 ek notları dil kararına uyduruldu).
- Poi'nin 8 maddelik `yapılacaklar` listesi madde madde işlendi, kapandı.
- Gemini Araştırma Turu 1 brief'i verildi (7 tablo görevi).

## Şu an devam eden
- Gemini R1…R7 araştırması. **R2 (kapsama oranı) öncelikli.**
  R1 (kurum kaynak envanteri) onun zorunlu ön koşulu: R2'nin payı, R1'in bulduğu
  anlaşmalı eczane sayfalarından sayılır. Brief bunu "R2'yi her şeyden önce yap"
  diye yazıyor; sıra gerçekte R1 → R2.

## Sıradaki adımlar
1. Sosyal medya kullanıcı adlarının alınması (handle kapılma riski).
2. `architecture.md` — Claude Code + Fable.
3. Tek kurum için uçtan uca dikey dilim.

## Bloke olanlar
- **Reklam eşiği** → 30 günlük geri dönen ziyaretçi verisi olmadan belirlenemez.

## Açık kararlar
- **A1** KAPANDI — blokaj değil, K2 saha turunun ölçümü (D31)
- **A2** Reklam eşiği sayısı — trafik verisi bekleniyor
- **A3** (kapandı — 8 maddelik liste işlendi, çıktısı PROJECT.md §13–17)
- **A4** Mevzuat teyitleri: eczane reklam yasağının "bilgilendirme" sınırı,
  sağlık hizmetinde fiyat tanıtımı, İYS/ticari elektronik ileti kapsamı — Poi'de
- **A5** KAPANDI — D29: `facility` + `facility_type`, v1'de tek değerli
  (`pharmacy`), filtre her sorguda açıkça yazılır

## Henüz yapılmamış / risk
- Sosyal medya kullanıcı adları alınmadı.
- Alan adı seçilmedi.
- **Araştırma brief'i tur 2 için düzeltilecek:** (a) G-2'nin paydası ("ilçedeki
  toplam eczane sayısı") Gemini'den istenmemeli — kanonik kütük oda portalı (D12);
  (b) "oran düşükse filtre, yüksekse doğrulama aracı" cümlesi çıkmalı
  (ORCHESTRATION §3: Gemini'ye strateji verilmez); (c) coğrafi birim ilçe değil,
  5 bölge / 183 eczane olmalı (D11) — bkz. D32.
