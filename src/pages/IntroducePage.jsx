import React, { useEffect } from "react";
import "./IntroducePage.css";

const IMAGES = {
  hero: "/introduce/hero.jpg",
  introBg1: "/introduce/introBg1.jpg",
  introBg: "/introduce/introBg.png",
  eco: '/introduce/eco.jpg',
  emotion: "/introduce/emotion.jpg",
  education: "/introduce/education.jpg",
  economic: "/introduce/economic.jpg",
  elite: "/introduce/elite.jpg",
  business: "/introduce/business.jpg",
};

const fiveEItems = [
  {
    title: "Eco",
    subtitle: "Sinh thái",
    image: IMAGES.eco,
    content:
      [
        "Sinh ra từ tự nhiên, sự sinh tồn và phát triển của con người luôn gắn liền với tự nhiên nhưng chính cuộc sống hiện đại đã mang con người rời xa tự nhiên, vì vậy khi được trở về với thiên nhiên chính là sự tìm về cội nguồn giá trị, đó cũng là cách hướng đến tương lai bền vững.",
        "Cũng vẫn là phố thị, nhưng ở Việt Thắng, đó là những quần thể kiến trúc, cụm công trình được kết nối hài hoà với mật độ xây dựng thấp nên chẳng có sự “bành trướng” của những khối bê tông, những ồn ào, khói bụi. Thay vào đó là xanh cỏ, xanh cây; là những con đường tinh tươm sương sớm, ngào ngạt hương hoa; những dòng sông, mặt hồ với tiếng sóng nước vỗ nhẹ vào bờ... Hành trình đi đến một cuộc sống tiện nghi cũng là hành trình trở về với thiên nhiên. Việt Thắng là nơi ta khám phá và lắng nghe chính mình..."
      ]
  },
  {
    title: "Emotion",
    subtitle: "Cảm xúc",
    image: IMAGES.emotion,
    content:
      [
        "Giá trị cảm xúc ở đây được hiểu là tính nhân văn và khả năng làm “xanh” tâm hồn cho mỗi con người. Bản thân sinh thái là một giá trị nhân văn. Một không gian sống sinh thái chính là không gian sống nhân văn, bởi ở nơi đó con người và những giá trị cuộc sống được nâng niu, trân trọng và phát triển.",
        "Việt Thắng lựa chọn hướng phát triển đô thị lấy con người là thước đo, là khởi điểm để từ đó kiến tạo một không gian sống giàu cảm xúc. Ở đó, những “giá trị mềm” được nâng niu để mỗi người được tìm về với thiên nhiên, với tình làng nghĩa xóm, với cộng đồng... để được lắng nghe tiếng nói từ tâm hồn, để biết yêu thương và trân trọng cuộc sống mỗi ngày.",
        "Sống ở Việt Thắng, đắm mình trong sự kỳ diệu của thiên nhiên, cùng bạn bè tận hưởng một bữa tiệc ngoài trời bên tiếng chim ca để xiết chặt thêm tình bằng hữu, hoặc đơn giản chỉ là chơi đùa với các con bên thảm cỏ... ta sẽ hiểu thế nào là không gian sống nhân văn và hạnh phúc."
      ]
  },
  {
    title: "Edu-entertainment",
    subtitle: "Giải trí - Giáo dục",
    image: IMAGES.education,
    content: [
      "Giải trí và giáo dục đã trở thành nhu cầu không thể thiếu trong cuộc sống hiện đại. Yếu tố này được chủ đầu tư Việt Thắng đặc biệt chú ý để không chỉ phục vụ nhu cầu cư dân mà còn để đáp ứng cho cả cộng đồng.",
      "Đến với Việt Thắng, cư dân và du khách có thể picnic,đi thuyền kayak, đạp xe trong những công viên rộng lớn, có thể nghỉ ngơi thư giãn ở những nhà câu lạc bộ, giải trí với rạp chiếu phim CGV, mua sắm tại Phố Trúc và tham dự những sự kiện, lễ hội, chợ quê...",
      "Bên cạnh đó, hệ thống giáo dục từ mầm non tới đại học cũng được Việt Thắng đầu tư đồng bộ theo chuẩn quốc tế. Trường mầm non Creative Kindlecare Việt Thắng, trường phổ thông Đoàn Thị Điểm Greenfield, trường liên cấp Edison, trường Đại học Anh quốc Việt Nam, Đại học Y khoa Tokyo Việt Nam... là những minh chứng cụ thể cho hướng đầu tư này.",
      "Và cả không gian, cộng đồng Việt Thắng chính là một “trường học lớn”, dạy chúng ta về tình yêu thiên nhiên, về văn hóa cộng đồng và là một chốn nghỉ dưỡng giữa lòng đô thị... "
    ]
  },
  {
    title: "Economic",
    subtitle: "Kinh tế",
    image: IMAGES.economic,
    content: [
      "Với vị trí gần ngay trung tâm Hà Nội, Việt Thắng tập trung được nhiều lợi thế đặc biệt là về ưu đãi đầu tư để cung cấp ra thị trường giá bán hết sức cạnh tranh. Theo tính toán của các chuyên gia thì giá bán sản phẩm BĐS của Việt Thắng luôn chỉ bằng 2/3 những sản phẩm ở phân khúc hạng sang đồng chất lượng.",
      "Với Việt Thắng, cư dân không chỉ mua một chỗ ở mà còn mua một không gian sống; nơi họ không những được đáp ứng đầy đủ về nhu cầu vật chất mà còn được tôn trọng, chăm sóc về tinh thần. Việt Thắng mang khát vọng tạo lập một đô thị xanh, hiện đại, đáng sống; một cộng đồng nhân văn và thịnh vượng... Đó chính là những cam kết quan trọng để đảm bảo khoản đầu tư của khách hàng luôn gia tăng giá trị theo thời gian..."
    ]
  },
  {
    title: "Elite",
    subtitle: "Tinh hoa, đẳng cấp",
    image: IMAGES.elite,
    content: [
      "Sống thượng lưu, sống đẳng cấp... đó luôn là mục tiêu hướng tới của mỗi người thành đạt. Việt Thắng ghi dấu ấn của mình với sự đột phá, trong việc tạo ra một trào lưu, xu hướng tận hưởng cuộc sống mới cho người dân đô thị. Đó là nhu cầu sống xanh, sống sang trọng giữa thiên nhiên, tận hưởng các dịch vụ tiện ích chất lượng cao để sống khỏe, sống hạnh phúc và thực sự trải nghiệm một “cuộc đời trọn vẹn”.",
      "Bên cạnh các yếu tố “cứng” như quy hoạch bài bản, khoa học, hạ tầng đồng bộ, phát triển bền vững, tích hợp tối ưu giữa các công trình phức hợp hiện đại, đem lại những tiện ích, tiện nghi tại chỗ, phục vụ hiệu quả mọi nhu cấu sống của người dân thì những yếu tố “mềm” như hệ thống an ninh, dịch vụ công cộng, an sinh xã hội và quản lý hoàn hảo theo chuẩn quốc tế... cũng góp phần rất lớn làm nên đẳng cấp Việt Thắng và tạo ra cho cư dân một cuộc sống tinh hoa."
    ],
  },
  {
    title: "Văn hóa kinh doanh",
    subtitle: "",
    image: IMAGES.business,
    content: [
      "Không đơn thuần là một khu phố giao thương sầm uất, Phố Cúc còn hướng tới mục đích cao hơn là trở thành một khu phố văn hóa – nơi những giá trị văn hóa truyền thống được gìn giữ và tôn vinh. Những mặt hàng kinh doanh ở Phố Cúc sẽ đều được đầu tư công phu và tinh tế để du khách đặt chân tới Phố Cúc cảm nhận được giữa một không gian sầm uất và nhộn nhịp là một bầu không khí đặc trưng, đậm đà bản sắc Việt - đó chính là nét văn hóa kinh doanh độc đáo mà chúng tôi tự hào.",
    ],
  },
];



