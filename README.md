# BG_term_project
Bu belgede, sağlanan WebGL kodunun detaylı bir açıklaması yer almaktadır. Kod, WebGL kullanarak HTML tuvali üzerinde 'R', 'Ü', 'V', 'E', 'Y', 'D' ve 'A' harflerini çizmeyi amaçlamaktadır. Her harf, farklı renkler ve köşe noktaları kullanılarak temsil edilmiştir.
#HTML Kodu
HTML dosyası, WebGL içeriğinin çizileceği temel bir yapı oluşturur. İçerisinde, WebGL içeriğinin çizileceği bir tuval elementi ve WebGL kodunu içeren 'main.js' dosyasına referans bulunmaktadır.
Fonksiyon: startWebGL()
Bu fonksiyon, WebGL bağlamını başlatır. Tuval elementinden WebGL render bağlamı almaya çalışır. Eğer tarayıcı WebGL'i desteklemiyorsa, 'experimental-webgl' bağlamını kullanmaya çalışır. Eğer bu da başarısız olursa, bir uyarı mesajı gösterir.
Fonksiyon: createShader(gl, type, source)
Bu fonksiyon, belirtilen türde (vertex veya fragment) bir shader oluşturur ve sağlanan kaynak koduyla derler. Eğer derleme başarılı olursa, shader'ı döner. Aksi takdirde, hatayı loglar ve shader'ı siler.
Fonksiyon: createProgram(gl, vertexShader, fragmentShader)
Bu fonksiyon, bir WebGL programı oluşturur, sağlanan vertex ve fragment shader'ları programa ekler ve programı bağlar. Eğer bağlama başarılı olursa, programı döner. Aksi takdirde, hatayı loglar ve programı siler.
Fonksiyon: setLetterPosition(gl, program, positions, translation)
Bu fonksiyon, harf köşe noktaları için pozisyon buffer'ını ayarlar. Pozisyon verilerini buffer'a bağlar, pozisyon için vertex attribute array'ini etkinleştirir ve çeviri uniform'unu ayarlar.
Fonksiyon: drawLetter(gl, program, positions, translation, color)
Bu fonksiyon, 'setLetterPosition' kullanarak harfin pozisyonunu ayarlar ve bir uniform kullanarak rengini belirler. Daha sonra 'gl.drawArrays' fonksiyonunu 'LINES' modu ile çağırarak harf çizgilerini çizer.
Fonksiyon: drawDots(gl, program, positions, translation, color)
Bu fonksiyon, 'Ü' harfi için noktaları çizmek amacıyla pozisyonunu ve rengini ayarlar, 'drawLetter' fonksiyonuna benzer, ancak çizgiler yerine noktaları çizmek için 'gl.drawArrays' fonksiyonunu 'POINTS' modu ile kullanır.
Fonksiyon: main()
'main' fonksiyonu, tüm çizim sürecini düzenler. WebGL'i başlatır, shader'ları derler, programı oluşturur ve her harf için köşe noktalarını ayarlar. Daha sonra tuvali temizler, viewport'u ayarlar ve her harfi belirli pozisyonlarda farklı renklerle çizer.
