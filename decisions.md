# Karar Kaydı

> Her karar: ne, neden, kim verdi. Gerekçesi kaybolan karar ilk zorlukta yeniden açılır.
> Bir kararı değiştirmek için satır silinmez — yeni satır eklenir ve eskisi
> "değiştirildi" olarak işaretlenir.

Durum kodları: **KİLİT** = yeniden tartışılmaz · **AÇIK** = veri bekliyor

---

## Teknoloji

**D1 — Streamlit reddedildi, Next.js (App Router + TS).** KİLİT
Streamlit sunucu tarafı render etmediği için programatik SEO sayfaları üretemez.
SEO burada pazarlama değil mimari zorunluluk — büyüme motorlarından biri o.
*Poi başlattı, gerekçe Opus.*

**D2 — PostgreSQL + PostGIS.** KİLİT
"Şu kuruma bağlı, bana en yakın N eczane" sorgusu doğrudan PostGIS işi.
Ayrı arama motoru gerekmez, `pg_trgm` yeterli. *Opus.*

**D3 — MapLibre + vektör tile, Google Maps JS değil.** KİLİT
Ölçekte maliyet, tam stil kontrolü, satıcı bağımsızlığı. Harita stili ürünün
görsel imzası olacağı için stil kontrolü pazarlıksız. *Opus.*

**D4 — Model API'leri okuma yolunda ÇALIŞMAZ.** KİLİT
Kullanıcı sorgusu saf PostGIS: deterministik, milisaniyelik, maliyetsiz.
Model yalnızca alım zamanında, çevrimdışı, denetlenebilir çıktıyla çalışır.
Sağlık ürününde "kullanıcıya uydurma eczane gösterme" riski sıfırlanmalı. *Opus.*

**D5 — Çok modelli çapraz doğrulama üretimde kullanılacak.** KİLİT
Kritik çıkarım iki farklı sağlayıcıyla yapılır; ayrışırlarsa insan kuyruğuna düşer.
Poi'nin "API'leri birbirine bağlayalım" sezgisinin doğru katmanı bu — asistanlar
arası sohbet değil, üretimde doğrulama. *Poi sordu, Opus konumlandırdı.*

**D6 — Claude Code'un modeli Fable.** KİLİT *Poi.*

---

## Veri

**D7 — Temel varlık `sigorta_şirketi` değil `kurum`, ayrım `kurum_tipi` ile.** KİLİT
Sahada anlaşma yalnızca özel sigortayla değil; banka sandıkları ve diğer kurum
sağlık planları da aynı soruyu üretiyor. Bugün maliyetsiz, sonra göç demek.
*Poi'nin "şirketler, bankalar, kurumlar" ifadesinden yakalandı.*

**D8 — Her kayıt `verification_method` + `verified_at` taşır, `confidence` bundan türer.** KİLİT
Yöntemler: `oda` / `saha` / `telefon` / `eczaci_beyani` / `scraped`.
Arayüz en güçlü doğrulamayı gösterir. *Opus, Poi onayladı.*

**D9 — Çelişki kuralı: eczane beyanı kazanır.** KİLİT
Kurumun listesi "evet", eczane "hayır" diyorsa eczane kazanır — müşteriyi geri
çevirecek olan o. İki kayıt da saklanır, çelişki işaretlenir. *Opus.*

**D10 — Çelişki veri seti stratejik varlıktır.** KİLİT
"Yayınladığınız listenin şu kadarı hatalı, doğrusu bizde" — kaldıraç kapısında
masaya konacak en güçlü koz. Kendiliğinden birikir. *Opus.*

**D11 — Veri toplama sırası: K1 oda portalı → K2 saha (5 bölge/183 eczane, yüz yüze,
telefon dahil) → K3 depo temsilcileri + QR sticker → K4 en kalabalık 5 ilçe telefon
turu → K5 eczacı sahiplenme akışı.** KİLİT
İlk taslak kaldıraca göre sıralanmıştı ve yanlıştı: eczacı, görmediği bir platformun
formunu doldurmaz. Sahiplenme akışı en sona iner. *Poi düzeltti.*

**D12 — Kanonik eczane kütüğü İzmir Eczacı Odası portalından.** KİLİT
Erişim mevcut. Varlık eşlemenin (6.4) en zor sorusu — referans taraf nereden gelecek —
bu erişimle kapandı. *Poi.*

**D13 — QR stant değil sticker.** KİLİT
Yer kaplamaz, izin süreci hafif, reddedilme eşiği düşük, depo temsilcisinin
çantasında taşınır. Her sticker'a ayrı takip etiketi. *Poi.*

**D14 — Ham HTML anlık görüntüsü saklanır.** KİLİT
Kaynak yapısı değiştiğinde geçmişi yeniden işleyebilmek ve "kaynakta böyleydi"
diyebilmek için. *Opus.*

---

## Ürün ve tasarım

**D15 — Zanaat evet, etkileşim yeniliği hayır.** KİLİT
Kural: **tanınmadık bir ürün gibi görün, tanıdık bir ürün gibi çalış.**
Türkiye'de bu kategoride "iyi yapılmış" hissi veren ilk ürün olmak tek başına
farklılaşma; bunun için yeni etkileşim kalıbı icat etmek gerekmiyor — o, gergin
kullanıcı için maliyet. Cesaret görsel kimlikte ve haritada harcanır.
*Poi itiraz etti, ayrım üzerinde uzlaşıldı.*

**D16 — Tipografi Türkçe diakritik güvenli olmak zorunda.** KİLİT
ğ ş ı İ glifleri bozulan font onaylanmaz. *Opus.*

