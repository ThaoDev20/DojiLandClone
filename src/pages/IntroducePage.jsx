import React from "react";
import "./IntroducePage.css";

const IMAGES = {
  hero: "https://ecopark.com.vn/images/slideshow/2020/09/09/original/group-347_1599627348.jpg",

  intro:
    "https://ecopark.com.vn/modules/about/assets/images/1.jpg",

  core:
    "https://ecopark.com.vn/modules/about/assets/images/2.jpg",

  awards:
    "https://ecopark.com.vn/modules/about/assets/images/3.jpg",
};

const IntroducePage = () => {
  React.useEffect(() => {
    const elements = document.querySelectorAll(".group-reveal, .group-flip");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <main className="group-page">
      <section
        className="group-hero"
        style={{ backgroundImage: `url(${IMAGES.hero})` }}
      >
        <h1>
          Giới thiệu
          <strong>Tập đoàn</strong>
        </h1>
      </section>

      <section className="group-intro group-reveal">
        <div className="group-container">
          <h2 className="group-main-title">
            Giới thiệu - <strong>Tập đoàn</strong>
          </h2>

          <p>
            Năm 2003, một nhóm nhà đầu tư, bằng tâm huyết và kinh nghiệm thành
            công trên nhiều lĩnh vực kinh doanh đã quyết định thành lập Công ty
            CP đầu tư và phát triển đô thị Việt Hưng (Vihajico). Sự ra đời của
            công ty gắn liền với sứ mệnh xây dựng một khu đô thị sinh thái chức
            năng đầu tiên ở Việt Nam theo xu hướng phát triển đô thị hiện đại
            của các quốc gia trên thế giới: khu đô thị Việt Thắng.
          </p>

          <p>
            Sau hơn 21 năm phát triển, Việt Thắng đã trở thành một thành phố chức
            năng kiểu mẫu, tiên phong xác lập xu hướng Bất động sản Xanh với giá
            cả hợp lý, được quốc tế tôn vinh với nhiều giải thưởng danh giá. Ban
            lãnh đạo công ty đã quyết định thay đổi tên thành Công ty CP Tập đoàn
            Việt Thắng, hướng tới mục tiêu phát triển bền vững, đầu tư đa ngành vào
            các lĩnh vực như giáo dục, y tế, nông nghiệp sạch, công nghệ cao, du
            lịch, vui chơi giải trí…; đồng thời vẫn giữ vững vị thế chủ chốt là
            Tập đoàn đầu tư và phát triển đô thị chuyên nghiệp theo xu hướng Bất
            động sản Xanh.
          </p>
        </div>
      </section>

      <section className="group-split group-reveal">
        <div className="group-split-image">
          <img src={IMAGES.intro} alt="Tập đoàn Việt Thắng" />
        </div>

        <div className="group-split-content">
          <h2>Tầm nhìn</h2>
          <p>
            Tập đoàn Việt Thắng phấn đấu trở thành doanh nghiệp hàng đầu tại Việt
            Nam và khu vực trong lĩnh vực đầu tư bất động sản và phát triển đô
            thị sinh thái thông minh theo xu hướng Bất Động Sản Xanh.
          </p>

          <h2>Sứ mệnh</h2>
          <p>
            Tập đoàn Việt Thắng không chỉ đơn giản mang đến cho bạn một ngôi nhà,
            mà còn dành tặng cho khách hàng một không gian sống hoàn hảo.
          </p>

          <p>
            Kiến tạo những giá trị chung vượt thời gian cho khách hàng, cổ đông
            và các bên liên quan bằng các giải pháp Bất Động Sản Xanh đột phá,
            sáng tạo.
          </p>

          <p>
            Hiện thực hóa giấc mơ về một mái ấm lý tưởng của nhiều thế hệ Việt
            với mô hình đô thị sinh thái đẳng cấp và nhân văn, tiên phong và
            tiêu biểu cho xu hướng phát triển kiến trúc Xanh bền vững tổng hòa
            với tự nhiên.
          </p>
        </div>
      </section>

      <section className="group-split group-split-reverse">
        <div className="group-split-content">
          <h2>Cốt lõi</h2>

          <p>
            <strong>TÍN NHIỆM:</strong> Hành xử chính trực, có trách nhiệm, lời
            nói đi đôi với việc làm trên cơ sở tin tưởng và tôn trọng lẫn nhau.
          </p>

          <p>
            <strong>VƯỢT TRỘI:</strong> Vượt trội trong mọi lĩnh vực hoạt động
            nhờ vào đổi mới, sáng tạo và khát khao chinh phục những tầm cao mới,
            tăng trưởng toàn diện.
          </p>

          <p>
            <strong>CÙNG NHAU THÀNH CÔNG:</strong> Cộng hưởng và sẻ chia những
            giá trị và lợi ích chung lâu dài trên phương diện kinh tế lẫn chất
            lượng sống.
          </p>

          <p>
            <strong>BỀN VỮNG:</strong> Phát triển bền vững trong mối tương quan
            mật thiết giữa môi trường, nền kinh tế và xã hội.
          </p>
        </div>

        <div className="group-split-image group-flip">
          <img src={IMAGES.core} alt="Cốt lõi Việt Thắng" />
        </div>
      </section>

      <section className="group-split">
        <div className="group-split-image group-flip">
          <img src={IMAGES.awards} alt="Giải thưởng Việt Thắng" />
        </div>

        <div className="group-split-content">
          <h2>Giải thưởng và thành tựu</h2>

          <p>
            Tập đoàn Việt Thắng không chỉ đơn giản mang đến cho bạn một ngôi nhà,
            mà còn dành tặng cho khách hàng một không gian sống hoàn hảo.
          </p>

          <p>
            Tập đoàn Việt Thắng tập trung kiến tạo những giá trị chung vượt thời
            gian cho khách hàng, cổ đông và các bên liên quan bằng các giải pháp
            Bất Động Sản Xanh đột phá, sáng tạo.
          </p>

          <p>
            Đồng thời hiện thực hóa giấc mơ về một mái ấm lý tưởng của nhiều thế
            hệ Việt với mô hình đô thị sinh thái đẳng cấp, nhân văn và bền vững.
          </p>
        </div>
      </section>
    </main>
  );
};

export default IntroducePage;