# ORCHESTRATION.md

Dört modelle ve çok oturumla çalışmanın kuralları.

---

## 1. Dosya katmanları — değişim hızına göre ayrılır

| Katman | Dosya | Değişim | Kim yazar |
|---|---|---|---|
| Plan | `PROJECT.md` | Yavaş | Opus |
| Gerekçe | `decisions.md` | Yavaş, yerinde güncelleme | Opus + Poi |
| Durum | `STATE.md` | Her oturum, **baştan yazılır** | Opus |
| Süreç | `ORCHESTRATION.md` + `session-prompt.md` | Nadiren, ikisi birlikte | Opus + Poi |
| Ham girdi | `research/R<n>.md` | Ekleme | Gemini çıktısı, olduğu gibi |
| Teknik | `architecture.md` | Orta | Claude Code + Fable |
| Tasarım | `design.md` | Orta | ChatGPT |

**Neden ayrı:** yavaş değişen kararlarla hızlı değişen durumu aynı dosyaya
koyarsan dosya çürür — ya çok uzar ve okunmaz, ya da güncellenmez ve yanlış olur.

---

## 2. Gemini çıktısı nereye gider

**`PROJECT.md`'ye YAPIŞTIRILMAZ.** Üç sebeple: uzun ve çoğu gürültü;
doğrulanmamış girdi, karar değil; her turda yenisi gelecek.

Akış:

```
Gemini çıktısı  →  research/R1.md  (ham, olduğu gibi, dokunulmadan)
                        ↓
                   Opus denetler
                        ↓
   karar değiştiren bulgular  →  decisions.md  (yeni karar veya güncellenen karar)
   plan değiştiren bulgular   →  PROJECT.md    (ilgili bölüm güncellenir)
                        ↓
                   STATE.md güncellenir
```

Bu, veri hattındaki desenin aynısı: ham saklanır, sonuç yayınlanır.
`research/` arşivdir; oturumlara taşınmaz, sadece gerektiğinde açılır.

---

## 3. Minimum yeterli bağlam — her modele aynı paket verilmez

Fazla bağlam modeli kötüleştirir: kendi şeridi dışındaki konularda yorum
yapmaya başlar ve token yakar.

| Model | Verilecek | Verilmeyecek |
|---|---|---|
| **Opus (yardımcı)** | `PROJECT.md` + `decisions.md` + `STATE.md` + `ORCHESTRATION.md` | — (tam bağlam gerekli) |
| **Claude Code + Fable** | Repo erişimi + `architecture.md` + `PROJECT.md` §6 | İş modeli, ortaklık, sosyal medya |
| **ChatGPT (tasarım)** | `PROJECT.md` §3, §7, §13 + `design.md` | Veri hattı, mimari, gelir modeli |
| **Gemini (araştırma)** | Sadece görev brief'i | Strateji — verirsen yorum yapmaya başlar |

`ORCHESTRATION.md` Opus'a taşınır: dosyalar arası çelişkileri ancak süreç
kurallarını gören taraf yakalayabilir.

---

## 4. Yazma yetkisi

- `decisions.md` ve `PROJECT.md`'ye **yalnızca Opus ve Poi** yazar.
- Diğer modeller **önerir, işlemez.** Öneri kendi dosyasına yazılır
  (`architecture.md`, `design.md`), karara dönüşmesi Opus'tan geçer.

Sebep: dört model aynı dosyaya yazarsa çelişkiler oluşur ve kimse fark etmez.

---

## 5. Karar kaydının bakımı (D40)

- Karar değiştiğinde gövdesi **yerinde güncellenir**; ek not açılmaz.
  Kaydın geçmişi dosyada değil git'te tutulur.
- Yeni karar sıradaki numarayı alır ve **konu bölümünün sonuna** girer.
- Numaralar bölüm içinde artar, bölümler arasında artmaz.
- Toplu renumaralama yapılmaz: eski oturumlardaki ve commit mesajlarındaki
  atıfları geçersiz kılar.

---

## 6. Oturum promptu ve kapanış ritüeli

→ `session-prompt.md`

Açılış promptu ve kapanış ritüeli orada. Bu dosya değişirse
`session-prompt.md`'yi de güncelle — ikisi birbirine bakar.

---

## 7. Poi'nin kendi kulvarı

Modellere devredilmeyen, yalnızca sende olan işler:
saha turu ve eczane ilişkileri, oda portalı verisi, mevzuat teyitleri (A4),
depo temsilcisi teması, alan adı ve hesap açılışları, ticari kararlar.

Bunların çıktısı `STATE.md`'ye girer — modeller ancak oradan öğrenir.
