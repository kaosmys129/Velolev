import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("../", import.meta.url).pathname;
const filePath = join(root, "src/data/about-copy.json");
const data = JSON.parse(readFileSync(filePath, "utf8"));

const imagesData = {
  en: [
    [
      "5-Axis Precision CNC Machining Center",
      "High-precision multi-axis CNC machining center dedicated to manufacturing hydraulic manifold blocks, valve bodies, and structural pivot brackets.",
      "CNC Machining"
    ],
    [
      "Hydraulic Cylinder Dedicated Assembly Station",
      "Clean-room assembly workstation equipped with precision seal installers, cylinder bore alignment guides, and hydraulic oil pre-filling fixtures.",
      "Cylinder Assembly"
    ],
    [
      "Robotic Structural Chassis Welding Cell",
      "Automated multi-axis robotic welding rig executing continuous, full-penetration seam welding on high-strength alloy steel chassis and brackets.",
      "Robotic Welding"
    ],
    [
      "Flange & Base Precision Turning Station",
      "Large-diameter horizontal CNC lathe station executing precision facing, circular bolt-hole pattern drilling, and anchor docking surface finishing.",
      "Flange Machining"
    ],
    [
      "24V Powertrain & Control Cabinet Assembly Line",
      "Integrated assembly and wiring line for modular 40 kg IP54 electrical control enclosures, brushless drive units, and waterproof quick-disconnect harnesses.",
      "Powertrain Assembly"
    ]
  ],
  es: [
    [
      "Centro de mecanizado CNC de 5 ejes",
      "Centro de mecanizado CNC multieje de alta precisión dedicado a la fabricación de bloques colectores hidráulicos, cuerpos de válvulas y soportes de pivote.",
      "Mecanizado CNC"
    ],
    [
      "Estación de montaje de cilindros hidráulicos",
      "Puesto de ensamblaje en sala limpia equipado con instaladores de sellos de precisión, guías de alineación de vástagos y precarga de aceite hidráulico.",
      "Montaje de cilindros"
    ],
    [
      "Célula robótica de soldadura de chasis estructural",
      "Equipo robotizado multieje de soldadura que ejecuta cordones continuos de penetración completa en chasis y articulaciones de acero de alta resistencia.",
      "Soldadura robótica"
    ],
    [
      "Estación de mecanizado y torneado de bridas y bases",
      "Torno CNC horizontal de gran diámetro para refrentado de precisión, mecanizado de patrones de pernos y acabado de acoplamiento de anclaje.",
      "Mecanizado de brida"
    ],
    [
      "Línea de ensamblaje de armario eléctrico y tracción 24V",
      "Línea de montaje y cableado para armarios de control IP54 modulares de 40 kg, motores sin escobillas y conectores estancos de desconexión rápida.",
      "Montaje de tracción"
    ]
  ],
  fr: [
    [
      "Centre d'usinage CNC 5 axes de précision",
      "Centre d'usinage CNC multi-axes de haute précision dédié à la fabrication des blocs forés hydrauliques, corps de vannes et supports d'articulation.",
      "Usinage CNC"
    ],
    [
      "Poste d'assemblage dédié pour vérins hydrauliques",
      "Poste d'assemblage en environnement contrôlé équipé d'outils de pose de joints haute pression, guidages d'alignement et remplissage d'huile propre.",
      "Assemblage vérin"
    ],
    [
      "Cellule robotisée de soudage de châssis structural",
      "Dispositif robotisé multi-axes exécutant des cordons continus à pleine pénétration sur châssis et chapes en acier allié à haute résistance.",
      "Soudage robotisé"
    ],
    [
      "Poste d'usinage et tournage de bride et socle",
      "Tour CNC horizontal de grand diamètre réalisant le surfaçage de précision, le perçage des cercles de boulonnage et la finition d'ancrage.",
      "Usinage de bride"
    ],
    [
      "Ligne d'assemblage coffret électrique et motorisation 24V",
      "Ligne d'intégration et câblage pour coffrets de commande IP54 modulaires de 40 kg, variateurs brushless et faisceaux étanches à raccord rapide.",
      "Assemblage commande"
    ]
  ],
  pt: [
    [
      "Centro de usinagem CNC de precisão de 5 eixos",
      "Centro de usinagem CNC multieixo de alta precisão dedicado à fabricação de blocos manifold hidráulicos, corpos de válvulas e suportes de articulação.",
      "Usinagem CNC"
    ],
    [
      "Estação dedicada de montagem de cilindros hidráulicos",
      "Bancada de montagem em ambiente controlado equipada com instaladores de vedações de precisão, guias de alinhamento e pré-abastecimento de óleo.",
      "Montagem de cilindro"
    ],
    [
      "Célula robotizada de soldagem de chassi estrutural",
      "Equipamento robotizado multieixo executando soldagem contínua de penetração total em chassis e suportes de aço de alta resistência.",
      "Soldagem robótica"
    ],
    [
      "Estação de usinagem e torneamento de flanges e base",
      "Torno CNC horizontal de grande diâmetro para faceamento de precisão, furação de padrão de parafusos e acabamento da base de ancoragem.",
      "Usinagem de flange"
    ],
    [
      "Linha de montagem do gabinete elétrico e tração 24V",
      "Linha de montagem e cabeamento para gabinetes de controle IP54 modulares de 40 kg, motores brushless e chicotes estanques de desconexão rápida.",
      "Montagem de tração"
    ]
  ],
  id: [
    [
      "Pusat Pemesinan CNC Presisi 5-Sumbu",
      "Pusat pemesinan CNC multi-sumbu presisi tinggi khusus untuk memproduksi blok manifold hidrolik, badan katup, dan braket pivot struktural.",
      "Pemesinan CNC"
    ],
    [
      "Stasiun Perakitan Khusus Silinder Hidrolik",
      "Stasiun kerja perakitan ruang bersih yang dilengkapi instalatur segel presisi, panduan kelurusan silinder, dan pengisian awal oli hidrolik.",
      "Perakitan Silinder"
    ],
    [
      "Sel Pengelasan Robotik Sasis Struktural",
      "Instalasi pengelasan robotik multi-sumbu otomatis yang melakukan pengelasan penetrasi penuh kontinu pada sasis baja paduan berkekuatan tinggi.",
      "Pengelasan Robotik"
    ],
    [
      "Stasiun Pembubutan Presisi Flens & Dudukan Dasar",
      "Mesin bubut CNC horizontal diameter besar untuk perataan permukaan presisi, pengeboran pola lingkaran baut, dan penyelesaian dudukan angkur.",
      "Pemesinan Flens"
    ],
    [
      "Jalur Perakitan Kabinet Kontrol & Penggerak 24V",
      "Jalur perakitan dan pengkabelan terpadu untuk kabinet kontrol IP54 modular 40 kg, unit penggerak brushless, dan kabel tahan air lepas-cepat.",
      "Perakitan Penggerak"
    ]
  ],
  vi: [
    [
      "Trung tâm gia công CNC chính xác 5 trục",
      "Trung tâm gia công CNC đa trục độ chính xác cao chuyên dụng chế tạo khối van thủy lực manifold, thân van và giá đỡ xoay kết cấu.",
      "Gia công CNC"
    ],
    [
      "Trạm lắp ráp chuyên dụng xy lanh thủy lực",
      "Khu vực lắp ráp phòng sạch trang bị đồ gá lắp phớt làm kín độ chính xác cao, dẫn hướng căn chỉnh nòng xy lanh và nạp dầu sơ bộ.",
      "Lắp ráp xy lanh"
    ],
    [
      "Trạm hàn robot kết cấu khung gầm",
      "Hệ thống robot hàn đa trục tự động thực hiện các đường hàn ngấu liên tục trên khung gầm thép hợp kim cường độ cao và giá đỡ khớp nối.",
      "Hàn robot"
    ],
    [
      "Trạm tiện chính xác mặt bích và đế tự neo",
      "Máy tiện CNC ngang đường kính lớn gia công phay mặt đầu chính xác, khoan vòng lỗ bu lông và gia công hoàn thiện bề mặt neo ngàm.",
      "Gia công mặt bích"
    ],
    [
      "Dây chuyền lắp ráp tủ điều khiển và động lực 24V",
      "Dây chuyền lắp ráp và đấu dây tích hợp cho tủ điều khiển IP54 dạng mô-đun 40 kg, bộ truyền động không chổi than và cụm giắc nối chống nước.",
      "Lắp ráp động lực"
    ]
  ],
  th: [
    [
      "ศูนย์เครื่องจักรกลซีเอ็นซีความแม่นยำสูง 5 แกน",
      "ศูนย์เครื่องจักรกลซีเอ็นซีหลายแกนความแม่นยำสูงสำหรับผลิตบล็อกแมนิโฟลด์ไฮดรอลิก ตัววาล์ว และขายึดจุดหมุนโครงสร้าง",
      "งานกลึงกัดซีเอ็นซี"
    ],
    [
      "แท่นประกอบกระบอกสูบไฮดรอลิกเฉพาะทาง",
      "แท่นปฏิบัติงานประกอบในห้องควบคุมความสะอาดพร้อมอุปกรณ์ติดตั้งซีลความแม่นยำสูง รางปรับแนวแกนกระบอกสูบ และระบบเติมน้ำมันไฮดรอลิกบริสุทธิ์",
      "การประกอบกระบอกสูบ"
    ],
    [
      "เซลล์เชื่อมอัตโนมัติด้วยหุ่นยนต์สำหรับแชสซีโครงสร้าง",
      "แท่นเชื่อมหุ่นยนต์หลายแกนอัตโนมัติสำหรับการเชื่อมแนวรอยต่อลึกต่อเนื่องบนโครงแชสซีและขายึดเหล็กกล้าผสมความแข็งแรงสูง",
      "การเชื่อมหุ่นยนต์"
    ],
    [
      "แท่นกลึงความแม่นยำสูงสำหรับหน้าแปลนและฐานยึด",
      "เครื่องกลึงซีเอ็นซีแนวนอนขนาดเส้นผ่านศูนย์กลางใหญ่สำหรับปาดหน้าผิวเรียบ เจาะลวดลายวงรูกลอน และเก็บผิวสัมผัสฐานยึดพุก",
      "งานกลึงหน้าแปลน"
    ],
    [
      "สายประกอบตู้ควบคุมไฟฟ้าและระบบขับเคลื่อน 24V",
      "สายงานประกอบและเดินสายไฟครบวงจรสำหรับตู้ควบคุมไฟฟ้า IP54 แบบแยกส่วน 40 กก. ชุดขับเคลื่อนไร้แปรงถ่าน และชุดสายไฟกันน้ำถอดเร็ว",
      "การประกอบระบบขับเคลื่อน"
    ]
  ]
};