const IntroducePage = () => {

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal-up");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
  return (
    <main className="eco-overview-page">
      <section
        className="eco-overview-hero"
        style={{ backgroundImage: `url(${IMAGES.hero})` }}
      >
        <div
          className="eco-intro-card"
          style={{ backgroundImage: `url(${IMAGES.introBg})` }}
        >
          <div className="eco-intro-card-overlay">
            <h2>
              Thành phố triệu cây xanh
              <span>Yên bình - Sôi động</span>
            </h2>

            <p>
              Giống như nhiều đô thị phồn vinh trên thế giới đều gắn liền với
              một dòng sông như Paris, London, Vienne..., khu đô thị Việt Thắng
              trải dài bên bờ sông Bắc Hưng Hải, được sông Hồng và sông Đuống
              trù phú bao quanh, là nơi phong thủy tượng trưng cho “nhân vượng,
              gia an”.
            </p>

            <p>
              Chỉ cách trung tâm Hà Nội 25 phút lái xe, Việt Thắng được vinh danh
              là đại đô thị sinh thái đẳng cấp, đáng sống nhất miền Bắc, sở hữu
              những sản phẩm nhà ở đặc biệt được xây dựng theo công nghệ xanh
              độc đáo với không gian mở rộng thoáng, tràn ngập hơi thở thiên
              nhiên cùng hệ thống tiện ích thể thao, vui chơi, giải trí và giáo
              dục toàn diện.
            </p>
          </div>
        </div>
      </section>
      <section
        className="eco-philosophy"
        style={{ backgroundImage: `url(${IMAGES.introBg})` }}
      >
        <div className="eco-philosophy-content">
          <h2>
            Triết lí <strong>5E</strong>
          </h2>

          <p>
            Việt Thắng là một khu đô thị đẹp đến ngỡ ngàng đang hiện hữu và ngày
            một hoàn hảo hơn. Những toà biệt thự, dãy phố, công viên, trường
            học... bình yên nép mình trong những “cánh rừng” xanh và dòng sông
            thơ mộng.
          </p>

          <p>
            Đó không chỉ là một đô thị phức hợp hoàn hảo, nơi cư dân và du khách
            được tận hưởng cuộc sống tiện nghi trong không gian xanh, sạch, an
            toàn mà còn là một điểm đến vui chơi – giải trí đầy thi vị.
          </p>
        </div>
      </section>

      <section className="eco-five-e">
        {fiveEItems.map((item, index) => (
          <article
            key={item.title}
            className={`eco-e-block reveal-up ${index % 2 !== 0 ? "is-reverse" : ""}`}
          >
            <div className="eco-e-image">
              <img src={item.image} alt={`${item.title} ${item.subtitle || ""}`} />
            </div>

            <div className="eco-e-content">
              <h3>
                {item.title}
                {item.subtitle && (
                  <span className="eco-e-subtitle"> ({item.subtitle})</span>
                )}
              </h3>

              {Array.isArray(item.content) ? (
                item.content.map((text, textIndex) => (
                  <span className="eco-e-text" key={textIndex}>
                    {text}
                  </span>
                ))
              ) : (
                <span className="eco-e-text">{item.content}</span>
              )}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default IntroducePage;