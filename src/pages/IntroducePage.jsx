import React from 'react';
import './IntroducePage.css';

const IntroducePage = () => {
  return (
    <main className="introduce-page">
      <section className="introduce-section">
        <div className="introduce-container">
          <h1 className="introduce-title">
            Việt Thắng- TIÊN PHONG KIẾN TẠO NHỮNG GIÁ TRỊ KHÁC BIỆT
          </h1>

          <div className="introduce-content">
            <p>
              Thành lập vào năm 2014, Việt Thắng đang khẳng định
              được sức mạnh trong các dự án đầu tư cũng như vị thế dẫn đầu trên thị trường
              bất động sản.
            </p>

            <p>
              Đi theo một chiến lược khác biệt hoàn toàn với các sản phẩm trên thị trường,
              Việt Thắng là đơn vị tiên phong phát triển dòng sản phẩm kiến trúc với
              giá trị nghệ thuật đỉnh cao, giải phóng công năng của bất động sản khỏi những
              chuẩn mực thông thường.
            </p>

            <p>
              Bên cạnh thiết kế độc đáo, Việt Thắng đầu tư chăm chút cho chất lượng sống của
              cư dân với hệ thống thiết bị, vật liệu cao cấp, thân thiện với môi trường cùng
              hệ tiện ích all in one hiện đại theo tiêu chuẩn quốc tế. Các công trình bất
              động sản nghệ thuật kim hoàn mang thương hiệu Việt Thắng ghi dấu ấn mạnh mẽ
              trong lòng khách hàng và đối tác nhờ kiến trúc độc đáo, ứng dụng công nghệ
              hiện đại và phong cách sống đỉnh cao, cùng pháp lý hoàn chỉnh, minh bạch và
              giá trị sinh lợi cao; qua đó góp phần nâng tầm tiêu chuẩn sống cho người dân,
              thúc đẩy sự phát triển kinh tế-xã hội của địa phương và sự bền vững của thị
              trường bất động sản Việt Nam.
            </p>
          </div>
        </div>
        <div className="introduce-vision-mission">
          <div className="intro-vm-row intro-vm-row-top">
            <div className="intro-vm-image-wrap">
              <img
                src="https://dojiland.vn/wp-content/uploads/2023/07/image-60.jpg"
                alt="Tầm nhìn DOJILAND"
                className="intro-vm-image"
              />
            </div>

            <div className="intro-vm-content intro-vm-content-right">
              <h2>TẦM NHÌN</h2>
              <p>
                Với tiềm lực tài chính hùng mạnh, năng lực quản trị vượt trội,
                Việt Thắnghướng tới mục tiêu trở thành nhà đầu tư, phát triển bất động
                sản uy tín sáng tạo và đẳng cấp hàng đầu Việt Nam với những kiệt tác
                hoàn hảo và đạt chuẩn quốc tế.
              </p>
            </div>
          </div>

          <div className="intro-vm-row intro-vm-row-bottom">
            <div className="intro-vm-content intro-vm-content-left">
              <h2>SỨ MỆNH</h2>
              <p>
                Việt Thắngcam kết mang đến các sản phẩm – dịch vụ có chất lượng hoàn
                hảo, không ngừng đề cao tính sáng tạo và gia tăng những giá trị tiện
                ích đẳng cấp nhằm nâng cao chất lượng cuộc sống của người Việt; xây
                dựng hệ giá trị nhân văn sâu sắc, vì con người và hướng tới cộng đồng.
              </p>
            </div>

            <div className="intro-vm-image-wrap intro-vm-image-large">
              <img
                src="https://dojiland.vn/wp-content/uploads/2023/07/freepik_5884784-1.jpg"
                alt="Sứ mệnh DOJILAND"
                className="intro-vm-image"
              />
            </div>
          </div>
        </div>
        <section className="introduce-core-values">
          <div className="intro-core-header">
            <span className="intro-core-line"></span>
            <h2>GIÁ TRỊ CỐT LÕI</h2>
          </div>

          <div className="intro-core-grid">
            <div className="intro-core-card">
              <img
                src="https://fado.vn/blog/wp-content/uploads/2024/01/nhung-cau-noi-hay-ve-uy-tin-chat-luong-3-jpg.webp"
                alt="Uy tín"
                className="intro-core-image"
              />
              <div className="intro-core-overlay"></div>
              <div className="intro-core-content">
                <div className="intro-core-title-row">
                  <h3>UY TÍN</h3>
                  <span></span>
                </div>
                <p>
                  Nỗ lực không ngừng trên mọi phương diện để giữ gìn uy tín và phát huy
                  danh tiếng, DOJILAND luôn xây dựng mối quan hệ với khách hàng, đối tác,
                  nhà đầu tư và nhân viên dựa trên sự hợp tác chân thành, tôn trọng và hài
                  hòa lợi ích các bên.
                </p>
              </div>
            </div>

            <div className="intro-core-card">
              <img
                src="https://dojiland.vn/wp-content/uploads/2023/07/image-70.jpg"
                alt="Chất lượng"
                className="intro-core-image"
              />
              <div className="intro-core-overlay"></div>
              <div className="intro-core-content">
                <div className="intro-core-title-row">
                  <h3>CHẤT LƯỢNG</h3>
                  <span></span>
                </div>
                <p>
                  DOJILAND luôn coi trọng và lấy chất lượng các sản phẩm của mình làm
                  tiêu chí tiên quyết để phát triển bền vững.
                </p>
              </div>
            </div>

            <div className="intro-core-card">
              <img
                src="https://dojiland.vn/wp-content/uploads/2023/07/2-bep-2-1.jpg"
                alt="Sáng tạo"
                className="intro-core-image"
              />
              <div className="intro-core-overlay"></div>
              <div className="intro-core-content">
                <div className="intro-core-title-row">
                  <h3>SÁNG TẠO</h3>
                  <span></span>
                </div>
                <p>
                  Các sản phẩm – dịch vụ của DOJILAND đều đề cao chất lượng hoàn hảo,
                  hướng tới những giá trị sáng tạo đỉnh cao làm nên những kiệt tác để
                  nâng cao chất lượng sống của cộng đồng.
                </p>
              </div>
            </div>

            <div className="intro-core-card">
              <img
                src="https://dojiland.vn/wp-content/uploads/2023/07/181009_TSR_Santrong-1-1.jpg"
                alt="Đẳng cấp"
                className="intro-core-image"
              />
              <div className="intro-core-overlay"></div>
              <div className="intro-core-content">
                <div className="intro-core-title-row">
                  <h3>ĐẲNG CẤP</h3>
                  <span></span>
                </div>
                <p>
                  DOJILAND xây dựng không gian sống đẳng cấp, tối đa hóa các giá trị tiện
                  ích nhằm gia tăng chất lượng cuộc sống cho người Việt.
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default IntroducePage;