const metrologyHeadData = {
  en: [
    "Comprehensive Testing & Packaging Equipment",
    "Factory Inspection Roster & Packaging Verification.",
    "Specialized metrology instruments, endurance test benches, and heavy-duty export packaging equipment ensuring verified field performance."
  ],
  es: [
    "Equipos integrales de ensayo y embalaje",
    "Catálogo de inspección en fábrica y verificación de embalaje.",
    "Instrumentos de metrología especializada, bancos de prueba de resistencia y equipos de embalaje de exportación pesada."
  ],
  fr: [
    "Équipements complets d'essais et d'emballage",
    "Inventaire d'inspection en usine et validation du conditionnement.",
    "Instruments de métrologie spécialisée, bancs d'essais d'endurance et outillage d'emballage lourd pour l'exportation."
  ],
  pt: [
    "Equipamentos integrados de teste e embalagem",
    "Relação de inspeção em fábrica e verificação de embalagem.",
    "Instrumentos de metrologia especializada, bancadas de teste de resistência e equipamentos para embalagem pesada de exportação."
  ],
  id: [
    "Peralatan Pengujian & Pengemasan Komprehensif",
    "Daftar Inspeksi Pabrik & Verifikasi Pengemasan.",
    "Instrumen metrologi khusus, meja uji ketahanan, dan peralatan pengemasan ekspor tugas berat untuk memastikan keandalan lapangan."
  ],
  vi: [
    "Trang thiết bị kiểm định và đóng gói toàn diện",
    "Danh mục thiết bị kiểm tra xuất xưởng và đóng gói xuất khẩu.",
    "Dụng cụ đo lường chuyên dụng, bệ thử tải độ bền và thiết bị đóng gói chịu lực xuất khẩu đảm bảo vận hành tin cậy."
  ],
  th: [
    "อุปกรณ์การทดสอบและบรรจุภัณฑ์ครบวงจร",
    "บัญชีอุปกรณ์ตรวจสอบในโรงงานและการควบคุมคุณภาพบรรจุภัณฑ์",
    "เครื่องมือมาตรวิทยาเฉพาะทาง แท่นทดสอบความทนทาน และเครื่องมือบรรจุหีบห่อส่งออกอย่างหนาเพื่อความน่าเชื่อถือหน้างาน"
  ]
};

