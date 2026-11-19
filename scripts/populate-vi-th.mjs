import fs from "node:fs";

const localesPath = "maquin-astro-theme/src/data/published-content-locales.json";
const localesData = JSON.parse(fs.readFileSync(localesPath, "utf8"));

// VI (12 articles: 2 to 13)
const viArticles = {
  "m24-anchor-bolts-180-260mm-flange-compatibility": {
    locale: "vi",
    slug: "m24-anchor-bolts-180-260mm-flange-compatibility",
    title: "Tương thích bu lông neo M24 và mặt bích 180–260 mm trên máy nâng trụ | velolev",
    h1: "Tính tương thích của bu lông neo M24 và khoảng cách lỗ mặt bích 180–260 mm trên thiết bị nâng trụ đèn di động",
    description: "Hướng dẫn tương thích kỹ thuật cho bu lông neo M24, khoảng cách lỗ mặt bích 180–260 mm, bộ bu lông tiêu chuẩn M16–M22 đi kèm và quy định thẩm định bản vẽ chân đế phi tiêu chuẩn.",
    imageFolder: "/images/guides/m24-anchor-bolts-180-260mm-flange-compatibility",
    sections: [
      {
        heading: "Câu trả lời trực tiếp về tính tương thích kỹ thuật",
        paragraphs: [
          "Bảng thông số kỹ thuật của thiết bị nâng trụ đèn di động velolev liệt kê các cỡ bu lông neo M16, M18, M20, M22 và M24 cùng phạm vi khoảng cách lỗ mặt bích 180–260 mm. Tuy nhiên, tính tương thích liệt kê và phụ kiện đi kèm tiêu chuẩn là hai khái niệm khác nhau: gói giao hàng tiêu chuẩn bao gồm 4 bộ bu lông cho mỗi cỡ M16, M18, M20 và M22, trong khi bu lông M24 không đi kèm mặc định.",
          "Ngoài ra, do bản vẽ mặt bích gốc có thuật ngữ kích thước cần làm rõ theo chuẩn công trình, các đội thi công phải xác định rõ bản vẽ quy định khoảng cách tâm theo cạnh hay đường chéo và gửi bản vẽ chi tiết nếu chân đế sử dụng bu lông M24, dạng 6 hoặc 8 lỗ, hoặc nằm ngoài dải 180–260 mm."
        ]
      },
      {
        heading: "1. Bu lông tiêu chuẩn đi kèm (M16–M22) so với M24 và mặt bích đặc thù",
        paragraphs: [
          "Gói bu lông đi kèm đáp ứng hầu hết các trụ đèn đường đô thị 12 m tiêu chuẩn dùng đế vuông 4 lỗ. Khi dự án yêu cầu bu lông M24 để chịu lực gió lớn, nhà thầu cần chuẩn bị riêng bu lông phù hợp trước khi triển khai máy nâng tại hiện trường.",
          "Mặt bích tròn hoặc bố trí bu lông đặc thù cần kiểm tra tránh va chạm cơ học với tay đòn đỡ của máy nâng."
        ]
      },
      {
        heading: "2. Tại sao cần kiểm tra định nghĩa khoảng cách mặt bích trên bản vẽ",
        paragraphs: [
          "Một số nhà sản xuất ghi kích thước khoảng cách giữa hai lỗ liền kề (cạnh vuông), trong khi số khác ghi đường kính vòng tròn lỗ (PCD hoặc đường chéo). Sự khác biệt này có thể gây hiểu nhầm về độ tương thích.",
          "Xác nhận rõ kích thước cạnh hay đường chéo giúp tránh sai sót và chậm trễ tiến độ thi công."
        ]
      },
      {
        heading: "3. Danh mục kiểm tra bản mã chân đế trước khi gửi thẩm định",
        paragraphs: [
          "Trước khi yêu cầu thẩm định kỹ thuật, hãy chuẩn bị: 1) bản vẽ chân đế có ghi kích thước, 2) ảnh chụp móng có thước đo, 3) đường kính bu lông và 4) thông số kỹ thuật của trụ và đèn."
        ]
      },
      {
        heading: "Câu hỏi thường gặp về M24 và mặt bích 180–260 mm",
        paragraphs: [
          "Độ dài ren nhô lên trên mặt bê tông cần bao nhiêu?\nTối thiểu từ 50 đến 70 mm trên mặt bê tông để lắp đai ốc cân chỉnh, bản mã đế, vòng đệm và đai ốc siết khóa.",
          "Mặt bích có lỗ xẻ rãnh (lỗ bầu dục) có dùng được không?\nDùng được, miễn là tâm rãnh nằm trong khoảng 180–260 mm và sử dụng vòng đệm dày bản rộng."
        ]
      }
    ]
  },
  "solar-street-light-pole-weight-limits-panel-battery-erection": {
    locale: "vi",
    slug: "solar-street-light-pole-weight-limits-panel-battery-erection",
    title: "Giới hạn tải trọng trụ đèn năng lượng mặt trời dưới 300 kg | velolev",
    h1: "Giới hạn trọng lượng trụ đèn năng lượng mặt trời: Tính toán tấm pin, giá đỡ và ắc quy dưới 300 kg",
    description: "Phương pháp tính tổng trọng lượng lắp ráp trụ đèn năng lượng mặt trời: thân trụ, tấm pin quang điện, giá đỡ và pin lưu trữ để đảm bảo an toàn trong giới hạn 300 kg của velolev.",
    imageFolder: "/images/guides/solar-street-light-pole-weight-limits-panel-battery-erection",
    sections: [
      {
        heading: "Tiêu chí tính toán tải trọng trụ đèn chiếu sáng năng lượng mặt trời",
        paragraphs: [
          "Lắp đặt trụ đèn mặt trời độc lập khác với trụ đèn thông thường do tải trọng tập trung trên đỉnh: tấm pin mặt trời, khung thép đỡ, pin lithium hoặc ắc quy và bộ đèn LED tích hợp.",
          "Tải trọng định mức của thiết bị nâng thủy lực velolev là 300 kg. Vượt quá tổng trọng lượng này sẽ gây nguy cơ mất ổn định thủy lực và mất an toàn lao động."
        ]
      },
      {
        heading: "1. Cơ cấu trọng lượng điển hình của trụ đèn năng lượng mặt trời 10–12 m",
        paragraphs: [
          "Thân trụ thép bát giác 10 m thường nặng từ 120 đến 160 kg. Khung giá đỡ và tấm pin 150–200 W nặng khoảng 30 đến 45 kg. Bộ đèn LED và hộp pin lithium thêm 20 đến 35 kg. Tổng trọng lượng lắp ráp khoảng 170 đến 240 kg, nằm hoàn toàn trong giới hạn an toàn 300 kg.",
          "Tuy nhiên, nếu sử dụng ắc quy chì nặng 60–80 kg lắp trên đỉnh trụ dày chịu bão, tổng trọng lượng có thể vượt quá 300 kg và bắt buộc phải dùng xe cẩu chuyên dụng."
        ]
      },
      {
        heading: "2. Kiểm tra trọng tâm và mô-men lật khi nâng trụ",
        paragraphs: [
          "Trọng lượng pin đặt càng cao thì trọng tâm của toàn bộ hệ thống càng dâng cao trong quá trình nâng từ 0° lên 90°. Khuyến nghị đặt hộp pin ở vị trí thấp nhất có thể hoặc lắp pin sau khi trụ đã đứng thẳng.",
          "Kỹ thuật viên phải kiểm tra lực siết bu lông khung đỡ trên mặt đất trước khi kích hoạt xi-lanh thủy lực nâng."
        ]
      },
      {
        heading: "3. Quy trình gửi thông số kiểm tra tải trọng dự án",
        paragraphs: [
          "Cộng tổng trọng lượng do nhà sản xuất trụ, tấm pin và pin lưu trữ cung cấp. Điền vào biểu mẫu kiểm tra của velolev trước khi đưa thiết bị ra hiện trường."
        ]
      },
      {
        heading: "Câu hỏi thường gặp về trọng lượng trụ đèn năng lượng mặt trời",
        paragraphs: [
          "Nếu tổng trọng lượng là 310 kg thì sao?\nKhông được sử dụng thiết bị. Mọi tải trọng trên 300 kg đều vi phạm quy chuẩn an toàn S4 và bắt buộc phải thuê xe cẩu tự hành.",
          "Có thể lắp pin sau khi dựng trụ không?\nĐược và rất khuyến khích nếu tổng trọng lượng tiệm cận 300 kg, giúp giảm tải và tăng hệ số an toàn khi nâng."
        ]
      }
    ]
  },
  "modular-85kg-pole-lifter-operator-planning-boundaries": {
    locale: "vi",
    slug: "modular-85kg-pole-lifter-operator-planning-boundaries",
    title: "Thiết bị nâng trụ mô-đun 85 kg cho tổ đội 1–2 công nhân | velolev",
    h1: "Máy nâng trụ đèn dạng mô-đun 85 kg: Kích thước vận chuyển và bố trí tổ đội thi công 1–2 người",
    description: "Bố trí thi công cho tổ đội tinh gọn 1 đến 2 công nhân với máy nâng trụ mô-đun velolev 85 kg (khối thủy lực 45 kg + tủ điều khiển 40 kg).",
    imageFolder: "/images/guides/modular-85kg-pole-lifter-operator-planning-boundaries",
    sections: [
      {
        heading: "Thiết kế hai khối mô-đun tối ưu tính cơ động tại công trường",
        paragraphs: [
          "Phương pháp lắp dựng trụ truyền thống đòi hỏi xe cẩu tải nặng cùng đội ngũ 4 đến 6 người, làm tăng chi phí nhân công. Máy nâng velolev áp dụng cấu trúc mô-đun tách rời thành 2 khối độc lập có tổng trọng lượng 85 kg.",
          "Khối xi-lanh nâng thủy lực nặng 45 kg và khối bơm điện kèm pin 24 V nặng 40 kg. Cả hai đều có tay cầm tiện dụng để hai công nhân mang vác thủ công dễ dàng."
        ]
      },
      {
        heading: "1. Bố trí tổ đội thi công: đội hình 1 người so với 2 người",
        paragraphs: [
          "Với đội 2 người, một kỹ thuật viên định vị càng nâng vào bu lông móng trong khi người thứ hai gắn khớp nối nhanh thủy lực và chốt khóa an toàn. Đội hình này cho năng suất cao nhất.",
          "Thi công 1 người vẫn khả thi khi sử dụng xe đẩy tay vận chuyển các khối 45 kg và 40 kg, nhưng cần cẩn trọng căn chỉnh thẳng hàng cho trụ đèn."
        ]
      },
      {
        heading: "2. Tiếp cận ngõ hẹp và đường dạo bộ",
        paragraphs: [
          "Tại các ngõ phố cổ, đường công viên hoặc vỉa hè cấm xe tải, công nhân chỉ cần dỡ thiết bị ở đầu đường lớn rồi mang vào điểm thi công qua cửa ngõ hẹp 80 cm.",
          "Thiết bị không để lại vết hằn lún trên nền gạch vỉa hè và không cần chân chống thủy lực chiếm dụng lòng đường."
        ]
      },
      {
        heading: "3. Quy trình chốt khóa an toàn tiêu chuẩn",
        paragraphs: [
          "Luôn cài chốt an toàn cơ học kép trước khi cấp áp lực bơm dầu. Tuyệt đối không đứng dưới phạm vi quét của trụ khi đang nâng."
        ]
      },
      {
        heading: "Câu hỏi thường gặp về nhân lực vận hành",
        paragraphs: [
          "Vận hành thiết bị có cần chứng chỉ lái cẩu không?\nKhông. Vì đây là thiết bị thủy lực mặt đất neo đế chứ không phải cẩu treo, người vận hành chỉ cần nắm vững hướng dẫn trong sổ tay kỹ thuật.",
          "Mất bao lâu để kết nối hai mô-đun tại chỗ?\nDưới 3 phút: chỉ cần đặt máy xuống đất, cắm ống thủy lực nối nhanh và cắm giắc nguồn 24 V."
        ]
      }
    ]
  },
  "when-mobile-cranes-still-required-over-300kg-12m-direct-burial": {
    locale: "vi",
    slug: "when-mobile-cranes-still-required-over-300kg-12m-direct-burial",
    title: "Khi nào xe cẩu thùng vẫn bắt buộc phải sử dụng | velolev",
    h1: "Khi nào xe cẩu tự hành vẫn bắt buộc: Trụ cao trên 12 m, nặng quá 300 kg và trụ chôn trực tiếp",
    description: "Giới hạn kỹ thuật rõ ràng xác định khi nào bắt buộc phải dùng xe cẩu: trụ đèn nặng hơn 300 kg, chiều cao vượt quá 12 m hoặc trụ chôn trực tiếp không có bản mã mặt bích.",
    imageFolder: "/images/guides/when-mobile-cranes-still-required-over-300kg-12m-direct-burial",
    sections: [
      {
        heading: "Minh bạch tuyệt đối về giới hạn kỹ thuật của thiết bị",
        paragraphs: [
          "Nguyên tắc kỹ thuật trung thực của velolev dựa trên các giới hạn vật lý rõ ràng. Mặc dù thiết bị nâng di động thay thế xe cẩu trong phần lớn công trình chiếu sáng đô thị, nó không áp dụng cho mọi loại trụ.",
          "Nắm rõ ba ranh giới loại trừ giúp tránh rủi ro tai nạn và đảm bảo dự toán công trình bố trí xe cẩu đúng vị trí cần thiết."
        ]
      },
      {
        heading: "1. Ba tiêu chí loại trừ bắt buộc phải dùng xe cẩu",
        paragraphs: [
          "Tiêu chí 1: Chiều cao trụ vượt quá 12 m (trụ cao tốc 14–18 m hoặc trụ đèn pha sân vận động 20–30 m vượt quá tầm vươn của xi-lanh).",
          "Tiêu chí 2: Tổng trọng lượng lắp ráp vượt quá 300 kg (trụ gang đúc nặng hoặc trụ bê tông ly tâm 400–1000 kg).",
          "Tiêu chí 3: Trụ chôn trực tiếp xuống đất (không có móng bê tông đúc sẵn với bu lông neo). Vì máy cần điểm tựa neo vào bu lông móng để giữ phản lực, máy không thể thi công trụ chôn đất."
        ]
      },
      {
        heading: "2. Chiến lược kết hợp linh hoạt (xe cẩu + máy nâng di động)",
        paragraphs: [
          "Tại các dự án khu đô thị hoặc khu công nghiệp, thường có vài trụ cao 15 m ở nút giao lớn và 40 trụ tiêu chuẩn 10 m ở đường nội bộ. Nhà thầu có thể thuê cẩu 1 ngày cho trụ cao, và dùng velolev cho toàn bộ 40 trụ còn lại.",
          "Giải pháp này tiết kiệm hàng chục triệu đồng tiền thuê ca cẩu mà vẫn đảm bảo tiến độ bàn giao."
        ]
      },
      {
        heading: "3. Quy trình gửi thông số để được tư vấn chính xác",
        paragraphs: [
          "Nếu còn băn khoăn về trọng lượng thực tế hoặc dạng móng của dự án, hãy gửi thông số kỹ thuật để kỹ sư của chúng tôi thẩm định trước khi đặt hàng."
        ]
      },
      {
        heading: "Câu hỏi thường gặp về giới hạn kỹ thuật",
        paragraphs: [
          "Có thể nâng trụ điện bê tông ly tâm 8 mét không?\nKhông, trụ bê tông ly tâm thường nặng từ 400 đến 800 kg, vượt quá tải trọng định mức 300 kg của máy.",
          "Trụ nhôm côn 12 mét có nâng được không?\nĐược, miễn là bản mã có khoảng cách lỗ 180–260 mm và tổng trọng lượng gồm đèn không quá 300 kg (trụ nhôm thường chỉ nặng 60–110 kg)."
        ]
      }
    ]
  },
  "40-pole-parking-lot-lighting-crane-vs-lifter-scope-cost": {
    locale: "vi",
    slug: "40-pole-parking-lot-lighting-crane-vs-lifter-scope-cost",
    title: "Thi công 40 trụ đèn bãi đỗ xe: Xe cẩu so với máy nâng di động | velolev",
    h1: "Lắp đặt chiếu sáng bãi đỗ xe quy mô 40 trụ: So sánh phạm vi công việc và chi phí giữa thuê xe cẩu và máy nâng velolev",
    description: "Hướng dẫn lập kế hoạch kinh tế cho bãi đỗ xe và trung tâm thương mại: so sánh chi phí ca cẩu và máy nâng di động velolev trên cùng phạm vi công việc.",
    imageFolder: "/images/guides/40-pole-parking-lot-lighting-crane-vs-lifter-scope-cost",
    sections: [
      {
        heading: "Tại sao so sánh trên cùng phạm vi công việc là yếu tố quyết định",
        paragraphs: [
          "Bãi đỗ xe trung tâm thương mại, kho vận logistics và khuôn viên trường học thường lắp đặt 20 đến 60 trụ đèn trong một giai đoạn. Khi so sánh xe cẩu với máy nâng thủy lực di động velolev, dự toán chính xác đòi hỏi phải xác định đúng các đầu việc thực tế thay vì chỉ so sánh đơn giá thuê xe theo giờ.",
          "Do velolev áp dụng mô hình báo giá B2B riêng tư không niêm yết giá công khai, nhà thầu tự nhập giá thuê cẩu địa phương, chi phí nhân công và quy mô công trình vào Bảng tính ROI của velolev để tính toán độ nhạy chi phí minh bạch."
        ]
      },
      {
        heading: "1. Ma trận so sánh phạm vi thi công cho dự án 40 trụ",
        paragraphs: [
          "Xe cẩu tự hành cần không gian mở chân chống, giấy phép phân luồng giao thông và di chuyển liên tục giữa các hố móng. Với máy nâng velolev 85 kg (gồm khối thủy lực 45 kg và hộp nguồn 40 kg), 1 đến 2 thợ có thể di chuyển thiết bị bằng tay giữa các trụ mà không cản trở lối đi xe.",
          "Việc lắp đặt lên mặt bích 180–260 mm và siết bu lông M16–M24 diễn ra ngay trên mặt đất trước khi dựng đứng, loại bỏ hoàn toàn thời gian chờ đợi tốn kém của lái cẩu."
        ]
      },
      {
        heading: "2. Phân tích chi phí và loại bỏ thời gian chờ máy không hiệu quả",
        paragraphs: [
          "Các đơn vị cho thuê cẩu thường tính tối thiểu nửa ca hoặc cả ca 8 tiếng kèm phụ phí di chuyển. Nếu việc luồn cáp ngầm hoặc đổ móng bị chậm, nhà thầu phải gánh chịu chi phí xe cẩu nằm chờ rất lớn.",
          "Sở hữu thiết bị chạy pin 24 V giúp công việc dựng trụ linh hoạt theo đúng tiến độ xây dựng mà không bị phạt phí chờ máy."
        ]
      },
      {
        heading: "3. Danh mục chuẩn bị cho dự án chiếu sáng bãi đỗ xe",
        paragraphs: [
          "Kiểm tra tổng trọng lượng trụ kèm đèn không quá 300 kg và chiều cao không quá 12 m. Với bản mã có 6 hoặc 8 bu lông hoặc ngoài dải 180–260 mm, hãy gửi bản vẽ chi tiết để được thẩm định."
        ]
      },
      {
        heading: "Câu hỏi thường gặp về dự án bãi đỗ xe",
        paragraphs: [
          "Máy có làm hỏng bề mặt nhựa đường mới trải không?\nKhông, với trọng lượng 85 kg phân bổ đều trên các chân đế, máy không gây lún nứt mặt đường nhựa như chân chống xe cẩu tải nặng.",
          "Cần bao nhiêu công nhân để hoàn thành 40 trụ?\nQuy chuẩn kỹ thuật quy định 1 đến 2 công nhân vận chuyển và nâng hạ máy, các công nhân khác có thể tập trung đấu nối điện và hoàn thiện móng."
        ]
      }
    ]
  },
  "24v-battery-off-grid-rural-road-pole-lifting-planning": {
    locale: "vi",
    slug: "24v-battery-off-grid-rural-road-pole-lifting-planning",
    title: "Máy nâng trụ dùng pin 24 V cho đường giao thông nông thôn | velolev",
    h1: "Thiết bị nâng trụ đèn di động chạy pin 24 V cho đường giao thông nông thôn: Số lần nâng mỗi lần sạc và tổ chức hiện trường",
    description: "Kế hoạch lắp đặt trụ đèn năng lượng mặt trời tại các tuyến đường liên thôn, vùng cao không có lưới điện bằng máy nâng pin 24 V velolev.",
    imageFolder: "/images/guides/24v-battery-off-grid-rural-road-pole-lifting-planning",
    sections: [
      {
        heading: "Kế hoạch năng lượng cho công trình không có lưới điện",
        paragraphs: [
          "Các dự án chiếu sáng nông thôn mới và điện mặt trời vùng sâu vùng xa thường nằm cách xa lưới điện hạ thế. Việc kéo theo máy phát điện cồng kềnh hoặc đưa xe cẩu lớn vào đường đất hẹp làm tăng chi phí và dễ gây lầy lún.",
          "Máy nâng thủy lực velolev trang bị bộ nguồn pin độc lập 24 V (40 kg), cho phép thực hiện nhiều chu kỳ dựng trụ hoàn toàn tự chủ mà không cần dây điện kéo dài hay máy nén khí."
        ]
      },
      {
        heading: "1. Số chu kỳ nâng mỗi lần sạc và hệ số an toàn hiện trường",
        paragraphs: [
          "Số liệu từ nhà sản xuất cho thấy pin có thể đáp ứng hơn 50 lần nâng cho một lần sạc đầy ở điều kiện tiêu chuẩn (phụ thuộc vào nhiệt độ môi trường và trọng lượng trụ). Khi lập kế hoạch, kỹ sư nên tính toán an toàn từ 25 đến 35 trụ mỗi ngày cho một tổ đội để dự phòng di chuyển và căn chỉnh.",
          "Trang bị thêm bộ kích điện trên xe bán tải hoặc chuẩn bị thêm một cụm pin dự phòng giúp duy trì thi công liên tục cả ngày."
        ]
      },
      {
        heading: "2. Vận chuyển trên đường đồi núi và đường đất bùn lầy",
        paragraphs: [
          "Nhờ thiết kế tách đôi 45 kg và 40 kg, thiết bị dễ dàng đặt vừa thùng xe bán tải 4x4 hoặc chở bằng xe rùa vào những vị trí mà xe tải 12 tấn không thể vào được.",
          "Trên nền đất yếu, việc lót thêm tấm ván chịu lực dưới các chân tựa của máy giúp phân bố áp lực đều trước khi kích nâng thẳng đứng."
        ]
      },
      {
        heading: "3. Quy trình nạp sạc và kiểm tra pin tại công trường",
        paragraphs: [
          "Kiểm tra đồng hồ hiển thị điện áp trước khi bắt đầu ca làm việc. Không vận hành nếu điện áp xuống dưới ngưỡng khuyến cáo nhằm đảm bảo van một chiều hoạt động chính xác khi có sự cố."
        ]
      },
      {
        heading: "Câu hỏi thường gặp về máy nâng chạy pin ở vùng xa",
        paragraphs: [
          "Thời tiết lạnh có làm giảm dung lượng pin 24 V không?\nCó, nhiệt độ quá thấp sẽ làm giảm hiệu suất phóng điện; nên để bình ắc quy trong cabin xe trước khi đưa ra sử dụng.",
          "Có thể sạc từ tẩu sạc 12 V / 24 V của xe bán tải không?\nĐược, thông qua bộ sạc kích dòng hoặc biến tần phù hợp với thông số sạc pin 24 V công nghiệp."
        ]
      }
    ]
  },
  "pickup-truck-transport-modular-pole-jack-dimensions": {
    locale: "vi",
    slug: "pickup-truck-transport-modular-pole-jack-dimensions",
    title: "Vận chuyển máy nâng trụ bằng xe bán tải và xe van | velolev",
    h1: "Vận chuyển máy nâng trụ mô-đun bằng xe bán tải và xe van: Kích thước đóng gói 650 × 350 × 500 mm và khối lượng bộ phận",
    description: "Yêu cầu xếp dỡ và chằng buộc thiết bị nâng trụ velolev trên thùng xe bán tải và xe tải nhỏ: kích thước kiện 650 × 350 × 500 mm và các khối 45 kg / 40 kg.",
    imageFolder: "/images/guides/pickup-truck-transport-modular-pole-jack-dimensions",
    sections: [
      {
        heading: "Tối ưu hóa phương tiện cơ động không cần rơ-moóc chuyên dụng",
        paragraphs: [
          "Chi phí điều động rơ-moóc chuyên dụng cho mỗi dự án chiếu sáng là gánh nặng lớn của nhà thầu. Máy nâng velolev được thiết kế riêng để vừa vặn trong thùng xe bán tải phổ thông hoặc xe tải van nhỏ 1 tấn.",
          "Với kích thước kiện hàng gọn gàng 650 × 350 × 500 mm cùng hai khối 45 kg và 40 kg, hai công nhân có thể tự bốc dỡ mà không cần xe nâng hay bàn nâng thủy lực."
        ]
      },
      {
        heading: "1. Bố trí tải trọng trên thùng xe bán tải",
        paragraphs: [
          "Khối xi-lanh thủy lực (45 kg) nên chằng sát vách ngăn cabin để chống xô lệch khi phanh gấp. Tủ điện nguồn 24 V (40 kg) đặt ở phía mép bửng sau để thuận tiện nhấc xuống đầu tiên tại hiện trường.",
          "Khoang thùng còn lại đủ chỗ chở các đoạn thân trụ tháo rời, cần đèn, tấm pin mặt trời và hòm đồ nghề."
        ]
      },
      {
        heading: "2. Tiếp cận khu phố cổ và hầm chui giới hạn chiều cao",
        paragraphs: [
          "Ở các tuyến phố có rào chắn hạn chế chiều cao dưới 2,5 m hoặc phố đi bộ cấm xe tải nặng, xe bán tải vẫn ra vào thông suốt.",
          "Khi đến điểm trồng trụ, tay xách tích hợp trên thân máy cho phép khiêng thiết bị qua các lối đi hẹp chỉ rộng 80 cm."
        ]
      },
      {
        heading: "3. Quy tắc chằng buộc an toàn khi lưu thông",
        paragraphs: [
          "Sử dụng dây tăng đơ vải tiêu chuẩn để chằng chặt hai khối máy vào móc sàn xe. Khóa chặt van xả dầu và ngắt giắc cắm điện trong suốt quá trình chạy xe."
        ]
      },
      {
        heading: "Câu hỏi thường gặp về vận chuyển thiết bị",
        paragraphs: [
          "Máy có để vừa cốp xe ô tô 7 chỗ gập ghế không?\nCó, kích thước 650 × 350 × 500 mm dễ dàng để vừa khoang hành lý xe SUV hoặc MPV gập hàng ghế sau.",
          "Có cần chứng chỉ vận hành xe nâng để dỡ hàng tại kho không?\nKhông, vì mỗi kiện chỉ nặng dưới 45 kg, hai người có thể bốc vác thủ công đúng quy chuẩn an toàn lao động."
        ]
      }
    ]
  },
  "overhead-power-lines-narrow-alley-pole-erection-planning": {
    locale: "vi",
    slug: "overhead-power-lines-narrow-alley-pole-erection-planning",
    title: "Dựng trụ đèn gần đường dây điện trên cao và ngõ hẹp | velolev",
    h1: "Kế hoạch lắp dựng trụ đèn 10 m và 12 m gần đường dây điện trên cao và trong ngõ hẹp an toàn",
    description: "Đảm bảo khoảng cách an toàn điện và ngăn ngừa phóng điện khi dựng trụ đèn 10 m và 12 m trong ngõ nhỏ bằng máy nâng thủy lực neo đế từ mặt đất.",
    imageFolder: "/images/guides/overhead-power-lines-narrow-alley-pole-erection-planning",
    sections: [
      {
        heading: "Nguy cơ phóng điện chết người từ cần cẩu vươn cao",
        paragraphs: [
          "Cần cẩu kim loại vươn dài gần đường dây điện trung và hạ thế là nguyên nhân hàng đầu gây tai nạn phóng điện chết người trong ngành xây lắp. Quy chuẩn an toàn điện đòi hỏi khoảng cách cách ly nghiêm ngặt mà các loại xe cẩu khó lòng đáp ứng trong đường ngõ dưới 6 mét.",
          "Thiết bị velolev dựng trụ bằng cơ chế quay bản lề trực tiếp từ đế móng với quỹ đạo góc định sẵn, giữ thân trụ luôn nằm trong phạm vi hình học kiểm soát mà không có bộ phận vung lắc sang đường dây điện phía trên."
        ]
      },
      {
        heading: "1. Khoảng cách an toàn và hành lang bảo vệ lưới điện",
        paragraphs: [
          "Trước khi nâng, kỹ thuật viên cần vẽ góc quét của thân trụ từ 0° lên 90°. Đối với trụ cao 12 m, cần đảm bảo đỉnh trụ và cần đèn không vi phạm khoảng cách an toàn phóng điện theo quy chuẩn ngành điện lực.",
          "Trong các ngõ nhỏ nơi xe cẩu không thể bung chân chống mà không chạm tường nhà dân, việc neo trực tiếp vào bu lông M16–M24 của móng giúp triệt tiêu hoàn toàn độ đung đưa của tải trọng treo."
        ]
      },
      {
        heading: "2. Thao tác nâng êm và giao tiếp trực tiếp tại mặt đất",
        paragraphs: [
          "Van điều khiển thủy lực cho phép dừng và khóa trụ ở mọi góc độ trung gian thông qua van một chiều cơ học, giúp kỹ thuật viên dễ dàng quan sát dây viễn thông hay dây điện chiếu sáng chăng ngang ngõ.",
          "Không có tiếng ồn động cơ diesel xe tải giúp hai thợ thi công trao đổi khẩu lệnh rõ ràng trong từng giây nâng trụ."
        ]
      },
      {
        heading: "3. Kiểm tra bắt buộc trước khi kích nâng",
        paragraphs: [
          "Xác định khoảng không theo phương thẳng đứng không có dây điện cắt ngang và kiểm tra độ cứng của móng bê tông. Giới hạn trụ tối đa là 300 kg và chiều cao 12 m."
        ]
      },
      {
        heading: "Câu hỏi thường gặp về an toàn gần lưới điện",
        paragraphs: [
          "Khung máy nâng có cách điện không?\nKhông. Khung máy bằng thép chịu lực; an toàn đạt được nhờ kiểm soát chặt chẽ quỹ đạo và tuân thủ nghiêm ngặt khoảng cách an toàn, tuyệt đối không chạm vào dây mang điện.",
          "Có được thi công khi trời mưa gần đường dây điện không?\nPhải dừng ngay công việc nếu trời mưa to, sấm sét hoặc tầm nhìn bị hạn chế không thể quan sát rõ khoảng cách tới dây điện."
        ]
      }
    ]
  },
  "20-second-lift-stroke-vs-total-light-pole-installation-time": {
    locale: "vi",
    slug: "20-second-lift-stroke-vs-total-light-pole-installation-time",
    title: "Hành trình kích 20 giây so với tổng thời gian dựng trụ | velolev",
    h1: "Thời gian hành trình xi-lanh 20 giây của nhà sản xuất so với tổng thời gian dựng một trụ đèn thực tế",
    description: "Làm rõ khác biệt kỹ thuật giữa hành trình nâng thủy lực 20 giây của xi-lanh và tổng thời gian hoàn thiện một trụ đèn chiếu sáng ngoài công trường.",
    imageFolder: "/images/guides/20-second-lift-stroke-vs-total-light-pole-installation-time",
    sections: [
      {
        heading: "Phân biệt thời gian đẩy của xi-lanh với chu kỳ lắp dựng hoàn chỉnh",
        paragraphs: [
          "Tài liệu kỹ thuật của velolev ghi nhận thời gian vươn của xi-lanh thủy lực chính khoảng 20 giây trong điều kiện thử nghiệm. Khi lập biểu tiến độ dự thầu, tuyệt đối không được nhầm lẫn thời gian cơ học này với tổng thời gian thi công hoàn tất một vị trí trụ đèn.",
          "Chu kỳ thi công trọn vẹn tại hiện trường bao gồm: đặt máy vào móng, luồn cáp điện, gắn cần và đèn chiếu sáng trên mặt đất, kích nâng thẳng đứng, căn chỉnh độ thẳng bằng đai ốc cân bằng và siết lực bu lông M16–M24."
        ]
      },
      {
        heading: "1. Bóc tách thời gian từng công đoạn cho mỗi vị trí trụ",
        paragraphs: [
          "Với tổ đội 2 thợ lành nghề, các bước thường phân bổ: 10–15 phút chuẩn bị dưới đất (lắp đèn, kéo dây và gá trụ vào xi-lanh), 20–30 giây kích nâng thủy lực chạy pin, và 5–10 phút cân chỉnh độ thẳng đứng, siết đai ốc và tháo máy sang vị trí mới.",
          "Tổng thời gian trung bình dao động từ 20 đến 35 phút cho mỗi trụ, cho phép tổ đội hoàn thành 10 đến 16 trụ trong một ngày làm việc tiêu chuẩn."
        ]
      },
      {
        heading: "2. Áp dụng định mức năng suất vào tiến độ và dự toán chi phí",
        paragraphs: [
          "Không lấy 20 giây nhân với số lượng trụ để lập tiến độ. Tiến độ thi công thực tế phải tính thêm thời gian di chuyển giữa các hố móng, thời gian dưỡng hộ bê tông móng và đo kiểm an toàn điện.",
          "Lợi thế cạnh tranh thực sự của velolev là triệt tiêu hoàn toàn thời gian xe cẩu nằm chờ và sự nhanh gọn của bộ thiết bị 85 kg."
        ]
      },
      {
        heading: "3. Thông tin cần gửi trong yêu cầu thẩm định dự án",
        paragraphs: [
          "Ghi rõ trọng lượng đèn, chiều cao cột và quy cách bản mã để kỹ sư của chúng tôi xác nhận chu kỳ thi công nằm an toàn trong giới hạn 300 kg và 12 m."
        ]
      },
      {
        heading: "Câu hỏi thường gặp về tốc độ nâng và năng suất",
        paragraphs: [
          "Có điều chỉnh được tốc độ xi-lanh nâng không?\nTốc độ bơm dầu đã được hiệu chuẩn cố định tại nhà máy nhằm duy trì sự ổn định của trọng tâm và chống lắc giật quán tính khi trụ lên gần 90°.",
          "Đội 3 người có làm nhanh hơn không?\nCó, người thứ ba có thể đi trước luồn cáp và lắp sẵn đèn tại các vị trí tiếp theo trong khi hai thợ chính thực hiện việc nâng và siết bu lông."
        ]
      }
    ]
  },
  "foundation-inspection-before-self-anchoring-pole-erection": {
    locale: "vi",
    slug: "foundation-inspection-before-self-anchoring-pole-erection",
    title: "Kiểm tra móng và bu lông neo trước khi kích nâng trụ đèn | velolev",
    h1: "Danh mục kiểm tra móng bê tông và bu lông neo trước khi thẩm định sử dụng máy nâng trụ",
    description: "Kích thước móng, độ dài ren nhô cao, khoảng cách bu lông và hình ảnh hiện trường cần thu thập trước khi gửi yêu cầu đánh giá kỹ thuật velolev.",
    imageFolder: "/images/guides/foundation-inspection-before-self-anchoring-pole-erection",
    sections: [
      {
        heading: "Tại sao chất lượng móng quyết định an toàn nâng trụ neo đế",
        paragraphs: [
          "Khác với xe cẩu treo chịu lực độc lập trên cao, máy nâng velolev tì trực tiếp lên bu lông neo và khối bê tông móng để làm điểm tựa phản lực nâng trụ. Do đó, cường độ bê tông móng và chất lượng bu lông quyết định trực tiếp tới sự an toàn.",
          "Bê tông chưa đủ ngày tuổi phát triển cường độ, bu lông bị nghiêng lệch hoặc ren bị hỏng đều có thể gây mất an toàn trong quá trình kích nâng."
        ]
      },
      {
        heading: "1. Các thông số kích thước và bảng kiểm tra hiện trường",
        paragraphs: [
          "Trước khi thi công, hãy dùng thước kẹp và thước dây đo: đường kính danh nghĩa bu lông (từ M16 đến M24), chiều dài ren nhô trên mặt bê tông (tối thiểu 50–70 mm để lắp đai ốc cân chỉnh, bản mã, vòng đệm và đai ốc siết), cùng khoảng cách tâm các lỗ bu lông (phải nằm trong dải 180 đến 260 mm).",
          "Kiểm tra độ phẳng mặt bê tông móng. Bề mặt gồ ghề cần được chèn vữa không co ngót để đảm bảo bản mã tì đều lực."
        ]
      },
      {
        heading: "2. Phân định giữa kiểm tra cơ học và tính toán kết cấu địa chất",
        paragraphs: [
          "Bảng kiểm tra của velolev nhằm xác nhận sự ăn khớp hình học giữa máy nâng và chân đế trụ. Hướng dẫn này không thay thế bản tính toán chịu tải trọng gió và kết cấu móng của đơn vị tư vấn thiết kế công trình.",
          "Nếu bu lông được đặt thủ công không có dưỡng thép định hình, hãy kiểm tra độ vuông góc của các thân bu lông trước khi lắp đặt."
        ]
      },
      {
        heading: "3. Bộ hồ sơ 4 hạng mục để được thẩm định kỹ thuật nhanh",
        paragraphs: [
          "Để được đội ngũ kỹ sư của chúng tôi phản hồi trong vòng 2 giờ, hãy gửi: 1) bản vẽ mặt bích có kích thước, 2) ảnh chụp thực tế móng kèm thước đo, 3) quy cách bu lông và 4) catalog kỹ thuật của trụ đèn."
        ]
      },
      {
        heading: "Câu hỏi thường gặp về móng trụ chiếu sáng",
        paragraphs: [
          "Có dùng được cho trụ chôn thẳng xuống đất không đổ móng bản mã không?\nKhông. Thiết bị bắt buộc phải có móng bê tông và bu lông neo thép để gá chốt chịu lực phản hồi.",
          "Phải làm gì nếu một bu lông bị cong lệch?\nBu lông phải được nắn thẳng dưới sự giám sát của kỹ sư kết cấu hoặc xử lý bằng ống nối ren chuyên dụng trước khi gá máy."
        ]
      }
    ]
  },
  "evaluating-portable-pole-lifter-technical-evidence-b2b-tenders": {
    locale: "vi",
    slug: "evaluating-portable-pole-lifter-technical-evidence-b2b-tenders",
    title: "Đánh giá hồ sơ kỹ thuật máy nâng trụ trong đấu thầu B2B | velolev",
    h1: "Đánh giá tài liệu kỹ thuật máy nâng trụ di động trong hồ sơ thầu B2B: Thông số xác nhận S4 so với dữ liệu thử nghiệm",
    description: "Hướng dẫn lập hồ sơ thầu minh bạch, phân biệt thông số kiểm định S4, số liệu nhà sản xuất công bố và tài liệu tuân thủ dự án chiếu sáng đô thị.",
    imageFolder: "/images/guides/evaluating-portable-pole-lifter-technical-evidence-b2b-tenders",
    sections: [
      {
        heading: "Tính minh bạch tài liệu trong đấu thầu công và dự án EPC",
        paragraphs: [
          "Trong các gói thầu xây lắp chiếu sáng công cộng, việc đề xuất biện pháp thi công mới không dùng xe cẩu đòi hỏi sự phân định rành mạch giữa thông số kỹ thuật được chứng nhận và tuyên bố thương mại. Tài liệu mập mờ có thể dẫn đến việc bị đánh trượt kỹ thuật hoặc bị tổ tư vấn giám sát từ chối phê duyệt.",
          "velolev cung cấp tài liệu kỹ thuật chuẩn mực, phân tách rõ ràng giữa thông số xuất xưởng xác nhận (S4) và các chỉ số đang trong quá trình khảo sát thực địa."
        ]
      },
      {
        heading: "1. Bảng phân loại bằng chứng kỹ thuật cho bên mời thầu",
        paragraphs: [
          "Nhóm A (Đã xác nhận): Tải trọng nâng định mức 300 kg, chiều cao trụ tối đa 12 m, trọng lượng 2 mô-đun 85 kg (45 kg + 40 kg), khoảng cách lỗ mặt bích 180–260 mm và bộ bu lông tiêu chuẩn M16–M22.",
          "Nhóm D (Nhà sản xuất công bố / đang khảo nghiệm hiện trường): Thời gian nâng 20 giây và năng lượng pin hơn 50 chu kỳ sạc, được trình bày dưới dạng dữ liệu tham chiếu trong điều kiện chuẩn."
        ]
      },
      {
        heading: "2. Đưa vào Biện pháp thi công và An toàn lao động (HSE)",
        paragraphs: [
          "Nhấn mạnh trong hồ sơ kỹ thuật về việc loại bỏ hoàn toàn nguy cơ lật cần cẩu và triệt tiêu công việc làm việc trên cao để móc cáp treo trụ. Công nhân đứng thao tác hoàn toàn ở mặt đất.",
          "Nêu bật giá trị bảo vệ môi trường nhờ không phát thải khí thải động cơ diesel xe tải và giảm thiểu tiếng ồn trong khu dân cư."
        ]
      },
      {
        heading: "3. Tóm tắt giới hạn kỹ thuật không được vượt qua",
        paragraphs: [
          "Nêu rõ trong hồ sơ đề xuất rằng các trụ có trọng lượng trên 300 kg hoặc cao hơn 12 m sẽ được thi công bằng xe cẩu tự hành truyền thống."
        ]
      },
      {
        heading: "Câu hỏi thường gặp về hồ sơ mời thầu",
        paragraphs: [
          "velolev có cung cấp tài liệu chứng nhận CE và hướng dẫn tiếng Anh không?\nCó, tuyên bố hợp chuẩn theo chỉ dẫn máy móc và tương thích điện từ cùng tài liệu kỹ thuật được cung cấp đầy đủ khi có yêu cầu dự án.",
          "Làm thế nào để thuyết phục chủ đầu tư khi hồ sơ mời thầu ghi 'thi công bằng xe cẩu'?\nĐệ trình phương án kỹ thuật tương đương chứng minh độ an toàn cao hơn (không làm việc trên cao), không chiếm dụng lòng đường và thân thiện với môi trường."
        ]
      }
    ]
  },
  "solar-wind-sail-area-site-assessment-pole-lifting": {
    locale: "vi",
    slug: "solar-wind-sail-area-site-assessment-pole-lifting",
    title: "Diện tích đón gió của tấm pin mặt trời và nâng trụ | velolev",
    h1: "Diện tích cản gió của tấm pin năng lượng mặt trời và độ phơi địa hình trước khi kích nâng trụ",
    description: "Cách thu thập số liệu diện tích tấm pin quang điện, độ cao lắp đặt, hệ số địa hình đón gió và tổng tải trọng dưới 300 kg để thẩm định thi công trụ đèn mặt trời.",
    imageFolder: "/images/guides/solar-wind-sail-area-site-assessment-pole-lifting",
    sections: [
      {
        heading: "Tại sao diện tích tấm pin mặt trời ảnh hưởng trực tiếp đến việc nâng trụ",
        paragraphs: [
          "Đối với trụ đèn năng lượng mặt trời có tấm pin quang điện lắp trên đỉnh, bề mặt tấm pin hoạt động như một cánh buồm đón gió. Khi trụ được kích nâng từ phương ngang lên phương thẳng đứng, các luồng gió tạt ngang sẽ gây ra mô-men xoắn lên cơ cấu tay đòn của máy nâng.",
          "Để đảm bảo nâng an toàn trong giới hạn 300 kg của velolev, người lập kế hoạch phải tính cả trọng lượng tĩnh của đèn, pin lưu trữ lẫn mô-men lật do áp lực gió tác động lên tấm pin."
        ]
      },
      {
        heading: "1. Các thông số diện tích cản gió và địa hình cần thu thập",
        paragraphs: [
          "Kỹ thuật viên cần ghi nhận: diện tích bề mặt tấm pin (tính bằng m²), góc nghiêng lắp đặt so với thân trụ, chiều cao đỉnh trụ và đặc điểm địa hình xung quanh (đồng trống, ven biển hay nội đô có vật che chắn).",
          "Tấm pin có diện tích trên 1,5 m² trên đỉnh trụ đòi hỏi sự cẩn trọng đặc biệt và không được tiến hành nâng khi gió giật liên tục trên 25–30 km/h."
        ]
      },
      {
        heading: "2. Quy chuẩn an toàn thời tiết dựa trên đo đạc thực tế",
        paragraphs: [
          "An toàn lao động không thể dựa trên cảm tính. Trang bị máy đo tốc độ gió cầm tay tại điểm thi công. Nếu gió vượt quá giới hạn an toàn của đội thợ, việc nâng trụ phải tạm hoãn.",
          "Xi-lanh thủy lực velolev có van khóa một chiều an toàn tự động hãm giữ tải trọng ngay tại vị trí nếu thao tác bị gián đoạn do gió giật bất ngờ."
        ]
      },
      {
        heading: "3. Chuẩn bị hồ sơ dự án năng lượng mặt trời gửi thẩm định",
        paragraphs: [
          "Thu thập bảng thông số tấm pin mặt trời, bản vẽ kết cấu khung giá đỡ và tổng khối lượng các phụ kiện gắn trên đầu trụ trước khi liên hệ tư vấn kỹ thuật."
        ]
      },
      {
        heading: "Câu hỏi thường gặp về trụ đèn năng lượng mặt trời và gió",
        paragraphs: [
          "Có nên lắp tấm pin sau khi trụ đã đứng thẳng không?\nƯu thế lớn nhất của velolev là cho phép lắp đặt trọn bộ đèn và pin ngay dưới mặt đất. Tuy nhiên, nếu công trường có gió xoáy mạnh, việc lắp tấm pin sau bằng thang nâng có thể được cân nhắc nếu an toàn yêu cầu.",
          "Trụ tròn côn hay trụ bát giác cản gió ít hơn?\nCác hình dạng trụ khác nhau có hệ số cản khí động học khác nhau; hãy ghi rõ tiết diện thân trụ trong phiếu thông tin dự án."
        ]
      }
    ]
  }
};