**D17 — Nöbetçi eczane özelliği yapılacak, ama ana ürün olarak değil.** KİLİT
Nöbetçi verisi metadır, farklılaşma yok. Ama gece tekrar tekrar aranan bir şey:
elde tutma motoru. Kurum filtresi farklılaştırır, nöbetçi hatırlatır. *Opus.*

**D18 — Elde tutma özellikleri Faz 1–2'de, Faz 3'te değil.** KİLİT
Kurum filtresi düşük frekanslı; trafik birikmezse ne reklam ne kaldıraç kapısı
çalışır. Poi'nin kendi listesindeki 6-7-8. maddeler bu sorunun cevabı, o yüzden
öne alındı. *Frekans tartışmasının sonucu.*

---

## İş modeli

**D19 — Gelir sıralaması: müzakere gerektirmeyenler önce.**  KİLİT
L1 reklam → L2 çapraz trafik ortaklıkları → L3 veri ürünü → L4 beyaz etiket.
*Poi'nin itirazı üzerine değiştirildi (ilk taslak şirket anlaşmalarını öne almıştı).*

**D20 — Kaldıraç Kapısı.** KİLİT
Sigorta şirketiyle ticari masaya iki koşul birden sağlanmadan oturulmaz:
(1) tekrar eden tüketici trafiği, (2) kendi kaydını doğrulamış eczane ağı.
Kazınmış veriyle masaya oturmak savunmasız pozisyondur — "o bizim verimiz,
kaldırın" denir ve koz kalmaz. Eczane doğrulaması veriyi birinci elden yapar:
hukuki açığı kapatır, kaliteyi kaynağında çözer, izin isteyen taraf olmaktan
çıkarır. *Poi'nin stratejik itirazı; planın en önemli düzeltmesi.*

**D21 — Eczane sahiplenme akışı Faz 1–2'nin ANA hedefi, yan özellik değil.** KİLİT
D20'nin doğrudan sonucu. *Poi.*

**D22 — Güven yüzeyi kuralı.** KİLİT
Eczane sonuç yüzeyi hiçbir gelir kanalına açılmaz: reklam, affiliate, sponsorlu
sıralama, e-ticaret yönlendirmesi — hiçbiri sonuç listesinin içinde, sıralamasında
veya kartlarında yer almaz. Gelir modeli değiştikçe yeniden tartışılmaz.
Tek varlığımız güven; sıralamaya para karıştığı an kaçtığımız kategoriye düşeriz.
Ayrıca eczane reklam yasağıyla doğrudan çarpışır. *Opus, Poi onayladı.*

**D23 — Reklamveren tabanında ilaç YOK.** KİLİT
Beşeri tıbbi ürünlerin halka tanıtımı mevzuatla yasak. Gerçekçi taban:
dermokozmetik, gıda takviyesi, bebek/kişisel bakım, sağlık dışı markalar.
*İlk taslakta "OTC üreticileri" yazmıştım; hatalıydı, düzeltildi.*

**D24 — Reklam etiketleri trafik eşiği aşılmadan koda girmez.** KİLİT
Faz 1'de sadece ölçüm kurulur (oturum, sayfa/oturum), reklam altyapısı değil.
Eşik sayısı madde 6 konuşulduktan sonra belirlenecek. *Opus, Poi onayladı.*

---

## Yürütme

**D25 — "Yayında ama tanıtılmıyor".** KİLİT
Site, yan özellikler bitmeden gerçek alan adında ve indekslenebilir açılır;
hiçbir kanaldan tanıtılmaz. Arama sıralaması alan adı yaşı ve tarama geçmişiyle
birikir — geç açılan site trafiği değil olgunlaşmayı kaybeder, o telafi edilemez.
İtibar riski yok çünkü kimse yönlendirilmiyor. *Poi "önce lokalde bitirelim" dedi,
ikiye ayırarak uzlaşıldı.*

**D26 — Tanıtımlı açılış kapsamı: 5 ilçe × tüm kurumlar.** KİLİT
K4 turu bittikten sonra. Reklam ve il geneline yayılma bunun arkasında. *Poi.*

**D27 — Genişleme kapısı takvim değil veri kalitesi.** KİLİT
Coğrafi hız kopyalanmaya karşı korumaz; savunma doğrulanmış eczane ağı, veri
tazeliği ve güven. Pipeline sağlamsa üç şehir zaten bir hafta sürer; sağlam
değilken açılmak tek varlığımızı yakar. *Opus, Poi kabul etti.*

**D28 — Devir teslim dosyayla, sohbetle değil.** KİLİT
Spec dosyasında olmayan şey kodda olmaz. Dosya sahiplikleri PROJECT.md §10.

---

## Açık — karara bağlanmadı

**A1 — G1 kapsama oranı.** Kurum başına anlaşmalı eczane / toplam eczane.
Ürün *filtre* mi *doğrulama aracı* mı — ana ekranı bu belirliyor. Veri hattının
ilk çıktısı.

**A2 — Reklam eşiği sayısı.** Madde 6 (elde tutma) konuşulduktan sonra.

**A3 — Poi'nin listesinden işlenmemiş maddeler:** 3 (telefon/WhatsApp/harita, özellik
kaydı), 4 (dizin siteleriyle ortaklık), 5 (doktor/hastane dizinleri, kupon),
6 (elde tutma — ayrı ve uzun tur), 7 (bilgilendirici içerik), 8 (Instagram + X, bülten).

**A4 — Mevzuat teyidi:** eczane reklam yasağının "bilgilendirme" sınırı.
Poi'nin kolunda.
