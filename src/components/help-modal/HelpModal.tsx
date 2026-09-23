import { ColorsResult } from "../../utils/Models";
import {
  HelpAction,
  HelpCloseButton,
  HelpDot,
  HelpIntro,
  HelpModalContainer,
  HelpOverlay,
  HelpResult,
  HelpSection,
  HelpTitle,
} from "./HelpModal.styled";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function HelpModal({ isOpen, onClose }: HelpModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <HelpOverlay onClick={onClose}>
      <HelpModalContainer onClick={(event) => event.stopPropagation()}>
        <HelpCloseButton type="button" onClick={onClose}>
          ×
        </HelpCloseButton>

        <HelpTitle>راهنمای بازی</HelpTitle>

        <HelpIntro>
          در بازی فکر و بکر باید رمز مخفی را با انتخاب رنگ‌های درست پیدا کنید.
        </HelpIntro>

        <HelpSection>
          <h3>نحوه بازی</h3>

          <ol>
            <li>در هر مرحله ۴ رنگ انتخاب کنید.</li>
            <li>دکمه بررسی را بزنید.</li>
            <li>نتیجه انتخاب خود را بررسی کنید.</li>
            <li>با استفاده از راهنمای نتیجه، رمز مخفی را پیدا کنید.</li>
          </ol>
        </HelpSection>

        <HelpSection>
          <h3>راهنمای نتیجه</h3>

          <HelpResult>
            <HelpDot color={ColorsResult.Black} />

            <div>
              <strong>رنگ و جایگاه درست</strong>
              <span>رنگ درست در جایگاه درست قرار دارد.</span>
            </div>
          </HelpResult>

          <HelpResult>
            <HelpDot color={ColorsResult.White} />

            <div>
              <strong>رنگ درست، جایگاه اشتباه</strong>
              <span>رنگ در رمز وجود دارد اما جایگاه آن اشتباه است.</span>
            </div>
          </HelpResult>
        </HelpSection>

        <HelpSection>
          <h3>سطح سختی</h3>

          <ol>
            <li>آسان — ۱۰ تلاش</li>
            <li>متوسط — ۸ تلاش</li>
            <li>سخت — ۶ تلاش</li>
          </ol>
        </HelpSection>

        <HelpSection>
          <h3>امتیاز</h3>

          <p>
            هرچه رمز را با تلاش کمتری پیدا کنید، امتیاز بیشتری دریافت می‌کنید.
            بهترین امتیاز هر سطح سختی نیز به صورت جداگانه ذخیره می‌شود.
          </p>
        </HelpSection>

        <HelpAction type="button" onClick={onClose}>
          متوجه شدم
        </HelpAction>
      </HelpModalContainer>
    </HelpOverlay>
  );
}

export default HelpModal;
