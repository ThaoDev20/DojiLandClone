import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import './RecruitmentPage.css';

const recruitmentItems = [
  {
    title: 'CƠ HỘI PHÁT TRIỂN SỰ NGHIỆP',
    desc: 'Tại Việt Thắng, người lao động được tạo điều kiện và trao cơ hội để phát triển sự nghiệp và gắn kết chặt chẽ với mục tiêu phát triển bền vững của toàn công ty.',
    image: 'https://cdnphoto.dantri.com.vn/2tPc7CcfcQ8pLvRR2vhvnPfNohE=/thumb_w/1155/2022/04/08/6-giai-doan-phat-trien-su-nghiep-ban-dang-o-nac-thang-naodocx-1649430545228.jpeg',
  },
  {
    title: 'MÔI TRƯỜNG LÀM VIỆC CHUYÊN NGHIỆP, ĐẲNG CẤP',
    desc: 'Việt Thắng quan tâm và chú trọng đầu tư cho môi trường làm việc với các không gian hiện đại, đồng bộ, thân thiện, qua đó mỗi cá nhân có được sự chủ động, sáng tạo trong công việc và tăng cường tính gắn kết với tập thể.',
    image: 'https://images.careerviet.vn/content/images/moi-truong-lam-viec-ly-tuong-careerbuilder-2.jpg',
  },
  {
    title: 'CHÍNH SÁCH ĐÀO TẠO CHUYÊN SÂU',
    desc: 'Đào tạo và phát triển cho cán bộ nhân viên là một trong những ưu tiên hàng đầu của Việt Thắng. Các chương trình, hoạt động đào tạo diễn ra thường xuyên và đa dạng, qua đó giúp các cá nhân nâng cao kỹ năng chuyên môn nghiệp vụ và hướng đến lộ trình phát triển nghề nghiệp cho từng vị trí.',
    image: 'https://suno.vn/blog/wp-content/uploads/2018/10/%C4%91%C3%A0o-t%E1%BA%A1o-nh%C3%A2n-vi%C3%AAn-b%C3%A1n-h%C3%A0ng.jpg',
  },
  {
    title: 'TẬP THỂ CÁ NHÂN TINH HOA',
    desc: 'Việt Thắng là tập thể của những cá nhân ưu tú, tinh hoa và khát khao bứt phá để thành công vượt trội và cùng chung mục tiêu hướng đến sự thành công và phát triển bền vững của công ty.',
    image: 'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/thanh_cong_la_gi_5d97d5b21a.jpg',
  },
  {
    title: 'CHÍNH SÁCH HẤP DẪN',
    desc: 'Chính sách Lương - Thưởng cạnh tranh với thị trường và tương xứng với hiệu quả làm việc. Việt Thắng xây dựng cơ chế khen thưởng dựa trên hệ thống đánh giá năng lực và hiệu quả công việc nhằm ghi nhận năng lực và sự cống hiến của mỗi cá nhân.',
    image: 'https://openend.vn/wp-content/uploads/2023/09/chinh-sach-ban-hang-scaled-1.jpg',
  },
  {
    title: 'ƯU ĐÃI TỪ HỆ SINH THÁI VIỆT THẮNG',
    desc: 'Trở thành một thành viên của Việt Thắng, mỗi cá nhân được hưởng những quyền lợi và chính sách ưu đãi đặc biệt từ các công ty thành viên trong hệ sinh thái của Tập đoàn Việt Thắng.',
    image: 'https://thuongtruong-fileserver.nvcms.net/IMAGES/2024/06/25/20240625102509-121.jpg',
  },
];

