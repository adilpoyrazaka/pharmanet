# ORCHESTRATION.md

Dört modelle ve çok oturumla çalışmanın kuralları.

---

## 1. Dosya katmanları — değişim hızına göre ayrılır

| Katman | Dosya | Değişim | Kim yazar |
|---|---|---|---|
| Plan | `PROJECT.md` | Yavaş | Opus |
| Gerekçe | `decisions.md` | Yavaş, ekleme | Opus + Poi |
| Durum | `STATE.md` | Her oturum, **baştan yazılır** | Opus |
| Ham girdi | `research/*.md` | Ekleme | Gemini çıktısı, olduğu gibi |
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
Gemini çıktısı  →  research/gemini-01.md  (ham, olduğu gibi, dokunulmadan)
                        ↓
                   Opus denetler
                        ↓
   karar değiştiren bulgular  →  decisions.md  (yeni karar veya değişen karar)
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
| **Opus (yardımcı)** | `PROJECT.md` + `decisions.md` + `STATE.md` | — (tam bağlam gerekli) |
| **Claude Code + Fable** | Repo erişimi + `architecture.md` + `PROJECT.md` §6 | İş modeli, ortaklık, sosyal medya |
| **ChatGPT (tasarım)** | `PROJECT.md` §3, §7, §13 + `design.md` | Veri hattı, mimari, gelir modeli |
| **Gemini (araştırma)** | Sadece görev brief'i | Strateji — verirsen yorum yapmaya başlar |

---

## 4. Yazma yetkisi

- `decisions.md` ve `PROJECT.md`'ye **yalnızca Opus ve Poi** yazar.
- Diğer modeller **önerir, işlemez.** Öneri kendi dosyasına yazılır
  (`architecture.md`, `design.md`), karara dönüşmesi Opus'tan geçer.

Sebep: dört model aynı dosyaya yazarsa çelişkiler oluşur ve kimse fark etmez.

---

## 5. Oturum açılış promptu — Opus

> Anlaşmalı eczane bulucu projesinde yardımcımsın. Ekte `PROJECT.md`,
> `decisions.md` ve `STATE.md` var. Üçünü de oku.
>
> Rolün: teknik yönetim, karar kaydı tutmak, diğer modellerin çıktısını
> denetlemek ve gerektiğinde "hayır" demek. Onay makinesi değilsin —
> getirdiğim her şeye karşı argüman ara.
>
> `decisions.md`'de **KİLİT** işaretli kararlar yeniden tartışılmaz;
> yalnızca yeni veri onları çürütüyorsa açılır ve o zaman gerekçesiyle açılır.
>
> Çalışma tarzımız: madde madde ilerleriz, sen tek seferde her şeyi dökmezsin.
> Dosyaya eklenecek markdown yazmadan önce bana sorarsın. Uzun dosyaları
> baştan üretmezsin, sadece değişen bölümü verirsin.
>
> `STATE.md`'yi oku ve kaldığımız yerden devam edelim.

## 6. Oturum kapanış ritüeli

Her oturumun sonunda, sırasıyla:

1. Yeni karar çıktıysa → `decisions.md`'ye eklenir (tarih + gerekçe + kim verdi).
2. Plan değiştiyse → `PROJECT.md`'nin ilgili bölümü güncellenir.
3. `STATE.md` **baştan yazılır**.
4. Hepsi commit edilir.

Bu ritüel atlanırsa bir sonraki oturum yanlış bir durumdan başlar.
Oturum sonunda "STATE güncelle" demen yeterli.

---

## 7. Poi'nin kendi kulvarı

Modellere devredilmeyen, yalnızca sende olan işler:
saha turu ve eczane ilişkileri, oda portalı verisi, mevzuat teyitleri (A4),
depo temsilcisi teması, alan adı ve hesap açılışları, ticari kararlar.

Bunların çıktısı `STATE.md`'ye girer — modeller ancak oradan öğrenir.
