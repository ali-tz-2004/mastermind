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

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  if (!isOpen) return null;

  return (
    <HelpOverlay onClick={onClose}>
      <HelpModalContainer
        dir="rtl"
        onClick={(event) => event.stopPropagation()}
      >
        <HelpCloseButton
          type="button"
          onClick={onClose}
          aria-label="بستن راهنما"
        >
          ×
        </HelpCloseButton>

        <HelpTitle>راهنمای بازی</HelpTitle>

        <HelpIntro>در این بازی باید ترکیب ۴ رنگ مخفی را پیدا کنید.</HelpIntro>

        <HelpSection>
          <h3>🎯 هدف بازی</h3>

          <p>
            با انتخاب رنگ‌ها، ترکیب مخفی را حدس بزنید و آن را در حداکثر ۹ تلاش
            پیدا کنید.
          </p>
        </HelpSection>

        <HelpSection>
          <h3>نتیجه حدس</h3>

          <HelpResult>
            <HelpDot color="#494949" />

            <div>
              <strong>مشکی</strong>
              <span>رنگ درست و جای درست</span>
            </div>
          </HelpResult>

          <HelpResult>
            <HelpDot color="#fff" />

            <div>
              <strong>سفید</strong>
              <span>رنگ درست، اما جای اشتباه</span>
            </div>
          </HelpResult>
        </HelpSection>

        <HelpSection>
          <h3>💡 نحوه بازی</h3>

          <ol>
            <li>یک رنگ را انتخاب کنید.</li>
            <li>چهار رنگ را برای یک حدس کامل کنید.</li>
            <li>روی علامت ✓ بزنید.</li>
            <li>نتیجه حدس خود را بررسی کنید.</li>
          </ol>
        </HelpSection>

        <HelpAction type="button" onClick={onClose}>
          متوجه شدم
        </HelpAction>
      </HelpModalContainer>
    </HelpOverlay>
  );
}