const RecruitmentPage = () => {
  return (
    <main className="recruitment-page">
      <section className="recruitment-section">
        <div className="recruitment-container">
          <h2 className="recruitment-title">ỨNG TUYỂN VỚI VIỆT THẮNG</h2>

          <div className="recruitment-grid">
            {recruitmentItems.map((item, index) => (
              <article className="recruitment-card" key={index}>
                <img src={item.image} alt={item.title} className="recruitment-img" />
                <div className="recruitment-overlay" />

                <div className="recruitment-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <RecruitmentApplySection />
      <QuickApplySection />
    </main>
  );
};

const RecruitmentApplySection = () => {
  const [form, setForm] = useState({
    email: '',
    name: '',
    fullName: '',
    gender: 'Nam',
    country: '',
    province: '',
    position: '',
    desiredSalary: '',
    currentSalary: '',
    expectedLevel: '',
    recentJob: '',
    experienceYears: '',
    updateNotification: '',
    cvFile: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      ...form,
      cvFile: form.cvFile?.name || '',
    });
  };

  return (
    <section className="apply-section">
      <div className="apply-bg-building" />

      <div className="apply-container">
        <h2 className="apply-title">JOIN OUR TALENT WORK</h2>

        <form className="apply-form" onSubmit={handleSubmit}>
          <h3 className="apply-group-title">Thông tin bắt buộc</h3>

          <div className="apply-row">
            <label>Email <span>*</span></label>
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          </div>

          <div className="apply-row">
            <label>Tên <span>*</span></label>
            <input name="name" type="text" placeholder="Nhập tên của bạn" value={form.name} onChange={handleChange} required />
          </div>

          <div className="apply-row">
            <label>Họ và tên đệm <span>*</span></label>
            <input name="fullName" type="text" placeholder="Nhập họ và tên đệm" value={form.fullName} onChange={handleChange} required />
          </div>

          <div className="apply-row">
            <label>Giới tính <span>*</span></label>

            <div className="apply-radio-group">
              <label className="apply-radio">
                <input type="radio" name="gender" value="Nam" checked={form.gender === 'Nam'} onChange={handleChange} />
                Nam
              </label>

              <label className="apply-radio">
                <input type="radio" name="gender" value="Nữ" checked={form.gender === 'Nữ'} onChange={handleChange} />
                Nữ
              </label>
            </div>
          </div>

          <div className="apply-row">
            <label>Quốc gia <span>*</span></label>
            <select name="country" value={form.country} onChange={handleChange} required>
              <option value="">Chọn</option>
              <option value="Việt Nam">Việt Nam</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          <div className="apply-row">
            <label>Tỉnh/Thành phố <span>*</span></label>
            <select name="province" value={form.province} onChange={handleChange} required>
              <option value="">Chọn</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          <div className="apply-row">
            <label>Vị trí mong muốn <span>*</span></label>
            <input name="position" type="text" placeholder="Nhập vị trí" value={form.position} onChange={handleChange} required />
          </div>

          <h3 className="apply-group-title apply-group-title-optional">Thông tin không bắt buộc</h3>

          <div className="apply-row">
            <label>Mức lương trước</label>
            <select name="currentSalary" value={form.currentSalary} onChange={handleChange}>
              <option value="">Chọn</option>
              <option value="Dưới 10 triệu">Dưới 10 triệu</option>
              <option value="10 - 20 triệu">10 - 20 triệu</option>
              <option value="20 - 30 triệu">20 - 30 triệu</option>
              <option value="Trên 30 triệu">Trên 30 triệu</option>
            </select>
          </div>

          <div className="apply-row">
            <label>Mức lương mong muốn</label>
            <select name="desiredSalary" value={form.desiredSalary} onChange={handleChange}>
              <option value="">Chọn</option>
              <option value="Dưới 10 triệu">Dưới 10 triệu</option>
              <option value="10 - 20 triệu">10 - 20 triệu</option>
              <option value="20 - 30 triệu">20 - 30 triệu</option>
              <option value="Trên 30 triệu">Trên 30 triệu</option>
            </select>
          </div>

          <div className="apply-row">
            <label>Cấp bậc mong muốn</label>
            <select name="expectedLevel" value={form.expectedLevel} onChange={handleChange}>
              <option value="">Chọn</option>
              <option value="Nhân viên">Nhân viên</option>
              <option value="Chuyên viên">Chuyên viên</option>
              <option value="Trưởng nhóm">Trưởng nhóm</option>
              <option value="Quản lý">Quản lý</option>
            </select>
          </div>

          <div className="apply-row apply-file-row">
            <label>Tải hồ sơ</label>

            <div className="apply-file-box">
              <label className="apply-file-input">
                <span>{form.cvFile ? form.cvFile.name : 'Đính kèm hồ sơ'}</span>
                <Upload size={14} />
                <input type="file" name="cvFile" accept=".doc,.docx,.pdf" onChange={handleChange} />
              </label>

              <p>Hỗ trợ định dạng: *.doc, *.pdf và không quá 5MB</p>
            </div>
          </div>

          <div className="apply-row">
            <label>Công việc gần đây</label>
            <input name="recentJob" type="text" placeholder="Nhập tên công việc" value={form.recentJob} onChange={handleChange} />
          </div>

          <div className="apply-row">
            <label>Số năm kinh nghiệm</label>
            <input name="experienceYears" type="text" placeholder="Nhập số năm kinh nghiệm" value={form.experienceYears} onChange={handleChange} />
          </div>

          <div className="apply-row">
            <label>Bằng cấp cao nhất</label>
            <select name="updateNotification" value={form.updateNotification} onChange={handleChange}>
              <option value="">Chọn</option>
              <option value="Cao đẳng">Cao đẳng</option>
              <option value="Đại học">Đại học</option>
              <option value="Thạc sĩ">Thạc sĩ</option>
              <option value="Tiến sĩ">Tiến sĩ</option>
              <option value="Giáo sư">Giáo sư</option>
            </select>
          </div>

          <div className="apply-submit-wrap">
            <button type="submit" className="apply-submit">THAM GIA</button>
          </div>
        </form>
      </div>
    </section>
  );
};

const QuickApplySection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Quick apply email:', email);
  };

  return (
    <section className="quick-apply-section">
      <form className="quick-apply-container" onSubmit={handleSubmit}>
        <input
          type="email"
          className="quick-apply-input"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" className="quick-apply-button">
          NỘP HỒ SƠ
        </button>
      </form>
      <style>{`
  .quick-apply-section {
  position: relative;
  padding: 58px 20px 90px;
  background: #f7f5f0;
}

.quick-apply-container {
  max-width: 1160px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 260px;
  align-items: center;
  gap: 48px;
}

.quick-apply-input {
  width: 100%;
  height: 62px;
  padding: 0 28px;
  border: 1px solid #d1d1d1;
  outline: none;
  background: rgba(255, 255, 255, 0.72);
  color: #333;
  font-size: 19px;
  font-weight: 500;
  letter-spacing: 0.3px;
}

.quick-apply-input::placeholder {
  color: #666;
}

.quick-apply-input:focus {
  border-color: #b88a45;
  box-shadow: 0 0 0 2px rgba(184, 138, 69, 0.12);
}

.quick-apply-button {
  width: 235px;
  height: 44px;
  border: 0;
  cursor: pointer;
  color: #563514;
  background: linear-gradient(90deg, #e5c06e, #f8df93, #d7a33f);
  font-size: 17px;
  font-weight: 800;
  letter-spacing: 3px;
  clip-path: polygon(
    8% 0,
    92% 0,
    100% 50%,
    92% 100%,
    8% 100%,
    0 50%
  );
  box-shadow: inset 0 0 0 2px rgba(107, 75, 36, 0.35);
  transition: transform 0.2s ease, filter 0.2s ease;
}

.quick-apply-button:hover {
  transform: translateY(-2px);
  filter: brightness(1.05);
}

@media (max-width: 768px) {
  .quick-apply-section {
    padding: 42px 18px 60px;
  }

  .quick-apply-container {
    grid-template-columns: 1fr;
    gap: 22px;
  }

  .quick-apply-input {
    height: 54px;
    padding: 0 18px;
    font-size: 15px;
  }

  .quick-apply-button {
    width: 210px;
    height: 40px;
    font-size: 14px;
  }
}
`}</style>
    </section>
  );
};

export default RecruitmentPage;