const metrologyData = {
  en: [
    [
      "Benchtop Rockwell & Vickers Hardness Tester",
      "Precision testing of raw steel tensile strength, heat treatment penetration, and surface hardness on critical load-bearing components.",
      "HARDNESS TEST"
    ],
    [
      "Digital Metrology Calipers & Laser Alignment Tool",
      "Laser coaxiality verification, digital micrometer hole-spacing measurement, and flange pitch-circle diameter tolerance checking.",
      "DIMENSIONAL TOLERANCE"
    ],
    [
      "Digital Coating & Paint Thickness Gauge",
      "Non-destructive dry film thickness testing across epoxy primer and polyurethane finish layers for marine corrosion protection.",
      "COATING INSPECTION"
    ],
    [
      "24V Battery Pack Automated Charge/Discharge Cycler",
      "Automated multi-channel load testing verifying battery capacity retention, internal impedance, discharge voltage stability, and thermal control.",
      "BATTERY CYCLING"
    ],
    [
      "Electrical Insulation & Emergency Stop Safety Test Station",
      "High-voltage dielectric withstand testing, ground continuity verification, and emergency power-cut latching response testing.",
      "SAFETY HIPOT"
    ],
    [
      "Industrial Chamber Vacuum & Moisture-Barrier Sealer",
      "High-vacuum nitrogen purge and heat sealing inside heavy aluminum vapor-barrier pouches, preventing maritime transit corrosion.",
      "VACUUM SEALING"
    ],
    [
      "Pneumatic Heavy-Duty Steel & PET Strapping Tensioner",
      "Pneumatic high-tension banding tool securing crated lifting machinery onto heat-treated export pallets with uniform holding tension.",
      "EXPORT STRAPPING"
    ],
    [
      "High-Density EVA Foam CNC Routing Workstation",
      "Precision CNC carving of custom multi-axis closed-cell EVA foam protective liners matching module geometries to absorb road transit shocks.",
      "FOAM MACHINING"
    ]
  ],
  es: [
    [
      "Durómetro de banco Rockwell y Vickers",
      "Ensayo de precisión de resistencia a la tracción del acero, penetración de tratamiento térmico y dureza superficial en piezas de carga crítica.",
      "DUREZA"
    ],
    [
      "Calibres digitales de metrología y alineador láser",
      "Verificación de coaxialidad láser, medición digital de distancia entre orificios y control de tolerancia en círculo de pernos de brida.",
      "TOLERANCIA DIMENSIONAL"
    ],
    [
      "Medidor digital de espesor de recubrimiento y pintura",
      "Ensayo no destructivo de espesor de película seca en imprimación epoxi y acabado de poliuretano para protección anticorrosiva marina.",
      "ESPESOR PINTURA"
    ],
    [
      "Ciclador automático de carga y descarga de batería 24V",
      "Ensayo automatizado de carga multicanal que verifica retención de capacidad, impedancia interna, estabilidad de voltaje y control térmico.",
      "CICLADO BATERÍA"
    ],
    [
      "Estación de ensayo dieléctrico y parada de emergencia",
      "Prueba de rigidez dieléctrica de alta tensión, continuidad de puesta a tierra y verificación de respuesta de desconexión de emergencia.",
      "ENSAYO DIELÉCTRICO"
    ],
    [
      "Envasadora al vacío de cámara industrial con termosellado",
      "Evacuación de aire de alto vacío y termosellado en bolsas de barrera de aluminio para evitar corrosión durante el transporte marítimo.",
      "SELLADO AL VACÍO"
    ],
    [
      "Flejadora neumática de alta tensión para fleje de acero y PET",
      "Herramienta neumática de flejado de alta tensión que asegura la maquinaria embalada sobre palés de exportación tratados térmicamente.",
      "FLEJADO DE EXPORTACIÓN"
    ],
    [
      "Estación CNC de mecanizado de espuma EVA de alta densidad",
      "Tallado CNC de precisión de inserciones de espuma EVA de celda cerrada personalizadas que absorben impactos durante el transporte.",
      "MECANIZADO ESPUMA"
    ]
  ],
  fr: [
    [
      "Duromètre d'établi Rockwell et Vickers",
      "Contrôle de précision de la résistance à la traction de l'acier, de la trempe thermique et de la dureté superficielle des composants d'effort.",
      "DURETÉ"
    ],
    [
      "Pieds à coulisse numériques et alignement laser",
      "Contrôle de coaxialité laser, mesure micrométrique numérique de l'entraxe des trous et vérification des tolérances de cercle de perçage.",
      "TOLÉRANCE DIMENSIONNELLE"
    ],
    [
      "Jauge numérique d'épaisseur de revêtement et peinture",
      "Contrôle non destructif de l'épaisseur de film sec sur primaire époxy et finition polyuréthane pour la protection anticorrosion marine.",
      "ÉPAISSEUR PEINTURE"
    ],
    [
      "Banc de cyclage charge/décharge automatisé batterie 24V",
      "Essais de charge multivoies automatisés validant la rétention de capacité, l'impédance interne, la stabilité de tension et le comportement thermique.",
      "CYCLAGE BATTERIE"
    ],
    [
      "Poste d'essai diélectrique et coupure d'urgence",
      "Essais de tenue diélectrique haute tension, continuité de masse et validation du temps de réponse du verrouillage d'arrêt d'urgence.",
      "RIGIDITÉ DIÉLECTRIQUE"
    ],
    [
      "Machine sous vide industrielle à cloche et thermoscellage",
      "Mise sous vide poussée et thermoscellage sous film barrière aluminium pour prévenir l'oxydation pendant le fret maritime.",
      "SCELLAGE SOUS VIDE"
    ],
    [
      "Cercleuse pneumatique haute tension pour feuillard acier et PET",
      "Outil pneumatique de cerclage haute tension arrimant l'équipement emballé sur palettes d'exportation traitées thermiquement.",
      "CERCLAGE EXPORT"
    ],
    [
      "Poste de fraisage CNC de mousse EVA haute densité",
      "Usinage CNC de précision d'inserts protecteurs en mousse EVA à cellules fermées épousant les formes du matériel contre les chocs de transport.",
      "FRAISAGE MOUSSE"
    ]
  ],
  pt: [
    [
      "Durômetro de bancada Rockwell e Vickers",
      "Ensaio de precisão da resistência à tração do aço, penetração de tratamento térmico e dureza superficial em peças estruturais críticas.",
      "DUREZA"
    ],
    [
      "Paquímetros digitais de metrologia e alinhador a laser",
      "Verificação de coaxialidade a laser, medição micrométrica de distância entre furos e tolerância do diâmetro do círculo de parafusos da flange.",
      "TOLERÂNCIA DIMENSIONAL"
    ],
    [
      "Medidor digital de espessura de revestimento e pintura",
      "Ensaio não destrutivo de espessura de película seca sobre primer epóxi e poliuretano para proteção contra corrosão marítima.",
      "ESPESSURA PINTURA"
    ],
    [
      "Ciclador automático de carga e descarga de bateria 24V",
      "Testes automatizados sob carga multicanal verificando retenção de capacidade, impedância interna, estabilidade de tensão e controle térmico.",
      "CICLAGEM BATERIA"
    ],
    [
      "Bancada de ensaio dielétrico e parada de emergência",
      "Teste de rigidez dielétrica de alta tensão, continuidade de aterramento e resposta de desarme do botão de emergência.",
      "ENSAIO DIELÉTRICO"
    ],
    [
      "Seladora a vácuo de câmara industrial com barreira de vapor",
      "Evacuação de alto vácuo e selagem térmica em bolsas aluminizadas de barreira contra umidade, evitando corrosão no transporte marítimo.",
      "SELAGEM A VÁCUO"
    ],
    [
      "Cintadora pneumática de alta tensão para fita de aço e PET",
      "Ferramenta pneumática de cintagem de alta tensão fixando a máquina embalada sobre paletes de exportação tratados termicamente.",
      "CINTAGEM EXPORTAÇÃO"
    ],
    [
      "Estação de fresagem CNC de espuma EVA de alta densidade",
      "Usinagem CNC de precisão de berços protetores de espuma EVA de célula fechada sob medida para absorver impactos de transporte.",
      "FRESAGEM ESPUMA"
    ]
  ],
  id: [
    [
      "Penguji Kekerasan Benchtop Rockwell & Vickers",
      "Pengujian presisi kekuatan tarik baja, kedalaman perlakuan panas, dan kekerasan permukaan pada komponen penahan beban kritis.",
      "KEKERASAN"
    ],
    [
      "Jangka Sorong Digital & Alat Penyelaras Laser",
      "Verifikasi koaksialitas laser, pengukuran jarak antar lubang digital, dan pemeriksaan toleransi lingkaran baut flens.",
      "TOLERANSI DIMENSI"
    ],
    [
      "Alat Ukur Ketebalan Lapisan & Cat Digital",
      "Pengujian tak merusak ketebalan lapisan kering pada primer epoksi dan poliuretan untuk ketahanan korosi maritim.",
      "KETEBALAN CAT"
    ],
    [
      "Penguji Siklus Pengisian/Pengosongan Baterai 24V",
      "Pengujian beban multi-saluran otomatis untuk memverifikasi retensi kapasitas, impedansi internal, stabilitas voltase, dan kontrol termal.",
      "SIKLUS BATERAI"
    ],
    [
      "Stasiun Uji Isolasi Listrik & Penghentian Darurat",
      "Pengujian ketahanan dielektrik tegangan tinggi, kontinuitas pentanahan, dan respons pemutusan daya darurat.",
      "UJI DIELEKTRIK"
    ],
    [
      "Mesin Pengemas Hampa Udara Industri & Segel Uap",
      "Pembuangan udara bertekanan tinggi dan penyegelan panas dalam kantong aluminium penghalang uap air untuk mencegah korosi laut.",
      "SEGEL VAKUM"
    ],
    [
      "Alat Pengikat Tali Baja & PET Pneumatik Tugas Berat",
      "Alat penegang tali pengikat pneumatik bertekanan tinggi untuk mengamankan peti mesin ke palet ekspor dengan tegangan seragam.",
      "PENGIKAT PETI"
    ],
    [
      "Stasiun Pemotongan CNC Busa EVA Kepadatan Tinggi",
      "Pemesinan CNC presisi untuk bantalan pelindung busa EVA sel tertutup yang menyerap guncangan selama transportasi darat dan laut.",
      "PEMESINAN BUSA"
    ]
  ],
  vi: [
    [
      "Máy đo độ cứng để bàn Rockwell và Vickers",
      "Kiểm tra chính xác độ bền kéo của phôi thép, chiều sâu xử lý nhiệt và độ cứng bề mặt trên các chi tiết chịu lực trọng yếu.",
      "ĐỘ CỨNG"
    ],
    [
      "Thước kẹp đo lường kỹ thuật số và dụng cụ căn laser",
      "Kiểm định độ đồng tâm bằng tia laser, đo khoảng cách lỗ bu lông kỹ thuật số và kiểm tra dung sai đường kính vòng bu lông mặt bích.",
      "DUNG SAI KÍCH THƯỚC"
    ],
    [
      "Thiết bị đo độ dày lớp phủ và sơn kỹ thuật số",
      "Kiểm tra không phá hủy độ dày màng sơn khô trên lớp lót epoxy và lớp phủ polyurethane chống ăn mòn môi trường biển.",
      "ĐỘ DÀY SƠN"
    ],
    [
      "Máy đo chu kỳ sạc xả tự động bộ pin 24V",
      "Hệ thống kiểm tra tải đa kênh tự động xác nhận dung lượng duy trì, trở kháng trong, độ ổn định điện áp và kiểm soát nhiệt độ.",
      "CHU KỲ PIN"
    ],
    [
      "Trạm thử nghiệm an toàn điện cách ly và dừng khẩn cấp",
      "Kiểm tra độ bền điện môi điện áp cao, thông mạch nối đất và thời gian đáp ứng ngắt nguồn nút dừng khẩn cấp.",
      "CÁCH ĐIỆN AN TOÀN"
    ],
    [
      "Máy hút chân không công nghiệp buồng đôi và ép nhiệt",
      "Hút chân không áp suất cao và ép nhiệt kín túi màng nhôm ngăn ẩm, ngăn ngừa hoàn toàn hiện tượng oxy hóa ăn mòn trong hành trình biển.",
      "HÚT CHÂN KHÔNG"
    ],
    [
      "Dụng cụ siết đai khí nén hạng nặng cho đai thép và đai PET",
      "Thiết bị siết đai khí nén lực căng cao cố định kiện máy đóng thùng vào pallet xuất khẩu đã xử lý nhiệt với lực kẹp đồng đều.",
      "SIẾT ĐAI XUẤT KHẨU"
    ],
    [
      "Trạm phay định hình CNC mút xốp EVA mật độ cao",
      "Phay CNC chính xác đệm bảo vệ bọt xốp EVA ô kín theo biên dạng mô-đun thiết bị nhằm triệt tiêu hoàn toàn rung chấn vận chuyển.",
      "GIA CÔNG ĐỆM MÚT"
    ]
  ],
  th: [
    [
      "เครื่องทดสอบความแข็งแบบตั้งโต๊ะ Rockwell & Vickers",
      "การทดสอบความแม่นยำของความทนแรงดึงของเหล็กกล้า ความลึกของการอบชุบความร้อน และความแข็งผิวบนชิ้นส่วนรับน้ำหนักหลัก",
      "ความแข็ง"
    ],
    [
      "เวอร์เนียร์ดิจิทัลและเครื่องมือปรับแนวเลเซอร์",
      "การตรวจวัดแนวแกนร่วมด้วยเลเซอร์ การวัดระยะห่างรูดิจิทัล และการตรวจสอบค่าพิกัดความเผื่อของวงสลักเกลียวหน้าแปลน",
      "พิกัดความเผื่อขนาด"
    ],
    [
      "เครื่องวัดความหนาของสารเคลือบและชั้นสีดิจิทัล",
      "การทดสอบความหนาของชั้นฟิล์มแห้งแบบไม่ทำลายบนชั้นสีรองพื้นอีพ็อกซี่และโพลียูรีเทนสำหรับต้านทานการกัดกร่อน",
      "ความหนาชั้นสี"
    ],
    [
      "เครื่องทดสอบการประจุและคายประจุชุดแบตเตอรี่ 24V อัตโนมัติ",
      "การทดสอบภาระโหลดอัตโนมัติหลายช่องทางเพื่อตรวจสอบความจุคงเหลือ ความต้านทานภายใน ความเสถียรของแรงดันไฟฟ้า และการควบคุมอุณหภูมิ",
      "รอบการทำงานแบตเตอรี่"
    ],
    [
      "แท่นทดสอบความเป็นฉนวนไฟฟ้าและระบบหยุดฉุกเฉิน",
      "การทดสอบความทนทานต่อแรงดันไฟฟ้าสูง การตรวจสอบความต่อเนื่องของสายดิน และการตอบสนองตัดไฟของปุ่มหยุดฉุกเฉิน",
      "ความปลอดภัยทางไฟฟ้า"
    ],
    [
      "เครื่องซีลสุญญากาศห้องคู่ระดับอุตสาหกรรม",
      "การดูดอากาศสุญญากาศระดับสูงและการซีลปิดผนึกด้วยความร้อนในซองฟอยล์อะลูมิเนียมกันความชื้น ป้องกันการกัดกร่อนจากไอทะเล",
      "การซีลสุญญากาศ"
    ],
    [
      "เครื่องรัดสายรัดเหล็กและสายรัด PET แบบใช้ลมแรงดึงสูง",
      "เครื่องมือรัดแถบรัดแรงดึงสูงด้วยระบบลม ยึดตรึงกล่องเครื่องจักรเข้ากับพาเลทส่งออกอย่างแน่นหนาด้วยแรงตึงที่สม่ำเสมอ",
      "การรัดแถบส่งออก"
    ],
    [
      "แท่นตัดโฟม EVA ความหนาแน่นสูงด้วยเครื่องซีเอ็นซี",
      "การแกะสลักซีเอ็นซีความแม่นยำสูงสำหรับแผ่นโฟมกันกระแทก EVA ชนิดเซลล์ปิดเข้ารูปทรงเครื่องจักรเพื่อซับแรงกระแทกระหว่างการเดินทาง",
      "การกลึงขึ้นรูปโฟม"
    ]
  ]
};

for (const lang of ["en", "es", "fr", "pt", "id", "vi", "th"]) {
  data[lang].images = imagesData[lang];
  data[lang].metrologyHead = metrologyHeadData[lang];
  data[lang].metrology = metrologyData[lang];
}

writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
console.log("about-copy.json successfully updated across all 7 languages!");
