# STATE.md

> **Son güncelleme:** 2026-08-13
> Bu dosya kısa kalır (≈40 satır). Her oturumda **baştan yazılır**, eklenmez.
> Uzarsa okunmaz olur ve işlevini kaybeder.
> Sadece "şu an neredeyiz" bilgisi. Gerekçeler `decisions.md`'de, plan `PROJECT.md`'de.

## Faz
Faz 0 — Zemin. Henüz kod yazılmadı.

## Tamamlanan
- `PROJECT.md` bölüm 1–17 yazıldı.
- `decisions.md` — D1–D40 kilitli karar, A1–A5 açık kayıt. A1, A3, A5 kapandı.
- Repo kuruldu: github.com/adilpoyrazaka/pharmanet. `.gitattributes` ile satır
  sonu normalize edildi; commit kimliği düzeltildi.
- Pilot bölge sayıları alındı (183, 2026-08-12 sayımı).
- Senkron denetimi 2026-08-13: alan adı çakışması, kapsama oranı kalıntıları,
  Places'in kanonik kütükteki yeri, Gemini dosya adının üç varyantı, A4'ün eksik
  iki maddesi kapatıldı. Karar numaraları baştan sıralandı; eski oturumlardaki
  D numaraları artık geçerli değildir. Bakım kuralı D40'ta: yerinde güncelleme,
  bölüm içi artan numara, toplu renumaralama yok.

## Şu an devam eden
- **K1 — oda portalından kanonik kütüğün çekilmesi.** Sıradaki gerçek iş.
  Portal girişi yapıldı, tüm eczaneler bölge nitelikleriyle görünüyor.
  Word değil CSV/Excel olarak dışa aktarılacak; ham hali üretim verisi olarak
  saklanır, `research/` değildir.
- Gemini R1…R7 turu 1 çıktısı bekleniyor (brief revize edilecek, aşağıda).

## Sıradaki adımlar
1. K1 kütüğü: portal sütun başlıkları + örnek satırlar → şema kesinleştirme.
2. Araştırma brief'i tur 2 revizyonu (D19, D37, D38).
3. `architecture.md` — Claude Code + Fable.
4. Tek kurum için uçtan uca dikey dilim.
5. Sosyal medya kullanıcı adları (handle kapılma riski).

## Bloke olanlar
- **Reklam eşiği** → 30 günlük geri dönen ziyaretçi verisi olmadan belirlenemez.

## Açık kararlar
- **A1** KAPANDI — kapsama oranı projeden çıktı (D38)
- **A2** Reklam eşiği sayısı — trafik verisi bekleniyor
- **A3** KAPANDI — 8 maddelik liste işlendi, çıktısı `PROJECT.md` §13–17
- **A4** Mevzuat teyitleri, üç ayrı soru — A4.1 reklam/bilgilendirme sınırı,
  A4.2 sağlık hizmetinde fiyat tanıtımı, A4.3 İYS/ticari elektronik ileti — Poi'de
- **A5** KAPANDI — D15

## Brief tur 2 düzeltmeleri (D19, D37, D38)
- "EN KRİTİK GÖREV" ibaresi ve strateji cümleleri silinir.
- Kapsama oranıyla ilgili tüm sütunlar kalkar; oran projeden çıktı (D38).
- Coğrafi kırılım istenmez: İzmir geneli, ad + adres satırları (D19).
- Çıktı sayı değil satır; kısmi tablo kabul, eksikler "Erişemediklerim"de.

## Henüz yapılmamış / risk
- Alan adı seçilmedi.
- Sosyal medya kullanıcı adları alınmadı.
- `research/` klasörü henüz yok; ilk R dosyası onu oluşturacak (`research/R1.md`).