// TH (12 articles: 2 to 13)
const thArticles = {
  "m24-anchor-bolts-180-260mm-flange-compatibility": {
    locale: "th",
    slug: "m24-anchor-bolts-180-260mm-flange-compatibility",
    title: "ความเข้ากันได้ของสลักเกลียว M24 และหน้าแปลน 180–260 มม. | velolev",
    h1: "ความเข้ากันได้ของสลักเกลียวฝังดิน M24 และระยะห่างรูหน้าแปลน 180–260 มม. บนเครื่องยกเสาไฟพกพา",
    description: "คู่มือความเข้ากันได้ทางวิศวกรรมสำหรับสลักเกลียวฝังดิน M24 ระยะห่างรูหน้าแปลน 180–260 มม. สลักเกลียวมาตรฐาน M16–M22 ที่แถมมา และข้อกำหนดการตรวจสอบแบบแปลนฐานเสา",
    imageFolder: "/images/guides/m24-anchor-bolts-180-260mm-flange-compatibility",
    sections: [
      {
        heading: "คำตอบโดยตรงเกี่ยวกับความเข้ากันได้ทางเทคนิค",
        paragraphs: [
          "เอกสารข้อมูลจำเพาะของเครื่องยกเสาไฟแบบพกพา velolev ระบุขนาดสลักเกลียวฝังดิน M16, M18, M20, M22 และ M24 พร้อมระยะห่างรูหน้าแปลน 180–260 มม. อย่างไรก็ตาม รายการความเข้ากันได้และอุปกรณ์มาตรฐานที่แถมมาเป็นคนละส่วนกัน: ชุดส่งมอบมาตรฐานจะประกอบด้วยสลักเกลียวขนาด M16, M18, M20 และ M22 ขนาดละ 4 ชุด ส่วนขนาด M24 จะไม่ได้แถมมาในชุดมาตรฐาน",
          "นอกจากนี้ เนื่องจากภาพสเก็ตช์หน้าแปลนเดิมมีคำจำกัดความของขนาดที่ต้องชี้แจงตามมาตรฐานวิศวกรรม ทีมงานโครงการต้องตรวจสอบว่าแบบแปลนกำหนดระยะห่างจากขอบหรือเส้นทแยงมุม และส่งแบบแปลนที่มีขนาดชัดเจนหากโครงการใช้สลักเกลียว M24 หรือมีรูปแบบ 6 หรือ 8 รู หรืออยู่นอกช่วง 180–260 มม."
        ]
      },
      {
        heading: "1. สลักเกลียวมาตรฐานที่แถมมา (M16–M22) เทียบกับ M24 และหน้าแปลนสั่งทำพิเศษ",
        paragraphs: [
          "สลักเกลียวที่แถมมาครอบคลุมเสาไฟถนนในเมืองขนาด 12 ม. ทั่วไปที่มีแผ่นฐานสี่เหลี่ยม 4 รู เมื่อข้อกำหนดโครงการระบุให้ใช้สลักเกลียว M24 เพื่อต้านทานแรงลม ผู้รับเหมาต้องจัดเตรียมสลักเกลียวเฉพาะนี้ไว้ล่วงหน้าก่อนเริ่มงานยกเสา",
          "หน้าแปลนฐานเสารูปทรงกลมหรือมีรูปแบบการจัดเรียงรูเฉพาะทางจำเป็นต้องตรวจสอบว่าไม่กีดขวางแขนรองรับของเครื่องยก"
        ]
      },
      {
        heading: "2. เหตุใดจึงต้องตรวจสอบคำจำกัดความระยะห่างหน้าแปลนกับแบบแปลน",
        paragraphs: [
          "ผู้ผลิตบางรายระบุระยะห่างระหว่างรูสองรูที่อยู่ติดกัน (ด้านข้างของสี่เหลี่ยม) ในขณะที่บางรายระบุเส้นผ่านศูนย์กลางวงกลมสลักเกลียว (PCD หรือเส้นทแยงมุม) ความแตกต่างนี้อาจทำให้เข้าใจผิดเกี่ยวกับความเข้ากันได้",
          "การยืนยันว่าการวัดอ้างอิงจากด้านหรือเส้นทแยงมุมจะช่วยป้องกันความล่าช้าในการติดตั้งและความผิดพลาดในการเคลื่อนย้ายอุปกรณ์"
        ]
      },
      {
        heading: "3. รายการตรวจสอบแผ่นฐานเสาก่อนส่งแบบแปลนเพื่อประเมิน",
        paragraphs: [
          "ก่อนส่งคำขอตรวจสอบ ให้รวบรวม: 1) แบบแปลนแผ่นฐานที่มีขนาดครบถ้วน 2) ภาพถ่ายฐานรากพร้อมตลับเมตร 3) ขนาดเส้นผ่านศูนย์กลางสลักเกลียว และ 4) ข้อมูลจำเพาะของเสาไฟและโคมไฟ"
        ]
      },
      {
        heading: "คำถามที่พบบ่อยเกี่ยวกับ M24 และหน้าแปลน 180–260 มม.",
        paragraphs: [
          "ความยาวเกลียวที่โผล่พ้นผิวคอนกรีตต้องมีอย่างน้อยเท่าใด?\nต้องมีเกลียวโผล่อย่างน้อย 50 ถึง 70 มม. เหนือผิวคอนกรีตฐานรากเพื่อรองรับน็อตปรับระดับ ความหนาของแผ่นฐาน แหวนสปริง และน็อตขันล็อก",
          "แผ่นฐานที่มีรูเป็นวงรี (slotted hole) ใช้งานได้หรือไม่?\nใช้งานได้ ตราบใดที่แนวศูนย์กลางของรูวงรีอยู่ในช่วง 180 ถึง 260 มม. และใช้แหวนรองหนาขนาดใหญ่"
        ]
      }
    ]
  },
  "solar-street-light-pole-weight-limits-panel-battery-erection": {
    locale: "th",
    slug: "solar-street-light-pole-weight-limits-panel-battery-erection",
    title: "ขีดจำกัดน้ำหนักเสาไฟโซลาร์เซลล์ไม่เกิน 300 กก. | velolev",
    h1: "ขีดจำกัดน้ำหนักเสาไฟถนนพลังงานแสงอาทิตย์: การตรวจสอบแผงโซลาร์ ขาจับ และแบตเตอรี่ไม่เกิน 300 กก.",
    description: "วิธีการคำนวณน้ำหนักรวมของเสาไฟถนนพลังงานแสงอาทิตย์: เสา แผงโซลาร์เซลล์ แบตเตอรี่ และโคมไฟ เพื่อให้อยู่ในเกณฑ์ความปลอดภัย 300 กก. ของ velolev",
    imageFolder: "/images/guides/solar-street-light-pole-weight-limits-panel-battery-erection",
    sections: [
      {
        heading: "เกณฑ์การคำนวณน้ำหนักเสาไฟถนนพลังงานแสงอาทิตย์",
        paragraphs: [
          "การติดตั้งเสาไฟถนนพลังงานแสงอาทิตย์แบบสแตนด์อโลนมีความแตกต่างจากเสาไฟทั่วไปเนื่องจากมีน้ำหนักเพิ่มเติมอยู่ที่ส่วนยอด: แผงโซลาร์เซลล์ โครงเหล็กยึด แบตเตอรี่ลิเธียมหรือแบตเตอรี่แห้ง และโคมไฟ LED ในตัว",
          "พิกัดกำลังยกที่กำหนดของเครื่องยกไฮดรอลิก velolev คือ 300 กก. อย่างเคร่งครัด หากน้ำหนักประกอบรวมเกินกว่านี้จะก่อให้เกิดความเสี่ยงต่อความเสถียรของระบบไฮดรอลิกและความปลอดภัยในการทำงาน"
        ]
      },
      {
        heading: "1. องค์ประกอบน้ำหนักทั่วไปของเสาไฟโซลาร์เซลล์ 10–12 ม.",
        paragraphs: [
          "เสาเหล็กแปดเหลี่ยมความสูง 10 ม. มักมีน้ำหนักระหว่าง 120 ถึง 160 กก. ชุดโครงยึดและแผงโซลาร์เซลล์ขนาด 150–200W จะมีน้ำหนักประมาณ 30 ถึง 45 กก. โคมไฟ LED และกล่องแบตเตอรี่ลิเธียมเพิ่มอีก 20 ถึง 35 กก. น้ำหนักรวมประกอบจะอยู่ที่ประมาณ 170 ถึง 240 กก. ซึ่งอยู่ในเกณฑ์ปลอดภัยไม่เกิน 300 กก.",
          "อย่างไรก็ตาม หากโครงการใช้แบตเตอรี่ตะกั่วกรดแบบดั้งเดิมที่หนัก 60–80 กก. ติดตั้งบนยอดเสาเหล็กหนา น้ำหนักรวมอาจเกิน 300 กก. ซึ่งจำเป็นต้องใช้รถเครนยก"
        ]
      },
      {
        heading: "2. การตรวจสอบจุดศูนย์ถ่วงและโมเมนต์การพลิกคว่ำขณะยก",
        paragraphs: [
          "ยิ่งแบตเตอรี่ติดตั้งอยู่ในตำแหน่งสูง จุดศูนย์ถ่วงของระบบก็จะยิ่งสูงขึ้นในระหว่างการยกจากแนวราบ 0° ขึ้นสู่แนวตั้ง 90° แนะนำให้ติดตั้งกล่องแบตเตอรี่ให้อยู่ในระดับต่ำที่สุดเท่าที่จะทำได้ หรือติดตั้งแบตเตอรี่หลังจากตั้งเสาตรงแล้ว",
          "ผู้ควบคุมงานต้องตรวจสอบแรงขันของสลักเกลียวโครงยึดแผงโซลาร์บนพื้นดินให้แน่นหนาก่อนเริ่มสั่งงานให้กระบอกไฮดรอลิกยกตัวขึ้น"
        ]
      },
      {
        heading: "3. ขั้นตอนการส่งข้อมูลเพื่อตรวจสอบน้ำหนักของโครงการ",
        paragraphs: [
          "รวมข้อมูลน้ำหนักจากผู้ผลิตเสา แผงโซลาร์เซลล์ และแบตเตอรี่เข้าด้วยกัน กรอกข้อมูลลงในแบบฟอร์มตรวจสอบของ velolev ก่อนเริ่มนำอุปกรณ์เข้าหน้างาน"
        ]
      },
      {
        heading: "คำถามที่พบบ่อยเกี่ยวกับน้ำหนักเสาไฟโซลาร์เซลล์",
        paragraphs: [
          "ถ้าน้ำหนักรวมอยู่ที่ 310 กก. จะเป็นอย่างไร?\nห้ามใช้เครื่องยกนี้โดยเด็ดขาด น้ำหนักใดๆ ที่เกิน 300 กก. ถือว่าผิดข้อกำหนดความปลอดภัย S4 และจำเป็นต้องใช้รถเครนที่ได้รับอนุญาต",
          "สามารถติดตั้งแบตเตอรี่หลังจากตั้งเสาได้หรือไม่?\nสามารถทำได้และแนะนำเป็นอย่างยิ่งหากน้ำหนักรวมใกล้เคียง 300 กก. เพื่อลดภาระการยกและเพิ่มความปลอดภัย"
        ]
      }
    ]
  },
  "modular-85kg-pole-lifter-operator-planning-boundaries": {
    locale: "th",
    slug: "modular-85kg-pole-lifter-operator-planning-boundaries",
    title: "เครื่องยกเสาไฟแบบโมดูลาร์ 85 กก. สำหรับคนงาน 1–2 คน | velolev",
    h1: "เครื่องยกเสาไฟแบบแยกส่วน 85 กก. 2 โมดูล: ขนาดการขนส่งและการวางแผนทีมงาน 1–2 คน",
    description: "การวางแผนการปฏิบัติงานสำหรับทีมงานขนาดเล็ก 1 ถึง 2 คน ด้วยเครื่องยกเสาไฟแบบแยกส่วน velolev น้ำหนัก 85 กก. (โมดูลไฮดรอลิก 45 กก. + ตู้ควบคุม 40 กก.)",
    imageFolder: "/images/guides/modular-85kg-pole-lifter-operator-planning-boundaries",
    sections: [
      {
        heading: "การออกแบบ 2 โมดูลเพื่อความคล่องตัวสูงสุดในการทำงาน",
        paragraphs: [
          "วิธีการติดตั้งเสาไฟแบบดั้งเดิมต้องใช้รถเครนขนาดใหญ่พร้อมคนงาน 4 ถึง 6 คน ส่งผลให้ค่าใช้จ่ายรายวันสูงมาก เครื่องยก velolev ใช้แนวคิดการออกแบบแยกส่วนเป็น 2 โมดูลอิสระที่มีน้ำหนักรวม 85 กก.",
          "โมดูลกระบอกไฮดรอลิกยกมีน้ำหนัก 45 กก. และตู้ปั๊มไฟฟ้าพร้อมแบตเตอรี่ 24V มีน้ำหนัก 40 กก. ทั้งสองโมดูลมีหูหิ้วที่ออกแบบตามหลักสรีรศาสตร์เพื่อให้คนงาน 2 คนสามารถยกย้ายได้สะดวก"
        ]
      },
      {
        heading: "1. การจัดทีมงานปฏิบัติการ: รูปแบบ 1 คน เทียบกับ 2 คน",
        paragraphs: [
          "สำหรับการทำงานด้วยทีมงาน 2 คน ช่างเทคนิคคนหนึ่งจะจัดตำแหน่งแขนยกเข้ากับสลักเกลียวฐานราก ในขณะที่ช่างคนที่สองจะเชื่อมต่อข้อต่อสายไฮดรอลิกแบบสวมเร็วและใส่สลักล็อกนิรภัย รูปแบบนี้จะให้ประสิทธิภาพและความเร็วสูงสุด",
          "การทำงานด้วยคนเดียวสามารถทำได้โดยใช้รถเข็นของช่วยขนย้ายโมดูลขนาด 45 กก. และ 40 กก. แต่ต้องใช้ความระมัดระวังเป็นพิเศษในขั้นตอนการจัดแนวตั้งต้นของเสา"
        ]
      },
      {
        heading: "2. การเข้าถึงซอยแคบและทางเดินเท้า",
        paragraphs: [
          "ในชุมชนตรอกซอกซอย ทางเดินสวนสาธารณะ หรือทางเท้าคนเดินที่ห้ามรถบรรทุกเข้า ทีมงานสามารถขนถ่ายอุปกรณ์ลงที่ถนนใหญ่แล้วเดินหิ้วเข้าไปยังจุดติดตั้งผ่านช่องประตูแคบ 80 ซม. ได้",
          "อุปกรณ์ไม่ทำลายพื้นกระเบื้องทางเท้าและไม่ต้องใช้ขาค้ำยันไฮดรอลิกที่กีดขวางทางสัญจร"
        ]
      },
      {
        heading: "3. ขั้นตอนมาตรฐานในการล็อกความปลอดภัย",
        paragraphs: [
          "ใส่สลักล็อกนิรภัยแบบกลไกสองชั้นให้เรียบร้อยทุกครั้งก่อนสั่งปั๊มจ่ายแรงดันไฮดรอลิก ห้ามยืนอยู่ใต้แนวการยกของเสาในขณะที่เสากำลังเคลื่อนตัวขึ้น"
        ]
      },
      {
        heading: "คำถามที่พบบ่อยเกี่ยวกับทีมงานติดตั้ง",
        paragraphs: [
          "ผู้ควบคุมจำเป็นต้องมีใบอนุญาตขับรถเครนหรือไม่?\nไม่จำเป็น เนื่องจากอุปกรณ์นี้เป็นเครื่องยกไฮดรอลิกยึดฐานที่ควบคุมจากบนพื้นดิน จึงต้องการเพียงการฝึกอบรมตามคู่มือประจำเครื่อง",
          "ใช้เวลาประกอบทั้ง 2 โมดูลที่หน้างานนานเท่าใด?\nไม่ถึง 3 นาที: เพียงวางโมดูลทั้งสองลงบนพื้น เสียบสายไฮดรอลิกข้อต่อสวมเร็ว และเสียบปลั๊กไฟ 24V"
        ]
      }
    ]
  },
  "when-mobile-cranes-still-required-over-300kg-12m-direct-burial": {
    locale: "th",
    slug: "when-mobile-cranes-still-required-over-300kg-12m-direct-burial",
    title: "เมื่อใดที่ยังจำเป็นต้องใช้รถเครนยกเสาไฟ | velolev",
    h1: "กรณีที่รถเครนยังคงจำเป็นต้องใช้: เสาสูงเกิน 12 ม. หนักเกิน 300 กก. และเสาแบบฝังดินโดยตรง",
    description: "ขีดจำกัดทางเทคนิคที่ชัดเจนว่าเมื่อใดที่ต้องใช้รถเครน: เสาไฟที่หนักเกิน 300 กก. สูงเกิน 12 ม. หรือเป็นเสาแบบฝังลงในดินโดยไม่มีแผ่นหน้าแปลนฐานราก",
    imageFolder: "/images/guides/when-mobile-cranes-still-required-over-300kg-12m-direct-burial",
    sections: [
      {
        heading: "ความโปร่งใสในขีดจำกัดการใช้งานของอุปกรณ์",
        paragraphs: [
          "หลักการทางวิศวกรรมที่ซื่อตรงของ velolev ตั้งอยู่บนพื้นฐานของข้อจำกัดทางกายภาพที่ชัดเจน แม้ว่าเครื่องยกพกพานี้จะสามารถทดแทนรถเครนได้ในโครงการไฟถนนในเมืองส่วนใหญ่ แต่ก็ไม่ได้ออกแบบมาเพื่อรองรับเสาทุกประเภท",
          "การทำความเข้าใจขีดจำกัดที่ไม่สามารถก้าวข้ามได้ทั้ง 3 ประการนี้ จะช่วยป้องกันอุบัติเหตุในหน้างานและช่วยให้การจัดทำงบประมาณโครงการวางแผนเช่ารถเครนเฉพาะในจุดที่จำเป็นจริงๆ"
        ]
      },
      {
        heading: "1. เกณฑ์ชี้ขาด 3 ประการที่บังคับให้ต้องใช้รถเครน",
        paragraphs: [
          "เกณฑ์ที่ 1: ความสูงของเสาเกิน 12 ม. (เสาไฟทางหลวงขนาด 14–18 ม. หรือเสาไฟสปอร์ตไลท์สนามกีฬาสูง 20–30 ม. เกินขอบเขตระยะการทำงานของระบบไฮดรอลิก)",
          "เกณฑ์ที่ 2: น้ำหนักรวมของเสาเกิน 300 กก. (เสาเหล็กหล่อหนาเป็นพิเศษ หรือเสาคอนกรีตอัดแรงหนัก 400–1000 กก.)",
          "เกณฑ์ที่ 3: เสาแบบฝังลงในดินโดยตรง (direct-burial ที่ไม่มีฐานรากคอนกรีตและสลักเกลียวยึด) เนื่องจากเครื่องยกต้องยึดเข้ากับสลักเกลียวฐานรากเพื่อรับแรงสะท้อน จึงไม่สามารถใช้กับเสาที่ขุดหลุมฝังดินได้"
        ]
      },
      {
        heading: "2. กลยุทธ์การทำงานแบบผสมผสาน (รถเครน + เครื่องยกพกพา)",
        paragraphs: [
          "ในโครงการนิคมอุตสาหกรรมหรือถนนเลี่ยงเมือง มักมีเสาสูง 15 ม. ที่วงเวียนหลักไม่กี่ต้น และมีเสามาตรฐาน 10 ม. จำนวน 40 ต้นตามซอย ผู้รับเหมาสามารถเช่ารถเครนเพียง 1 วันเพื่อยกเสาสูง แล้วใช้ velolev ติดตั้งเสาอีก 40 ต้นที่เหลือ",
          "แนวทางนี้ช่วยประหยัดงบประมาณค่าเช่ารถเครนได้หลายหมื่นบาทโดยไม่กระทบต่อกำหนดการส่งมอบงาน"
        ]
      },
      {
        heading: "3. ขั้นตอนการส่งข้อมูลเพื่อปรึกษาทีมวิศวกร",
        paragraphs: [
          "หากคุณไม่แน่ใจเกี่ยวกับน้ำหนักจริงหรือประเภทฐานรากของโครงการ กรุณาส่งเอกสารข้อมูลจำเพาะเพื่อให้ทีมวิศวกรของเราประเมินก่อนการตัดสินใจสั่งซื้อ"
        ]
      },
      {
        heading: "คำถามที่พบบ่อยเกี่ยวกับขีดจำกัดทางเทคนิค",
        paragraphs: [
          "สามารถยกเสาไฟฟ้าคอนกรีตขนาด 8 เมตรได้หรือไม่?\nไม่ได้ เนื่องจากเสาไฟฟ้าคอนกรีตมักมีน้ำหนัก 400 ถึง 800 กก. ซึ่งเกินพิกัดกำลังยก 300 กก. ของเครื่อง",
          "แล้วเสาอลูมิเนียมเรียวความสูง 12 เมตรสามารถยกได้หรือไม่?\nยกได้ ตราบใดที่แผ่นฐานมีระยะห่างรู 180–260 มม. และน้ำหนักรวมโคมไฟไม่เกิน 300 กก. (เสาอลูมิเนียมมักมีน้ำหนักเพียง 60–110 กก.)"
        ]
      }
    ]
  },
  "40-pole-parking-lot-lighting-crane-vs-lifter-scope-cost": {
    locale: "th",
    slug: "40-pole-parking-lot-lighting-crane-vs-lifter-scope-cost",
    title: "ติดตั้งไฟลานจอดรถ 40 ต้น: รถเครนเทียบกับเครื่องยกพกพา | velolev",
    h1: "การติดตั้งระบบไฟลานจอดรถ 40 ต้น: การเปรียบเทียบขอบเขตงานและต้นทุนระหว่างรถเครนและเครื่องยก velolev",
    description: "คู่มือการวางแผนงบประมาณสำหรับลานจอดรถห้างสรรพสินค้าและศูนย์กระจายสินค้า: เปรียบเทียบค่าเช่ารถเครนกับเครื่องยกพกพา velolev บนขอบเขตงานที่เท่ากัน",
    imageFolder: "/images/guides/40-pole-parking-lot-lighting-crane-vs-lifter-scope-cost",
    sections: [
      {
        heading: "เหตุใดการเปรียบเทียบบนขอบเขตงานเดียวกันจึงสำคัญที่สุด",
        paragraphs: [
          "ลานจอดรถของศูนย์การค้า ศูนย์โลจิสติกส์ และมหาวิทยาลัยมักต้องติดตั้งเสาไฟส่องสว่าง 20 ถึง 60 ต้นในระยะงานเดียว เมื่อเปรียบเทียบรถเครนกับเครื่องยกไฮดรอลิกพกพา velolev การประมาณการงบประมาณที่แม่นยำต้องตั้งอยู่บนขอบเขตงานที่เหมือนกัน ไม่ใช่เทียบเพียงราคาค่าเช่าต่อชั่วโมง",
          "เนื่องจาก velolev ดำเนินงานในรูปแบบการเสนอราคา B2B ส่วนตัวโดยไม่มีการประกาศราคาขายปลีกสาธารณะ ผู้ประเมินราคาจึงกรอกอัตราค่าเช่าเครน ค่าแรงงานท้องถิ่น และปริมาณงานของตนลงในเครื่องคำนวณ ROI ของ velolev เพื่อทดสอบความคุ้มค่าได้อย่างโปร่งใส"
        ]
      },
      {
        heading: "1. ตารางเปรียบเทียบขอบเขตงานสำหรับเสาไฟ 40 ต้น",
        paragraphs: [
          "รถเครนต้องใช้พื้นที่กางขาค้ำยัน ต้องขออนุญาตปิดกั้นช่องจราจร และต้องคอยขยับเคลื่อนย้ายรถไปตามหลุมเสาแต่ละจุดอย่างช้าๆ แต่ด้วยเครื่องยก velolev น้ำหนัก 85 กก. (แยกเป็นโมดูลไฮดรอลิก 45 กก. และตู้ไฟฟ้า 40 กก.) คนงาน 1 ถึง 2 คนสามารถเข็นย้ายเครื่องได้เองโดยไม่กีดขวางการจราจร",
          "การติดตั้งเข้ากับหน้าแปลน 180–260 มม. และการขันแน่นสลักเกลียว M16–M24 ทำบนพื้นดินก่อนยกขึ้น จึงไม่มีค่าใช้จ่ายในการจ้างคนขับเครนมายืนรอหน้างาน"
        ]
      },
      {
        heading: "2. การวิเคราะห์ต้นทุนและการขจัดเวลาสูญเปล่าที่ต้องรอคอย",
        paragraphs: [
          "บริษัทให้เช่ารถเครนมักคิดค่าเช่าขั้นต่ำครึ่งวันหรือเต็มวัน 8 ชั่วโมงพร้อมค่าเดินทาง หากงานเทคอนกรีตฐานรากหรืองานร้อยสายไฟใต้ดินล่าช้า ผู้รับเหมาต้องแบกรับต้นทุนค่ารถเครนจอดรอเปล่าประโยชน์",
          "การมีเครื่องยกพลังงานแบตเตอรี่ 24V เป็นของตนเองช่วยให้ทีมงานสามารถยกเสาได้ตามความพร้อมจริงของงานก่อสร้างโดยไม่มีค่าปรับการรอคอย"
        ]
      },
      {
        heading: "3. รายการตรวจสอบหน้างานสำหรับโครงการลานจอดรถ",
        paragraphs: [
          "ตรวจสอบว่าน้ำหนักเสารวมโคมไฟไม่เกิน 300 กก. และความสูงของเสาไม่เกิน 12 ม. สำหรับแผ่นฐานที่มี 6 หรือ 8 รู หรือมีขนาดนอกช่วง 180–260 มม. กรุณาส่งแบบแปลนพร้อมขนาดมาให้เราตรวจสอบ"
        ]
      },
      {
        heading: "คำถามที่พบบ่อยเกี่ยวกับโครงการลานจอดรถ",
        paragraphs: [
          "เครื่องยกจะทำให้พื้นยางมะตอยที่เพิ่งปูใหม่เสียหายหรือไม่?\nไม่เสียหาย ด้วยน้ำหนัก 85 กก. ที่กระจายลงบนแท่นรองรับ เครื่องจะไม่กดทับพื้นผิวจนเป็นรอยแตกเหมือนขาค้ำยันของรถเครนขนาดใหญ่",
          "ต้องใช้คนงานกี่คนสำหรับติดตั้งเสา 40 ต้น?\nข้อกำหนดทางเทคนิคระบุให้ใช้คนงานเพียง 1 ถึง 2 คนในการเคลื่อนย้ายและยกเสา ทำให้สามารถจัดสรรคนงานที่เหลือไปทำงานระบบไฟฟ้าและงานฐานรากได้อย่างเต็มที่"
        ]
      }
    ]
  },
  "24v-battery-off-grid-rural-road-pole-lifting-planning": {
    locale: "th",
    slug: "24v-battery-off-grid-rural-road-pole-lifting-planning",
    title: "เครื่องยกเสาไฟพลังงานแบตเตอรี่ 24V สำหรับถนนชนบท | velolev",
    h1: "เครื่องยกเสาไฟพกพาพลังงานแบตเตอรี่ 24V สำหรับถนนชนบทนอกโครงข่ายไฟฟ้า: จำนวนครั้งการยกและการวางแผนงานสนาม",
    description: "การวางแผนติดตั้งเสาไฟพลังงานแสงอาทิตย์บนถนนชนบทและพื้นที่ห่างไกลที่ไม่มีไฟฟ้า ด้วยเครื่องยกเสาไฟพลังงานแบตเตอรี่ 24V จาก velolev",
    imageFolder: "/images/guides/24v-battery-off-grid-rural-road-pole-lifting-planning",
    sections: [
      {
        heading: "การวางแผนพลังงานสำหรับพื้นที่ก่อสร้างนอกระบบสายส่ง",
        paragraphs: [
          "โครงการติดตั้งไฟฟ้าส่องสว่างพลังงานแสงอาทิตย์บนถนนชนบทและพื้นที่ภูเขาห่างไกลมักตั้งอยู่ไกลจากโครงข่ายไฟฟ้า การลากเครื่องกำเนิดไฟฟ้าขนาดใหญ่หรือนำรถเครนขนาดใหญ่เข้าสู่ถนนลูกรังที่คับแคบจะเพิ่มต้นทุนและเสี่ยงต่อการติดหล่ม",
          "เครื่องยกไฮดรอลิก velolev มาพร้อมชุดตู้พลังงานแบตเตอรี่ 24V ขนาด 40 กก. ในตัว ทำให้สามารถยกเสาไฟได้ต่อเนื่องอย่างอิสระโดยไม่ต้องพึ่งพาสายไฟต่อพ่วงหรือเครื่องอัดอากาศ"
        ]
      },
      {
        heading: "1. จำนวนรอบการยกต่อการชาร์จและค่าเผื่อความปลอดภัยหน้างาน",
        paragraphs: [
          "ข้อมูลจากผู้ผลิตระบุว่าแบตเตอรี่สามารถรองรับการยกได้มากกว่า 50 ครั้งต่อการชาร์จเต็มหนึ่งครั้งในสภาวะมาตรฐาน (ขึ้นอยู่กับอุณหภูมิแวดล้อมและน้ำหนักเสา) ในการวางแผนงาน วิศวกรควรกำหนดเป้าหมายอย่างปลอดภัยที่ 25 ถึง 35 ต้นต่อวันสำหรับทีมงาน เพื่อรองรับการเคลื่อนย้ายและการปรับแต่ง",
          "การพกพาอินเวอร์เตอร์ชาร์จไฟบนรถกระบะหรือเตรียมแบตเตอรี่สำรองอีกหนึ่งลูกจะช่วยให้การทำงานในพื้นที่ห่างไกลดำเนินไปได้อย่างต่อเนื่องตลอดทั้งวัน"
        ]
      },
      {
        heading: "2. การขนส่งบนถนนลูกรังและเส้นทางภูเขาที่คับแคบ",
        paragraphs: [
          "ด้วยการออกแบบแยกส่วนเป็น 2 ชิ้น หนัก 45 กก. และ 40 กก. อุปกรณ์จึงสามารถบรรทุกบนกระบะรถ 4x4 หรือขนด้วยรถเข็นก่อสร้างเข้าสู่จุดติดตั้งที่รถบรรทุก 12 ตันไม่สามารถเข้าถึงได้",
          "ในพื้นที่ดินอ่อนหรือดินถมใหม่ การวางแผ่นไม้หนารองรับใต้ขาค้ำของเครื่องยกจะช่วยกระจายน้ำหนักได้อย่างสมบูรณ์แบบก่อนเริ่มยกเสาในแนวตั้ง"
        ]
      },
      {
        heading: "3. ขั้นตอนการตรวจสอบและชาร์จแบตเตอรี่ที่หน้างาน",
        paragraphs: [
          "ตรวจสอบเกจวัดแรงดันไฟฟ้าก่อนเริ่มการยกครั้งแรกของวัน ห้ามเริ่มยกหากแรงดันไฟฟ้าต่ำกว่าเกณฑ์ที่กำหนด เพื่อให้แน่ใจว่าวาล์วกันตกไฮดรอลิกทำงานได้อย่างสมบูรณ์"
        ]
      },
      {
        heading: "คำถามที่พบบ่อยเกี่ยวกับการทำงานด้วยแบตเตอรี่ในพื้นที่ห่างไกล",
        paragraphs: [
          "สภาพอากาศหนาวจัดส่งผลต่อแบตเตอรี่ 24V หรือไม่?\nส่งผล อุณหภูมิที่ต่ำมากจะลดความจุของแบตเตอรี่ลง ควรเก็บตู้แบตเตอรี่ไว้ในห้องโดยสารรถยนต์จนกว่าจะถึงเวลาเริ่มใช้งาน",
          "สามารถชาร์จจากช่องจุดบุหรี่ 12V / 24V ของรถกระบะได้หรือไม่?\nสามารถทำได้ โดยใช้อุปกรณ์แปลงไฟหรือเครื่องชาร์จที่รองรับคุณสมบัติการชาร์จของแบตเตอรี่ 24V เกรดอุตสาหกรรม"
        ]
      }
    ]
  },
  "pickup-truck-transport-modular-pole-jack-dimensions": {
    locale: "th",
    slug: "pickup-truck-transport-modular-pole-jack-dimensions",
    title: "การขนย้ายเครื่องยกเสาไฟด้วยรถกระบะและรถตู้ | velolev",
    h1: "การขนย้ายเครื่องยกเสาไฟแบบแยกส่วนด้วยรถกระบะและรถตู้: ขนาดบรรจุภัณฑ์ 650 × 350 × 500 มม. และน้ำหนักของโมดูล",
    description: "ข้อกำหนดการจัดวางและการยึดโยงเครื่องยกเสาไฟ velolev บนกระบะท้ายรถบรรทุกขนาดเล็ก: ขนาดหีบห่อ 650 × 350 × 500 มม. และชิ้นส่วนหนัก 45 กก. และ 40 กก.",
    imageFolder: "/images/guides/pickup-truck-transport-modular-pole-jack-dimensions",
    sections: [
      {
        heading: "เพิ่มความคล่องตัวในการขนส่งโดยไม่ต้องใช้รถพ่วงเฉพาะ",
        paragraphs: [
          "ค่าใช้จ่ายในการเคลื่อนย้ายรถพ่วงหรือรถบรรทุกขนาดใหญ่สำหรับงานติดตั้งเสาไฟเป็นภาระต้นทุนแฝงที่สำคัญ เครื่องยก velolev ได้รับการออกแบบมาเป็นพิเศษเพื่อให้สามารถวางลงในกระบะท้ายรถบรรทุกขนาด 1 ตันหรือรถตู้ทั่วไปได้อย่างพอดี",
          "ด้วยขนาดบรรจุภัณฑ์ที่กะทัดรัดเพียง 650 × 350 × 500 มม. และน้ำหนักที่แยกออกเป็น 2 ชิ้น (45 กก. และ 40 กก.) ช่าง 2 คนสามารถยกขึ้นลงจากรถได้ด้วยตนเองโดยไม่ต้องใช้รถโฟล์กลิฟต์หรือแท่นยกรถยนต์"
        ]
      },
      {
        heading: "1. การจัดกระจายน้ำหนักบนกระบะท้ายรถ",
        paragraphs: [
          "โมดูลกระบอกไฮดรอลิกหลัก (45 กก.) ควรยึดรัดไว้ติดกับผนังด้านหน้าของกระบะเพื่อป้องกันการเลื่อนไถลเมื่อเบรกกะทันหัน ส่วนตู้ควบคุมแบตเตอรี่ 24V (40 กก.) ให้วางไว้ด้านข้างใกล้กับฝาท้ายเพื่อให้ยกออกใช้งานได้สะดวกรวดเร็ว",
          "พื้นที่ส่วนที่เหลือของกระบะยังคงมีที่ว่างเพียงพอสำหรับวางท่อนเสาไฟที่ถอดประกอบ โคมไฟ LED แผงโซลาร์ และกล่องเครื่องมือ"
        ]
      },
      {
        heading: "2. การเข้าสู่เขตเมืองเก่าและอุโมงค์ลอดที่จำกัดความสูง",
        paragraphs: [
          "ในถนนคนเดินที่มีเสากั้นทาง หรือทางลอดใต้สะพานที่จำกัดความสูงไม่เกิน 2.5 ม. รถกระบะขนาดเล็กสามารถขับผ่านเข้าไปได้โดยไม่มีข้อจำกัดด้านการจราจร",
          "เมื่อถึงจุดติดตั้ง หูหิ้วบนตัวเครื่องช่วยให้สามารถเดินยกอุปกรณ์ผ่านช่องทางเดินแคบๆ ที่มีความกว้างเพียง 80 ซม. ได้อย่างสบาย"
        ]
      },
      {
        heading: "3. กฎเกณฑ์การผูกรัดเพื่อความปลอดภัยในการเดินทาง",
        paragraphs: [
          "ใช้สายรัดโพลีเอสเตอร์แบบคันเร่งที่มีมาตรฐานเพื่อรัดตรึงอุปกรณ์เข้ากับจุดยึดของกระบะรถ ตรวจสอบให้แน่ใจว่าวาล์วระบายแรงดันไฮดรอลิกปิดสนิทและถอดขั้วต่อสายไฟออกในระหว่างการเดินทาง"
        ]
      },
      {
        heading: "คำถามที่พบบ่อยเกี่ยวกับการขนย้ายอุปกรณ์",
        paragraphs: [
          "เครื่องยกสามารถใส่ในท้ายรถยนต์อเนกประสงค์ SUV แบบพับเบาะได้หรือไม่?\nได้ ขนาด 650 × 350 × 500 มม. สามารถวางในห้องเก็บสัมภาระท้ายรถ SUV หรือรถตู้ได้อย่างสะดวก",
          "จำเป็นต้องใช้ใบรับรองขับรถโฟล์กลิฟต์ในการยกของที่คลังสินค้าหรือไม่?\nไม่จำเป็น เนื่องจากแต่ละโมดูลมีน้ำหนักไม่เกิน 45 กก. คนงาน 2 คนจึงสามารถยกย้ายได้ตามมาตรฐานความปลอดภัยในการทำงาน"
        ]
      }
    ]
  },
  "overhead-power-lines-narrow-alley-pole-erection-planning": {
    locale: "th",
    slug: "overhead-power-lines-narrow-alley-pole-erection-planning",
    title: "การยกเสาไฟใกล้สายไฟฟ้าแรงสูงและซอยแคบ | velolev",
    h1: "การวางแผนติดตั้งเสาไฟ 10 ม. และ 12 ม. ใกล้แนวสายไฟฟ้าอากาศและในตรอกซอกซอยแคบอย่างปลอดภัย",
    description: "การรักษาระยะห่างปลอดภัยจากไฟฟ้าและการป้องกันประกายไฟลัดวงจรเมื่อยกเสาไฟ 10 ม. และ 12 ม. ในซอยแคบด้วยเครื่องยกไฮดรอลิกยึดฐานจากพื้นดิน",
    imageFolder: "/images/guides/overhead-power-lines-narrow-alley-pole-erection-planning",
    sections: [
      {
        heading: "อันตรายถึงชีวิตจากการสัมผัสสายไฟด้วยบูมรถเครน",
        paragraphs: [
          "การยืดแขนบูมโลหะของรถเครนขึ้นใกล้กับสายไฟฟ้าแรงสูงและแรงต่ำอากาศเป็นสาเหตุสำคัญอันดับต้นๆ ของอุบัติเหตุไฟฟ้าดูดเสียชีวิตในงานก่อสร้าง กฎหมายความปลอดภัยกำหนดระยะห่างขั้นต่ำที่เครนขนาดใหญ่มักไม่สามารถทำได้ในถนนที่กว้างไม่ถึง 6 เมตร",
          "เครื่องยก velolev ยกเสาขึ้นโดยการหมุนขึ้นจากบานพับบนแผ่นฐานรากโดยตรงตามแนววิถีมุมที่กำหนด ทำให้ตัวเสาอยู่ในแนวการเคลื่อนที่ที่ควบคุมได้ตลอดเวลาโดยไม่มีชิ้นส่วนแกว่งไปใกล้สายไฟด้านบน"
        ]
      },
      {
        heading: "1. ระยะห่างปลอดภัยและเขตหวงห้ามทางไฟฟ้า",
        paragraphs: [
          "ก่อนการยก ช่างต้องวาดแนวรัศมีการหมุนของเสาจาก 0° ถึง 90° สำหรับเสาสูง 12 ม. ต้องมั่นใจว่าปลายยอดเสาและกิ่งโคมไฟจะไม่ล้ำเข้าไปในระยะปลอดภัยของแนวสายไฟฟ้า",
          "ในซอยแคบที่รถเครนไม่สามารถกางขาค้ำยันได้โดยไม่ชนผนังบ้าน การยึดเครื่องเข้ากับสลักเกลียว M16–M24 ของฐานรากจะช่วยขจัดปัญหาเสาแกว่งไปมาได้อย่างเด็ดขาด"
        ]
      },
      {
        heading: "2. การยกตัวที่นุ่มนวลและการสื่อสารที่ชัดเจนบนพื้นดิน",
        paragraphs: [
          "ระบบไฮดรอลิกสามารถหยุดและล็อกตำแหน่งของเสาได้ทุกมุมด้วยวาล์วกันตกแบบกลไก ช่วยให้ช่างสังเกตแนวสายสื่อสารหรือสายไฟที่พาดผ่านซอยได้อย่างต่อเนื่อง",
          "การไม่มีเสียงเครื่องยนต์ดีเซลของรถบรรทุกรบกวน ช่วยให้ช่างทั้งสองคนสื่อสารคำสั่งความปลอดภัยกันได้อย่างชัดเจนในทุกวินาที"
        ]
      },
      {
        heading: "3. ข้อกำหนดที่ต้องตรวจสอบก่อนเริ่มยกเสา",
        paragraphs: [
          "ตรวจสอบว่าไม่มีสายไฟพาดผ่านในแนวดิ่งเหนือฐานราก และตรวจสอบความแข็งแรงของคอนกรีตฐานราก ขีดจำกัดเสาสูงสุดคือ 300 กก. และความสูงไม่เกิน 12 ม."
        ]
      },
      {
        heading: "คำถามที่พบบ่อยเกี่ยวกับความปลอดภัยใกล้สายไฟ",
        paragraphs: [
          "โครงสร้างของเครื่องยกมีฉนวนกันไฟฟ้าหรือไม่?\nไม่มี โครงสร้างทำจากเหล็กกล้า ความปลอดภัยเกิดจากการควบคุมวิถีการยกที่แม่นยำและการรักษาระยะห่างปลอดภัย ห้ามให้สัมผัสกับสายไฟโดยเด็ดขาด",
          "สามารถทำงานใกล้สายไฟในขณะฝนตกได้หรือไม่?\nต้องหยุดงานทันทีหากฝนตก มีพายุฟ้าคะนอง หรือทัศนวิสัยไม่ดีจนมองเห็นระยะห่างของสายไฟไม่ชัดเจน"
        ]
      }
    ]
  },
  "20-second-lift-stroke-vs-total-light-pole-installation-time": {
    locale: "th",
    slug: "20-second-lift-stroke-vs-total-light-pole-installation-time",
    title: "จังหวะยกไฮดรอลิก 20 วินาทีเทียบกับเวลาติดตั้งเสาไฟรวม | velolev",
    h1: "ระยะเวลายกไฮดรอลิก 20 วินาทีตามรายงานของผู้ผลิต เทียบกับเวลาการติดตั้งเสาไฟถนนจริงทั้งระบบ",
    description: "คำอธิบายทางเทคนิคเพื่อแยกแยะระหว่างจังหวะการยืดของกระบอกไฮดรอลิก 20 วินาที กับระยะเวลาในวงรอบการติดตั้งเสาไฟหนึ่งต้นที่หน้างานจริง",
    imageFolder: "/images/guides/20-second-lift-stroke-vs-total-light-pole-installation-time",
    sections: [
      {
        heading: "การแยกแยะระหว่างเวลาการดันของไฮดรอลิกกับวงรอบการทำงานทั้งหมด",
        paragraphs: [
          "เอกสารทางเทคนิคของ velolev บันทึกเวลาการยืดตัวของกระบอกไฮดรอลิกหลักไว้ที่ประมาณ 20 วินาทีในสภาวะการทดสอบ ในการจัดทำตารางเวลาประมูลงาน วิศวกรต้องไม่สับสนระหว่างเวลาการทำงานของเครื่องจักรนี้กับเวลาติดตั้งรวมต่อต้น",
          "วงรอบการทำงานที่สมบูรณ์หน้างานประกอบด้วย: การนำเครื่องเข้าติดตั้งบนฐานราก การร้อยสายไฟ การประกอบโคมและกิ่งโคมบนพื้น การยกเสาขึ้น การปรับระดับดิ่งด้วยน็อตปรับระดับ และการขันแน่นสลักเกลียว M16–M24"
        ]
      },
      {
        heading: "1. การแจกแจงเวลาในแต่ละขั้นตอนการติดตั้งต่อหนึ่งต้น",
        paragraphs: [
          "สำหรับทีมงาน 2 คนที่มีความชำนาญ แต่ละขั้นตอนจะใช้เวลาประมาณ: 10–15 นาทีในการเตรียมงานบนพื้น (ติดตั้งโคมไฟ ต่อสายไฟ และยึดเสาเข้ากับกระบอกยก) 20–30 วินาทีในการยกไฮดรอลิก และ 5–10 นาทีในการปรับระดับดิ่ง ขันแน่นน็อต และถอดอุปกรณ์ย้ายไปจุดถัดไป",
          "เวลารวมเฉลี่ยต่อต้นจะอยู่ที่ประมาณ 20 ถึง 35 นาที ทำให้ทีมงานขนาดเล็กสามารถติดตั้งเสาได้ 10 ถึง 16 ต้นในหนึ่งวันทำงานปกติ"
        ]
      },
      {
        heading: "2. การนำตัวเลขสมรรถนะไปใช้อย่างมีความรับผิดชอบในแผนงาน",
        paragraphs: [
          "อย่านำ 20 วินาทีไปคูณกับจำนวนเสาโดยตรงเพื่อทำแผนงานส่งมอบ แผนงานจริงต้องเผื่อเวลาการเดินทางระหว่างหลุมเสา เวลาการบ่มตัวของคอนกรีตฐานราก และการตรวจสอบความปลอดภัยทางไฟฟ้า",
          "ข้อได้เปรียบที่แท้จริงของ velolev คือการขจัดเวลาการรอคอยของรถเครน และความสะดวกรวดเร็วในการขนย้ายอุปกรณ์หนัก 85 กก."
        ]
      },
      {
        heading: "3. ข้อมูลที่ควรระบุในการสอบถามโครงการ",
        paragraphs: [
          "ระบุน้ำหนักโคมไฟ ความสูงของเสา และขนาดของแผ่นฐานราก เพื่อให้วิศวกรของเราตรวจสอบว่าวงรอบการทำงานอยู่ในพิกัดปลอดภัย 300 กก. และ 12 ม."
        ]
      },
      {
        heading: "คำถามที่พบบ่อยเกี่ยวกับความเร็วในการยกและผลผลิตงาน",
        paragraphs: [
          "สามารถปรับความเร็วการยกของกระบอกไฮดรอลิกได้หรือไม่?\nไม่ได้ อัตราการไหลของปั๊มได้รับการปรับเทียบจากโรงงานเพื่อรักษาเสถียรภาพของจุดศูนย์ถ่วงและป้องกันแรงกระชากเมื่อเสาเข้าใกล้แนวตั้ง 90°",
          "การเพิ่มคนงานเป็น 3 คนช่วยให้งานเสร็จเร็วขึ้นหรือไม่?\nช่วยได้ คนที่สามสามารถเดินล่วงหน้าไปร้อยสายไฟและประกอบโคมไฟที่จุดถัดไป ในขณะที่ช่างหลัก 2 คนทำการยกเสาและขันน็อต"
        ]
      }
    ]
  },
  "foundation-inspection-before-self-anchoring-pole-erection": {
    locale: "th",
    slug: "foundation-inspection-before-self-anchoring-pole-erection",
    title: "การตรวจสอบฐานรากและสลักเกลียวก่อนยกเสาไฟ | velolev",
    h1: "รายการตรวจสอบฐานรากคอนกรีตและสลักเกลียวฝังดินก่อนการประเมินการใช้เครื่องยกเสาไฟ",
    description: "ขนาดฐานราก ความยาวเกลียวที่โผล่พ้นคอนกรีต และภาพถ่ายหน้างานที่ต้องรวบรวมก่อนส่งข้อมูลเพื่อการประเมินความเข้ากันได้กับเครื่องยก velolev",
    imageFolder: "/images/guides/foundation-inspection-before-self-anchoring-pole-erection",
    sections: [
      {
        heading: "เหตุใดสภาพของฐานรากจึงเป็นตัวกำหนดความปลอดภัยในการยกเสา",
        paragraphs: [
          "ต่างจากรถเครนที่แขวนรับน้ำหนักในอากาศ เครื่องยก velolev จะใช้น้ำหนักกดและแรงสะท้อนกลับลงบนสลักเกลียวและฐานรากคอนกรีตโดยตรงเพื่อดันเสาขึ้น ดังนั้น ความสมบูรณ์ของคอนกรีตและสภาพของสลักเกลียวจึงมีความสำคัญยิ่งยวดต่อความปลอดภัย",
          "คอนกรีตที่ยังบ่มไม่ได้อายุ สลักเกลียวที่เอียงไม่ได้แนว หรือเกลียวที่ชำรุดเสียหาย อาจทำให้การยึดจับไม่มั่นคงและส่งผลต่อความปลอดภัยของเครื่องยก"
        ]
      },
      {
        heading: "1. พารามิเตอร์ขนาดและตารางตรวจสอบหน้างาน",
        paragraphs: [
          "ก่อนเริ่มงาน ให้ใช้เวอร์เนียร์และตลับเมตรวัด: ขนาดสลักเกลียว (ระหว่าง M16 ถึง M24) ความยาวเกลียวที่โผล่พ้นผิวคอนกรีต (อย่างน้อย 50–70 มม. สำหรับน็อตปรับระดับ แผ่นฐาน แหวนรอง และน็อตขันล็อก) และระยะห่างระหว่างศูนย์กลางรู (ต้องอยู่ในช่วง 180 ถึง 260 มม.)",
          "ตรวจสอบความเรียบของผิวหน้าคอนกรีต หากผิวหน้าไม่เรียบต้องใช้ปูนเกร้าท์ไม่หดตัวปรับระดับเพื่อให้แผ่นฐานแนบสนิท"
        ]
      },
      {
        heading: "2. การแยกแยะระหว่างการตรวจสอบหน้างานกับการคำนวณฐานรากทางธรณีเทคนิค",
        paragraphs: [
          "รายการตรวจสอบของ velolev มีวัตถุประสงค์เพื่อยืนยันความเข้ากันได้ทางเรขาคณิตระหว่างเครื่องยกกับฐานเสา รายการนี้ไม่ได้มาทดแทนการคำนวณแรงลมและการออกแบบโครงสร้างคอนกรีตฐานรากซึ่งเป็นหน้าที่ของวิศวกรผู้ควบคุมโครงการ",
          "หากสลักเกลียวถูกฝังโดยไม่ได้ใช้แผ่นจิ๊กเหล็กจับยึด ให้ตรวจสอบความตั้งฉากของสลักเกลียวทุกตัวเพื่อป้องกันแรงเฉือนขณะติดตั้งเครื่อง"
        ]
      },
      {
        heading: "3. ชุดเอกสาร 4 รายการสำหรับการตรวจสอบทางเทคนิคอย่างรวดเร็ว",
        paragraphs: [
          "เพื่อให้ทีมวิศวกรของเราตอบกลับผลการตรวจสอบได้ภายใน 2 ชั่วโมง ให้เตรียม: 1) แบบแปลนแผ่นฐานที่มีขนาดครบถ้วน 2) ภาพถ่ายฐานรากพร้อมตลับเมตร 3) ขนาดสลักเกลียว และ 4) แคตตาล็อกของเสาและโคมไฟ"
        ]
      },
      {
        heading: "คำถามที่พบบ่อยเกี่ยวกับฐานรากเสาไฟ",
        paragraphs: [
          "สามารถใช้กับเสาแบบขุดหลุมฝังดินโดยตรงโดยไม่มีแผ่นหน้าแปลนได้หรือไม่?\nไม่ได้ เครื่องยกไฮดรอลิกนี้จำเป็นต้องมีฐานรากคอนกรีตและสลักเกลียวเหล็กเพื่อเป็นจุดรับแรงสะท้อนในการยก",
          "ต้องทำอย่างไรหากสลักเกลียวตัวหนึ่งเอียงหรือคด?\nต้องดัดให้ตรงภายใต้การควบคุมของวิศวกรโครงสร้าง หรือใช้อะแดปเตอร์เกลียวพิเศษก่อนทำการติดตั้งเครื่องยก"
        ]
      }
    ]
  },
  "evaluating-portable-pole-lifter-technical-evidence-b2b-tenders": {
    locale: "th",
    slug: "evaluating-portable-pole-lifter-technical-evidence-b2b-tenders",
    title: "การประเมินเอกสารทางเทคนิคเครื่องยกเสาไฟในงานประมูล B2B | velolev",
    h1: "การประเมินเอกสารทางเทคนิคของเครื่องยกเสาไฟพกพาในงานประมูล B2B: ข้อมูลจำเพาะ S4 เทียบกับรายงานการทดสอบ",
    description: "คู่มือการจัดซื้อจัดจ้างที่โปร่งใส แยกแยะข้อมูลจำเพาะที่ได้รับการรับรอง S4 ข้อมูลที่ผู้ผลิตรายงาน และเอกสารการปฏิบัติตามข้อกำหนดในงานประมูลภาครัฐและเอกชน",
    imageFolder: "/images/guides/evaluating-portable-pole-lifter-technical-evidence-b2b-tenders",
    sections: [
      {
        heading: "ความโปร่งใสของเอกสารในงานประมูลภาครัฐและโครงการ EPC",
        paragraphs: [
          "ในการประมูลโครงการติดตั้งระบบไฟฟ้าส่องสว่างสาธารณะ การนำเสนอวิธีการทำงานใหม่โดยไม่ใช้รถเครนจำเป็นต้องมีการจำแนกข้อมูลทางวิศวกรรมที่ได้รับการรับรองออกจากคำโฆษณาทางการตลาดอย่างชัดเจน เอกสารที่คลุมเครืออาจนำไปสู่การถูกตัดสิทธิ์ทางเทคนิคได้",
          "velolev จัดเตรียมเอกสารทางเทคนิคที่เป็นระบบ โดยแยกแยะอย่างชัดเจนระหว่างข้อมูลจำเพาะอย่างเป็นทางการของโรงงาน (S4) กับข้อมูลที่อยู่ระหว่างการเก็บสถิติภาคสนาม"
        ]
      },
      {
        heading: "1. ตารางการจำแนกหลักฐานทางเทคนิคสำหรับคณะกรรมการจัดซื้อจัดจ้าง",
        paragraphs: [
          "ข้อมูลระดับ A (ได้รับการรับรองยืนยัน): พิกัดกำลังยก 300 กก. ความสูงเสาสูงสุด 12 ม. น้ำหนักเครื่อง 2 โมดูล 85 กก. (45 กก. + 40 กก.) ระยะห่างรูหน้าแปลน 180–260 มม. และสลักเกลียวมาตรฐาน M16–M22",
          "ข้อมูลระดับ D (รายงานจากผู้ผลิต / อยู่ระหว่างการทดสอบหน้างาน): ระยะเวลายก 20 วินาที และความจุแบตเตอรี่มากกว่า 50 รอบการชาร์จ ซึ่งควรนำเสนอเป็นข้อมูลอ้างอิงภายใต้สภาวะมาตรฐาน"
        ]
      },
      {
        heading: "2. การนำไปบรรจุในแผนความปลอดภัย อาชีวอนามัย และสิ่งแวดล้อม (HSE)",
        paragraphs: [
          "เน้นย้ำในข้อเสนอทางเทคนิคถึงการขจัดความเสี่ยงจากการพลิกคว่ำของรถเครน และการยกเลิกการทำงานบนที่สูงเพื่อเกี่ยวสายสลิงยกเสา คนงานยืนปฏิบัติงานบนพื้นดินตลอดเวลา",
          "ระบุถึงประโยชน์ด้านสิ่งแวดล้อมจากการลดการปล่อยก๊าซคาร์บอนและมลพิษทางเสียง โดยการแทนที่รถบรรทุกดีเซลด้วยเครื่องยกไฮดรอลิกพลังงานแบตเตอรี่ 24V"
        ]
      },
      {
        heading: "3. สรุปขีดจำกัดทางเทคนิคที่ไม่สามารถก้าวข้ามได้",
        paragraphs: [
          "ระบุไว้อย่างชัดเจนในข้อเสนอว่า เสาไฟที่มีน้ำหนักเกิน 300 กก. หรือสูงเกิน 12 ม. จะดำเนินการติดตั้งโดยใช้รถเครนแบบดั้งเดิม"
        ]
      },
      {
        heading: "คำถามที่พบบ่อยเกี่ยวกับเอกสารการประมูล",
        paragraphs: [
          "velolev มีใบรับรองมาตรฐาน CE และคู่มือภาษาอังกฤษให้หรือไม่?\nมี เอกสารรับรองความสอดคล้องตามมาตรฐานเครื่องจักรและความเข้ากันได้ทางแม่เหล็กไฟฟ้า (CE) พร้อมคู่มือฉบับสมบูรณ์สามารถขอได้สำหรับงานโครงการ",
          "จะตอบคณะกรรมการอย่างไรเมื่อข้อกำหนดการประมูลระบุว่า 'ต้องใช้รถเครน'?\nนำเสนอเป็นข้อเสนอทางเลือกเชิงเทคนิคที่พิสูจน์ได้ว่ามีความปลอดภัยสูงกว่า (ไม่ต้องทำงานบนที่สูง) ไม่กีดขวางการจราจร และเป็นมิตรต่อสิ่งแวดล้อม"
        ]
      }
    ]
  },
  "solar-wind-sail-area-site-assessment-pole-lifting": {
    locale: "th",
    slug: "solar-wind-sail-area-site-assessment-pole-lifting",
    title: "พื้นที่ต้านลมของแผงโซลาร์เซลล์และการยกเสาไฟ | velolev",
    h1: "พื้นที่ต้านลมของแผงโซลาร์เซลล์และสภาพแวดล้อมของสถานที่ก่อนการประเมินทางเทคนิคในการยกเสา",
    description: "วิธีการเก็บข้อมูลพื้นที่แผงโซลาร์เซลล์ ความสูงในการติดตั้ง สภาพลมของพื้นที่ และน้ำหนักรวมไม่เกิน 300 กก. เพื่อการประเมินความปลอดภัยในการยกเสาไฟโซลาร์เซลล์",
    imageFolder: "/images/guides/solar-wind-sail-area-site-assessment-pole-lifting",
    sections: [
      {
        heading: "เหตุใดพื้นที่ต้านลมของแผงโซลาร์เซลล์จึงส่งผลต่อการยกเสา",
        paragraphs: [
          "สำหรับเสาไฟถนนพลังงานแสงอาทิตย์ที่มีแผงโซลาร์เซลล์ติดตั้งอยู่บนยอดเสา พื้นผิวของแผงจะทำหน้าที่เสมือนใบเรือที่รับแรงลม ในระหว่างที่เสากำลังถูกยกขึ้นจากแนวราบสู่แนวตั้ง แรงลมที่พัดปะทะด้านข้างจะสร้างโมเมนต์แรงบิดกระทำต่อแขนยกของเครื่อง",
          "เพื่อให้มั่นใจในการยกอย่างปลอดภัยภายในพิกัด 300 กก. ของ velolev ผู้ควบคุมงานต้องคำนวณทั้งน้ำหนักสถิตของโคมไฟและแบตเตอรี่ ร่วมกับโมเมนต์การพลิกคว่ำที่เกิดจากแรงลมปะทะแผงโซลาร์เซลล์"
        ]
      },
      {
        heading: "1. ข้อมูลพื้นที่ต้านลมและสภาพแวดล้อมที่จำเป็นต้องเก็บรวบรวม",
        paragraphs: [
          "ช่างเทคนิคหน้างานต้องบันทึก: พื้นที่ผิวรวมของแผงโซลาร์ (เป็น ตร.ม.) มุมเอียงเมื่อเทียบกับตัวเสา ความสูงในการติดตั้ง และสภาพพื้นที่แวดล้อม (ทุ่งโล่ง ริมทะเล หรือย่านชุมชนที่มีอาคารกำบัง)",
          "แผงโซลาร์เซลล์ที่มีพื้นที่มากกว่า 1.5 ตร.ม. บนยอดเสาต้องใช้ความระมัดระวังเป็นพิเศษ และห้ามดำเนินการยกเสาเมื่อมีความเร็วลมคงที่เกินกว่า 25–30 กม./ชม."
        ]
      },
      {
        heading: "2. มาตรฐานความปลอดภัยด้านสภาพอากาศที่อิงจากการวัดค่าจริง",
        paragraphs: [
          "ความปลอดภัยในการทำงานต้องไม่อาศัยการคาดเดา ให้เตรียมเครื่องวัดความเร็วลมแบบพกพาไว้ที่หน้างาน หากความเร็วลมเกินขีดจำกัดความปลอดภัยของทีมงาน ให้เลื่อนการยกเสาออกไปก่อน",
          "กระบอกไฮดรอลิกของ velolev มีวาล์วล็อกนิรภัยแบบทางเดียวซึ่งจะช่วยล็อกตำแหน่งของเสาไว้โดยอัตโนมัติหากการทำงานต้องหยุดชะงักกะทันหันเนื่องจากลมกระโชกแรง"
        ]
      },
      {
        heading: "3. การเตรียมเอกสารสำหรับโครงการพลังงานแสงอาทิตย์เพื่อส่งตรวจ",
        paragraphs: [
          "รวบรวมเอกสารข้อมูลจำเพาะของแผงโซลาร์เซลล์ แบบแปลนโครงยึด และน้ำหนักรวมของอุปกรณ์ทั้งหมดที่ติดตั้งบนเสาก่อนส่งปรึกษาทีมวิศวกรของเรา"
        ]
      },
      {
        heading: "คำถามที่พบบ่อยเกี่ยวกับเสาไฟโซลาร์เซลล์และแรงลม",
        paragraphs: [
          "ควรติดตั้งแผงโซลาร์เซลล์หลังจากตั้งเสาตรงแล้วหรือไม่?\nข้อได้เปรียบที่สำคัญที่สุดของ velolev คือการประกอบโคมไฟและแผงทั้งหมดบนพื้นดินได้อย่างปลอดภัย แต่หากหน้างานมีลมกระโชกแรงที่ไม่แน่นอน การติดตั้งแผงโซลาร์ในภายหลังด้วยรถกระเช้าอาจเป็นทางเลือกที่ปลอดภัยกว่า",
          "รูปทรงของเสากลมเรียวหรือแปดเหลี่ยมส่งผลต่อแรงต้านลมต่างกันหรือไม่?\nส่งผล เสารูปทรงต่างๆ มีค่าสัมประสิทธิ์แรงต้านอากาศพลศาสตร์ที่แตกต่างกัน โปรดระบุรูปทรงของเสาในแบบฟอร์มตรวจสอบข้อมูล"
        ]
      }
    ]
  }
};

// Merge into localesData
localesData.vi = { ...localesData.vi, ...viArticles };
localesData.th = { ...localesData.th, ...thArticles };

fs.writeFileSync(localesPath, JSON.stringify(localesData, null, 2), "utf8");
console.log("Successfully updated VI and TH articles in published-content-locales.json");
console.log("VI total count:", Object.keys(localesData.vi).length);
console.log("TH total count:", Object.keys(localesData.th).length);
