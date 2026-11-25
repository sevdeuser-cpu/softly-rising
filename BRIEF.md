# The Softly Rising — Project Brief (kararlar)

## Kullanıcının ilk komutları (değişmez gereksinimler)
- Viral potansiyelli YouTube Shorts'u **sürekli ve otomatik** üreten sistem
- Merak uyandıran, gerektiğinde bilgi veren içerik
- **Animasyonlu**, **İngilizce**, ortalama **≤60 sn**, **altyazılı**
- Seslendirme: **Google TTS** (Cloud Text-to-Speech) — anahtar gelene kadar geçici yerel TTS (Kokoro)
- **Ses tasarımı kodla sentezlenecek**: geçişler, tınılar, vurgular, arka plan atmosferi (sample yok)
- **Profesyonel motion graphics** kalitesi

## Kanal
- Mevcut kanal: **The Softly Rising** (eski kadın kanalı, ~22 abone) — isim korunuyor
- Kimlik: kullanıcının mevcut PP (altın "SR" monogram, çiçek dalı, hilal) ve banner'ı (masalsı balkon, dolunay, gül, şato, altın-pembe şafak)
- Slogan: **Heal. Glow. Rise.** · alt slogan önerisi: "Fairytales written in the stars."
- **Video görsel stili (kesin):** referans videolar gibi **düz vektör animasyon**, her madde için anlamı oynayan mini sahne,
  üstte gün/burç başlığı + sayaç (örn. "3 / 7"), altta kelime kelime altyazı. Masalsı/painterly stil videolarda KULLANILMAZ.
- **İmza palet ("rising hour"):** patlıcan moru gökyüzü (#2a1633→#8c3f5e) → mercan/şeftali ufuk (#e9786a, #ffc79a),
  mor dağ katmanları, şampanya altını yazılar (#f6d49a). Gece laciverti KULLANILMAZ (referansla/rakiplerle aynı).
- **Kalıcı ana karakter:** banner'daki kız — sarı dalgalı saç, şeftali kurdele, şampanya elbise. Erkek karakter: mor gömlek.
- Yazı: başlıklar Cinzel (altın), altyazı Cormorant Garamond, etiketler Jost.
- Seslendirme tonu: **fısıltılı, masalsı hikâye anlatıcısı** (geçici: Kokoro af_nicole 0.7 + af_heart 0.3)
- Estetik kadınsı; **içerik cinsiyetsiz** ("you" hitabı, girls/queens yok)
- İkamet ülkesi: Türkiye · video dili: English · kategori: Entertainment · çocuklara özel değil

## Konsept: Astroloji Shorts (referans videoların formatında, bize özgü renk ve karakterle)
Referans: @astrohanetr (format ilhamı; içerik kopyalanmaz). İçerik ayakları:
1. Burç & ilişki listeleri (%40) — 12 burç, "01/12" sayaç, sahne başına mini hikâye
2. Doğum günü / haftanın günü / numeroloji (%25)
3. Gökyüzü takvimi: dolunay isimleri, retrolar, tutulmalar (%20)
4. Gerçek bilgi & mit: gün isimleri gezegenlerden, takımyıldız mitleri (%15)

Viral bileşenler: kendini bulma (burç/gün), duygusal onay, yorum tetikleyici ("comment your day"),
paylaşım tetikleyici ("send this to…"), ilk 1 sn kanca, ilerleme sayacı.
Kaçınılacaklar: felaket/siyaset tahmini, para/sağlık vaadi, şablon tekrar (her video farklı sahneler).

## Para
Shorts RPM düşük → gelir: uzun video hunisi, kişiye özel rapor (PDF, otomatik), affiliate, TikTok (uygunsa).

## Bekleyenler
- Google Cloud API anahtarı: TTS + YouTube Data API + Gemini (görsel üretim)
- Banner alt sloganı güncelleme · banner ≥2048×1152
